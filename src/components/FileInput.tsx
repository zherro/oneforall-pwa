import Link from "next/link";
import { Stack } from "@chakra-ui/react";
import Icon from "./icon/Icon";
import Typography, { H3, SemiSpan } from "./Typography";
import DropZone from "./DropZone";
import Box from "./Box";
import Image from "./Image";
import ViewImage from "./modal/ViewImage";
import { useCallback, useState } from "react";
import { Button, IconButton } from "./buttons";
import styled from "styled-components";

interface FileInputProps {
  icon?: string;
  title?: string;
  setFiles?: any;
  onChange?: any;
}

const FileInput = ({ icon, title, onChange }: FileInputProps) => {
  return (
    <>
      <Link href="#">
        <Stack direction={["column", "row"]}>
          {icon && (
            <Icon color="primary" mt="0.35rem" size="1.55rem">
              {icon}
            </Icon>
          )}
          {title && <H3 marginBottom="0.5rem">{title}</H3>}
        </Stack>
        <DropZone onChange={(f) => onChange(f)} />
      </Link>
    </>
  );
};

export const ImageView = ({ file }: { file: any }) => {
  const Wrapper = styled(Box)`
    width: 100%;

    @media (min-width: 768px) {
    }
  `;

  return (
    <>
      {JSON.stringify(file)}
      <Wrapper>
        <Box
          pb="10px"
          style={{
            maxWidth: "140px",
            width: "100%",
          }}
        >
          {(file?.id == null || file?.id == undefined) && (
            <Image src={URL.createObjectURL(file)} />
          )}
          {(file?.id != null || file?.id != undefined) && (
            <Image src={decodeURIComponent(file.base64)} />
          )}
        </Box>
        <Box
          pb="10px"
          style={{
            borderBottom: "1px solid #cdcdcd",
            width: "100%",
          }}
        >
          <Box>
            <Typography
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "clip",
              }}
            >
              {file.name}
            </Typography>
          </Box>
          <Box>
            <Box style={{ float: "left", width: "50%" }}>
              <SemiSpan>{file.type}</SemiSpan>
            </Box>
            <Box style={{ float: "left" }}>
              <SemiSpan>{file.size / 1000} KB</SemiSpan>
            </Box>
          </Box>
        </Box>
      </Wrapper>
    </>
  );
};

const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const FileWrapper = styled(Box)`
  width: 240px;
  float: right;
  max-width: 240px;
  overflow: hidden;
  .img {
    overflow: hidden;
    max-width: 250px;
    max-height: 135px;
  }
  img {
    width: 100%;
  }
`;

export const ImageViewList = ({
  file,
  removeFile,
  setCapFile,
  mainFile,
}: {
  file: any;
  removeFile: any;
  setCapFile: any;
  mainFile: boolean;
}) => {
  const [open, onOpen] = useState(false);
  const [image, setImage] = useState("");

  const isnew = useCallback(
    (file) => file?.id == null || file?.id == undefined,
    []
  );

  const getImage = (file) => {
    if (isnew(file)) return toBase64(file);

    if (file?.id != null || file?.id != undefined)
      return decodeURIComponent(file?.base64);
  };

  const view = useCallback((image) => {
    onOpen(true);
    setImage(image);
  }, []);

  return (
    <>
      <ViewImage
        open={open}
        image={image}
        onClose={() => {
          onOpen(false);
        }}
      />
      <FileWrapper>
        <Box
          height="120px"
          className="eye-box img"
          pb="10px"
          onClick={() => view(file?.base64)}
        >
          <Image src={file?.base64} />
          <Icon className="eye-box-icon" p="1rem">
            eye
          </Icon>
        </Box>
        <Box
          mt="1rem"
          pb="10px"
          px="0.5rem"
          style={{
            border: "1px solid #cdcdcd",
            borderRadius: "8px",
            width: "100%",
          }}
        >
          <Stack direction={["row"]} spacing={4} mt="0.75rem" mb="0.75rem">
            <Button
              padding="0.5rem"
              borderRadius="8px"
              border="1px solid"
              borderColor="error"
              onClick={(e) => {
                e.preventDefault();
                removeFile(file.id);
              }}
              type="button"
              color="error.main"
              style={{ float: "left", height: "38px" }}
              m="0"
            >
              <Icon size="1.25rem">fa/solid/trash-can</Icon>
            </Button>
            <IconButton
              padding="0.5rem"
              borderRadius="8px"
              border="1px solid"
              borderColor="error"
              onClick={(e) => {
                e.preventDefault();
                setCapFile(file.id);
              }}
              color={mainFile ? "success.main" : ""}
              type="button"
              style={{ float: "left", height: "38px" }}
              m="0"
            >
              Definir como Principal
            </IconButton>
          </Stack>
          {/* <Box>
            <Typography
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "clip",
              }}
            >
              {file.name}
            </Typography>
          </Box> */}
          <Stack direction="row">
            <Box style={{ float: "left", width: "50%" }}>
              <SemiSpan>{file.type}</SemiSpan>
            </Box>
            <Box style={{ float: "left" }}>
              <SemiSpan>{file.size / 1000} KB</SemiSpan>
            </Box>
          </Stack>
        </Box>
      </FileWrapper>
    </>
  );
};

export default FileInput;
