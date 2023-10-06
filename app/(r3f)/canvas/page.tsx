"use client"

import { Suspense, useState } from "react"
import { Environment, OrbitControls, StatsGl } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Leva, useControls } from "leva"

import SplatComponent from "@/components/canvas/splat-component"

const splatUrls = [
  "https://antimatter15.com/splat-data/train.splat",
  "https://antimatter15.com/splat-data/nike.splat",
  "https://antimatter15.com/splat-data/bicycle.splat",

  "https://storage.polycam.io/captures/aad80a3f-0c7f-43f1-ba36-8785eae1cb51/model.splat",
  "https://storage.polycam.io/captures/27405cdb-6520-4454-b5a4-2a54e2f467c8/model.splat",
  "https://storage.polycam.io/captures/27405cdb-6520-4454-b5a4-2a54e2f467c8/model.splat",
  "https://storage.polycam.io/captures/93f00b51-4b10-4b25-b3ce-e21b3c9aa558/model.splat",
] as const

function App() {
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
      <Leva oneLineLabels style={{ top: "48px" }} />
      <Canvas
        className="h-hull w-hull bg-background"
        gl={{ antialias: false }}
        dpr={1}
      >
        <StatsGl />
        <OrbitControls />

        <SplatComponent
          maxSplats={maxSplats}
          splatPos={splatPos}
          splatRot={splatRot}
          splatScale={splatScale}
          splatUrl={splatUrl}
        />

        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

export default App
