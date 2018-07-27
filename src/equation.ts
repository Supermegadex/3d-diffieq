import { Vector3 } from "three";

const utils = {
  length(vector: Vector3): number {
    let square_sum = (vector.x ** 2) + (vector.y ** 2) + (vector.z ** 2);
    return Math.sqrt(square_sum);
  },

  step(edge: number, x: number): number {
    return x < edge ? 0 : 1;
  }
}

let temp: any;
let useTemp = false;

export default (func: any, p: Vector3, frame: number, edit: boolean): any => {
  if (edit) {
    let success = true;
    try {
      func.bind(this)(p, frame, Vector3, utils);
    }
    catch (err) {
      console.log("Cannot execute transform: ", err);
      success = false;
    }

    if (success) {
      useTemp = false;
      temp = func;
    }
    else {
      useTemp = true;
    }
  }

  if (useTemp) {
    return temp.bind(this)(p, frame, Vector3, utils) || new Vector3(0,0,0);
  }
  else {
    return func.bind(this)(p, frame, Vector3, utils) || new Vector3(0,0,0);
  }
}

/*
MORE SAMPLES:
------------

  const dt = 0.01;
  const t = frame * dt;
  const w = 2 * Math.PI / 5;
  const A = 2;

  const d = Math.sqrt(p.x * p.x + p.y * p.y);
  v.x = A * Math.cos(w * t / d);
  v.y = A * Math.sin(w * t / d);

  -----------

  const r = length(p) - 1.5;
  const c = 1.0/(1.0+Math.exp(-5.0*r));
  const vx1 = -p.y,  // circle
        vy1 = p.x;
  const vx2 = 0.2*p.x+p.y, // spiral
        vy2 = 0.2*p.y-p.x;
  v.x = c*vx1 + (1.0-c)*vx2;
  v.y = c*vy1 + (1.0-c)*vy2;
 */
