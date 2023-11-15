import express from "express";
import {
  editProfile,
  googleLogin,
  joinUser,
  kakaoLoginUser,
  loginUser,
  logoutUser,
  userinfo,
} from "../Controllers/UserController.js";
import imageUploader from "../imageUplodaer.js";

const router = express.Router();

router.post("/join", imageUploader.single("images"), joinUser);
router.post("/login", loginUser);
router.post("/login/kakao", kakaoLoginUser);
router.post("/editProfile", editProfile);

router.get("/logout", logoutUser);
router.get("/userinfo", userinfo);
router.get("/oauth2/redirect", googleLogin);
//router.post()

export default router;
