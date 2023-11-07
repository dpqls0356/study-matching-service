import User from "../Models/UserModel.js";

export const joinUser = async (req, res) => {
  console.log(req.body);
  const { userid, email } = req.body;
  try {
    // const existingUserId = await User.findOne({ userid });
    // const existingEmail = await User.findOne({ email });
    const [existingUserId, existingEmail] = await Promise.all([
      User.findOne({ userid }),
      User.findOne({ email }),
    ]); //중복 이메일 아이디 검사를 병렬로 수행
    if (existingUserId) {
      return res.status(400).json({ message: "이미 존재하는 아이디 입니다." });
    } else if (existingEmail) {
      return res.status(400).json({ message: "이미 존재하는 이메일입니다." });
    }
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
  // console.log("check", req.body.data.kakao_account.email);
  const email = req.body.data.kakao_account.email;
  const username = req.body.data.kakao_account.profile.nickname;
  try {
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      //카카오나 구글이메일로 회원가입하고 소셜 로그인시 기존 정보로 로그인 시키고 유저 정보를 줌
      return res
        .status(201)
        .json({ message: "카카오 로그인 성공", user: existingUser });
    } else {
      //소셜로그인이 처음 로그인임(회원가입안된상태) 소셜로그인 데이터 db에 저장하기
      console.log(req.body.data.kakao_account.profile.nickname);
      const kakaoUser = {
        //이메일 이름 제외한 값 어떻게 받을지 생각
        username,
        userid: "2233",
        password: "222",
        ckpassword: "222",
        email,
        birth: "2023-11-03",
        address: "a",
        gender: "male",
        img: "defaultProfileImg.png",
      };

      const newUser = await User.create(kakaoUser);
      return res
        .status(201)
        .json({ message: "카카오 로그인 성공", user: kakaoUser });
    }

    //   return res.status(404).json({ error: "회원가입 필요" });
    //   //새로 회원가입 시킴 , email ,username 없는 login창 필요할것 같음
    // }
  } catch (erorr) {
    return res.status(500).json({ message: "서버오류" });
  }
};
export const googleLogin = async (req, res) => {
  console.log("구글로근");

  const google_redirect_uri = "http://localhost:8080/oauth2/redirect";
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${google_redirect_uri}&response_type=code&scope=email profile`;
  console.log(url);

  res.redirect(url);
  //res.status(201).json({ message: "구글 로그인 성공", url });
};
export const googleToken = () => {};
