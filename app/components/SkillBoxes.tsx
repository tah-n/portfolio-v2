'use client'
import { RigidBody } from '@react-three/rapier';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

type SkillBoxesType = {
  args: [width?: number | undefined, height?: number | undefined, depth?: number | undefined];
  position: THREE.Vector3 | [x: number, y: number, z: number];
  color?: string;
  textureSrc: string;
}

const SkillBoxes = ({args,position,color,textureSrc} : SkillBoxesType) => {
    const boxRef = useRef<THREE.Mesh | null>(null);
    const texture = useLoader(THREE.TextureLoader, textureSrc)

    useEffect(() => {
      if(boxRef.current) {
        if(boxRef.current.material instanceof THREE.MeshStandardMaterial) {
         boxRef.current.material.map = texture;
         boxRef.current.material.needsUpdate = true;
         boxRef.current.material.color = new THREE.Color(color);
        }
      }
    },[boxRef])


  return (
    <>
      <RigidBody restitution={0.1} friction={0.7}>
          <mesh position={position} castShadow ref={boxRef}>
            <boxGeometry args={args} />
            <meshStandardMaterial color={color || '#c41fa1'} />
          </mesh>
      </RigidBody>

    </>
  )
}

export default SkillBoxes
