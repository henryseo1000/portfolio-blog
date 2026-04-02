"use client";

import { Canvas } from '@react-three/fiber';
import {
  CameraControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { Group } from 'three';
import Dots from './Dots';

function IntroSection() {

  return (
    <div className='w-screen h-screen bg-[var(--background-plain)]'>
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <Dots/>
          <PerspectiveCamera position={[100, 100, 10]} />
        </Canvas>
    </div>
  )
}

export default IntroSection