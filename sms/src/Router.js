import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./screens/Home";
import Join from "./screens/users/Join";
import Login from "./screens/users/Login"

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
            children:[
                {
                    path:"",
                    element:<Home/>,
              },
                {
                    path:"/join",
                    element:<Join/>,
                },
                {
                    path:"/login",
                    element:<Login/>,
                }
        ],
    }
]);
export default router;