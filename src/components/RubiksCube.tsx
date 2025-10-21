import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import useCubeStore from '@/hooks/useCubeStore';
const CUBIE_SIZE = 1;
const CUBIE_SPACING = 0.05;
const CUBE_SIZE = CUBIE_SIZE + CUBIE_SPACING;
const COLORS = {
  white: '#FFFFFF', yellow: '#FFD700', blue: '#0045AD',
  green: '#009B48', red: '#B90000', orange: '#FF5900',
  black: '#222222',
};
const FACE_MATERIALS = {
  px: new THREE.MeshStandardMaterial({ color: COLORS.red, roughness: 0.2, metalness: 0.1 }),
  nx: new THREE.MeshStandardMaterial({ color: COLORS.orange, roughness: 0.2, metalness: 0.1 }),
  py: new THREE.MeshStandardMaterial({ color: COLORS.white, roughness: 0.2, metalness: 0.1 }),
  ny: new THREE.MeshStandardMaterial({ color: COLORS.yellow, roughness: 0.2, metalness: 0.1 }),
  pz: new THREE.MeshStandardMaterial({ color: COLORS.blue, roughness: 0.2, metalness: 0.1 }),
  nz: new THREE.MeshStandardMaterial({ color: COLORS.green, roughness: 0.2, metalness: 0.1 }),
  inside: new THREE.MeshStandardMaterial({ color: COLORS.black, roughness: 0.5, metalness: 0.5 }),
};
const getCubieMaterials = (pos: THREE.Vector3) => {
  const materials = [];
  materials.push(pos.x > 0 ? FACE_MATERIALS.px : FACE_MATERIALS.inside);
  materials.push(pos.x < 0 ? FACE_MATERIALS.nx : FACE_MATERIALS.inside);
  materials.push(pos.y > 0 ? FACE_MATERIALS.py : FACE_MATERIALS.inside);
  materials.push(pos.y < 0 ? FACE_MATERIALS.ny : FACE_MATERIALS.inside);
  materials.push(pos.z > 0 ? FACE_MATERIALS.pz : FACE_MATERIALS.inside);
  materials.push(pos.z < 0 ? FACE_MATERIALS.nz : FACE_MATERIALS.inside);
  return materials;
};
type CubieState = {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  key: string;
};
export function RubiksCube() {
  const groupRef = useRef<THREE.Group>(null!);
  const isSpinning = useCubeStore((s) => s.isSpinning);
  const moves = useCubeStore((s) => s.moves);
  const finishMove = useCubeStore((s) => s.finishMove);
  const setAnimating = useCubeStore((s) => s.setAnimating);
  const isAnimating = useCubeStore((s) => s.isAnimating);
  const setIsSolved = useCubeStore((s) => s.setIsSolved);
  const [animationState, setAnimationState] = useState<{
    cubiesToAnimate: CubieState[];
    axis: THREE.Vector3;
    angle: number;
    progress: number;
  } | null>(null);
  const initialCubies = useMemo(() => {
    const cubies: CubieState[] = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue;
          cubies.push({
            position: new THREE.Vector3(x * CUBE_SIZE, y * CUBE_SIZE, z * CUBE_SIZE),
            quaternion: new THREE.Quaternion(),
            key: `${x},${y},${z}`,
          });
        }
      }
    }
    return cubies;
  }, []);
  const [cubieStates, setCubieStates] = useState<CubieState[]>(initialCubies);
  useEffect(() => {
    if (moves.length > 0 && !animationState) {
      const { axis, layer, direction } = moves[0];
      const axisVector = new THREE.Vector3(axis === 'x' ? 1 : 0, axis === 'y' ? 1 : 0, axis === 'z' ? 1 : 0);
      const cubiesToAnimate = cubieStates.filter(c => Math.abs(c.position[axis] - layer * CUBE_SIZE) < 0.1);
      setAnimationState({
        cubiesToAnimate,
        axis: axisVector,
        angle: (Math.PI / 2) * direction,
        progress: 0,
      });
    }
  }, [moves, animationState, cubieStates]);
  useFrame((_, delta) => {
    if (isSpinning && !isAnimating && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.1;
    }
    if (animationState) {
      const { cubiesToAnimate, axis, angle, progress } = animationState;
      const animationSpeed = 8;
      const newProgress = Math.min(1, progress + delta * animationSpeed);
      if (newProgress >= 1) {
        const rotation = new THREE.Quaternion().setFromAxisAngle(axis, angle);
        setCubieStates(currentStates =>
          currentStates.map(c => {
            if (cubiesToAnimate.some(ac => ac.key === c.key)) {
              const newPosition = c.position.clone().applyQuaternion(rotation);
              const newQuaternion = new THREE.Quaternion().multiplyQuaternions(rotation, c.quaternion);
              return { ...c, position: newPosition, quaternion: newQuaternion };
            }
            return c;
          })
        );
        setAnimationState(null);
        finishMove();
        if (moves.length === 1) {
          setAnimating(false);
          if (useCubeStore.getState().history.length === 0) {
            setIsSolved(true);
          }
        }
      } else {
        setAnimationState({ ...animationState, progress: newProgress });
      }
    }
  });
  const animatedCubies = useMemo(() => {
    if (!animationState) return cubieStates;
    const { cubiesToAnimate, axis, angle, progress } = animationState;
    const rotation = new THREE.Quaternion().setFromAxisAngle(axis, angle * progress);
    return cubieStates.map(c => {
      if (cubiesToAnimate.some(ac => ac.key === c.key)) {
        const animatedPosition = c.position.clone().applyQuaternion(rotation);
        const animatedQuaternion = new THREE.Quaternion().multiplyQuaternions(rotation, c.quaternion);
        return { ...c, position: animatedPosition, quaternion: animatedQuaternion };
      }
      return c;
    });
  }, [cubieStates, animationState]);
  return (
    <group ref={groupRef}>
      {animatedCubies.map(({ position, quaternion, key }) => (
        <RoundedBox
          key={key}
          args={[CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE]}
          radius={0.05}
          smoothness={4}
          position={position}
          quaternion={quaternion}
          material={getCubieMaterials(new THREE.Vector3(...key.split(',').map(Number)))}
        />
      ))}
    </group>
  );
}