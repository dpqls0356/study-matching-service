import React, { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from "../../api";
import { AppContext } from "../../App.js";
function GoogleLogin(){
  const {loggedIn,changeLoggedIn} = useContext(AppContext);
    const navigate = useNavigate();
    const getGoogleData = async () => {
        const google_redirect_uri = "http://localhost:3000/oauth2/redirect";
        let reqParams = new URL(document.location.toString()).searchParams;
        let code = reqParams.get("code"); // 인가코드 받는 부분
        try {
            const response = await axios.post(
              `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${google_redirect_uri}&grant_type=authorization_code`
            ); //받아온 코드로 access_token 얻어오기
            const userInfo = await axios.get(
                `https://www.googleapis.com/oauth2/v2/userinfo?alt=json`,
                {
                  headers: {
                    authorization: `Bearer ${response.data.access_token}`,
                  },
                }
              );
            console.log(userInfo);
        }
        catch(e){

        }
    };
      
  useEffect(()=> {
    getGoogleData();
  }, []);
  return (
    <div>
    </div>
  );
}

export default GoogleLogin;