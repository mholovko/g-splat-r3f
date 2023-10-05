export function convertPointsToUint8Array(points) {
  const rowLength = 3 * 4 + 3 * 4 + 4 + 4
  const byteArray = new Uint8Array(points.length * rowLength)

  points.forEach((point, index) => {
    const baseIndex = index * rowLength
    const floatView = new Float32Array(byteArray.buffer)

    floatView[baseIndex / 4] = point.position.x
    floatView[baseIndex / 4 + 1] = point.position.y
    floatView[baseIndex / 4 + 2] = point.position.z
    floatView[baseIndex / 4 + 3] = point.scale.x
    floatView[baseIndex / 4 + 4] = point.scale.y
    floatView[baseIndex / 4 + 5] = point.scale.z

    byteArray[baseIndex + 24] = point.color.r
    byteArray[baseIndex + 25] = point.color.g
    byteArray[baseIndex + 26] = point.color.b
    byteArray[baseIndex + 27] = point.color.a

    byteArray[baseIndex + 28] = point.quat.i + 128
    byteArray[baseIndex + 29] = point.quat.j + 128
    byteArray[baseIndex + 30] = point.quat.k + 128
    byteArray[baseIndex + 31] = point.quat.l + 128
  })

  return byteArray
}
