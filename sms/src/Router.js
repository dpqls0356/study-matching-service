import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./screens/Home";

const router = createBrowserRouter({
    path:"/",
    element:<App/>,
    childrend:[
        {
            path:"",
            element:<Home/>,
        }
    ]
});
export default router;