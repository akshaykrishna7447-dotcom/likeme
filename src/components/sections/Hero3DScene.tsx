'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Sphere, Torus, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

function FloatingElements() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
    }
  })

  // Luxury Gold Material
  const material = new THREE.MeshPhysicalMaterial({
    color: '#2563EB',
    metalness: 1,
    roughness: 0.1,
    envMapIntensity: 2,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  })

  // Glass Material
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.9,
    thickness: 1,
    envMapIntensity: 2,
  })

  return (
    <group ref={groupRef}>
      {/* Abstract Gold Torus */}
      <Float speed={2} rotationIntensity={2} floatIntensity={2} position={[-2, 1, -2]}>
        <Torus args={[0.5, 0.1, 32, 64]} material={material} />
      </Float>

      {/* Abstract Glass Sphere */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1} position={[3, -1, -3]}>
        <Sphere args={[0.8, 64, 64]} material={glassMaterial} />
      </Float>

      {/* Sharp Golden Cylinder (Scissors abstraction) */}
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={2} position={[2, 2, -1]}>
        <Cylinder args={[0.05, 0.05, 1.5, 32]} material={material} rotation={[Math.PI / 4, 0, 0]} />
        <Cylinder args={[0.05, 0.05, 1.5, 32]} material={material} rotation={[-Math.PI / 4, 0, 0]} />
      </Float>
      
      {/* Small Gold Spheres */}
      {Array.from({ length: 5 }).map((_, i) => (
        <Float key={i} speed={1 + i} rotationIntensity={2} floatIntensity={3} position={[(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 5 - 2]}>
          <Sphere args={[0.1, 32, 32]} material={material} />
        </Float>
      ))}
    </group>
  )
}

export function Hero3DScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-80">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#2563EB" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#06B6D4" />
        <FloatingElements />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
