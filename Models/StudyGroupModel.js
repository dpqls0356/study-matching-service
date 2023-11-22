import mongoose from "mongoose";

const studyGroupSchema = mongoose.Schema({
  masterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  groupName: { type: String, required: true },
  //ChatRoomId 추후에 추가
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  // min age max age로 수정
  isOnline: { type: Boolean, required: true },
  minAge: { type: Number },
  maxAge: { type: Number },
  region: { type: String },
  gender: { type: String, required: true },
  studyCategory: { type: String, required: true },
  maxCapacity: { type: Number, required: true },
  //calenderId 추후에 추가
});

const StudyGroup = mongoose.model("StudyGroup", studyGroupSchema);
export default StudyGroup;