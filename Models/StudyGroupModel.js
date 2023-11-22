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
  ageCategroy: { type: Number }, // min age max age로 수정
  regionCategroy: { type: String },
  studyCategroy: { type: String },
  maxCapacity: { type: Number, required: true },
  //calenderId 추후에 추가
});

const StudyGroup = mongoose.model("StudyGroup", studyGroupSchema);
export default StudyGroup;
