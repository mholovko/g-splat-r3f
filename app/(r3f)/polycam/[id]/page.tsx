"use client"

import { useRef } from "react"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Leva, useControls } from "leva"

import SplatComponent from "@/components/canvas/splat-component"

export default function PolycamModel({ params }: { params: { id: string } }) {
  const splatUrl = `https://storage.polycam.io/captures/${params.id}/model.splat`
  const leveRef = useRef(null)
  // On screen controls
  const { maxSplats, splatPos, splatRot, splatScale, splatScaleFactor } =
    useControls({
      maxSplats: {
        label: "Splats count",
        value: 2000000,
        min: 0,
        max: 2000000,
        step: 1,
      },

      splatScaleFactor: {
        label: "Scale Factor",
        value: 1,
        min: 0,
        max: 1,
        step: 0.01,
      },

      splatPos: {
        value: [0, 0, 0],
        label: "Position",
        step: 0.1,
      },
      splatRot: {
        value: [-Math.PI / 2, 0, 0],
        min: [-Math.PI, -Math.PI, -Math.PI],
        max: [Math.PI, Math.PI, Math.PI],
        step: 0.01,
        label: "rotation",
      },
      splatScale: {
        value: 1,
        min: 0,
        max: 40.0,
        step: 0.1,
        label: "Scale",
      },
    }) as any

  return (
    <>
      <div className="fixed right-0 top-32 z-50 h-full w-72">
        <Leva oneLineLabels fill />
      </div>
      <section className="fixed left-0 top-0 h-screen w-screen">
        <Canvas
          className="h-hull w-hull bg-background"
          gl={{ antialias: false }}
          dpr={0.7}
        >
          <OrbitControls makeDefault />

          <SplatComponent
            maxSplats={maxSplats}
            splatPos={splatPos}
            splatRot={splatRot}
            splatScale={splatScale}
            splatUrl={splatUrl}
            splatScaleFactor={splatScaleFactor}
          />

          {/* <GizmoHelper
          alignment="bottom-right" // widget alignment within scene
          margin={[80, 80]} // widget margins (X, Y)
        >
          <GizmoViewport
            axisColors={["red", "green", "blue"]}
            labelColor="black"
          />
        </GizmoHelper> */}
        </Canvas>
      </section>
    </>
  )
}
