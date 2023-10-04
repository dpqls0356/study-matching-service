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
export const startKakaoLogin = async (req, res) => {
  const config = {
    response_type: "code",
    client_id: process.env.KAKAO_API_KEY,
    redirect_uri: process.env.KAKAO_REDIRECT_URI,
  };
  const params = new URLSearchParams(config).toString();
  const baseUrl = `https://kauth.kakao.com/oauth/authorize?${params}`;
  return res.redirect(baseUrl);
};
export const finishKakaoLogin = async (req, res) => {
  console.log(1);
  const config = {
    grant_type: "authorization_code",
    code: req.query.code,
    client_id: process.env.KAKAO_API_KEY,
    redirect_uri: process.env.KAKAO_REDIRECT_URI,
    client_secret: process.env.KAKAO_CLIENT_SECRET,
  };
  const params = new URLSearchParams(config).toString();
  const baseUrl = `https://kauth.kakao.com/oauth/authorize?${params}`;

  const json = await (
    await fetch(baseUrl, {
      method: "POST",
    })
  ).json();

  const { access_token } = json;

  const data = await (
    await fetch(`https://kapi.kakao.com/v2/user/me`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
  ).json();

  console.log(data);
};
