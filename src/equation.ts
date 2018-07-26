import { Vector3 } from "three";

export default ({x, y, z}: Vector3): Vector3 => {
  return new Vector3(
    .05 * z * y,
    .01 * y,
    .01 * z * y
  );
}