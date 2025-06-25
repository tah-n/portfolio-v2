'use client'

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from 'three';

type PropsType = {
    pointsArray: Float32Array;
}

const LightOnStraightPath = ({pointsArray}: PropsType) => {
  const lightRef = useRef<THREE.Mesh>(null);
  const progress = useRef(0);
  const geometry = new THREE.BufferGeometry();
  

  useFrame((_, delta) => {
    progress.current = (progress.current + delta * 0.6) % (pointsArray.length - 1);
    
    const index = Math.floor(progress.current);
    const lerpFactor = progress.current % 1;



    // Interpolate between two points
    if(index < Math.floor(pointsArray.length / 3) - 1) {
        const start = new THREE.Vector3(pointsArray[index * 3], pointsArray[index * 3 + 1], pointsArray[index * 3 + 2]);
        const end = new THREE.Vector3(pointsArray[(index + 1) * 3], pointsArray[(index + 1) * 3 + 1], pointsArray[(index + 1) * 3 + 2]);
        const position = new THREE.Vector3().lerpVectors(start, end, lerpFactor);

        if (lightRef.current) {
            lightRef.current.position.set(position.x, position.y, position.z);
        }
    }

   
  });



  geometry.setAttribute("position", new THREE.Float32BufferAttribute(pointsArray, 3))
  geometry.computeBoundingSphere();

  return (
    <>
      {/* Path using LineSegments */}
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color="white" linewidth={2} transparent opacity={0.01} />
      </lineSegments>

      {/* Moving Light */}
      <mesh ref={lightRef} position={[0, 0, 0.1]}>
        <planeGeometry args={[0.03, 0.03]} />
        <meshBasicMaterial color="white" transparent opacity={0.3} depthTest={false} />
      </mesh>
    </>
  );
};

export default LightOnStraightPath;