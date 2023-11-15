import axios from "axios";
import { BASE_URL } from "../../api";
import { useNavigate } from "react-router-dom";

function Logout(){
    const navigate = useNavigate();
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('userid');
    // 세션파기시켜야함
    const response = axios.get(`${BASE_URL}/user/logout`);
    navigate("/");
}
export default Logout;