"use client"

import { Suspense, useState } from "react"
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  StatsGl,
} from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Leva, useControls } from "leva"

import { Beetle } from "@/components/canvas/models/Beetle"
import SplatComponent from "@/components/canvas/splat-component"

function Camera() {
  const cameraPosition = [-70, 30, 70]

  return (
    <Suspense fallback={null}>
      <PerspectiveCamera makeDefault position={cameraPosition} />
    </Suspense>
  )
}

export default function Toggle() {
  const { showFirstModel, showSecondModel } = useControls({
    showFirstModel: true,

    showSecondModel: true,
  }) as any

  return (
    <>
      <div className="fixed right-0 top-32 z-50 h-full w-72">
        <Leva oneLineLabels fill />
      </div>

      <div className="absolute h-full w-full">
        <Canvas
          className="h-hull w-hull bg-background"
          gl={{ antialias: false }}
          dpr={1}
        >
          <Camera />
          <OrbitControls />

          {showFirstModel && (
            <SplatComponent
              maxSplats={20000000}
              splatPos={[2.4, 13.2, 4.8]}
              splatRot={[-1.57, 0.03, -3.91]}
              splatScale={17.8}
              splatUrl={
                "https://storage.polycam.io/captures/2ed756d0-17f5-461b-8911-44f8e1a8c47d/model.splat"
              }
            />
          )}
          {showSecondModel && (
            <SplatComponent
              maxSplats={20000000}
              splatPos={[-6.6, 20.3, 24.3]}
              splatRot={[-1.61, 0.05, -4.7]}
              splatScale={27.5}
              splatUrl={
                "https://storage.polycam.io/captures/27405cdb-6520-4454-b5a4-2a54e2f467c8/model.splat"
              }
            />
          )}
          <Environment preset="city" />
        </Canvas>
      </div>
    </>
  )
}
