'use client'
import { Cloud, PointMaterial, useGLTF, Points } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import React, { use, useEffect, useMemo, useRef, useState } from 'react';
import { Group, MeshStandardMaterial } from 'three';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import useProps from './lib/useStore';
import gsap from 'gsap';


export default function ShatteredPlanet() {
  const { scene: planet, materials: planetMaterial } = useGLTF('models/brokenPlanet1.glb');  
  const { scene: shateredPieces, materials: piecesMaterial } = useGLTF('models/shatteredpieces.glb')
  const groupRef = useRef<Group>(null);
  const piecesRef = useRef<Group>(null);
  const cloudRef = useRef<Group>(null);
  const { camera } = useThree();
  const displayProfile = useProps((state) => state.displayProfile);
  const [rotate,setRotate] = useState(false);
  const displayContact = useProps(state => state.displayContact);


  const [ colorMap, normalMap, displacementMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
    'models/shinyTexture/ground_0025_color_2k.jpg',
    'models/shinyTexture/ground_0025_normal_directx_2k.png',
    'models/shinyTexture/ground_0025_height_2k.png',
    'models/shinyTexture/ground_0025_roughness_2k.jpg',
    'models/shinyTexture/ground_0025_ao_2k.jpg',
  ]);


  //planet material
  Object.values(planetMaterial).forEach((material) => {
    if(material instanceof MeshStandardMaterial) {
        material.map = colorMap
        material.color = new THREE.Color('#2e012d')
        material.normalMap = normalMap;
        material.roughnessMap = roughnessMap;
        material.displacementScale = 0.15;
        material.displacementMap = displacementMap;
        material.aoMap = aoMap;
        material.metalness = 0.8;
        material.roughness = 0.5;
        material.emissive = new THREE.Color('#3b010c');
        material.emissiveIntensity = 0.2;
        material.side = THREE.DoubleSide;
      
    }
  })

  //pieces materials
  Object.values(piecesMaterial).forEach((material) => {
    if(material instanceof MeshStandardMaterial) {
        // material.map = colorMap
        material.color = new THREE.Color('#2e012d')
        material.normalMap = normalMap;
        material.roughnessMap = roughnessMap;
        material.displacementScale = 0.01;
        material.displacementMap = displacementMap;
        material.aoMap = aoMap;
        material.metalness = 1;
        material.roughness = 0.1;
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
        


  const growthSpeed = Math.random() * 0.5 + 0.09;
  useFrame(({clock}) => {
    const elapsedTime = clock.elapsedTime;
    //animations
    if(piecesRef.current) {
      piecesRef.current.rotation.y = elapsedTime * 0.05;
      piecesRef.current.children.forEach((piece) => {
        piece.rotation.y += 0.002;
        piece.rotation.z += 0.0012;
        piece.rotation.x += 0.0016;
      })
    }
    if(groupRef.current) {
        groupRef.current.rotation.y += 0.001;
    }
    if(cloudRef.current) {
      const growthFactor = 20 + Math.sin(elapsedTime * growthSpeed) * 5;
      cloudRef.current.scale.set(growthFactor,growthFactor,growthFactor)
    }

    if(rotate && displayProfile) {
      const rotation = piecesRef.current?.children[100].rotation;
      if(rotation) {
        camera.rotation.set(rotation.x,rotation.y,rotation.z)
      }
    } else {
      camera.rotation.set(0,0,0)
    }

    
  })

  useEffect(() => {
    // console.log(piecesRef.current?.children[100].rotation)
    if(groupRef.current && displayProfile) {
      camera.lookAt(groupRef.current.position)
    }

  },[])

  useEffect(() => {
    if(displayProfile) {
      const position = piecesRef.current?.children[100].position;
      const rotation = piecesRef.current?.children[100].rotation;
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
    if(displayContact) {
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
  },[displayContact])



  return (
    <>
      <primitive object={planet} ref={groupRef} />
      <primitive object={shateredPieces} ref={piecesRef} />
      <pointLight intensity={200} position={[0,0,-60]} color={'#c41fa1'}/>
      <Cloud ref={cloudRef} position={[0,0,-80]} scale={30} color={'#c41fa1'} seed={20} volume={0.3} opacity={0.05} growth={6}  />
      <Cloud ref={cloudRef} position={[0,0,-80]} scale={20} color={'#c41fa1'} seed={10} volume={0.2} opacity={0.03} growth={10}  />     
    </>
  )
}


export function Particles () {
  const particlesRef = useRef<THREE.Points>(null);
  const particles = useMemo(() => {
    const position = [];
    for(let i = 0; i < 100; i++) {
      position.push((Math.random() - 0.5) * 400);//x
      position.push((Math.random() - 0.2) * 70 );
      position.push((Math.random() - 2) * 60);
    }

    return new Float32Array(position);

  },[]);
  const particles1 = useMemo(() => {
    const position = [];
    for(let i = 0; i < 100; i++) {
      position.push((Math.random() - 0.5) * 400);//x
      position.push((Math.random() - 0.2) * 140 );
      position.push((Math.random() - 2) * 60);
    }

    return new Float32Array(position);

  },[]);


  return (
    <>
      <Points positions={particles} ref={particlesRef} >
        <PointMaterial color={'white'} transparent size={0.4} />
      </Points>
      <Points positions={particles1} >
        <PointMaterial color={'white'} transparent size={0.4} />
      </Points>
    </> 
  )
}
