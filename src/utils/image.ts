// const imageSizes = [
//   { size: 120, name: "mini" },
//   { size: 400, name: "resume" },
//   { size: 600, name: "medium" },
// ];

import Objects from "./helpers/Object.utils";
import StringUtils from "./helpers/String.utils";

type UuidArray = string[];
type ObjectArray = { isMain: boolean; path: string }[];

const noImage = "/assets/images/no-image-opmized.png";
// const dummyimage = "https://dummyimage.com/600x400/dedede/333&text=IMG";

export default class ImageUtils {
  static getMini(bucket_id) {
    return StringUtils.isEmpty(bucket_id)
      ? noImage
      : `${process.env.S3_BUKET_URI}${bucket_id}/mini.webp`;
  }

  static getResume(bucket_id) {
    return StringUtils.isEmpty(bucket_id)
      ? noImage
      : `${process.env.S3_BUKET_URI}${bucket_id}/resume.webp`;
  }

  static getMediun(bucket_id) {
    return StringUtils.isEmpty(bucket_id)
      ? noImage
      : `${process.env.S3_BUKET_URI}${bucket_id}/medium.webp`;
  }

  static processImages(
    input: UuidArray | ObjectArray,
    img: string = "mini"
  ): string[] {
    const resultMap: string[] = [];

    if (Objects.isNull(input) || input.length <= 0) {
      return [];
    }

    try {
      if (Array.isArray(input) && typeof input[0] === "string") {
        // Input is of type UuidArray
        input.forEach((uuid, index) => {
          resultMap.push(`${process.env.S3_BUKET_URI}${uuid}/${img}.webp`);
        });
      } else if (Array.isArray(input) && typeof input[0] === "object") {
        // Input is of type ObjectArray
        (input as ObjectArray).forEach((item) => {
          resultMap.push(`${process.env.S3_BUKET_URI}${item.path}/${img}.webp`);
        });
      } else {
        return [];
      }
    } catch (error_: any) {
      return [];
    }

    return resultMap;
  }
}
