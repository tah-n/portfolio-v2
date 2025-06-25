'use client'
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react'

export default function CameraMotion () {
    const { camera } = useThree();
    const mouse = useRef({
        x: 0,
        y: 0,
        z: 0
    });

    const handleMouseMove = (event: MouseEvent) => {
        mouse.current.x = event.clientX / window.innerWidth;
        mouse.current.y = event.clientY / window.innerHeight;
        
    }

    useEffect(() => {
        window.addEventListener('mousemove', 
            handleMouseMove
        )

        return () => window.removeEventListener('mousemove', handleMouseMove);
    },[])

    useFrame(() => {
        camera.position.x = (mouse.current.x * 2.2) * 0.5;
        camera.position.y = (mouse.current.y * 2.2 - 17) * 0.5;
    })


    
    return null;
} 