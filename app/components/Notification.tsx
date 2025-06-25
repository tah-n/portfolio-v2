'use client'
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import useProps from './lib/useStore';

type Notification = {
  text?: string; 
}

const Notification = ({text}: Notification) => {
  const notifRef = useRef<HTMLDivElement>(null);
  const showNotification = useProps(state => state.showNotification);


  useEffect(() => {
    if (notifRef.current) {
      gsap.to(notifRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      })
    }

  },[showNotification])





  return (
    showNotification && (
      <div ref={notifRef} className="absolute bottom-[2px] w-full min-h-[70px] flex items-center justify-center font-silkscreenR font-semibold text-white capitalize pointer-events-none translate-y-3 opacity-0">
      <p>
        {text}
      </p>
      </div>
    )
  )
}

export default Notification;
