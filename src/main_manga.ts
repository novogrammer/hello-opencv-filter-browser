import './style.css'

import filterManga from "./filter_manga";
import Runner from "./Runner";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <video id="player" playsinline muted autoplay></video>
  <canvas id="before"></canvas>
  <canvas id="after"></canvas>
`
const player=document.querySelector<HTMLVideoElement>("#player")!;
const before=document.querySelector<HTMLCanvasElement>("#before")!;
const after=document.querySelector<HTMLCanvasElement>("#after")!;

new Runner({
  player,
  before,
  after,
  filter:filterManga
});



