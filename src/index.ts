import App from './App';

const root = document.querySelector<HTMLDivElement>('#app-root');

const app = new App(root);
app.bootstrap();
console.log(app);
