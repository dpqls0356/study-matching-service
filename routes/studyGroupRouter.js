import express from "express";
import {
  acceptStudyGroup,
  createStudyGroup,
  inquiryApplicationList,
  joinStudyGroup,
  searchStudyGroup,
  viewMyGroup,
} from "../Controllers/StudyGroupController.js";

const router = express.Router();

router.get("/view", viewMyGroup);
router.get("/search", searchStudyGroup);

router.post("/create", createStudyGroup);
router.post("/join", joinStudyGroup);
router.post("/inquiry", inquiryApplicationList);
router.post("/acceptUser", acceptStudyGroup);
export default router;
