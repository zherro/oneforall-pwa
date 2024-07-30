"use client";
import { Stack } from "@chakra-ui/react";
import Box from "@component/Box";
import FileInput, { ImageViewList } from "@component/FileInput";
import { FileData } from "@supabaseutils/model/FileData";
import { StatusEntity } from "@supabaseutils/model/types/Status.type";
import { getUuid } from "@utils/code/codeUtils";
import { DataManager } from "@utils/memoryDataManager";
import { useState } from "react";

const FileUpload = ({
  savedFiles,
  onSelect,
}: {
  savedFiles: FileData[] | any[];
  onSelect: Function;
}) => {
  const [mainImg, setMainImg] = useState("");
  const [manager, setManager] = useState<DataManager<FileData | any>>(
    new DataManager(savedFiles || [])
  );

  const handleImageUpload = (fls) => {
    for (let i = 0; i < fls.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newFile: FileData = {
          id: getUuid(),
          status: StatusEntity.NEW_REGISTRY,
          file_path: "",
          extension: fls[i]?.extension,
          type: fls[i]?.type,
          name: fls[i]?.name,
          simple_name: fls[i]?.simpleName,
          size: fls[i]?.size,
          base64: reader.result,
        };
        manager.add(newFile);
        onSelect(manager.getAll());
        setManager(new DataManager(manager.data));
      };
      reader.readAsDataURL(fls[i]);
    }
  };

  const removeFile = (id: string) => {
    manager.remove(id);
    onSelect(manager.getAll());
    setManager(new DataManager(manager.getAll()));
  };
  return (
    <>
      <Box shadow={4}>
        <FileInput onChange={(f) => handleImageUpload(f)} />
      </Box>

      <Stack mt="2rem" direction={["row"]} spacing={6} flexWrap={"wrap"}>
        {manager.data &&
          manager.data?.map((file, idx) => (
            <ImageViewList
              mainFile={mainImg == file.id}
              removeFile={(id) => removeFile(id)}
              setCapFile={(id) => setMainImg(id)}
              key={idx}
              file={file}
            />
          ))}
      </Stack>
    </>
  );
};

export default FileUpload;
