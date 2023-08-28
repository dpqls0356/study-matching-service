import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import defaultProfileImg from "../../image/defaultProfileImg.png";
const Wrapper  = styled.div`
    padding: 100px 0px 100px 0px;
    display: flex;
    width:100%;
    height: 90%;
    /* height: 100%; -> 이걸 어떻게 할 것인가 -> 헤더를 고정 시키기 ?*/
    /*헤더를 position으로 고정시키기까지함 ->*/
    /*vh로 하게되면 작은 화면에서도 주어진 값만큼의 공간을 가지려해서 헤더부분을 침범 */
    /*%로 하여 남은 화면부분 중 퍼센트로 가져갈 수 있도록 함  */
    align-items: center;
    justify-content: center;
`
const JoinForm = styled.form`  
    height:max-content;
    width: 500px;
    display: flex;
    flex-direction: column;
`
const ProfileImg = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
`
const InputDiv = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`
const Input = styled.input`
    width: 70%;
    height: 30px;
    margin: 10px 0px;
`
const Label = styled.label`
    display: flex;
    align-items: center;
    width: 30%;
    height: 30px;
    margin: 10px 0px;
`
const GenderBtn = styled.div`
    width: 35%;
    height: 30px;
`
const SubmitBtn  = styled.input`
    margin-top:30px ;
    height: 40px;
`
function Join(){
    const [gender,setGender] = useState("");
    const {register,handleSubmit} = useForm();
    const createAccount = (data)=>{
        const {
            username,
            userid,
            password,
            ckpassword,
            email,birth,address
        } = data;
    }
    return (
        <Wrapper>
            <JoinForm onSubmit={handleSubmit(createAccount)}>
                <ProfileImg src={defaultProfileImg}/>
                <Input {...register("img")} id="profile-photo" type="file"/>
                <InputDiv>
                    <Label htmlFor="username">이름</Label>
                    <Input {...register("username")} id="username" type="text" placeholder="이름을 입력하세요" />
                </InputDiv>
                <InputDiv>
                    <Label htmlFor="userid">아이디</Label>
                    <Input {...register("userid")} id="userid" type="text" placeholder="아이디를 입력하세요"/>
                </InputDiv>
                <InputDiv>
                    <Label htmlFor="password">비밀번호</Label>
                    <Input {...register("password")} id="password" type="password" placeholder="비밀번호를 입력하세요" />
                </InputDiv>
                <InputDiv>
                    <Label htmlFor="ckpassword">비밀번호 확인</Label>
                    <Input {...register("ckpassword")} id="ckpassword" type="password" placeholder="비밀번호를 다시 입력해주세요"/>
                </InputDiv>
                <InputDiv>
                    <Label htmlFor="email">이메일</Label>
                    <Input {...register("email")} id="email" type="email" placeholder="이메일을 입력하세요"/>
                </InputDiv>
                <InputDiv>
                    <Label htmlFor="birth">생년월일</Label>
                    <Input {...register("birth")} id="birth" type="date" />
                </InputDiv>
                <InputDiv>
                    <Label>성별</Label>
                    <GenderBtn onClick={()=>setGender("male")}>남</GenderBtn>
                    <GenderBtn onClick={()=>setGender("female")}>여</GenderBtn>
                </InputDiv>
                <InputDiv>
                    <Label htmlFor="address">주소</Label>
                    <Input {...register("address")} id="address" type="text" placeholder="주소를 입력하세요" />
                </InputDiv>
                <SubmitBtn type="submit" value="계정생성"></SubmitBtn>
            </JoinForm>
        </Wrapper>
    )
}

export default Join;