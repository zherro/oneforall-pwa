import { createClient } from "@supabaseutils/utils/server";
import { LOG } from "@utils/log";
import { NextResponse, type NextRequest } from "next/server";
import sharp from "sharp";
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { FileData } from "@supabaseutils/model/FileData";
import ObjectUtils from "@utils/helpers/Object.utils";
import { StatusEntity } from "@supabaseutils/model/types/Status.type";
import httpResponse from "@utils/http/HttpResponse";
import FileDataRepository from "@supabaseutils/repositories/FileData.repository";
import { UserData } from "@supabaseutils/model/user/UserData";
import SessionUtils from "@supabaseutils/session";
import { BusinessException } from "@supabaseutils/bussines.exception";
import HttpStatusCode from "@utils/http/HttpStatusCode";
import validateUserAuth from "@supabaseutils/service/validateUserAuth.service";
import TicketsRepository from "@supabaseutils/repositories/tickets.repository";
import ClaimRepository from "@supabaseutils/repositories/Claim.repository";
import { CrudService } from "@supabaseutils/Crud.service";

// Configurar o cliente S3 da DigitalOcean
const s3Client = new S3({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  endpoint: "https://nyc3.digitaloceanspaces.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: "DO006TXF229UZWZD8CXG",
    secretAccessKey: "C/qpn4fFfKWGk32vK3HS6/LnpDaGCbiFA991Hh0r63o",
  },
});

const imageFileTypes: string[] = [
  "image/jpeg", // JPEG/JPG
  "image/jpg", // JPEG/JPG
  "image/png", // PNG
  "image/gif", // GIF
  "image/bmp", // BMP
  "image/webp", // WEBP
];

function isSupportedImageType(file: FileData): boolean {
  return imageFileTypes.includes(file.type);
}

async function resizeAndOptimizeImage(buffer, width) {
  try {
    const image = sharp(buffer);

    // Obtenha os metadados da imagem para calcular a altura proporcional
    const metadata = await image.metadata();
    const height = Math.round(
      ((metadata.height || 300) / (metadata.width || 300)) * width
    );

    // Redimensiona e otimiza a imagem em memória para o formato WebP
    const optimizedBuffer = await image
      .resize(width, height) // Redimensiona proporcionalmente
      .toFormat("webp", {
        quality: 85, // Ajusta a qualidade para um equilíbrio entre tamanho do arquivo e qualidade da imagem
      })
      .toBuffer();

    console.log("Image resized and optimized in memory");
    return optimizedBuffer;
  } catch (err) {
    console.error("Error resizing and optimizing image:", err);
    throw err;
  }
}

const handleBase64ToBuffer = (base64String) => {
  // Remove the data URL prefix
  // const base64Data = base64String.replace(/^data:image\/png;base64,/, "");

  return base64String.replace(/^data:image\/\w+;base64,/, "");
};

async function upload(
  { path, base64File, width, name, ContentType = "image/webp" },
  optimize = false
) {
  // Converter a string Base64 em um buffer
  const buffer = Buffer.from(handleBase64ToBuffer(base64File), "base64");

  // Redimensionar e otimizar a imagem
  const optimizedBuffer = !optimize
    ? buffer
    : await resizeAndOptimizeImage(buffer, parseInt(width, 10));

  // Fazer upload para o Space da DigitalOcean usando @aws-sdk/client-s3
  const uploadParams: any = {
    Bucket: "boracuiaba",
    Key: `${process.env.S3_BUKET_NAME}/${path}/${name}.webp`,
    Body: optimizedBuffer,
    ACL: "public-read", // Define a permissão para público
    ContentType,
  };

  const command = new PutObjectCommand(uploadParams);
  const data = await s3Client.send(command);
}

export async function POST(request: NextRequest) {
  try {
    // Parse query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const createTicket = searchParams.get("create_ticket");
    const ticketType: any = searchParams.get("ticket_type");
    let afterUpload = (file: FileData) => {};

    const ticketRepository = new TicketsRepository();
    const user: UserData = await ticketRepository.getUser();

    // Ensure createTicket is a string and validate its value if necessary

    LOG.debug("creating ticket: ", ticketType);
    LOG.debug("Is ADMIN", await new ClaimRepository().isAdmin());

    const service = new CrudService(ticketRepository);

    afterUpload = async (file: FileData) => {
      await service.createOrUpdateWithTenant(request, {
        type: ticketType,
        message: "Oi, cadastre meu cardapio!",
        tenant_id: user.user_metadata.tenant.id,
        name: user.user_metadata.first_name,
        email: user.email,
        asset_data: {
          fileId: file.id,
          name: file.name,
        },
      });
    };

    // Parse the JSON body
    const files: FileData[] = await request.json();

    const repository = new FileDataRepository();
    const { tenant, userId } = validateUserAuth(await repository.getUser())
      .isAuthenticated()
      .get();

    for (let i = 0; i < files.length; i++) {
      uploadFiles(files[i]);
      if (createTicket == "true") {
        afterUpload(files[i]);
      }
      files[i].status = StatusEntity.ACTIVE;
      files[i].tenant_id = tenant.id;
      files[i].user_id = userId;
      const { data, error } = await repository
        .save(files[i])
        .select("id")
        .single();

      if (error) throw error;
    }
    // const filesIds = await uploadFiles(files, supabase);

    return NextResponse.json({}, { status: HttpStatusCode.CREATED });
  } catch (error) {
    LOG.error("Error processing request:", error);

    // Return an error response
    return NextResponse.json(httpResponse.errorMsg(), {
      status: HttpStatusCode.BAD_REQUEST,
    });
  }
}

const imageSizes = [
  { size: 140, name: "mini" },
  { size: 400, name: "resume" },
  { size: 750, name: "medium" },
];

async function uploadFiles(file: FileData) {
  if (ObjectUtils.nonNull(file)) {
    if (isSupportedImageType(file)) {
      await upload({
        path: file.id,
        base64File: file.base64,
        width: 100,
        name: "original",
      });

      for (let j = 0; j < imageSizes.length; j++) {
        await upload(
          {
            path: file.id,
            base64File: file.base64,
            width: imageSizes[j].size,
            name: imageSizes[j].name,
          },
          true
        );
      }
    } else {
      await upload({
        path: file.id,
        base64File: file.base64,
        width: 0,
        name: "original",
        ContentType: file.type,
      });
    }
  }
}
