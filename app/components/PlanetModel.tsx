'use client'
import { Cloud, useGLTF } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MeshStandardMaterial, Scene, TextureLoader } from 'three';
import useProps from './lib/useStore';
import { EffectComposer, SelectiveBloom } from '@react-three/postprocessing'

const PlanetModel = () => {
    const { scene: planet, materials: planetMaterial } = useGLTF('models/thelastmodel.glb');  
    const groupRef = useRef<THREE.Group>(null);
    const cloudRef = useRef<THREE.Group>(null);
    const { camera } = useThree();
    const displayProfile = useProps((state) => state.displayProfile);
    const [rotate,setRotate] = useState(false);
    const displayContact = useProps(state => state.displayContact);
    const starRef = useRef<THREE.Mesh>(null);
    const lightRef = useRef<THREE.PointLight>(null);
    const displayWorks = useProps(state => state.displayWorks);
    const sphereRef = useRef<THREE.SphereGeometry>(null);



     const [ colorMap, normalMap, displacementMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
        '/shinyTexture/ground_0025_color_2k.jpg',
        '/shinyTexture/ground_0025_normal_directx_2k.jpg',
        '/shinyTexture/ground_0025_height_2k.png',
        '/shinyTexture/ground_0025_roughness_2k.jpg',
        '/shinyTexture/ground_0025_ao_2k.jpg',
      ]);
      const sunMap = useLoader(TextureLoader, 'models/sun/2k_sun.jpg')

      
  //planet material
  Object.values(planetMaterial).forEach((material) => {
    if(material instanceof MeshStandardMaterial) {
        material.map = colorMap
        material.color = new THREE.Color('#2e012d')
        material.normalMap = normalMap;
        material.roughnessMap = roughnessMap;
        material.displacementScale = 0.02;
        material.displacementMap = displacementMap;
        material.aoMap = aoMap;
        material.metalness = 0.8;
        material.roughness = 0.5;
        material.emissive = new THREE.Color('#3b010c');
        material.emissiveIntensity = 0.2;
        material.side = THREE.DoubleSide;
      
    }
  });


  //add event listener
    window.addEventListener('mousemove', (event) => {
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      // console.log(mouse.x, mouse.y )
  
    })

  //growth speed for the clouds  
  const growthSpeed = Math.random() * 0.5 + 0.09;

  //animations
  useFrame(({clock}) => {
    if(groupRef.current) {
      groupRef.current.rotation.y += 0.002
    }
    if(cloudRef.current) {
      const growthFactor = 20 + Math.sin(clock.elapsedTime * growthSpeed) * 5;
      cloudRef.current.scale.set(growthFactor,growthFactor,growthFactor);
    }
    if(starRef.current) {
      starRef.current.rotation.y += 0.01;
    }

    if(rotate && displayProfile) {
      const rotation = groupRef.current?.children[100].rotation;
      if(rotation) {
        camera.rotation.set(rotation.x,rotation.y,rotation.z)
      }
    } else {
      camera.rotation.set(0,0,0)
    }

  })

  
  useEffect(() => {
    if(groupRef.current && displayProfile) {
      camera.lookAt(groupRef.current.position)
    }
  },[])


  useEffect(() => {
    if(groupRef.current) {
      const explosionPower = 35;
      groupRef.current.children.forEach((child) => {
          // Create random direction vector
          const direction = new THREE.Vector3(
              Math.random() - 0.5,
              Math.random() - 0.5,
              Math.random() - 0.5
          ).normalize();

           // Calculate final position with some randomness
          const finalPos = direction.multiplyScalar(
              explosionPower * (0.9 + Math.random() * 0.6)
          );
    
          gsap.to(child.position, {
              x: finalPos.x,
              y: finalPos.y,
              z: finalPos.z,
              duration: 2,
              ease: "expo.out",
              delay: 3,
              
              onComplete: function() { 
                  // Continuous orbital motion
                  gsap.ticker.add(function() {
                  child.rotation.z +=  0.002;
                  child.rotation.x +=  0.001;
                  child.rotation.y +=  0.007;
                  });

                  if(sphereRef.current) {
                    gsap.to(sphereRef.current.parameters, {
                      radius: 5,
                      duration: 4,
                      delay: 2
                    })
                  }
                  
              }
          })

          
      })
  }

    
  },[]);


  
    useEffect(() => {
      if(displayProfile) {
        const position = groupRef.current?.children[100].position;
        const rotation = groupRef.current?.children[100].rotation;
        if(position && rotation) {
          gsap.to(camera.position, {
            x: position.x,
            y: position.y,
            z: position.z,
            duration: 2
          })
          gsap.to(camera.rotation, {
            x: rotation.x,
            y: rotation.y,
            z: rotation.z,
            duration: 0.2
          })
        }
      } else {
        gsap.to(camera.position, {
          x: 0,
          y: -18,
          z: 71,
          duration: 2
        })
        camera.rotation.set(0,0,0);
      }
  
      timeOut();
  
  
      return () => clearTimeout(timeOut());
    },[displayProfile])
  
    const timeOut = () => (
      setTimeout(() => {
        if(displayProfile) {
            setRotate(true);
        } 
      },2500)
    )
  
  
    useEffect(() => {
      if(displayContact || displayWorks) {
        gsap.to(camera.position, {
          x: 0,
          y: 0,
          z: 30,
          duration: 2
        })
      } else {
        gsap.to(camera.position, {
          x: 0,
          y: -18,
          z: 71,
          duration: 2
        }) 
      }
    },[displayContact,displayWorks])
  
  



  return (
    <>
      <primitive object={planet} ref={groupRef} />
        <pointLight ref={lightRef} position={[0, 0, 0]} intensity={5} color="#DB8DD0"  />
        <mesh position={[0,0,0]} ref={starRef} >
          <sphereGeometry ref={sphereRef} args={[ 5, 32, 32]} />
          <meshStandardMaterial
            normalMap={sunMap}
            color={'white'}
            emissive={'#DB8DD0'}
            emissiveIntensity={1}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
          {lightRef.current && starRef.current ? 
          (
            <EffectComposer>
              <SelectiveBloom
              lights={[lightRef.current!]}
              selection={[starRef.current!]}
              selectionLayer={10}
              intensity={1} 
              luminanceThreshold={0.02} 
              luminanceSmoothing={0.1}
            />
            </EffectComposer>
          ): null}
      <pointLight intensity={200} position={[0,0,-60]} color={'#c41fa1'}/>
      <Cloud ref={cloudRef} position={[0,0,-80]} scale={30} color={'#c41fa1'} seed={20} volume={0.3} opacity={0.05} growth={6}  />
      <Cloud ref={cloudRef} position={[0,0,-80]} scale={20} color={'#c41fa1'} seed={10} volume={0.2} opacity={0.03} growth={10}  />     
    </>
  )
}

export default PlanetModel
