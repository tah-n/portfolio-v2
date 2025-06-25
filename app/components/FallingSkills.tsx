'use client'
import React from 'react'
import SkillBoxes from './SkillBoxes';
import { Physics, RigidBody } from '@react-three/rapier';

const FallingSkills = () => {

  return (
    <>
      <Physics gravity={[0, -12, 4]}>
        <RigidBody type='fixed'>
            <mesh position={[0,-2,0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[20,20]} />
                <meshBasicMaterial color={'black'} transparent opacity={0} />
            </mesh>
        </RigidBody>
        <RigidBody type='fixed'>
            <mesh position={[12.5,-2,0]} receiveShadow>
                <boxGeometry args={[20,20,20]} />
                <meshBasicMaterial color={'red'} transparent opacity={0} />
            </mesh>
        </RigidBody>
        <RigidBody type='fixed'>
            <mesh position={[-12.5,0,-5]} receiveShadow>
                <boxGeometry args={[20,20,20]} />
                <meshBasicMaterial color={'red'} transparent opacity={0} />
            </mesh>
        </RigidBody>
        <RigidBody type='fixed'>
            <mesh position={[0,0,3]} receiveShadow>
                <boxGeometry args={[20,20,2]} />
                <meshBasicMaterial color={'green'} transparent opacity={0} />
            </mesh>
        </RigidBody>
        <RigidBody type='fixed'>
            <mesh position={[0,0,0]} receiveShadow>
                <boxGeometry args={[20,20,2]} />
                <meshBasicMaterial color={'green'} transparent opacity={0} />
            </mesh>
        </RigidBody>


        <SkillBoxes position={[1,2,1]} args={[1,1,1]} color='gray' textureSrc='skills/html5/html5.png' />
        <SkillBoxes position={[1,4,1]} args={[1,1,1]} color='gray' textureSrc='skills/js/javascript.png'/>
        <SkillBoxes position={[1,2,1]} args={[1,1,1]} color='gray' textureSrc='skills/css.png'/>
        <SkillBoxes position={[1,1,1]} args={[1,1,1]} color='white' textureSrc='skills/threejs.png'/>
        <SkillBoxes position={[1,2,1]} args={[1,1,1]} color='gray' textureSrc='skills/reactjs/reactjs.png'/>
        <SkillBoxes position={[1,4,1]} args={[1,1,1]} color='gray' textureSrc='skills/tailwind.png'/>
        <SkillBoxes position={[1,1,1]} args={[1,1,1]} color='gray' textureSrc='skills/tslogo.png'/>
        <SkillBoxes position={[1,6,1]} args={[1,1,1]} color='gray' textureSrc='skills/nextjs/nextjs.png'/>
        <SkillBoxes position={[0,3,1]} args={[1,1,1]} color='gray' textureSrc='skills/github.png'/>
      </Physics>
    </>
  )
}

export default FallingSkills;
