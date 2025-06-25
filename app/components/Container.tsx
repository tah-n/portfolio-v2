'use client'
import React, { ForwardedRef, useEffect, useState } from 'react'
import CloseButton from './ui/CloseButton';
import gsap from 'gsap';

type Props = {
  children: React.ReactNode;
  closeButton?: () => void;
  className?: string;
  ref?: ForwardedRef<HTMLDivElement>;
}

const Container = ({children,closeButton,className, ref}: Props) => {

  useEffect(() => {
    gsap.to('.btnContainer', {
      delay: 2,
      y: 0,
      opacity: 1,
      duration: 0.7,

    })
  })

  return (
    <div ref={ref} className={`${className} absolute z-20 w-[91vw] md:w-[72vw] lg:w-[40vw] lg:mr-8 h-fit mt-10`} >
      <div className='w-full h-full relative'>
        <div onClick={closeButton} className={`btnContainer absolute -top-12 border-[2px] border-white/50 right-0 w-24 h-14 transition-transform duration-1000 ease-in-out opacity-0 translate-y-9 pb-1`}>
          <CloseButton />
        </div>
        <div className='w-full border-[2px] border-white/50 min-h-[200px] backdrop-blur-xl bg-2/60 overflow-hidden '>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Container;
