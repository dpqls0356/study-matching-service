import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./screens/Home";
import Join from "./screens/users/Join";
import Login from "./screens/users/Login";
import KakaoLogin from "./screens/users/KakaoLogin";

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
      }
    ],
  },
]);
export default router;
