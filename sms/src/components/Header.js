import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { AppContext } from "../App";
import { useRecoilState, useRecoilValue } from 'recoil';

const Wrapper =styled.div`
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    padding:0px 30px;
`
const Logo = styled.a`
    color: #025d91;
    font-size: 30px;
    font-weight: 900;
    text-decoration: none;
`
const HeaderRight = styled.div`
    display: flex;
`
const Link = styled.a`
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
    const {loggedIn,changeLoggedIn} = useContext(AppContext);
    return (
        <Wrapper>
            <Logo href="/">SMS</Logo>
            {loggedIn?
                <HeaderRight>
                    <Link href="/users/profile/:id">My Profile</Link>
                    <Link href="/logout">Logout</Link>
                </HeaderRight>
                :<HeaderRight>
                    <Link href="/login">Login</Link>
                    <Link href="/join">Join</Link>
                </HeaderRight>
                
            }
        </Wrapper>
    )
}
export default Headers;