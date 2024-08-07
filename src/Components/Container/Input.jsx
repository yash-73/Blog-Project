// import { func } from 'prop-types'
import React from 'react'
import { useId } from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = 'text',
    className = '',
    ...props }, ref ){

        const id = useId();

    return (
        <div className='w-full shadow-lg'>
                {label && <label className={`mb-1 pl-1 ${className}`} htmlFor={id}>
                    {label}
                    </label>}
                    <input  
                    type={type}
                    className={` px-3 py-2 rounded-lg text-black bg-white outline-none 
                    focus:bg-gray-300 duration-200 border border-gray-200  w-full ${className}`}
                    ref={ref}
                    {...props}
                    id = {id}/>

        </div>
    )
})

export default Input
