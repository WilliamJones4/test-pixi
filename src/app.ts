import { Application } from "pixi.js";

const app = new Application<HTMLCanvasElement>({ backgroundAlpha: 0 });
document.body.append(app.view);
