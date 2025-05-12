
const Logout = ()=> {
    localStorage.clear("access_token")
    localStorage.clear("refresh_token")
    localStorage.clear("username")
    localStorage.clear("user_id")
    window.location.href="/"
}

export default Logout;
