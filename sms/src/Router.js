import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./screens/Home";
import Join from "./screens/users/Join";
import Login from "./screens/users/Login";
import KakaoLogin from "./screens/users/KakaoLogin";
import GoogleLogin  from "./screens/users/GoogleLogin";
// import Logout from "./screens/users/Logout";
import Profile from "./screens/users/Profile";
import CreatStudyGroup from "./screens/studyGroup/CreatStudyGroup";
import ViewMyStudy from "./screens/studyGroup/ViewMyStudy";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path:"/user/profile",
        element:<Profile/>
      }
      ,
      {
        path: "/join",
        element: <Join />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path:"/login/social/kakao/oauth",
        element:<KakaoLogin/>,
      },
      {
        path:"/oauth2/redirect",
        element:<GoogleLogin/>
      },
      ,{
        path:"/studygroup/creat",
        element:<CreatStudyGroup/>
      },
      ,{
        path:"/studygroup/viewmystudy",
        element:<ViewMyStudy/>
      }
      // {
      //   path:"/logout",
      //   element:<Logout/>
      // }
    
    ],
  },
]);
export default router;
