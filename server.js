import "dotenv/config";
import MongoStore from "connect-mongo";
import express from "express";
import cors from "cors";
import "./db.js";
import {
  userinfo,
  googleLogin,
  joinUser,
  kakaoLoginUser,
  loginUser,
  logoutUser,
  getEditUserInfo
} from "./Controllers/UserController.js";
import session from "express-session";
import { localsMiddleware } from "./middleware.js";
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
app.use(session({
  secret:"sssss",
  resave:false,
  saveUninitialized:false,
  store:MongoStore.create({
      mongoUrl:process.env.DB_URL
  }),
  cookie:{maxAge:(3.6e+6)*24}
}))
// app.use((req,res,next)=>{
//       req.sessionStore.all((error,sessions)=>{
//           console.log(sessions);
//           next();
//       })
//   });
  

app.use(localsMiddleware);
app.post("/join", joinUser);
app.post("/login", loginUser);
app.post("/login/kakao", kakaoLoginUser);
app.get("/oauth2/redirect", googleLogin);
app.get("/logout",logoutUser);
app.get("/userinfo",userinfo);
app.get("/user/getEditUserInfo",getEditUserInfo);
const handleServer = () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
};

app.listen(PORT, handleServer);
