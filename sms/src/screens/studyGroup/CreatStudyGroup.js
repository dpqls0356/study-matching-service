import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import kakaoLogo from "../../image/logo/kakaoLogo.png";
import googleLogo from "../../image/logo/googleLogo.png";
import { BASE_URL } from "../../api";
import { LoggedInContext,UserContext } from "../../App.js";
const Wrapper = styled.div`
  padding: 100px 0px 100px 0px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;
const GroupCreatForm = styled.form`
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
const Selecter=styled.select`
`
const SubmitBtn = styled.input`
  margin-top: 20px;
  height: 40px;
  border-radius: 30px;
  border: none;
  box-shadow: 4px 5px rgba(0, 0, 0, 0.1);
  background-color: #025d91;
  color: white;
  text-align: center;
`;
function CreatStudyGroup(){
    const {loggedIn,changeLoggedIn} = useContext(LoggedInContext);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    // 나이 select
    const [selectedMaxAge, setSelectedMaxAge] = useState('');
    const [selectedMinAge, setSelectedMinAge] = useState('');
    const numbers = Array.from({ length: 100 }, (_, index) => index + 1);
    const handleMinAgeSelectChange = (event) => {
        setSelectedMinAge(event.target.value);
    };
    const handleMaxAgeSelectChange = (event) => {
        setSelectedMaxAge(event.target.value);
    };
    // 데이터 전송
    const postCreatGroup=()=>{
        
    }
    // select option
    return(
        <Wrapper>
            {loggedIn?
                <GroupCreatForm htmlFor="creatgroupform" onSubmit={postCreatGroup}>
                    <InputDiv>
                        <Label htmlFor="studyname">스터디 이름</Label>
                        <Input 
                        {...register("studyname")}
                        required={true}
                        id="studyname"
                        type="text"
                        placeholder="이름을 입력하세요"
                        ></Input>
                    </InputDiv>
                    
                    <InputDiv>
                        <Label htmlFor="studyage">나이</Label>
                        <Selecter value={selectedMinAge} onChange={handleMinAgeSelectChange}>
                        {numbers.map((number) => (
                        <option key={number} value={number}>
                        {number}
                        </option>
                            ))}
                        </Selecter>
                        <div>~</div>
                        <Selecter value={selectedMaxAge} onChange={handleMaxAgeSelectChange}>
                        {numbers.map((number) => (
                        <option key={number} value={number}>
                        {number}
                        </option>
                            ))}
                        </Selecter>
                    </InputDiv>
                    <InputDiv>
                        <Label htmlFor="regionCategory">지역</Label>
                        <Input 
                        {...register("regionCategory")}
                        required={true}
                        id="regionCategory"
                        type="text"
                        placeholder="지역을 입력하세요"
                        ></Input>
                    </InputDiv>
                    {/* 해시태그로 여러 개(유사한 단어 체크) 받을 수 있도록  */}
                    <InputDiv>
                        <Label htmlFor="studyCategory">스터디</Label>
                        <Input 
                        {...register("studyCategory")}
                        required={true}
                        id="studyCategory"
                        type="text"
                        placeholder="스터디 종류를 입력하세요"
                        ></Input>
                    </InputDiv>
                    <SubmitBtn value="그룹 생성하기"></SubmitBtn>
                </GroupCreatForm>
            :   
            // 생성불가 : 로그인하라고 알리기
                <div></div>
            }
        </Wrapper>
    );
}
export default CreatStudyGroup;