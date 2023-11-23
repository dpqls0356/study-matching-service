import { useContext,useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import defaultProfileImg from "../../image/defaultProfileImg.png";
import { BASE_URL } from "../../api.js";
import { LoggedInContext, UserContext } from "../../App.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

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
    height: max-content;
`
const StudyViewRow = styled.div`
    font-weight: 600;
    color: #025D91;
    background-color: white;
    height: max-content;
    margin: 20px 0px;
    padding: 10px 30px;
    /* border: 2px solid black; */
`
const StudyViewRowLeft = styled.div`
    width: 95%;
`
const StudyViewRowRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5%;
`

const StudyViewRowHeader = styled.div`
    display: flex;
`
const StudyViewRowHeaderCol = styled.div`
    margin: 0px 5px;
`
const StudyName = styled.div`
   margin-right: 5px;
`

const Members = styled.p`
margin-top: 10px;
`
const ParticipatedStudy = styled.div``
function ViewMyStudy(){
    // 이름 , 온오프라인 여부에 따라 지역 출력, 현재인원, 방장 스터디는 설정 버튼 누르기
    const [masterStudy,setMasterStudy] = useState([]);
    const [attendedStudy,setAttendedStudy] = useState([]);
    useEffect(async()=>{
        try{
            const response =await axios.get(`${BASE_URL}/studyGroup/view`,{ withCredentials: true});
            console.log(response); 
            setAttendedStudy(response.data.allStudyGroup);
            setMasterStudy(response.data.masterStudyGroup);
        }catch(e){

        }
    },[])
    console.log(masterStudy);
    return(
        <Wrapper>
            <Drag>
                <Header>관리가능한 스터디</Header>
                <OperateStudy>
                {masterStudy.map((study)=>
                    <StudyViewRow style={{display:"flex"}} key={study.studyname}>
                        <StudyViewRowLeft>
                            <StudyViewRowHeader>
                                <StudyName>{study.studyname}</StudyName>
                                <StudyViewRowHeaderCol>|</StudyViewRowHeaderCol>
                                {study.isOnline?
                                    <StudyViewRowHeaderCol >Online</StudyViewRowHeaderCol>
                                    :<StudyViewRowHeaderCol >Offline</StudyViewRowHeaderCol>
                                }
                                <StudyViewRowHeaderCol>
                                {study.isOnline?
                                        null
                                        :<StudyViewRowHeaderCol>[ {study.region} ]</StudyViewRowHeaderCol>
                                    }
                                </StudyViewRowHeaderCol>
                            </StudyViewRowHeader>
                            <Members>{study.members}/{study.maxCapacity}</Members>
                        </StudyViewRowLeft>
                        <StudyViewRowRight>
                            <Link style={{color: "#025D91"}} to="?">
                                <FontAwesomeIcon icon={faGear} />
                            </Link>
                        </StudyViewRowRight>
                    </StudyViewRow>
                )}
                </OperateStudy>
                <Header>참여하고 있는 스터디</Header>
                <ParticipatedStudy>
                    {attendedStudy.map((study)=>
                        <StudyViewRow key={study.studyname}>
                            <StudyViewRowHeader>
                                <StudyName>{study.studyname}</StudyName>
                                <StudyViewRowHeaderCol>|</StudyViewRowHeaderCol>
                                {study.isOnline?
                                    <StudyViewRowHeaderCol >Online</StudyViewRowHeaderCol>
                                    :<StudyViewRowHeaderCol >Offline</StudyViewRowHeaderCol>
                                }
                                <StudyViewRowHeaderCol>
                                {study.isOnline?
                                        null
                                        :<StudyViewRowHeaderCol>[ {study.region} ]</StudyViewRowHeaderCol>
                                    }
                                </StudyViewRowHeaderCol>
                            </StudyViewRowHeader>
                            <Members>{study.members}/{study.maxCapacity}</Members>
                        </StudyViewRow>
                    )}
                </ParticipatedStudy>
            </Drag>
        </Wrapper>
    )

}

export default ViewMyStudy;