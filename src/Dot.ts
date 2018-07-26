import { SphereGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three';

class Dot extends Mesh {
  constructor(pos: Vector3) {
    const geometry = new SphereGeometry( 1, 20, 20 );
    const material = new MeshBasicMaterial( { color: 0xffffff } );
    super(geometry, material);
    this.setPosition(pos);
  }

  setPosition(position: Vector3) {
    this.position.set(position.x, position.y, position.z);
  }
}

export default Dot;
