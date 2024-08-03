import { useState } from 'react'
import { Container, Logo, LogoutBtn } from "../index"
import { Link, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"



function Header() {
    const authStatus = useSelector((state) => state.auth.status)

    const navigate = useNavigate();
    const [seeMenu, setSeeMenu] = useState(false);
    const toggleMenu = () => {
        setSeeMenu((prev) => !prev);
    }
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
            <Container >
                <nav className="flex items-center ">
                    <div >
                        <Link to='/'>
                            <Logo width="70px"></Logo>
                        </Link>
                    </div>
                    <ul className=" flex  ml-auto">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>

                                    <button onClick={() => { navigate(item.slug) }}

                                        className={`py-2 px-6 mx-1 duration-200  hover:bg-blue-800 max-md:hidden hover:text-white rounded-full`}>
                                        {item.name}</button>
                                </li>
                            ) : null
                        )}

                        {authStatus && (
                            <li>
                                <LogoutBtn className={'max-md:hidden'} />
                            </li>
                        )}

                        <button className='md:hidden px-6 mx-1 py-2' onClick={toggleMenu}>Menu</button>


                    </ul>

                </nav>
                <ul className={`flex flex-col max-md:w-[80vw] bg-[#181618] p-8 fixed top-0 right-0 items-end max-md:h-full  md:hidden duration-200 z-20
                            ${seeMenu ? 'translate-x-0' : 'translate-x-[968px]'}`}>
                    <button onClick={toggleMenu} className='font-bold text-xl mr-4 px-6 my-2 py-2 w-fit border-2 border-white' >X</button>                            <li className="w-full border-b-2 border-white my-4"></li>
                    {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name}>

                                <button onClick={() => { navigate(item.slug) }}

                                    className={`py-2 px-6 my-2 mr-8 w-full duration-200   hover:bg-blue-800 hover:text-white rounded-full`}>
                                    {item.name}</button>
                            </li>
                        ) : null
                    )}

                    {authStatus && (
                        <li>
                            <LogoutBtn className={'py-2 px-6 my-2 mr-8 w-full duration-200   hover:text-gray-300'} />
                        </li>
                    )}
                </ul>
            </Container>
        </header>
    )
}

export default Header
