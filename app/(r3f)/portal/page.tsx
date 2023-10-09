"use client"

import { Suspense, useRef, useState } from "react"
import {
  Environment,
  MeshPortalMaterial,
  OrbitControls,
  PerspectiveCamera,
  Sky,
  StatsGl,
  TransformControls,
  useGLTF,
} from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { Leva, useControls } from "leva"

import { Beetle } from "@/components/canvas/models/Beetle"
import SplatComponent from "@/components/canvas/splat-component"

export default function Portal() {
  const meshRef = useRef(null)
  return (
    <>
      <div className="absolute h-full w-full">
        <Canvas camera={{ position: [-70, 30, 70], fov: 75 }}>
          <group position={[0, -2, 0]}>
            <SplatComponent
              maxSplats={20000000}
              splatPos={[11, 0, 4.8]}
              splatRot={[-1.57, 0.03, 1.77]}
              splatScale={17.8}
              splatUrl={
                "https://storage.polycam.io/captures/7fd24cd2-77d5-40c5-afd7-807b9ec20a60/model.splat"
              }
            />
            <TransformControls object={meshRef} mode="translate" />
            <mesh ref={meshRef}>
              <circleGeometry args={[40, 64]} />
              {/** A portal is just a material */}

              <MeshPortalMaterial transparent>
                <SplatComponent
                  maxSplats={20000000}
                  splatPos={[-82, -15, -160.0]}
                  splatRot={[-1.63, -0.03, 0.26]}
                  splatScale={80}
                  splatUrl={
                    "https://storage.polycam.io/captures/f55f2844-bc97-46be-b60f-be3c6b18be3a/model.splat"
                  }
                />
              </MeshPortalMaterial>
            </mesh>
          </group>
          <OrbitControls makeDefault />
        </Canvas>
      </div>
    </>
  )
}
