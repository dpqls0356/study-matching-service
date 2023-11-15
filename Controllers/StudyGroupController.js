import StudyGroup from "../Models/StudyGroupModel.js";
import User from "../Models/UserModel.js";

export const createStudyGroup = async (req, res) => {
  console.log(req.body);
  const { username } = req.body;
  const user = await User.findOne({ username });

  //기존데이터 포함해서  applicant 이런거 어떻게 깔끔하게 넣을지 생각해보기
  const newStudyGroup = await StudyGroup.create({
    masterId: req.session._id,
    groupName: "good",
    maxCapacity: 5,
  });
  res
    .status(201)
    .json({ message: "그룹 생성 성공", studyGroup: newStudyGroup });
};
export const deleteStudyGroup = async (req, res) => {};
