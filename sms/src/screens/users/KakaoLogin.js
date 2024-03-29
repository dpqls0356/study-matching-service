import React, { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from "../../api";
import { LoggedInContext,UserContext } from "../../App.js";
function KakaoLogin(){
  const {user,changeUser} = useContext(UserContext);
  const {loggedIn,changeLoggedIn} = useContext(LoggedInContext);
    const navigate = useNavigate();
    const getKakaoData = async () => {
        let reqParams = new URL(document.location.toString()).searchParams;
        let code = reqParams.get("code"); // 인가코드 받는 부분
        const config = {
          grant_type: "authorization_code",
          code:code,
          client_id: process.env.REACT_APP_KAKAO_API_KEY,
          redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
          client_secret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
        };
        const params = new URLSearchParams(config).toString();
        const baseUrl = `https://kauth.kakao.com/oauth/token?${params}`;
      
        const json = await (
          await fetch(baseUrl, {
            method: "POST",
          })
        ).json();
      
        const { access_token } = json;
      
        const data = await (
          await fetch(`https://kapi.kakao.com/v2/user/me`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          })
        ).json();
        if(data){
            try{
                const response = await axios.post(`${BASE_URL}/user/login/kakao`,{
                    data
                },{withCredentials: true});
                if(response.status===201){
                  changeLoggedIn(true);
                  changeUser(response.data.username);
                  navigate("/");
                }
            }
            catch(e){
                if(e.response.status===500){
                  // 서버오류는 어떻게 처리할건지 ...
                }
            }
        }
    };
      
  useEffect(()=> {
    getKakaoData();
  }, []);
  return (
    <div>
    </div>
  );
}

export default KakaoLogin;