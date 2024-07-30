import { createClient } from "@supabaseutils/utils/server";
import { LOG } from "@utils/log";
import { type NextRequest } from "next/server";
import sharp from "sharp";
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { FileData } from "@supabaseutils/model/FileData";
import ObjectUtils from "@utils/helpers/Object.utils";
import { StatusEntity } from "@supabaseutils/model/types/Status.type";
import httpResponse from "@utils/http/HttpResponse";
import FileDataRepository from "@supabaseutils/repositories/FileData.repository";
import { UserData } from "@supabaseutils/model/user/UserData";
import SessionUtils from "@supabaseutils/session";

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
        quality: 80, // Ajusta a qualidade para um equilíbrio entre tamanho do arquivo e qualidade da imagem
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

async function upload({ path, base64Image, width, name }, optimize = false) {
  // Converter a string Base64 em um buffer
  const buffer = Buffer.from(handleBase64ToBuffer(base64Image), "base64");

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
    ContentType: "image/webp",
  };

  const command = new PutObjectCommand(uploadParams);
  const data = await s3Client.send(command);
}

const useUserVerify = (
  user: UserData | any,
 matchs: { type: ""; value: any }[] = []
) => {
    let result = true;
    for (let i = 0; i < matchs.length; i++) {
        switch (matchs[i].type) {
            case '':
                
                break;
        
            default:
                break;
        }
    }
    return result;
};

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();

    const repository = new FileDataRepository();

    // Parse the JSON body
    const files: FileData[] = await request.json();
    const user = new SessionUtils(await repository.getUser());
    (user.isAuthenticated());

    // const filesIds = await uploadFiles(files, supabase);

    return httpResponse.accepted();
  } catch (error) {
    LOG.error("Error processing request:", error);

    // Return an error response
    return httpResponse.error;
  }
}

const imageSizes = [
  { size: 140, name: "mini" },
  { size: 400, name: "resume" },
  { size: 750, name: "medium" },
];

async function uploadFiles(files: FileData[], supabase) {
  const images: any[] = [];

  if (ObjectUtils.nonNull(files) && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const updateOnly = ObjectUtils.nonNull(files[i].id);
      if (updateOnly && StatusEntity.NEW_REGISTRY != files[i].status) {
        images.push({ isMain: false, path: files[i].id });
        continue;
      } else if (StatusEntity.NEW_REGISTRY == files[i].status) {
        files[i].status = StatusEntity.ACTIVE;
        files[i].id = undefined;
      }

      const { data, error } = await supabase
        .from("data_bucket")
        .upsert(files[i])
        .select("id");

      if (error) throw error;

      await upload({
        path: data[0].id,
        base64Image: files[i].base64,
        width: 100,
        name: "original",
      });

      for (let j = 0; j < imageSizes.length; j++) {
        await upload(
          {
            path: data[0].id,
            base64Image: files[i].base64,
            width: imageSizes[j].size,
            name: imageSizes[j].name,
          },
          true
        );
      }

      images.push({ isMain: false, path: data[0].id });
    }
  }
  return images;
}
