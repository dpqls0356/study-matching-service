import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import kakaoLogo from "../../image/logo/kakaoLogo.png";
import googleLogo from "../../image/logo/googleLogo.png";
import { BASE_URL } from "../../api";
import { AppContext } from "../../App";
const Wrapper = styled.div`
  padding: 100px 0px 100px 0px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;
const LoginForm = styled.div`
  height: 50%;
  width: 500px;
  display: flex;
  flex-direction: column;
`;
const InputDiv = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  width: 70%;
  height: 30px;
  margin: 10px 0px;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  width: 30%;
  height: 30px;
  margin: 10px 0px;
`;
const SubmitBtn = styled.input`
  margin-top: 20px;
  height: 40px;
  border-radius: 30px;
  border: none;
  box-shadow: 4px 5px rgba(0, 0, 0, 0.1);
  background-color: #025d91;
  color: white;
`;
const Button = styled.button`
  background-color: ${(props) => props.bgColor};
  border: none;
  border-radius: 30px;
  box-shadow: 4px 5px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width: 500px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SocialLogo = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;
const Link = styled.a`
color: black;
text-decoration: none;
`;

function Login() {
  const  {loggedIn,changeLoggedIn} = useContext(AppContext);
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI }&response_type=code`;
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const postJoin = async (data) => {
    const { userid, password } = data;
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        userid,
        password,
      });
      if (response.status === 201) {
        changeLoggedIn(true);
        // login이 가능하기에 login 상태를 true로 변경하기
        // 유저 정보 요청하기 get
        // 서버 : req.session에 session에 userid가 있으면 유저 정보를 res에 담아 보내기
        // 데이터가 있으면 해당 데이터로 유저 상태 벼경
        navigate("/");
      }
    } catch (error) {
      //여러가지 에러 받아와서 처리하기
      alert(error.response);
    }
  };

  return (
    <Wrapper>
      
      <LoginForm onSubmit={handleSubmit(postJoin)}>
        <InputDiv>
          <Label htmlFor="userid">아이디</Label>
          <Input
            {...register("userid")}
            required={true}
            id="userid"
            type="text"
            placeholder="아이디를 입력하세요"
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            {...register("password")}
            required={true}
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
          />
        </InputDiv>
        <SubmitBtn type="submit" value="로그인"></SubmitBtn>
        <Button bgColor="#FFEB3A">
          <SocialLogo src={kakaoLogo}></SocialLogo>
          <Link href={KAKAO_AUTH_URL}>카카오로 로그인하기</Link>
        </Button>
        <Button bgColor="white">
          <SocialLogo src={googleLogo}></SocialLogo>
          <p>구글로 로그인하기</p>
        </Button>
      </LoginForm>
    </Wrapper>
  );
}
export default Login;

