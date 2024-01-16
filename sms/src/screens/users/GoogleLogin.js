import React, { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from "../../api";
import { LoggedInContext,UserContext } from "../../App.js";
function GoogleLogin(){
  const {user,changeUser} = useContext(UserContext);
  const {loggedIn,changeLoggedIn} = useContext(LoggedInContext);
    const navigate = useNavigate();
    const getGoogleData = async () => {
        const google_redirect_uri = "http://localhost:3000/oauth2/redirect";
        let reqParams = new URL(document.location.toString()).searchParams;
        let code = reqParams.get("code"); // 인가코드 받는 부분
        const response = await axios.post(
            `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&client_secret=${process.env.REACT_APP_GOOGLE_CLIENT_SECRET}&redirect_uri=${google_redirect_uri}&grant_type=authorization_code`            ); //받아온 코드로 access_token 얻어오기
        const data = await axios.get(
            `https://www.googleapis.com/oauth2/v2/userinfo?alt=json`,
            {
              headers: {
                authorization: `Bearer ${response.data.access_token}`,
              },
            }
          );
          const senddata =data.data;
          if(data){
            try{
              const response = await axios.post(`${BASE_URL}/user/login/google`,{
                senddata
              },{withCredentials: true});
              console.log(response);
              if(response.status===201){
                changeLoggedIn(true);
                changeUser(response.data.username);
                navigate("/");
              }
          }
          catch(e){
              if(e.response.status===500){
                console.log(e);
                // 서버오류는 어떻게 처리할건지 ...
              }
          }
          }
        // 서버에 데이터 보내고 로그인 로직 짜기
            
        

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