import { use, useCallback, useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import SplatSortWorker from "worker-loader!./splat-sort-worker"

import { fragmentShaderSource, vertexShaderSource } from "./splat-shaders"
import { convertPointsToUint8Array } from "./utils/points-to-uint8"

function generateDynamicPoints() {
  const points = [] as any
  const numPoints = 10
  for (let i = 0; i < numPoints; i++) {
    const theta = Math.random() * 2 * Math.PI
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 5 + Math.sin(i * 0.1) * 2
    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.sin(phi) * Math.sin(theta)
    const z = r * Math.cos(phi)

    // Randomize scale values
    const scaleX = 0.1 + Math.random() * 1.5
    const scaleY = 0.1 + Math.random() * 1.5
    const scaleZ = 0.1 + Math.random() * 1.5

    // Randomize quaternion values
    const qi = Math.random() * 2 - 1
    const qj = Math.random() * 2 - 1
    const qk = Math.random() * 2 - 1
    const ql = Math.sqrt(1 - qi * qi - qj * qj - qk * qk)

    points.push({
      position: { x, y, z },
      scale: { x: scaleX, y: scaleY, z: scaleZ },
      color: {
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255,
        a: 255,
      },
      quat: { i: qi, j: qj, k: qk, l: ql },
    })
  }
  return points
}

const computeFocalLengths = (
  width: number,
  height: number,
  fov: number,
  aspect: number,
  dpr: number
) => {
  const fovRad = THREE.MathUtils.degToRad(fov)
  const fovXRad = 2 * Math.atan(Math.tan(fovRad / 2) * aspect)
  const fy = (dpr * height) / (2 * Math.tan(fovRad / 2))
  const fx = (dpr * width) / (2 * Math.tan(fovXRad / 2))
  return new THREE.Vector2(fx, fy)
}

export function SplatDebug({ maxSplats = Infinity }: { maxSplats?: number }) {
  // Allow direct access to the mesh
  const ref = useRef<THREE.Mesh>(null)

  // Web worker doing the splat sorting
  const [worker] = useState(() => new SplatSortWorker())

  const [points, setPoints] = useState(() => generateDynamicPoints())

  // Listen to screen and viewport
  const {
    size: { width, height },
    camera: { fov, aspect },
    viewport: { dpr },
  } = useThree() as any

  // Initialize uniforms
  const [uniforms] = useState({
    viewport: {
      value: new THREE.Vector2(width * dpr, height * dpr),
    },
    focal: {
      value: computeFocalLengths(width, height, fov, aspect, dpr),
    },
  })

  // Update uniforms when window changes
  useEffect(() => {
    uniforms.focal.value = computeFocalLengths(width, height, fov, aspect, dpr)
    uniforms.viewport.value = new THREE.Vector2(width * dpr, height * dpr)
  }, [width, height, fov, aspect, dpr])

  // Initialize attribute buffers
  const [buffers, setBuffers] = useState({
    index: new Uint16Array([0, 1, 2, 2, 3, 0]),
    position: new Float32Array([1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 1, 0]),
    color: new Float32Array([]),
    quat: new Float32Array([]),
    scale: new Float32Array([]),
    center: new Float32Array([]),
  })

  // Send current camera pose to splat sorting worker
  useFrame((state, _delta, _xrFrame) => {
    const mesh = ref.current
    if (mesh == null) {
      return
    }
    const camera = state.camera
    const viewProj = new THREE.Matrix4()
      .multiply(camera.projectionMatrix)
      .multiply(camera.matrixWorldInverse)
      .multiply(mesh.matrixWorld)
    worker.postMessage({ view: viewProj.elements, maxSplats })
  })

  // Receive sorted buffers from sorting worker
  useEffect(() => {
    worker.onmessage = (e) => {
      const { quat, scale, center, color /*viewProj*/ } = e.data

      setBuffers((buffers) => ({ ...buffers, quat, scale, center, color }))
    }
    return () => {
      worker.onmessage = null
    }
  })

  useEffect(() => {
    const splatData = convertPointsToUint8Array(points)
    worker.postMessage({
      buffer: splatData.buffer,
      vertexCount: points.length,
    })
  })

  // Signal to Three that attributes change when their buffer change
  const update = useCallback(
    (self: THREE.InstancedBufferAttribute | THREE.BufferAttribute) => {
      self.needsUpdate = true
    },
    []
  )

  // Count number of instances to feed where needed
  const instanceCount = Math.min(buffers.quat.length / 4, maxSplats)

  return (
    <mesh ref={ref} renderOrder={10}>
      <instancedBufferGeometry
        key={instanceCount}
        instanceCount={instanceCount}
      >
        <bufferAttribute
          attach="index"
          onUpdate={update}
          array={buffers.index}
          itemSize={1}
          count={6}
        />
        <bufferAttribute
          attach="attributes-position"
          onUpdate={update}
          array={buffers.position}
          itemSize={3}
          count={4}
        />
        <instancedBufferAttribute
          attach="attributes-color"
          onUpdate={update}
          array={buffers.color}
          itemSize={4}
          count={instanceCount}
        />
        <instancedBufferAttribute
          attach="attributes-quat"
          onUpdate={update}
          array={buffers.quat}
          itemSize={4}
          count={instanceCount}
        />
        <instancedBufferAttribute
          attach="attributes-scale"
          onUpdate={update}
          array={buffers.scale}
          itemSize={3}
          count={instanceCount}
        />
        <instancedBufferAttribute
          attach="attributes-center"
          onUpdate={update}
          array={buffers.center}
          itemSize={3}
          count={instanceCount}
        />
      </instancedBufferGeometry>
      <rawShaderMaterial
        uniforms={uniforms}
        fragmentShader={fragmentShaderSource}
        vertexShader={vertexShaderSource}
        depthTest={true}
        depthWrite={false}
        transparent={true}
      />
    </mesh>
  )
}
