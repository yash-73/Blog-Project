// import {useEffect} from 'react'
import {Container , Logo , LogoutBtn} from "../index"
import { Link, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"



function Header() {
    const authStatus = useSelector((state)=> state.auth.status )

    const navigate = useNavigate();
    // const location = useParams();

    
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true,
            currPage: false
          }, 
          {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,

        },
        {
            name: "All Posts",
            slug: "all-posts",
            active: authStatus,
            
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
            
        },
    ]

    
    return (
        <header className="flex items-center shadow bg-[#181618] text-white h-[80px]">
                <Container>
                    <nav className="flex items-center ">
                        <div >
                            <Link to='/'>
                            <Logo width="70px"></Logo>
                            </Link>
                        </div>
                        <ul className=" flex  ml-auto">
                            {navItems.map((item)=>
                                item.active ? (
                                    <li key={item.name}>
                                        
                                        <button onClick={()=>{navigate(item.slug)}} 
                                            
                                            className={`py-2 px-6 mx-1 duration-200  hover:bg-blue-800 hover:text-white rounded-full`}>
                                            {item.name}</button>
                                    </li>
                                ) : null
                            )}

                            {authStatus && (
                                <li>
                                    <LogoutBtn/>
                                </li>
                            )}
                        </ul>
                    </nav>
                </Container>
        </header>
    )
}

export default Header
