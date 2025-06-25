'use client'
import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'

type PropsType = {
    words: string[];
    delay: number
}

const ParagraphAnim = ({words, delay}: PropsType) => {
    const wordsRef = useRef<HTMLSpanElement[]>([])

    useEffect(() => {
        gsap.to(wordsRef.current, {
            duration: 0.1,
            opacity: 1,
            stagger: 0.1,
            delay: delay
        })
        
    },[])

  return (
    <p className='w-[95%] my-3'>
        {words.map((word, i) => (
            <span key={i} ref={(el) => {if(wordsRef.current && el){ wordsRef.current[i] = el}}} className='opacity-0'>
                {word} 
            </span>
        ))}
        
    </p>
  )
}

export default ParagraphAnim;
