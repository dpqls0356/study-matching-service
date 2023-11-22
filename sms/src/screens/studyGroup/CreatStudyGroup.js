import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import kakaoLogo from "../../image/logo/kakaoLogo.png";
import googleLogo from "../../image/logo/googleLogo.png";
import { BASE_URL } from "../../api";
import { LoggedInContext,UserContext } from "../../App.js";
// 라디오 박스 -- 하나의 값만 선택하고싶을 때 name=""을 넣어 연관성으르 갖도록 해준다.
//          -- type을 radio로 하느냐 checkbox로 하느냐에 따라 디자인이 바뀐다.
//          -- 라디오는 하나만 선택된다고 생각하는데 아니다 .. 여러개 선택 가능하다...
// select 사용법 
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
  height: 60%;
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
const CheckBox = styled.div`
    display: flex;
    width: 50%;
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
    const {register, handleSubmit } = useForm();
    const navigate = useNavigate();
    // 나이 select
    const [selectedMaxAge, setSelectedMaxAge] = useState(1);
    const [selectedMinAge, setSelectedMinAge] = useState(1);
    const [ageError, setAgeError] = useState(false);
    const numbers = Array.from({ length: 100 }, (_, index) => index + 1);
    // 자꾸 나이 비교에서 에러가 나길래 변경된 데이터 값이 바로 반영이 안되나 싶었는데
    // 데이터타입을 int로 안바꾸고 문자열이어서 비교가 제대로 안되던것 ...
    const handleMinAgeSelectChange = (event) => {
        setSelectedMinAge(parseInt(event.target.value));
    };
    const handleMaxAgeSelectChange = (event) => {
        setSelectedMaxAge(parseInt(event.target.value));
    };
    const checkAgeError=()=>{
        if(selectedMaxAge<selectedMinAge&&!ageError){
            setAgeError(!ageError);
        }
        else if(selectedMaxAge>=selectedMinAge&&ageError){
            setAgeError(!ageError);
        }
    }
    useEffect(()=>{
        checkAgeError();
    },[selectedMaxAge,selectedMinAge])


    // 온오프라인 select
    const [online, setOnline] = useState(true);
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
                        <Label htmlFor="studymethod">온오프라인</Label>
                        <CheckBox>
                            <Label>온라인</Label>
                            <Input name="onoffline" type="radio" value="" id="online" onChange={()=>{
                                if(!online){setOnline(!online)};
                            }}></Input>
                        </CheckBox>
                        <CheckBox>
                            <Label>오프라인</Label>
                            <Input name="onoffline" type="radio" value="" id="offline" onChange={()=>{
                                setOnline(()=>(!online));
                            }}></Input>
                        </CheckBox>
                    </InputDiv>
                    <div>
                        {online?
                            null
                            :
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
                        }
                    </div>
                    {ageError?<div>올바르지않는 나이 범위입니다.</div>:null}
                    <InputDiv>
                        <Label htmlFor="studyage">나이</Label>
                        <Selecter form="creatgroupform" value={selectedMinAge} onChange={handleMinAgeSelectChange}>
                        {numbers.map((number) => (
                        <option key={number} value={number}>
                        {number}
                        </option>
                            ))}
                        </Selecter>
                        <div>~</div>
                        <Selecter form="creatgroupform" value={selectedMaxAge} onChange={handleMaxAgeSelectChange}>
                        {numbers.map((number) => (
                        <option key={number} value={number}>
                        {number}
                        </option>
                            ))}
                        </Selecter>
                    </InputDiv>
                    <InputDiv>
                        <Label htmlFor="gender">성별</Label>
                        <CheckBox>
                            <Label>여성</Label>
                            <Input name="gender" type="radio" value="" id="female"></Input>
                        </CheckBox>
                        <CheckBox>
                            <Label>남성</Label>
                            <Input name="gender" type="radio" value="" id="male"></Input>
                        </CheckBox>
                        <CheckBox>
                            <Label>성별무관</Label>
                            <Input name="gender" type="radio" value="" id="either"></Input>
                        </CheckBox>
                    </InputDiv>
                    {/* 해시태그로 여러 개(유사한 단어 체크) 받을 수 있도록  */}
                    <InputDiv>
                        <Label htmlFor="studyCategory">스터디</Label>
                        <Input 
                        {...register("studyCategory")}
                        required={true}
                        id="studyCategory"
                        type="text"
                        placeholder="스터디 종류를 입력하세요( #토익 #토익스터디 )"
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