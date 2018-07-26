import { Vector2, Vector3 } from "three";

export default (p: Vector3, frame: number): Vector3 => {
  let v = new Vector3(0, 0, 0);

  const dt = 0.01;
  const t = frame * dt;
  const w = 2 * Math.PI / 5;
  const A = 2;

  const d = Math.sqrt(p.x * p.x + p.y * p.y);
  v.x = A * Math.cos(w * t / d);
  v.y = A * Math.sin(w * t / d);

  return v;
}
