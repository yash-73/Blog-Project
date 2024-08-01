import React, {useId} from 'react'

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className={`w-full ${className}`}>
            {label && <label htmlFor={id} className = {`${className}`}></label>}
            <select {...props} ref={ref} id={id} className={` px-3 py-2 rounded-lg text-black shadow-md outline-none 
                    focus:bg-gray-500 duration-200 border border-gray-200  w-full ${className}`}>
                        {options?.map((option) => 
                        <option key={option} value={option}> 
                                {option}
                        </option>)}
                    </select>
        </div>
    )
}

export default React.forwardRef(Select)
