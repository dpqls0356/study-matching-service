import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  userid: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birth: { type: Date, required: true },
  gender: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  profileImg: { type: String },
  studyGroup: [{ type: mongoose.Schema.Types.ObjectId, ref: "StudyGroup" }],
});
userSchema.pre("save", async function () {
  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    throw new Error("비밀번호 해시 생성 오류");
  }
});
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error("비밀번호 비교 오류");
  }
};

const User = mongoose.model("User", userSchema);
export default User;
