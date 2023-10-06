"use client"

import { Suspense } from "react"
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  TransformControls,
} from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Leva } from "leva"

import { Beetle } from "@/components/canvas/models/Beetle"
import SplatComponent from "@/components/canvas/splat-component"

function Camera() {
  const cameraPosition = [-150, 150, 150]

  return (
    <Suspense fallback={null}>
      <PerspectiveCamera makeDefault position={cameraPosition} />
    </Suspense>
  )
}

export default function GltfPage() {
  return (
    <div className="absolute h-full w-full">
      <Leva oneLineLabels collapsed />
      <Canvas
        className="h-hull w-hull bg-background"
        gl={{ antialias: false }}
        dpr={1}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[20, 30, 10]} intensity={1} />

        <TransformControls mode="translate">
          <Beetle />
        </TransformControls>
        <SplatComponent
          maxSplats={100000000}
          splatPos={[-55.6, 20.0, 25.8]}
          splatRot={[-1.61, 0.05, -4.7]}
          splatScale={26.1}
          splatUrl={
            "https://storage.polycam.io/captures/27405cdb-6520-4454-b5a4-2a54e2f467c8/model.splat"
          }
        />
        <OrbitControls makeDefault />
        <Camera />

        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
