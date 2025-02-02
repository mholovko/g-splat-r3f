import { Splat } from "@/lib/g-splat/splat-object"

export function SplatComponent({
  splatUrl,
  splatPos,
  splatRot,
  splatScale,
  maxSplats,
  splatScaleFactor,
}: {
  splatUrl: string
  splatPos: [number, number, number]
  splatRot: [number, number, number]
  splatScale: number
  maxSplats: number
  splatScaleFactor?: number
}) {
  return (
    splatUrl && (
      <group
        position={splatPos}
        rotation={splatRot}
        scale={[splatScale, splatScale, splatScale]}
      >
        <Splat
          splatScaleFactor={splatScaleFactor}
          url={splatUrl}
          maxSplats={maxSplats}
        />
      </group>
    )
  )
}

export default SplatComponent
