'use client'
import gsap from 'gsap';
import React, { useRef } from 'react'

type PropsType = {
    text: string;
    className?: string;
}

const ButtonContent = ({text,className}: PropsType) => {
  const lettersAboveRef = useRef<(HTMLSpanElement | null)[]>([]);
  const lettersDownRef = useRef<(HTMLSpanElement | null)[]>([]);
  const letters = text.split("");



  const handleMouseEnter = () => {
    if(lettersAboveRef.current) {
      gsap.to(lettersAboveRef.current, {
        y: -23,
        duration: 0.3,
        stagger: 0.1,
      })
    }
    if(lettersDownRef.current) {
      gsap.to(lettersDownRef.current, {
        y: -30,
        duration: 0.3,
        stagger: 0.1,
      })
    }
  }

  const handleMouseLeave = () => {
    if(lettersAboveRef.current) {
      gsap.to(lettersAboveRef.current, {
        y: 0,
        duration: 0.3,
        stagger: 0.1,
      })
    }
    if(lettersDownRef.current) {
      gsap.to(lettersDownRef.current, {
        y: 0,
        duration: 0.3,
        stagger: 0.1,
      })
    }
  }
  


  return (
    <div className={`${className} overflow-hidden `} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className=' w-[125px] h-[22px] md:tracking-wide overflow-hidden'>
          <div >
            {letters.map((letter,i) => (
              <span ref={(el) =>{ if(el) lettersAboveRef.current[i] = el} } key={i} className='inline-block'>{letter}</span>
            ))}
          </div>
          <div>
            {letters.map((letter,i) => (
              <span ref={(el) =>{ if(el) lettersDownRef.current[i] = el} } key={i} className='inline-block'>{letter}</span>
            ))}
          </div>
        </div>
    </div>
  )
}

export default ButtonContent;
