import User from "../Models/UserModel.js";

export const joinUser = async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ message: "회원가입 성공", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "회원가입 실패" });
  }
};

export const loginUser = async (req, res) => {
  const { userid, password } = req.body;
  try {
    if (!userid || !password) {
      return res
        .status(400)
        .json({ message: "요청 형식이 올바르지 않습니다." });
    }
    const user = await User.findOne({ userid });
    if (!user)
      return res
        .status(401)
        .json({ message: "사용자 정보가 올바르지 않습니다." });
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status().json({ message: "사용자 정보가 올바르지 않습니다." });
    }
    res.status(200).json({ message: "로그인 성공", user: user });
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
};

export const kakaoLoginUser = async (req, res) => {
  console.log("check", req.body);
  try {
    res.status(201).json({ message: "카카오 로그인 성공" });
  } catch (erorr) {
    return res.status(500).json({ message: "서버오류" });
  }
};

//console.log("dd", data);
