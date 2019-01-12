import App from './App';
import * as dat from 'dat.gui';

const root = document.querySelector<HTMLDivElement>('#app-root');

window.onload = () => {
  const app = new App(root);
  app.bootstrap();
  console.log(app);

  const gui = new dat.GUI();
  gui.add(app, 'step', .0001, .05, .0005);
  gui.add(app, 'resetProbability', 0, 1, .0001);
  gui.add(app, 'toggleCam');
};
