import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import kakaoLogo from "../../image/logo/kakaoLogo.png";
import googleLogo from "../../image/logo/googleLogo.png";
import { BASE_URL } from "../../api";
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

function Login() {
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
        //react에서 세션 유지하는 방법 알아보기이이이~
        navigate("/");
      }
    } catch (error) {
      //여러가지 에러 받아와서 처리하기
      alert(error.response);
    }
  };
  console.log(process.env.REACT_APP_KAKAO_API_KEY);
  const startKakaoLogin = async () => {
    const config = {
      response_type: "code",
      client_id: process.env.REACT_APP_KAKAO_API_KEY,
      redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    };
    const params = new URLSearchParams(config).toString();
    window.location.href = `https://kauth.kakao.com/oauth/authorize?${params}`;
  };

  const postSocialLogin = async (social) => {
    console.log(social);
    if (social === "kakao") {
      startKakaoLogin();
    } else if (social === "google") {
    }

    // try {
    //   const response = await axios.get(`${BASE_URL}/${social}login`);
    //   if (response.status === 201) {
    //     //react에서 세션 유지하는 방법 알아보기이이이~
    //     navigate("/");
    //   }
    // } catch (error) {
    //   //여러가지 에러 받아와서 처리하기
    //   alert(error.response);
    //   console.log(error);
    // }
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
        <Button onClick={() => postSocialLogin("kakao")} bgColor="#FFEB3A">
          <SocialLogo src={kakaoLogo}></SocialLogo>
          <p>카카오로 로그인하기</p>
        </Button>
        <Button onClick={() => postSocialLogin("google")} bgColor="white">
          <SocialLogo src={googleLogo}></SocialLogo>
          <p>구글로 로그인하기</p>
        </Button>
      </LoginForm>
    </Wrapper>
  );
}
export default Login;
