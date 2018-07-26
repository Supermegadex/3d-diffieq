import { Vector3 } from "three";

export const calcPosition = (pos: Vector3, slope: Vector3, step: number): Vector3 => {
  return new Vector3(
    pos.x + (step * slope.x),
    pos.y + (step * slope.y),
    pos.z + (step * slope.z)
  )
}