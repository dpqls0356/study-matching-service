import "dotenv/config";
import express from "express";
import cors from "cors";
import "./db.js";
import {
  finishKakaoLogin,
  joinUser,
  loginUser,
  startKakaoLogin,
} from "./Controllers/UserController.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // 허용할 도메인 주소
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // 허용할 HTTP 메서드
    credentials: true, // 인증 정보 허용 여부
  })
);

app.post("/join", joinUser);
app.post("/login", loginUser);
app.get("/kakaologin", startKakaoLogin);
app.get("/checkKakaoLogin", finishKakaoLogin);

const handleServer = () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
};

app.listen(PORT, handleServer);
