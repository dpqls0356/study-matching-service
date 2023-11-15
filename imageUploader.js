import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";

AWS.config.update({
  region: "ap-northeast-2",
  accessKeyId: process.env.AMAZON_ACCESS,
  secretAccessKey: process.env.AMAZON_ACCESS_SECRET,
});
const s3 = new AWS.S3();

const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: "smsimage",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, callback) => {
      //const uploadDirectory = "images";
      console.log("s3", req);
      callback(null, `${Date.now()}_${file.originalname}`);
    },
    acl: "public-read-write",
  }),
});

export default imageUploader;
