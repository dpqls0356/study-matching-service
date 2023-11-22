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
  display: flex;
  align-items: center;
  justify-content: center;
`
const Drag = styled.div`
width: 100%;
height: 100%;
`
const Header = styled.div`
    font-size: 20px;
    font-weight: 900;
    color: #025D91;
    padding-bottom: 10px;
    border-bottom: 3px solid #025D91;
`
const OperateStudy = styled.div`
width: 100%;
height: 40px;
`
const ParticipatedStudy = styled.div``
function ViewMyStudy(){
    const [masterStudy,setMasterStudy] = useState([]);
    const [attendedStudy,setAttendedStudy] = useState([]);
    useEffect(async()=>{
        try{
            const response =await axios.get(`${BASE_URL}/studyGroup/view`);
            console.log(response); 
        }catch(e){

        }
    },[])

    return(
        <Wrapper>
            <Drag>
                <Header>관리가능한 스터디</Header>
                <OperateStudy>

                </OperateStudy>
                <Header>참여하고 있는 스터디</Header>
                <ParticipatedStudy>

                </ParticipatedStudy>
            </Drag>
        </Wrapper>
    )

}

export default ViewMyStudy;