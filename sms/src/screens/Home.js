import React, { useEffect,useContext } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from "../api";
import { LoggedInContext,UserContext } from "../App.js";
import { styled } from "styled-components";

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: 30px 30px;
`
const WrapperTop = styled.div`
    height: 60%;
    width: 100%;
    display: flex;
    /* background-color:white; */
    align-items: center;
    justify-content: space-around;
`
const MainViewCol = styled.div`
    width: 30%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    /* background-color: #EAF7FF; */
    border-radius:50px;
`
const MainViewColBtn = styled.div`
    width: 50%;
    all: unset;
    font-weight: 900;
    color: #025D91;
`
function Home(){
    const {user,changeUser} = useContext(UserContext);
    return (
        <Wrapper>
            <WrapperTop>
                <MainViewCol>
                    <Link style={{height:'30%'}} to="/studygroup/creat">
                        <MainViewColBtn>스터디 그룹 만들기</MainViewColBtn>
                    </Link>
                    <Link style={{height:'30%'}}>
                        <MainViewColBtn>스터디 그룹 찾기</MainViewColBtn>
                    </Link>
                </MainViewCol>
                <MainViewCol>
                <MainViewColBtn>스터디 추천</MainViewColBtn>
                </MainViewCol>
                <MainViewCol>
                <Link to="/studygroup/viewmystudy">
                    <MainViewColBtn>내 스터디 보기</MainViewColBtn>
                </Link>
            </MainViewCol>
            </WrapperTop>
        </Wrapper>
    )
}
export default Home;