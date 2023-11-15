import mongoose from "mongoose";

const studyGroupSchema = mongoose.Schema({
  masterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  groupName: { type: String, required: true },
  //ChatRoomId 추후에 추가
  member: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  applicant: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  category: [{ type: String, default: [] }],
  maxCapacity: { type: Number, required: true },
  //calenderId 추후에 추가
});

const StudyGroup = mongoose.model("StudyGroup", studyGroupSchema);
export default StudyGroup;
