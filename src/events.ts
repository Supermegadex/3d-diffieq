import App from "./App";

function events(app: App) {
  document.querySelector('#toggle').addEventListener('click', () => {
    app.toggleCam();
  });

  app.input.addEventListener("keyup", () => {
    app.func = app.input.value;
    app.updateF();
  })
}

export default events;
