import "dotenv/config";
import express from "express";
import cors from "cors";
import "./db.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

const handleServer = () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
};

app.listen(PORT, handleServer);
