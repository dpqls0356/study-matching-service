import { useContext, useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import { BASE_URL } from "../api.js";
import { LoggedInContext,UserContext } from "../App.js";

const Wrapper =styled.div`
    position: fixed;
    top: 0;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    padding:0px 30px;
`
const Logo = styled.div`
    color: #025d91;
    font-size: 30px;
    font-weight: 900;
    text-decoration: none;
`
const HeaderRight = styled.div`
    display: flex;
`
const LinkDiv = styled.div`
    display: flex;
    align-items: center;
    color : #025d91;
    text-decoration: none;
    font-weight: 600;
    border: none;
    border-radius: 15px;
    height: 30px;
    padding: 0px 10px;
    background-color: rgba(0,0,0,0);
`
const LogoutBtn = styled.div`
    display: flex;
    align-items: center;
    color : #025d91;
    text-decoration: none;
    font-weight: 600;
    border: none;
    border-radius: 15px;
    height: 30px;
    padding: 0px 10px;
    background-color: rgba(0,0,0,0);
`
function Headers(){
    const {loggedIn,changeLoggedIn} = useContext(LoggedInContext);
    const {user,changeUser} = useContext(UserContext);
    const navigate = useNavigate();
    // 세션파기시켜야함
    const logout = async()=>{
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('userid');
        changeLoggedIn(false);
        changeUser();
        try{
            const response = await axios.get(`${BASE_URL}/user/logout`);
            navigate("/");
        }catch(e){

        }
    }
    return (
        <Wrapper>
            <Logo>
                <Link style={{color : "#025d91"}} to="/">SMS</Link>
            </Logo>
            {loggedIn?
                <HeaderRight>
                    <LinkDiv>
                        <Link style={{color : "#025d91"}} to="/user/profile">My Profile</Link>
                    </LinkDiv>
                    <LogoutBtn onClick={logout}>Logout</LogoutBtn>
                    {/* <LinkDiv>
                        <Link style={{color : "#025d91"}} to="/logout">Logout</Link>        
                    </LinkDiv> */}
                </HeaderRight>
                :<HeaderRight>
                    <LinkDiv>
                        <Link style={{color : "#025d91"}} to="/login">Login</Link>
                    </LinkDiv>
                    <LinkDiv>
                        <Link style={{color : "#025d91"}} to="/join">Join</Link>
                    </LinkDiv>
                </HeaderRight>
                
            }
        </Wrapper>
    )
}
export default Headers;