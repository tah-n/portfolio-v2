'use client'
import React, { useRef, useState } from 'react'
import useProps from './lib/useStore';

type TextType = {
    className?: string;
    text?: string;
    href?: string;
    containerRef?: React.RefObject<HTMLDivElement | null>;
}

const WorksText = ({className, href, text, containerRef}: TextType) => {
    const [mouseMoved,setMouseMoved] = useState(false);
    const setCircleScale = useProps(state => state.setCircleScale)
    
    
        
    const handleEnter = () => {
        setMouseMoved(true);
        setCircleScale(true);
    }
    
    const handleLeave = () => {
        setMouseMoved(false);
        setCircleScale(false);
    }            

  return (
    <>
        <div className={`${className} relative z-10 rotate-2 w-fit h-fit`} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <a href={href} target='_blank'>
            <p className='lg:text-[50px] text-[40px] font-semibold cursor-pointer italic text-[rgba(250,250,250,1)] capitalize'>
                {text} 
            </p>
        </a>
        </div>
        {/* <div className='absolute z-20 opacity-0 w-0 overflow-hidden ' ref={imgRef}>
            <div className='relative w-fit h-fit'>
                <img src={imgSrc} width={100} />
                <div className='absolute z-10 top-0 bg-black/50 w-full h-full' />    
            </div>
        </div> */}
    </>
    
  )
}


export default WorksText;