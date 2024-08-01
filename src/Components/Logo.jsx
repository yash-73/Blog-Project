// import React from 'react'
import symbol from '../assets/symbol_transparent.png'

function Logo({width}) {
    return (
        <img  src={symbol} alt='CC' className={`min-w-[70px] w-[70px]  rounded-full px-2 py-2`}/>
    )
}



export default Logo;
