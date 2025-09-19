import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// WebGL Detection Hook
function useWebGLSupport() {
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        setIsSupported(false);
        setError('WebGL not supported');
        return;
      }

      // Test for common WebGL extensions
      const extensions = [
        'OES_texture_float',
        'OES_texture_half_float',
        'WEBGL_depth_texture'
      ];
      
      extensions.forEach(ext => {
        const webglContext = gl as WebGLRenderingContext;
        if (!webglContext.getExtension(ext)) {
          console.warn(`WebGL extension ${ext} not available`);
        }
      });

    } catch (err) {
      setIsSupported(false);
      setError('WebGL context creation failed');
      console.error('WebGL detection error:', err);
    }
  }, []);

  return { isSupported, error };
}

// Fallback component with CSS animations
function CSSFallbackBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10" />
      
      {/* Animated particles using CSS */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/60 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Floating building shapes using CSS */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-emerald-400/20 animate-float"
            style={{
              width: '20px',
              height: '40px',
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '4s',
              borderRadius: '2px',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Error Boundary for 3D Canvas
function Canvas3DErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message?.includes('WebGL') || event.message?.includes('THREE')) {
        setHasError(true);
        console.error('3D Canvas Error:', event.error);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return <CSSFallbackBackground />;
  }

  return <>{children}</>;
}

// Animated floating particles
function AnimatedParticles() {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const temp = new Float32Array(1000 * 3); // Reduced from 2000 for performance
    for (let i = 0; i < 1000; i++) {
      const i3 = i * 3;
      temp[i3] = (Math.random() - 0.5) * 8;
      temp[i3 + 1] = (Math.random() - 0.5) * 8;
      temp[i3 + 2] = (Math.random() - 0.5) * 8;
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#10b981"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.5}
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
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.05} floatIntensity={0.05}>
      <mesh ref={ref} position={position}>
        <boxGeometry args={[0.25, 0.6, 0.25]} />
        <meshStandardMaterial color="#10b981" transparent opacity={0.25} />
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[0.3, 0.15, 0.3]} />
          <meshStandardMaterial color="#059669" transparent opacity={0.3} />
        </mesh>
      </mesh>
    </Float>
  );
}

// Main 3D scene with error handling
function Scene() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) return null;

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#10b981" intensity={0.2} />
      <pointLight position={[-5, -5, -5]} color="#06b6d4" intensity={0.15} />
      
      <AnimatedParticles />
      
      {/* Reduced number of floating buildings */}
      <FloatingBuilding position={[-2, 0, -1.5]} />
      <FloatingBuilding position={[2, -0.5, -2]} />
      <FloatingBuilding position={[0, 0.5, -2.5]} />
    </>
  );
}

// Main component with comprehensive error handling
export default function PropertyValuation3DBackground() {
  const { isSupported, error } = useWebGLSupport();
  const [canvasError, setCanvasError] = useState(false);

  // If WebGL is not supported, use CSS fallback
  if (!isSupported || error) {
    console.warn('WebGL not supported, using CSS fallback:', error);
    return <CSSFallbackBackground />;
  }

  // If Canvas fails to render, use CSS fallback
  if (canvasError) {
    return <CSSFallbackBackground />;
  }

  return (
    <Canvas3DErrorBoundary>
      <div className="fixed inset-0 -z-10 opacity-30">
        <Canvas
          camera={{ position: [0, 0, 4], fov: 60 }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]} // Limit pixel ratio for performance
          performance={{ min: 0.5 }} // Lower performance threshold
          onCreated={({ gl }) => {
            try {
              // Test WebGL context
              gl.getContext();
            } catch (err) {
              console.error('Canvas creation error:', err);
              setCanvasError(true);
            }
          }}
          onError={(error) => {
            console.error('Canvas error:', error);
            setCanvasError(true);
          }}
        >
          <Scene />
        </Canvas>
      </div>
    </Canvas3DErrorBoundary>
  );
}