import { useDispatch }  from 'react-redux'
import authService from "../../appwrite/auth"
import {logout} from "../../store/authSlice"

function LogoutBtn({className}) {
    const dispatch = useDispatch();
    const logoutHandler = ()=>{
        authService.logout().then(()=>{ 
            dispatch(logout())
        })
    }
    return (
        <button className={`px-6 py-2 mx-1 duration-200 hover:bg-blue-700 rounded-full ${className}`}
        onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn
