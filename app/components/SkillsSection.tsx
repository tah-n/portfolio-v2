'use client'
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef } from 'react'
import FallingSkills from './FallingSkills';
import { OrbitControls } from '@react-three/drei';

const SkillsSection = () => {
    
    
  return (
    <div>
      <Canvas className='' style={{height: '450px'}} camera={{position: [0,0,-4]}}>
         <ambientLight position={[0,0,0]} intensity={4} color={'white'} />
         <pointLight position={[0,0,0]} intensity={5} color={'#c41fa1'} />
         <FallingSkills />
      </Canvas>
    </div>
  )
}

export default SkillsSection;
