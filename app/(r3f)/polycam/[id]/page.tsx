"use client"

import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

import SplatComponent from "@/components/canvas/splat-component"

export default function PolycamModel({ params }: { params: { id: string } }) {
  const splatUrl = `https://storage.polycam.io/captures/${params.id}/model.splat`

  console.log(params.id)
  return (
    <section className="fixed left-0 top-0 h-screen w-screen">
      <Canvas
        className="h-hull w-hull bg-background"
        gl={{ antialias: false }}
        dpr={0.7}
      >
        <OrbitControls makeDefault />

        <SplatComponent
          maxSplats={10000000}
          splatPos={[0, 0, 0]}
          splatRot={[-Math.PI / 2, 0, 0]}
          splatScale={1}
          splatUrl={splatUrl}
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
  )
}
