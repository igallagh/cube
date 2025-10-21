import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { RubiksCube } from './RubiksCube';
export function CubeCanvas() {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [5, 5, 5], fov: 25 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        <Suspense fallback={null}>
          <RubiksCube />
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </div>
  );
}