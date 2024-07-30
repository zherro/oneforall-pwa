"use client";
import { Stack } from "@chakra-ui/react";
import FileInput, { ImageViewList } from "@component/FileInput";
import { FileData } from "@supabaseutils/model/FileData";
import { StatusEntity } from "@supabaseutils/model/types/Status.type";
import { getUuid } from "@utils/code/codeUtils";
import { DataManager } from "@utils/memoryDataManager";
import { useEffect, useState } from "react";

const FileUpload = ({ savedFiles = [] }: { savedFiles?: FileData[] }) => {
  const [mainImg, setMainImg] = useState('');
  const [files, setManager] = useState<DataManager<FileData | any>>(
    new DataManager([])
  );

  useEffect(() => {
    console.log(files.data);
  }, [files.data]);

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
        console.log("newFile", newFile);
        files.add(newFile);
        setManager(new DataManager(files.data));
      };
      reader.readAsDataURL(fls[i]);
    }
  };

  const removeFile = (id: string) => {
    files.remove(id);
    setManager(new DataManager(files.getAll()));
  };
  return (
    <>
      <FileInput onChange={(f) => handleImageUpload(f)} />

      <Stack direction={["row"]} spacing={6} flexWrap={"wrap"}>
        {files.data &&
          files.data?.map((file, idx) => (
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
