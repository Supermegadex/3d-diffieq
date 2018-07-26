import { Vector3 } from "three";

function sig(t: number) {
  return 6 * (1/(1+Math.pow(Math.E, -t))) - 3;
}

export const calcPosition = (pos: Vector3, slope: Vector3, step: number): Vector3 => {
  return new Vector3(
    pos.x + sig((step * slope.x)),
    pos.y + sig((step * slope.y)),
    pos.z + sig((step * slope.z))
  )
};