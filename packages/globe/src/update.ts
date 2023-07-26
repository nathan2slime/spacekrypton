import * as THREE from "three";
import { Viewer } from "./init";
import Stats from "three/examples/jsm/libs/stats.module";
import * as globe from './project/globe';

const clock = new THREE.Clock();
let viewer: Viewer;
let stats: any;

export function update(_viewer: Viewer) {
  viewer = _viewer;

  clock.start();
  stats = Stats();

  // viewer.container.appendChild(stats.dom);

  stats.update();

  loop();
}

function loop() {
  requestAnimationFrame(loop);

  const dt = clock.getDelta(); 
  
  globe.UpdateGlobe(dt);

  viewer.update();
  stats.update();
}
