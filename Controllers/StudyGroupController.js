import StudyGroup from "../Models/StudyGroupModel.js";
import User from "../Models/UserModel.js";
import * as errors from "../error.js";

export const createStudyGroup = async (req, res) => {
  console.log(req.body);
  const {
    groupName,
    maxCapacity,
    minAge,
    maxAge,
    isOnline,
    region,
    gender,
    studyCategory,
  } = req.body;

  try {
    const newStudyGroup = await StudyGroup.create({
      masterId: req.session._id,
      groupName,
      isOnline,
      minAge, // min age max age로 수정
      maxAge,
      maxCapacity,
      gender,
      region,
      studyCategory,
    });
    const user = await User.findById(req.session._id);
    // user.studyGroup.push(newStudyGroup._id);
    await user.save();
    res
      .status(201)
      .json({ message: "그룹 생성 성공", studyGroup: newStudyGroup });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errors.SERVER_ERROR_MESSAGE });
  }
};
export const deleteStudyGroup = async (req, res) => {
  try {
    const { groupId } = req.body._id;
    const deleteGroup = await StudyGroup.findByIdAndDelete(groupId);

    if (!deleteGroup) {
      return res.status(404).json({ message: errors.NOT_FOUND_MESSAGE });
    }
    const users = await User.updateMany(
      //해당 스터디 그룹 참조 하는 사용자들의 studyGroup에서 해당 스터디 제거
      { studyGroup: groupId },
      { $pull: { studyGroup: groupId } }
    );
    res.status(200).json({ message: "그룹 삭제 성공" });
  } catch (error) {
    res.status(500).json({ message: errors.SERVER_ERROR_MESSAGE });
  }
};

export const joinStudyGroup = async (req, res) => {
  try {
    const user = req.session._id;
    const { groupId } = req.body._id;

    const studyGroup = await StudyGroup.findById(groupId);

    if (!studyGroup) {
      return res.status(404).json({ message: errors.NOT_FOUND_MESSAGE });
    }
    if (!studyGroup.applicants.includes(user)) {
      //스터디 신청자가 아닐 시에 추가
      studyGroup.applicants.push(user);
      const updatedGroup = await studyGroup.save();
      res
        .status(200)
        .json({ message: "스터디 신청 성공", studyGroup: updatedGroup });
    } else {
      return res.status(400).json({ message: errors.ALREADY_APPLIED_MESSAGE });
    }
  } catch (error) {
    res.status(500).json({ message: errors.SERVER_ERROR_MESSAGE });
  }
};

export const inquiryApplicationList = async (req, res) => {
  try {
    const { groupId } = req.body._id;
    const studyGroup = await StudyGroup.findById(groupId);

    if (!studyGroup) {
      return res.status(404).json({ message: errors.NOT_FOUND_MESSAGE });
    }
    const users = await User.find({ _id: { $in: studyGroup.applicants } }); //applicants배열에 해당하는 모든 유저 검색
    res.status(200).json({ message: "신청자 조회", applicants: users });
  } catch (error) {
    return res.status(500).json({ message: errors.SERVER_ERROR_MESSAGE });
  }
};
export const acceptStudyGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.body;
    const studyGroup = await StudyGroup.findById(groupId);
    if (!studyGroup) {
      return res.status(404).json({ message: errors.NOT_FOUND_MESSAGE });
    }
    if (studyGroup.members.includes(userId)) {
      return res.status(400).json({ message: errors.ALREADY_MEMBER_MESSAGE });
    }

    studyGroup.members.push(userId);
    studyGroup.applicants.pull(userId);
    const updatedGroup = await studyGroup.save();
    res
      .status(200)
      .json({ message: "스터디 참가 허가 하기", studyGroup: updatedGroup });
  } catch (error) {
    return res.status(500).json({ message: errors.SERVER_ERROR_MESSAGE });
  }
};