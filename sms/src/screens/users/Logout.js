function Logout(){
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('userid');
    // 세션파기시켜야함
}
export default Logout;