//import AWS from "aws-sdk";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AMAZON_ACCESS,
    secretAccessKey: process.env.AMAZON_ACCESS_SECRET,
  },
  region: "ap-northeast-2",
});
const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: "image-sms",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, callback) => {
      callback(null, `${Date.now()}_${file.originalname}`);
    },
    acl: "public-read",
  }),
});

export default imageUploader;
