// import axios from "axios";
// import { BASE_URL } from "../../api";
// import { useNavigate } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import { LoggedInContext,UserContext } from "../../App.js";
// function Logout(){
//     const {loggedIn,changeLoggedIn} = useContext(LoggedInContext);
//     const {user,changeUser} = useContext(UserContext);
//     const navigate = useNavigate();
//     window.localStorage.removeItem('username');
//     window.localStorage.removeItem('userid');
//     changeLoggedIn(false);
//     changeUser();
//     // 세션파기시켜야함
//     const response = axios.get(`${BASE_URL}/user/logout`);
//     navigate("/");
// }
// export default Logout;