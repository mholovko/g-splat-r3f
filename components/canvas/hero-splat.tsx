"use client"

import { useEffect, useRef } from "react"
import { PerspectiveCamera } from "@react-three/drei"
import { Canvas, useThree } from "@react-three/fiber"
import * as THREE from "three"

import { SplatDebug } from "@/lib/g-splat/splat-debug"

const Camera = () => {
  const cameraPosition = [10, 5, 0]
  const cameraRotationSpeed = 0.3
  const cameraRadius = 14

  const { camera } = useThree()
  const clock = useRef(new THREE.Clock())

  useEffect(() => {
    const animateCamera = () => {
      const elapsedTime = clock.current.getElapsedTime()
      const speedFactor = cameraRotationSpeed
      const radius = cameraRadius

      camera.position.x = radius * Math.cos(elapsedTime * speedFactor)
      camera.position.z = radius * Math.sin(elapsedTime * speedFactor)

      camera.lookAt(new THREE.Vector3(0, 0, 0))

      requestAnimationFrame(animateCamera)
    }

    animateCamera() // Start the animation loop
  }, [camera])
  return (
    <PerspectiveCamera
      makeDefault
      position={cameraPosition}
      fov={75}
      aspect={window.innerWidth / window.innerHeight}
      near={0.1}
      far={200000000}
    />
  )
}

export default function HeroSplat() {
  return (
    <Canvas
      className="h-hull w-hull bg-background"
      gl={{ antialias: false }}
      dpr={1}
    >
      <Camera />
      <group>
        <SplatDebug />
      </group>
    </Canvas>
  )
}
