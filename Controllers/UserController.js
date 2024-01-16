import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
//import downloadImage from "../imageDownload.js";
export const joinUser = async (req, res) => {
  const { userid, email, gender } = req.body;
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
    if (req.file) {
      //회원가입시 사진 선택한 경우
      const newImgUser = await User.create({
        ...req.body,
        profileImg: req.file.key,
      });
      return res
        .status(201)
        .json({ message: "회원가입 성공", user: newImgUser });
    } else {
      //회원가입 시 사진 선택 안한 경우
      const defaultImgUser = await User.create(req.body);

      return res
        .status(201)
        .json({ message: "회원가입 성공", user: defaultImgUser });
    }
  } catch (error) {
    res.status(500).json({ message: "서버 에러" });
  }
};

export const loginUser = async (req, res) => {
  const { userid, password } = req.body;

  try {
    if (!userid || !password) {
      return res
        .status(400)
        .json({ message: "아이디나 비밀번호 값을 입력해주세요" });
    }
    const user = await User.findOne({ userid });
    if (!user)
      return res
        .status(404)
        .json({ errorpart: "id", message: "존재하지않는 아이디입니다." });
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(404).json({
        errorpart: "password",
        message: "비밀번호가 일치하지않습니다.",
      });
    }
    //세션 추가하기
    req.session._id = user._id;
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
      req.session._id = existingUser._id;
      req.session.username = existingUser.username;
      //카카오나 구글이메일로 회원가입하고 소셜 로그인시 기존 정보로 로그인 시키고 유저 정보를 줌
      return res
        .status(201)
        .json({ message: "카카오 로그인 성공", user: existingUser });
    } else {
      //소셜로그인이 처음 로그인임(회원가입안된상태) 소셜로그인 데이터 db에 저장하기
      const password = await bcrypt.hash(new Date().toString(), 10);
      const kakaoUser = {
        userid: req.body.data.id,
        profileImg: req.body.data.properties.profile_image,
        email,
        username,
        password,
        //생일, 성별 어떻게 받을지 생각
        birth: "2023-11-03",
        gender: "male",
      };

      const newUser = await User.create(kakaoUser);
      //newUser에 user의 _id가 없어서 existingUser를 DB로부터 받아옴
      const existingUser = await User.findOne({
        userid:newUser.userid,
      });
      req.session._id = existingUser._id;
      req.session.username = existingUser.username;
      return res
        .status(201)
        .json({ message: "카카오 로그인 성공",username:existingUser.username});
    }
  } catch (error) {
    return res.status(500).json({ message: "서버오류" });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { email, id } = req.body;
    const existingUser = await User.findOne({
      email,
    });
    
    if (existingUser) {
      req.session._id = existingUser._id;
      req.session.username = existingUser.username;
      return res
        .status(201)
        .json({ message: "구글 로그인 성공", user: existingUser });
    } else {
      const password = await bcrypt.hash(new Date().toString(), 10);
      const googleUser = {
        username: "a12312",
        userid: id,
        password,
        email,
        birth: "2023-11-03",
        gender: "male",
        profileImg: "defaultProfileImg.png",
      };
      const newUser = await User.create(googleUser);
      req.session._id = newUser._id;
      req.session.username = newUser.username;
      return res
        .status(201)
        .json({ message: "구글 로그인 성공", user: googleUser });
    }
  } catch (error) {
    //에러 처리하기
    return res.status(500).json({ message: "서버 에러" });
  }
};

export const userinfo = async (req, res) => {
  if (!req.session._id) {
    return res.status(404).json({ message: "해당 유저가 존재하지않습니다." });
  } else {
    //여기서 데이터 값이 제대로 안날아감 그래서 userInfo가 undefined인 상태
    const userinfo = await User.findOne({ _id: req.session._id });
    return res
      .status(200)
      .json({ _id: userinfo._id, username: userinfo.username });
  }
};
export const logoutUser = async(req, res) => {
  var session = req.session;
  console.log("-----------logout session---------------");
  req.session.destroy();
  res.status(200).json({});
};

export const editProfile = async (req, res) => {
  //프로필 수정
  try {
    //const user = await User.findById(req.session._id);
    const _id = req.session._id;
    let { username, password, profileImg } = req.body;
    if (password) {
      password = await bcrypt.hash(password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      _id, //_id기반으로 유저 찾아서 업데이트
      {
        username,
        password,
        profileImg,
      },
      { new: true } //업데이트 된 user 반환
    );
    req.session.username = username;
    res.status(200).json({ message: "프로필 수정 성공", user: updateUser });
  } catch (error) {
    res.status(500).json({
      error: "프로필을 수정하는 중에 오류가 발생했습니다. 다시 시도해 주세요",
    });
  }
};
export const getEditUserInfo = async (req, res) => {
  if (req.session._id) {
    const senddata = await User.findOne({ _id: req.session._id });

    return res.status(200).json({ senddata });
  } else {
    return res.status(500).json({ message: "not find user" });
  }
};
