import "dotenv/config";
import express from "express";
import cors from "cors";
import "./db.js";
import { joinUser, loginUser } from "./Controllers/UserController.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.post("/join", joinUser);
app.post("/login", loginUser);

const handleServer = () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
};

app.listen(PORT, handleServer);
