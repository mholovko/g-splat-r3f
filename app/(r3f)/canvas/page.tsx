"use client"

import { Suspense, useState } from "react"
import { Environment, OrbitControls, StatsGl } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Leva, useControls } from "leva"

import { Beetle } from "@/components/canvas/models/Beetle"
import SplatComponent from "@/components/canvas/splat-component"

const splatUrls = [
  "https://antimatter15.com/splat-data/train.splat",
  "https://antimatter15.com/splat-data/nike.splat",
  "https://antimatter15.com/splat-data/bicycle.splat",

  "https://storage.polycam.io/captures/f55f2844-bc97-46be-b60f-be3c6b18be3a/model.splat",
  "https://storage.polycam.io/captures/27405cdb-6520-4454-b5a4-2a54e2f467c8/model.splat",
  "https://storage.polycam.io/captures/2ed756d0-17f5-461b-8911-44f8e1a8c47d/model.splat",
  "https://storage.polycam.io/captures/93f00b51-4b10-4b25-b3ce-e21b3c9aa558/model.splat",
] as const

export default function CanvasPage() {
  // On screen controls
  const { splatUrl, maxSplats, splatPos, splatRot, splatScale } = useControls({
    splatUrl: { label: "Select Model", options: splatUrls },

    maxSplats: {
      label: "Splats count",
      value: 2000000,
      min: 0,
      max: 2000000,
      step: 1,
    },

    splatPos: {
      value: [-14.2, 3.8, -33.9],
      label: "Position",
      step: 0.1,
    },
    splatRot: {
      value: [-1.58, 0, -0.71],
      min: [-Math.PI, -Math.PI, -Math.PI],
      max: [Math.PI, Math.PI, Math.PI],
      step: 0.01,
      label: "rotation",
    },
    splatScale: {
      value: 26,
      min: 0,
      max: 40.0,
      step: 0.1,
      label: "Scale",
    },
  }) as any

  return (
    <div className="absolute h-full w-full">
      {/* <Leva oneLineLabels /> */}
      <Canvas
        className="h-hull w-hull bg-background"
        gl={{ antialias: false }}
        dpr={1}
      >
        {/* <StatsGl /> */}
        <OrbitControls />
        {/* <Beetle /> */}
        <SplatComponent
          maxSplats={maxSplats}
          splatPos={splatPos}
          splatRot={splatRot}
          splatScale={splatScale}
          splatUrl={splatUrl}
        />

        <SplatComponent
          maxSplats={20000000}
          splatPos={[2.4, 13.2, 4.8]}
          splatRot={[-1.57, 0.03, 0]}
          splatScale={17.8}
          splatUrl={
            "https://storage.polycam.io/captures/7fd24cd2-77d5-40c5-afd7-807b9ec20a60/model.splat"
          }
        />
        <mesh position={[-10, 20, 10]}></mesh>
        {/* <SplatComponent
          maxSplats={20000000}
          splatPos={[-112.2, 4.9, -70.0]}
          splatRot={[-1.63, -0.03, 0.84]}
          splatScale={40}
          splatUrl={
            "https://storage.polycam.io/captures/f55f2844-bc97-46be-b60f-be3c6b18be3a/model.splat"
          }
        /> */}

        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
