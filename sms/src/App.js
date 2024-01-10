import { Outlet } from "react-router-dom";
// import {atom,RecoilRoot} from 'recoil';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { createGlobalStyle } from "styled-components";
import Header from "./components/Header.js";
import GoogleButton from "./screens/users/GoogleLogin.js";
import axios from "axios";
import { BASE_URL } from "./api.js";
const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*{
  box-sizing: border-box;
}
*[hidden] {
    display: none;
}
body {
  line-height: 1;
  background-color: #EAF7FF;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a{
  text-decoration:none;
}
#root{
  height: 100vh;
}
.App{
  height: 100%;
  width: 100vw;
}
.App > div:nth-child(2){
  margin-top: 50px;
}
`;
// localStorage를 안써도 되는 이유
// app 파일이 리렌더링 될때마다 통신하는게 싫었다
// 그런데 다른 페이지가 띄워질때 아울렛이 리렌더링이 되는 거지 app이 리렌더링 되는게 아니었음 ㅇㅇ ...
// 그래서 useContext에 처음 app이 리렌더링 될 때 데이터 받아와서 넣어두면 로그인 유지됨
export const LoggedInContext = createContext();
export const UserContext = createContext();
function App() {
  var [loggedIn,setLoggedIn] = useState(false);
  const changeLoggedIn = (loggedInMod) =>{
    setLoggedIn(loggedInMod);
  }
  var [user,setUser] = useState(null);
  const changeUser = (addUser) =>{
    setUser(addUser);
  }
  useEffect(async()=>{
    try{
      const data = await axios.get(`${BASE_URL}/user/userinfo`,
      { withCredentials: true});
      console.log(data);
      changeUser({userid:data.userid,username:data.username});
      changeLoggedIn(true);
    }
    catch(e){
        console.log(e.request.response);
    }
    // if(localStorage.getItem('userid')===null){
    //   changeLoggedIn(false);
    //   console.log("null: ",loggedIn,user);
    // }
    // else{
    //   changeLoggedIn(true);
    //   changeUser({userid:localStorage.getItem("userid"),username:localStorage.getItem('username')});
    //   console.log("true:",loggedIn,user);
    // }
  },[]);
  return (
      <div className="App">
        <LoggedInContext.Provider value={{loggedIn,changeLoggedIn}}>
          <UserContext.Provider value={{user,changeUser}}>
            <GlobalStyle />
            <Header/>
            <Outlet/>
          </UserContext.Provider>
          </LoggedInContext.Provider>
      </div>
  );
}

export default App;

//해야하는 일
//해결 - 모든 컴포넌트가 동시에 사용할 수 있는 변수 만들기 - loggedIn 구현을 위함
//서버에게 유저 정보 요청하기
//받아서 유저 변수에 데이타 넣기