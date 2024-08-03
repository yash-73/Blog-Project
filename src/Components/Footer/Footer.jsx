// import React from 'react'
// import { Link } from 'react-router-dom'
// import Logo from '../Logo'
import cc from '../../assets/Culture_Canvas_transparent.png'


function Footer() {
    
    return  (
        <div className='bg-[#181618] flex flex-col gap-4 px-4'>
        <div className=' flex md:flex-row flex-col md:justify-start justify-center items-left md:items-center border-white border-b-2'>
            <div className=''>
                <img src={cc} className='' alt="Culture Canvas"/>
            </div>
            <div className='flex md:flex-row flex-col gap-8  md:border-l-2 border-white max-md:border-t-2 max-md:pt-8 md:w-full md:justify-around'>
                    <ul className='pl-8 flex flex-col gap-8 font-semibold text-gray-300 max-md:pb-8'>
                        <li className='font-bold text-xl text-white'>Contact</li>
                        <li ><a href="https://www.instagram.com/_yash_73/">Instagram</a></li>
                        <li> <a href="https://github.com/yash-73">Github</a></li>
                        <li>LinkedIn</li>
                    </ul>

                    <ul className='pl-8 flex flex-col gap-8 font-semibold text-gray-300 max-md:pb-8 '>
                        <li className='font-bold text-xl text-white'>Legal</li>
                        <li>Terms and Conditions</li>
                        <li>Privacy Policy</li>
                        <li>Licensing</li>
                    </ul>

                    <ul className='pl-8 flex flex-col gap-8 font-semibold text-gray-300 max-md:pb-8 '>
                        <li className='font-bold text-xl text-white'>Support</li>
                        <li>Account</li>
                        <li>Help</li>
                        <li>Customer Support</li>
                    </ul>
            </div>
        </div>
        <div className='mb-8'>©Copyright 2024. All Rights Reserved </div>
        </div>
   
    );
    
}

export default Footer
