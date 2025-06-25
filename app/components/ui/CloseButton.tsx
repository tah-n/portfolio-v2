'use client'
import gsap from 'gsap';
import React, { useEffect, useState } from 'react'

const CloseButton = ({color}: {color?: string}) => {
    const [show,setShow] = useState<Boolean>(false)
    const lineClassName = 'absolute bg-none opacity-50 group-hover:opacity-100';

    useEffect(() => {
        gsap.to('#line1', {
            delay: 0.1,
            rotate: 0,
            y: 0,
            duration: 1,
            ease: 'power2.inOut',
        })
        gsap.to('#line2', {
            delay: 0.1,
            rotate: 0,
            y: 0,
            duration: 1,
            ease: 'power2.inOut',
        })
    },[])

    if(show) {
        gsap.fromTo('#container', {
            opacity: 0.3,
            x: 16,
            duration: 0.01,
        }, {
            opacity: 0.3,
            delay: 0.02,
            x: -16,
            duration: 0.01,
        })
        gsap.to('#container', {
            delay: 0.04,
            opacity: 1,
            duration: 0.01,
            x: 0,
            y: 0,
        })
    }


  return (
    <div id='container' className='relative opacity-100 w-full h-full cursor-pointer group flex items-center justify-center backdrop-blur-sm' onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        <div id='line1' className={`${lineClassName} rotate-12`}>
            <img src='/assets/whiteline1.png' alt='close' className='!h-[30px]'  />
        </div>
        <div id='line2' className={`${lineClassName} -rotate-45`}>
            <img src='/assets/pinkline1.png' alt='close' className='!h-[30px]' />
        </div>
    </div>
  )
}

export default CloseButton;
