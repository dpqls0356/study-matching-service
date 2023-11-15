import User from "../Models/UserModel.js";

export const joinUser = async (req, res) => {
  const { userid, email, profile } = req.body;
  try {
    const [existingUserId, existingEmail] = await Promise.all([
      User.findOne({ userid }),
      User.findOne({ email }),
    ]); //중복 이메일 아이디 검사를 병렬로 수행
    if (existingUserId) {
      return res
        .status(400)
        .json({ errorpart: "id", message: "이미 존재하는 아이디 입니다." });
    } else if (existingEmail) {
      return res
        .status(400)
        .json({ errorpart: "email", message: "이미 존재하는 이메일입니다." });
    }

    // if (profile) {
    //   imageUploader.single("profile")(req, res, async function (err) {
    //     if (err) {
    //       console.error("Image upload error:", err);
    //       return res.status(500).json({ message: "이미지 업로드 실패" });
    //     }

    //     const { location: profile } = req.file || {}; // S3에서 업로드한 이미지 URL
    //   });
    // }

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
        .json({ errorpart: "id", message: "존재하지않는 아이디입니다." });
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(404).json({
        errorpart: "password",
        message: "비밀번호가 일치하지않습니다.",
      });
    }
    req.session._id = user._id;
    req.session.userid = user.userid;
    req.session.username = user.username;
    res.status(201).json({ message: "로그인 성공" });
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
      const kakaoUser = {
        userid: req.body.data.id,
        img: req.body.data.properties.profile_image,
        email: req.body.data.kakao_account.email,
        username: req.body.data.properties.nickname,
        password: req.body.data.password,
        //생일, 성별 어떻게 받을지 생각
        birth: "2023-11-03",
        gender: "male",
      };

      const newUser = await User.create(kakaoUser);

      return res
        .status(201)
        .json({ message: "카카오 로그인 성공", user: kakaoUser });
    }
  } catch (erorr) {
    return res.status(500).json({ message: "서버오류" });
  }
};

export const googleLogin = async (req, res) => {
  const google_redirect_uri = "http://localhost:8080/oauth2/redirect";
  const { code } = req.query;

  try {
    const response = await axios.post(
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${google_redirect_uri}&grant_type=authorization_code`
    ); //받아온 코드로 access_token 얻어오기

    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json`,
      {
        headers: {
          authorization: `Bearer ${response.data.access_token}`,
        },
      }
    ); //access_token을 바탕으로 유저 정보 얻어오기
    console.log(userInfo);
    const { email, name } = userInfo.data;
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return res
        .status(201)
        .json({ message: "구글 로그인 성공", user: existingUser });
    } else {
      const googleUser = {
        username: name,
        userid: "1231",
        password: "123",
        ckpassword: "123",
        email,
        birth: "2023-11-03",
        address: "a",
        gender: "male",
        img: "defaultProfileImg.png",
      };
      const newUser = await User.create(googleUser);
      return res
        .status(201)
        .json({ message: "구글 로그인 성공", user: googleUser });
    }
    //res.status(201).json({ message: "구글로그인성공" });
    //res.redirect("http://localhost:3000/");
  } catch (error) {
    //에러 처리하기
  }
};

export const userinfo = async (req, res) => {
  console.log("userinfo print");
  console.log("======================");
  console.log(req.session);
  console.log("======================");
  if (!req.session.userid) {
    return res.status(404).json({ message: "해당 유저가 존재하지않습니다." });
  } else {
    //여기서 데이터 값이 제대로 안날아감 그래서 userInfo가 undefined인 상태
    const userinfo = await User.findOne({ userid: req.session.userid });
    return res
      .status(200)
      .json({ userid: userinfo.userid, username: userinfo.username });
  }
};
export const logoutUser = (req, res) => {
  req.session.destroy();
  console.log(req.session);
};

export const editProfile = async (req, res) => {
  //프로필 수정
  try {
    const user = await User.findById(req.session._id);
    const _id = req.session._id;
    const { username, password, profile } = req.body;
    if (password) {
      password = await bcrypt.hash(password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      _id, //_id기반으로 유저 찾아서 업데이트
      {
        username,
        password,
        profile,
      },
      { new: true } //업데이트 된 user 반환
    );
    res.status(200).json({ message: "프로필 수정 성공", user: updateUser });
  } catch (error) {
    res.status(500).json({
      error: "프로필을 수정하는 중에 오류가 발생했습니다. 다시 시도해 주세요",
    });
  }
};
export const getEditUserInfo = async (req, res) => {
  if (req.session.userid) {
    const userdata = await User.findOne({ userid: req.session.userid });
    console.log(userdata);
    const senddata = {
      userid: userdata.userid,
      profileImg: userdata.profile,
      username: userdata.username,
      birth: userdata.birth,
      gender: userdata.gender,
      email: userdata.email,
    };
    return res.status(200).json({ senddata });
  } else {
    return res.status(500).json({ message: "not find user" });
  }
};
