'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Sparkles } from '@react-three/drei'

export function Global3DScene() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  
  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none mix-blend-screen opacity-100">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: 'high-performance', antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} color="#2563EB" />
        <directionalLight position={[-10, -10, -10]} intensity={1} color="#06B6D4" />

        {/* Dense Volumetric Golden Dust Optimized */}
        <Sparkles 
          count={150} 
          scale={[20, 20, 10]} 
          size={5} 
          speed={0.2} 
          opacity={0.4} 
          color="#2563EB" 
        />
        <Sparkles 
          count={50} 
          scale={[20, 20, 15]} 
          size={3} 
          speed={0.5} 
          opacity={0.2} 
          color="#06B6D4" 
        />

        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

