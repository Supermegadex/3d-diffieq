import App from './App';
import * as dat from 'dat.gui';

const root = document.querySelector<HTMLDivElement>('#app-root');

window.onload = () => {
  const app = new App(root);
  app.bootstrap();
  console.log(app);

  const gui = new dat.GUI();
  gui.add(app, 'step', .0001, .05, .0005);
  gui.add(app, 'resetProbability', 0, 5, .0001);
  gui.add(app, 'fov', 1, 20, .5).onChange(() => {
    app.setCamLocation(app.currentCamPos);
  });
  gui.add(app, 'toggleCam');
  const strajfolder = gui.addFolder('Single Trajectory');
  strajfolder.add(app, 'x', -100, 100, .01);
  strajfolder.add(app, 'y', -100, 100, .01);
  strajfolder.add(app, 'z', -100, 100, .01);
  strajfolder.add(app, 'trailLength', 1, 3000, 1);
  strajfolder.add(app, 'doSingleTrajectory');
  strajfolder.add(app, 'stopSingleTrajectory');
};
