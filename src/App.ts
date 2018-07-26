import { Scene, WebGLRenderer, Vector3, PerspectiveCamera } from 'three';
import equation from './equation';
import Dot from './Dot';
import { calcPosition } from './utils';

const width = window.innerWidth;
const height = window.innerHeight;

class App {
  public root: HTMLDivElement;
  public scene = new Scene();
  public camera = new PerspectiveCamera( 90, width / height, -500, 250 );
  private renderer = new WebGLRenderer();
  public dots: Dot[] = [];
  public step = .001;

  public time = 0;

  constructor(root: HTMLDivElement) {
    this.root = root;
  }

  randomPos() {
    const min = -500;
    const max = 250;

    return new Vector3(Math.random() * min + max, Math.random() * min + max, Math.random() * min + max);
  }

  bootstrap() {
    // Set render size and apply to the root element
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.root.appendChild( this.renderer.domElement );

    // Initialize dots
    for (let i = 0; i < 5000; i++) {
      this.dots.push(new Dot(this.randomPos()));
    }
    
    // this.cube = new Mesh( geometry, material );
    this.dots.forEach(dot => this.scene.add(dot));
    this.camera.position.z = 5;
    this.render();
  }

  render() {
    this.dots.forEach(dot => this.moveDot(dot));
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());
  }

  moveDot(dot: Dot) {
    const reset = !(Math.random() * 100 > 1);
    if (!reset) {
      const oPos = dot.position;
      const slope = equation(oPos);
      const nPos = calcPosition(oPos, slope, this.step);
      dot.setPosition(nPos);
    }
    else {
      dot.setPosition(this.randomPos());
    }
  }
}

export default App;
