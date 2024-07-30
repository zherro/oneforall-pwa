import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Box from "./Box";
import Divider from "./Divider";
import { Button } from "./buttons";
import Typography, { H5, Small } from "./Typography";
import { getUuid } from "@utils/code/codeUtils";
import { StatusEntity } from "@supabaseutils/model/types/Status.type";
import ObjectUtils from "@utils/helpers/Object.utils";
import { FileData } from "@supabaseutils/model/FileData";

export interface DropZoneProps {
  onlyImage?: boolean;
  multiple?: boolean;
  maxFiles?: number;
  onChange?: (files: any) => void;
}

const extImg = { "image/*": [".png", ".jpeg", ".jpg", ".gif"] };
const extPdf = { "application/pdf": [".pdf"] };

const DropZone: React.FC<DropZoneProps> = ({
  onChange,
  maxFiles = 10,
  multiple = true,
  onlyImage = false,
}: DropZoneProps) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    if (onChange) onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    multiple,
    accept: { ...extImg, ...(onlyImage ? {} : extPdf) },
  });

  return (
    <Box
      display="flex"
      minHeight="200px"
      alignItems="center"
      border="1px dashed"
      borderRadius="10px"
      flexDirection="column"
      borderColor="gray.400"
      justifyContent="center"
      bg={isDragActive ? "gray.200" : ""}
      transition="all 250ms ease-in-out"
      style={{ outline: "none" }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <H5 mb="18px" color="text.muted">
        Arraste uma imagem
      </H5>

      <Divider width="200px" mx="auto" />
      <Typography
        px="1rem"
        mb="18px"
        mt="-10px"
        lineHeight="1"
        color="text.muted"
        bg={isDragActive ? "gray.200" : "body.paper"}
      >
        ou
      </Typography>

      <Button
        color="primary"
        bg="primary.light"
        px="2rem"
        mb="22px"
        type="button"
      >
        Selecionar arquivos
      </Button>

      {/* <Small color="text.muted">Upload 280*280 image</Small> */}
    </Box>
  );
};

export default DropZone;
