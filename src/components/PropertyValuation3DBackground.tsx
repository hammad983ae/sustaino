import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Environment, Text, Box } from '@react-three/drei';
import * as THREE from 'three';

// Currency-style security pattern particles
function SecurityPatternParticles() {
  const ref = useRef<THREE.Points>(null);
  const { size } = useThree();

  const particles = useMemo(() => {
    const temp = new Float32Array(3000 * 3);
    const gridSize = 15;
    let index = 0;
    
    // Create intricate security pattern like on currency
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          if (index < 3000) {
            const i3 = index * 3;
            // Create wave-like security pattern
            temp[i3] = (x - gridSize/2) * 0.8 + Math.sin(y * 0.5) * 0.3;
            temp[i3 + 1] = (y - gridSize/2) * 0.8 + Math.cos(x * 0.5) * 0.3;
            temp[i3 + 2] = (z - gridSize/2) * 0.8 + Math.sin(x + y) * 0.2;
            index++;
          }
        }
      }
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta / 20;
      ref.current.rotation.y += delta / 25;
      ref.current.rotation.z += delta / 30;
    }
  });

  return (
    <group>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#2d5a3d"
          size={0.001}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

// Currency watermark lines
function WatermarkLines() {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const lines = useMemo(() => {
    const lineGeometry = new THREE.BufferGeometry();
    const lineCount = 50;
    const positions = new Float32Array(lineCount * 6); // 2 points per line, 3 coords each
    
    for (let i = 0; i < lineCount; i++) {
      const i6 = i * 6;
      const angle = (i / lineCount) * Math.PI * 2;
      const radius = 3 + Math.sin(i * 0.5) * 1;
      
      // Start point
      positions[i6] = Math.cos(angle) * radius;
      positions[i6 + 1] = Math.sin(angle) * radius;
      positions[i6 + 2] = -2;
      
      // End point
      positions[i6 + 3] = Math.cos(angle) * (radius + 1);
      positions[i6 + 4] = Math.sin(angle) * (radius + 1);
      positions[i6 + 5] = 2;
    }
    
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return lineGeometry;
  }, []);

  return (
    <group ref={linesRef}>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color="#1f4529" transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}

// Currency-style denomination symbols
function CurrencySymbol({ position, symbol }: { position: [number, number, number], symbol: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.05}>
      <Text
        ref={ref}
        position={position}
        fontSize={0.8}
        color="#2d5a3d"
        anchorX="center"
        anchorY="middle"
        font="/fonts/serif.woff"
        letterSpacing={0.1}
        material-transparent
        material-opacity={0.15}
      >
        {symbol}
      </Text>
    </Float>
  );
}

// Ornate currency border elements
function OrnateElement({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Central ornate design */}
      <mesh>
        <torusGeometry args={[0.3, 0.05, 8, 16]} />
        <meshStandardMaterial color="#1f4529" transparent opacity={0.2} />
      </mesh>
      {/* Inner details */}
      <mesh>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#2d5a3d" transparent opacity={0.15} />
      </mesh>
      {/* Outer ring */}
      <mesh>
        <torusGeometry args={[0.5, 0.02, 6, 12]} />
        <meshStandardMaterial color="#1a3d26" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

// Trademark symbol
function TrademarkSymbol() {
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
      <Text
        position={[4, 3, -2]}
        fontSize={0.3}
        color="#1f4529"
        anchorX="center"
        anchorY="middle"
        font="/fonts/serif.woff"
        material-transparent
        material-opacity={0.3}
      >
        ™
      </Text>
    </Float>
  );
}

// Main currency-themed 3D scene
function Scene() {
  return (
    <>
      <Environment preset="forest" />
      <ambientLight intensity={0.3} color="#f0f8f0" />
      <pointLight position={[10, 10, 10]} color="#2d5a3d" intensity={0.4} />
      <pointLight position={[-10, -10, -10]} color="#1f4529" intensity={0.3} />
      <directionalLight position={[0, 5, 5]} color="#3a6b4a" intensity={0.2} />
      
      {/* Security pattern background */}
      <SecurityPatternParticles />
      
      {/* Currency watermark lines */}
      <WatermarkLines />
      
      {/* Currency denomination symbols */}
      <CurrencySymbol position={[-3, 2, -3]} symbol="$" />
      <CurrencySymbol position={[3, -1, -4]} symbol="100" />
      <CurrencySymbol position={[0, 1, -5]} symbol="ESG" />
      <CurrencySymbol position={[-2, -2, -3]} symbol="★" />
      <CurrencySymbol position={[2.5, 2.5, -4]} symbol="◊" />
      
      {/* Ornate currency border elements */}
      <OrnateElement position={[-4, 0, -6]} />
      <OrnateElement position={[4, 0, -6]} />
      <OrnateElement position={[0, 3, -6]} />
      <OrnateElement position={[0, -3, -6]} />
      
      {/* Trademark symbol */}
      <TrademarkSymbol />
      
      {/* Subtle grid pattern like security thread */}
      <gridHelper args={[10, 20]} position={[0, -4, -8]} rotation={[Math.PI / 2, 0, 0]} />
    </>
  );
}

// Main component with currency-themed background
export default function PropertyValuation3DBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Currency paper texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-green-100/20 opacity-40" />
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(45deg, transparent 25%, rgba(45, 90, 61, 0.02) 25%, rgba(45, 90, 61, 0.02) 50%, transparent 50%, transparent 75%, rgba(45, 90, 61, 0.02) 75%),
          linear-gradient(-45deg, transparent 25%, rgba(31, 69, 41, 0.02) 25%, rgba(31, 69, 41, 0.02) 50%, transparent 50%, transparent 75%, rgba(31, 69, 41, 0.02) 75%)
        `,
        backgroundSize: '20px 20px'
      }} />
      
      {/* 3D Currency Scene */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
      
      {/* Subtle currency border frame */}
      <div className="absolute inset-4 border border-green-800/10 rounded-lg pointer-events-none" />
      <div className="absolute inset-8 border border-green-700/5 rounded-md pointer-events-none" />
    </div>
  );
}