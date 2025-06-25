'use client'
import React, { useEffect, useRef, useState } from 'react'
import Container from './Container';
import useProps from './lib/useStore';
import WorksText from './WorksText';
import gsap from 'gsap';

const WorksPart = () => {
    const circleRef = useRef<HTMLDivElement | null>(null);
    const circleScale = useProps(state => state.circleScale);
    const containerRef = useRef<HTMLDivElement>(null);
  
     

        const handleCircleMove = (e: MouseEvent) => {

            if(circleRef.current && containerRef.current) {
           const containerRect = containerRef.current.getBoundingClientRect();
              const x = e.clientX - containerRect.left - circleRef.current.offsetWidth / 2;
              const y = e.clientY - containerRect.top - circleRef.current.offsetHeight / 2;
                gsap.to(circleRef.current, {
                    duration: 0.4,
                    opacity: 1,
                    x,
                    y,
                })
            }
        }

        useEffect(() => {
            window.addEventListener('mousemove', handleCircleMove);

            return () => window.removeEventListener('mousemove', handleCircleMove)
        },[])
    
    const handleClose = () => {
        useProps.getState().setDisplayWorks(false);
    }




  return (
    <Container ref={containerRef} closeButton={handleClose} className='' >
      <div className='relative h-[90vh] flex flex-col items-center justify-center' >
        <WorksText containerRef={containerRef} text='Brain wave' href='https://brain-wave-tau.vercel.app/'     />
        <WorksText containerRef={containerRef} text='jetBrain' href='https://jet-brains-copy.vercel.app/'   />
        <WorksText containerRef={containerRef} text='travel Book' href='https://traveling-site-gamma.vercel.app/' />


        
        <div ref={circleRef} className={`fixed -top-0 -left-0 mix-blend-difference z-20 rounded-full`} style={{width: circleScale? '50px': '40px', height: circleScale? '50px': '40px', pointerEvents: "none", background: circleScale? 'white': 'none',transform: 'translate(50%,50%)' , border: circleScale? 'none': '1px solid rgba(250,250,250,0.5)' }}/>
        
      </div>
    </Container>
  )
}

export default WorksPart;
