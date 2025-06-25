'use client'
import { useEffect, useRef } from "react"
import { Water } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
 


export default function WaterEffect () {
    const waterRef = useRef<Water | null>(null);
    const waterTexture = useLoader(THREE.TextureLoader, 'models/waternormals.jpg');
    waterTexture.wrapS = waterTexture.wrapT = THREE.RepeatWrapping;
    waterTexture.offset


    useFrame(() => {
        if(waterRef.current && 'material' in waterRef.current) {
            waterRef.current.material.uniforms["time"].value += 0.007;
        }
    })


    return(
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -20, -50]}>
            <planeGeometry />
            <meshStandardMaterial color={0x000000} />
            <primitive object={new Water(new THREE.PlaneGeometry(window.innerWidth,window.innerHeight),{
                waterNormals: waterTexture,
                waterColor: 0x000000,
                textureWidth: 512,
				textureHeight: 512,
                sunDirection: new THREE.Vector3(),
				sunColor: 0x000000,
                distortionScale: 3.7,
                side: THREE.DoubleSide,
                fog: true,
                alpha: 1,
            })} 
            ref={waterRef}
            />
        </mesh>
    )
}