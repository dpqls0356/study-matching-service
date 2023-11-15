import express from "express";
import { createStudyGroup } from "../Controllers/StudyGroupController.js";

const router = express.Router();

router.post("/create", createStudyGroup);

export default router;
