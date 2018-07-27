import { Scene, WebGLRenderer, Vector3, PerspectiveCamera } from 'three';
import locations from './locations';
import equation from './equation';
import Dot from './Dot';
import { calcPosition } from './utils';
import events from './events';

const width = window.innerWidth;
const height = window.innerHeight;

class App {
  public root: HTMLDivElement;
  public scene = new Scene();
  public camera = new PerspectiveCamera( 45, width / height, 1, 1000 );
  // public camera = new OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
  public renderer = new WebGLRenderer();
  public dots: Dot[] = [];
  public frame = 0;
  public input: HTMLTextAreaElement = document.querySelector("#formula");
  private f: any;
  private edit = true;

  // Settings
  public step = .05;
  public currentCamPos = 0;
  public fov = 2;
  public resetProbability = 2;
  public numParticles = 3000;
  public dotRadius = .01;
  public func = `let v = new Vector3(0, 0, 0);

v.x = .5 * p.x;
v.y = -.5;
v.z = -.25;
    
return v;
`

  constructor(root: HTMLDivElement) {
    this.root = root;
    this.setCamLocation(0);
    this.updateF();
    this.input.value = this.func;
    events(this);
  }

  updateF() {
    this.edit = true;
    let success = true;
    let form: any;
    try {
      form = Function("p", "frame", "Vector3", "utils", this.func);
    }
    catch (err) {
      success = false;
      console.info("Couldn't parse formula: ", err);
    }
    if (success) this.f = form;
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
      this.dots.push(new Dot(this.randomPos(), this.dotRadius));
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
    if (reset) {
      dot.setPosition(this.randomPos());
    }
    const oPos = dot.position;
    const slope = equation(this.f, oPos, this.frame, this.edit);
    this.edit = false;
    const nPos = calcPosition(oPos, slope, this.step);
    dot.setPosition(nPos);
  }

  toggleCam() {
    this.currentCamPos++;
    if (this.currentCamPos === locations.length) this.currentCamPos = 0;
    this.setCamLocation(this.currentCamPos);
  }
}

export default App;
