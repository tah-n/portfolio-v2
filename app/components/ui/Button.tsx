'use client'
import React from 'react'

interface ButtonTypes {
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    borderClassName?: string;
}

const Button = ({children, className, onClick, borderClassName} : ButtonTypes) => {
    const borderClass = `absolute transition-all ease-in-out duration-200 w-6 h-4 ${borderClassName}`;
  return (
        <div  onClick={onClick} className={`${className} relative group w-fit p-4 h-fit text-center flex items-center justify-center capitalize text-white`}>
            <div className='w-full h-full flex items-center justify-center text-center'>
                {children}
            </div>
            <div className={`${borderClass} -top-1 -right-1  group-hover:top-0 group-hover:right-0 border-t-[2px] border-r-[2px]`} />
            <div className={`${borderClass} -top-1 -left-1 group-hover:top-0 group-hover:left-0 border-t-[2px] border-l-[2px] `} />
            <div className={`${borderClass} -bottom-1 -right-1 group-hover:bottom-0 group-hover:right-0 border-b-[2px] border-r-[2px] `} />
            <div className={`${borderClass} -bottom-1 -left-1 group-hover:bottom-0 group-hover:left-0 border-l-[2px] border-b-[2px] `} />
         </div>                
  )
}

export default Button

