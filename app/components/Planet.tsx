'use client'
import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { Cloud, Html, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import ShatteredPlanet, { Particles } from './ShatteredPlanet';
import WaterEffect from './WaterEffect';
import CameraMotion from './CameraMotion';
import FallBack from './FallBack';
import Name from './Name';
import ButtonContainer from './ButtonContainer';
import Container from './Container';
import ProfileContent from './ProfileContent';
import useProps from './lib/useStore';
import Contact from './Contact';
import WorksPart from './WorksPart';
import PlanetModel from './PlanetModel';
import { EffectComposer } from 'three/examples/jsm/Addons.js';



const Planet = () => {
  const displayProfile = useProps(state => state.displayProfile);
  const displayContact = useProps(state => state.displayContact);
  const displayWorks = useProps(state => state.displayWorks);
  const [dpr,setDpr] = useState(1.5);

  useEffect(() => {
    if(typeof window !== 'undefined') setDpr(Math.min(window.devicePixelRatio, 1.5))
  },[])


  return (
    <div className='relative w-full h-full min-h-[90vh] flex items-center justify-center lg:justify-end font-silkscreenR'>
      {displayProfile && (
        <ProfileContent />
      )}
      {displayContact && (
        <Contact />
        )}
      {displayWorks && (
        <WorksPart />
      )}    
        <Canvas 
          className='absolute top-0 left-0 h-[100vh]' 
          style={{height: "100vh", width: "100vw"}}
          dpr={dpr}
        >
          <PerspectiveCamera makeDefault position={[0,-18,70]} />
          <pointLight color={'#b84da9'} position={[0,10,0]} intensity={10} />
          <ambientLight color={'white'} intensity={0.8} position={[0,30,0]} />
          <directionalLight color={'#FEC5F6'} intensity={5} position={[5,0,5]} />
          <Suspense fallback={<FallBack />}>
          
          {!displayProfile && !displayContact && !displayWorks && (
            <Html className='absolute w-[98vw] h-[650px] -bottom-[58vh] -left-[48.5vw] flex items-end justify-between px-4 !font-silkscreenB text-xl'>
              <div className='relative w-full h-full'>
                <Name />
                <ButtonContainer />
              </div>
            </Html>
          )}
          
            {/* <ShatteredPlanet /> */}
            <PlanetModel />
            <Particles />
            <WaterEffect />
            <CameraMotion />
          </Suspense>
        </Canvas>
    </div>
  )
}

export default Planet;
