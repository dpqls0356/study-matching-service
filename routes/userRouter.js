import express from "express";
import {
  editProfile,
  googleLogin,
  joinUser,
  kakaoLoginUser,
  loginUser,
  logoutUser,
  userinfo,
  getEditUserInfo,
} from "../Controllers/UserController.js";
import imageUploader from "../imageUploader.js";

const router = express.Router();

router.post("/join", imageUploader.single("file"), joinUser);
router.post("/login", loginUser);
router.post("/login/kakao", kakaoLoginUser);
router.post("/login/google", googleLogin);
router.post("/editProfile", editProfile);

router.get("/logout", logoutUser);
router.get("/userinfo", userinfo);
router.get("/getEditUserInfo", getEditUserInfo);

export default router;
