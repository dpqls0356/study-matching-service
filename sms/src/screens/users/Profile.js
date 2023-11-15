import { useContext,useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import defaultProfileImg from "../../image/defaultProfileImg.png";
import { BASE_URL } from "../../api.js";
import { LoggedInContext, UserContext } from "../../App.js";
const Wrapper = styled.div`
  padding: 30px 100px 0px;
  width: 100%;
  height: 90%;
  /* height: 100%; -> 이걸 어떻게 할 것인가 -> 헤더를 고정 시키기 ?*/
  /*헤더를 position으로 고정시키기까지함 ->*/
  /*vh로 하게되면 작은 화면에서도 주어진 값만큼의 공간을 가지려해서 헤더부분을 침범 */
  /*%로 하여 남은 화면부분 중 퍼센트로 가져갈 수 있도록 함  */
`;
// 어떤 데이터를 공개할지 정하기 
const InfoWrapper=styled.div`
    height: 100%;
    width: 100%;
`
const Userinfo =styled.div`
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
`
const Userinfoname = styled.div`
    font-size: 20px;
    margin-bottom: 50px;
`
const UserinfoImg = styled.img`
  width: 110px;
  height: 100px;
  border-radius: 50%;
  margin-top:30px;
  margin-bottom: 10px;
`
const EditProfileBtn = styled.button`
    border: none;
    background-color: rgba(0,0,0,0);
    font-size: 15px;
`
const Groupinfo = styled.div`
    height: 50%;
`
// edit form
const EditForm = styled.form`
`
const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;
const InputDiv = styled.div`
  height: 100%;
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
const GenderBtn = styled.div`
  width: 35%;
  height: 30px;
`;
const SubmitBtn = styled.input`
  margin-top: 30px;
  height: 40px;
`;

function Profile(){
    // const {loggedIn,changeLoggedIn} = useContext(LoggedInContext);
    const {user,changeUser} = useContext(UserContext);
    const [edit, setEdit] = useState(false);
    const [userdata,setUserData] = useState();
    const {register,handleSubmit} = useForm();
    // 수정 데이터 보내는 함수
    const eidtProfile =(data)=>{
    }
    // 유저 데이터 가져오는 함수
    const getUserData = async()=>{
        try{
            const response = await axios(`${BASE_URL}/user/getEditUserInfo`,{
                withCredentials: true
            });
            setUserData(response.data.senddata);
        }
        catch(e){

        }
    }
    useEffect(()=>{
        setEdit(false);
        getUserData();
    },[]);
    return (
        <Wrapper>
            {edit?
                <EditForm onSubmit={handleSubmit(eidtProfile)}>
                    <ProfileImg src={defaultProfileImg} />
                    <Input {...register("img")} id="profilePhoto" type="file" />
                    <InputDiv>
                    <Label htmlFor="username">이름</Label>
                    <Input
                        {...register("username")}
                        required={true}
                        id="username"
                        type="text"
                        placeholder="이름을 입력하세요"
                    />
                    </InputDiv>
                    {/* {idError ? <Error>이미 존재하는 아이디입니다.</Error> : null} */}
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
                    {/* {passwordError ? (
                    <Error>비밀번호가 일치하지않습니다. 다시 입력하세요</Error>
                    ) : null} */}
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
                    <InputDiv>
                    <Label htmlFor="ckpassword">비밀번호 확인</Label>
                    <Input
                        {...register("ckpassword")}
                        required={true}
                        id="ckpassword"
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요"
                    />
                    </InputDiv>
                    {/* {emailError ? <Error>이미 존재하는 이메일입니다.</Error> : null} */}
                    <InputDiv>
                    <Label htmlFor="email">이메일</Label>
                    <Input
                        {...register("email")}
                        required={true}
                        id="email"
                        type="email"
                        placeholder="이메일을 입력하세요"
                    />
                    </InputDiv>
                    <InputDiv>
                    <Label htmlFor="birth">생년월일</Label>
                    <Input
                        {...register("birth")}
                        required={true}
                        id="birth"
                        type="date"
                    />
                    </InputDiv>
                    {/* {genderError ? <Error>성별을 선택해주세요</Error> : null} */}
                    <InputDiv>
                    <Label>성별</Label>
                        <GenderBtn>
                        남
                    </GenderBtn>
                    <GenderBtn>
                        여
                    </GenderBtn>
                    </InputDiv>
                    <SubmitBtn type="submit" value="수정하기"></SubmitBtn>
                </EditForm>
                :<div style={{height:'100%'}}>
                    {userdata?
                        <InfoWrapper>
                            <Userinfo>
                                <UserinfoImg src={defaultProfileImg}/>
                                <Userinfoname>{userdata.username}</Userinfoname>
                                <EditProfileBtn onClick={()=>{setEdit(!edit)}}>프로필 수정</EditProfileBtn>
                            </Userinfo>
                            <Groupinfo>Study Group View</Groupinfo>
                        </InfoWrapper>
                        :null
                    }
                </div>
            }
        </Wrapper>
    )
}
export default Profile;