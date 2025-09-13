import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Animated floating particles
function AnimatedParticles() {
  const ref = useRef<THREE.Points>(null);
  const { size } = useThree();

  const particles = useMemo(() => {
    const temp = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const i3 = i * 3;
      temp[i3] = (Math.random() - 0.5) * 10;
      temp[i3 + 1] = (Math.random() - 0.5) * 10;
      temp[i3 + 2] = (Math.random() - 0.5) * 10;
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#10b981"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

// Floating property icons
function FloatingBuilding({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime / 2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
      <mesh ref={ref} position={position}>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial color="#10b981" transparent opacity={0.3} />
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.35, 0.2, 0.35]} />
          <meshStandardMaterial color="#059669" transparent opacity={0.4} />
        </mesh>
      </mesh>
    </Float>
  );
}

// Main 3D scene
function Scene() {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#10b981" intensity={0.3} />
      <pointLight position={[-10, -10, -10]} color="#06b6d4" intensity={0.2} />
      
      <AnimatedParticles />
      
      {/* Floating buildings */}
      <FloatingBuilding position={[-3, 0, -2]} />
      <FloatingBuilding position={[3, -1, -3]} />
      <FloatingBuilding position={[0, 1, -4]} />
      <FloatingBuilding position={[-1.5, -0.5, -1]} />
      <FloatingBuilding position={[2, 0.5, -2.5]} />
    </>
  );
}

// Main component
export default function PropertyValuation3DBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}