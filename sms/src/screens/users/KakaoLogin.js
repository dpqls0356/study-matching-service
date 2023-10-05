
import React, { useEffect } from "react";
import axios from 'axios';
import { BASE_URL } from "../../api";


function KakaoLogin(){
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
                const response = await axios.post(`${BASE_URL}/login/kakao`,{
                    data
                });
                if(response.status===201){
                    navigator(`/`);
                }
            }
            catch(e){
                alert(e.response);
            }
        }
    };
      
  useEffect(()=> {
    getKakaoData();
  }, []);
  return (
    <div></div>
  );
}

export default KakaoLogin;