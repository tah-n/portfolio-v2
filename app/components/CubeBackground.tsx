'use client'

import { useLoader, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { CubeTexture, CubeTextureLoader } from "three";


// Loads the skybox texture and applies it to the scene.
export default function SkyBox() {
    const { scene } = useThree();
    const loader = new CubeTextureLoader();
    // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
    const texture = loader.load([
        "/static/cubeMap/px.png",
        "/static/cubeMap/nx.png",
        "/static/cubeMap/py.png",
        "/static/cubeMap/ny.png",
        "/static/cubeMap/pz.png",
        "/static/cubeMap/nz.png",
    ]);
  
    // Set the scene background property to the resulting texture.
    scene.background = texture;
    return null;
  }