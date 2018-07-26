import { Scene, WebGLRenderer, Vector3, PerspectiveCamera, OrthographicCamera } from 'three';
import locations from './locations';
import equation from './equation';
import Dot from './Dot';
import { calcPosition } from './utils';

const width = window.innerWidth;
const height = window.innerHeight;

class App {
  public root: HTMLDivElement;
  public scene = new Scene();
  public camera = new PerspectiveCamera( 45, width / height, 1, 1000 );
  // public camera = new OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
  private renderer = new WebGLRenderer();
  public dots: Dot[] = [];
  public step = .01;
  public currentCamPos = 0;
  public fov = 10;
  public resetProbability = 1;
  public numParticles = 8000;
  public frame = 0;

  constructor(root: HTMLDivElement) {
    this.root = root;
    this.setCamLocation(0);
    document.querySelector('#toggle').addEventListener('click', () => {
      this.toggleCam();
    });
    // this.camera.zoom = 2;
    // this.camera.updateProjectionMatrix();
  }

  setCamLocation(loc: number) {
    const pos = locations[loc].map(coord => coord * (this.fov * 1.75));
    this.camera.position.set(pos[0], pos[1], pos[2]);
    this.camera.lookAt(-pos[0], -pos[1], -pos[2]);
  }

  randomPos() {
    const min = -this.fov * 2;
    const max = this.fov;

    return new Vector3(Math.random() * min + max, Math.random() * min + max, Math.random() * min + max);
  }

  bootstrap() {
    // Set render size and apply to the root element
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.root.appendChild( this.renderer.domElement );

    // Initialize dots
    for (let i = 0; i < this.numParticles; i++) {
      this.dots.push(new Dot(this.randomPos()));
    }
    
    // this.cube = new Mesh( geometry, material );
    this.dots.forEach(dot => this.scene.add(dot));
    this.render();
  }

  render() {
    this.dots.forEach(dot => this.moveDot(dot));
    this.renderer.render(this.scene, this.camera);
    this.frame++;
    requestAnimationFrame(() => this.render());
  }

  moveDot(dot: Dot) {
    const reset = !(Math.random() * 100 > this.resetProbability);
    if (!reset) {
      const oPos = dot.position;
      const slope = equation(oPos, this.frame);
      const nPos = calcPosition(oPos, slope, this.step);
      dot.setPosition(nPos);
    }
    else {
      dot.setPosition(this.randomPos());
    }
  }

  toggleCam() {
    this.currentCamPos++;
    if (this.currentCamPos === locations.length) this.currentCamPos = 0;
    this.setCamLocation(this.currentCamPos);
  }
}

export default App;
