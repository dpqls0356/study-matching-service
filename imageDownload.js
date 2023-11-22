import fs from "fs";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AMAZON_ACCESS,
    secretAccessKey: process.env.AMAZON_ACCESS_SECRET,
  },
  region: "ap-northeast-2",
});

const downloadImage = async (key, localFilePath) => {
  try {
    const command = new GetObjectCommand({
      Bucket: "image-sms",
      Key: key,
    });
    const { Body } = await s3.send(command);
    //const bufferData = Buffer.from(Body);

    fs.writeFileSync(localFilePath, Body);

    console.log(`Image downloaded to ${localFilePath}`);
  } catch (error) {
    console.error("Error downloading image:", error);
  }
};
//이게 필요한가 생각해보기
export default downloadImage;
