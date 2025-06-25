'use client'
import React, { useEffect, useRef, useState } from 'react'
import Profile from './Profile';
import Works from './Works';
import ContactMe from './ContactMe';
import gsap from 'gsap';

const ButtonContainer = () => {
  const arrowRef = useRef<HTMLDivElement>(null);
  const [moveArrow,setMoveArrow] = useState(false);

  gsap.fromTo(arrowRef.current, {
    opacity: 1,
    duration: 0.5,
    repeat: -1
  }, {
    repeat: -1,
    opacity: 0,
    duration: 0.8
    })


    const handleMouseMove = (e: MouseEvent) => {
     if(moveArrow) {
      if(window.innerHeight > 500) {
        if(e.clientX/window.innerWidth < 0.99 && e.clientX/window.innerWidth > 0.6) {
          if (e.clientY/window.innerHeight > 0.6 && e.clientY/window.innerHeight < 0.7) {
            gsap.to(arrowRef.current, {
              y: 0,
              duration: 0.5,
              ease: 'power2.out' 
            })
          }
          else if (e.clientY/window.innerHeight > 0.73 && e.clientY/window.innerHeight < 0.8) {
            gsap.to(arrowRef.current, {
              y: 88,
              duration: 0.5,
              ease: 'power2.out' 
            })
          }
          else if (e.clientY/window.innerHeight > 0.84 && e.clientY/window.innerHeight < 0.92) {
            gsap.to(arrowRef.current, {
              y: 170,
              duration: 0.5,
              ease: 'power2.out' 
            })
          }
        }    
      } else {
        if(e.clientX/window.innerWidth < 0.99 && e.clientX/window.innerWidth > 0.6) {
          if (e.clientY/window.innerHeight > 0.3 && e.clientY/window.innerHeight < 0.48) {
            gsap.to(arrowRef.current, {
              y: 0,
              duration: 0.5,
              ease: 'power2.out' 
            })
          }
          else if (e.clientY/window.innerHeight > 0.55 && e.clientY/window.innerHeight < 0.68) {
            gsap.to(arrowRef.current, {
              y: 88,
              duration: 0.5,
              ease: 'power2.out' 
            })
          }
          else if (e.clientY/window.innerHeight > 0.76 && e.clientY/window.innerHeight < 0.89) {
            gsap.to(arrowRef.current, {
              y: 170,
              duration: 0.5,
              ease: 'power2.out' 
            })
          }
        }    
      }      
     }
             
    }


    useEffect(() => {
      window.addEventListener('mousemove', handleMouseMove);

      return () => window.removeEventListener('mousemove',handleMouseMove);
    },[moveArrow])


  return (
    <div className='absolute right-3 bottom-8' onMouseEnter={() => setMoveArrow(true)} onMouseLeave={() => setMoveArrow(false)}>
        <div className='relative w-full h-full flex flex-col gap-8'>
          <Profile />
          <Works />
          <ContactMe />
          <div ref={arrowRef} className='absolute -right-6 top-5 opacity-80 rotate-90 w-fit h-fit'>
            <img src='images/Vector2.png' width={16} className='opacity-80' />
          </div>
        </div>
    </div>
  )
}

export default ButtonContainer;
