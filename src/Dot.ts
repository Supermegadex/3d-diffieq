import {
  SphereGeometry,
  Mesh,
  Vector3,
  MeshDepthMaterial,
  MeshNormalMaterial,
  MeshStandardMaterial,
  MeshBasicMaterial
} from 'three';

class Dot extends Mesh {
  public originalPosition: Vector3;

  constructor(pos: Vector3) {
    const geometry = new SphereGeometry( .01, 10, 10 );
    const material = new MeshBasicMaterial();
    super(geometry, material);
    this.originalPosition = pos;
    this.reset();
  }

  reset() {
    this.setPosition(this.originalPosition);
  }

  setPosition(position: Vector3) {
    this.position.set(position.x, position.y, position.z);
  }
}

export default Dot;
