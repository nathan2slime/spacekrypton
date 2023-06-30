import * as THREE from 'three';
import { Viewer } from './init';
import { SatProps } from './placePin';

let _viewer: Viewer;
const clock = new THREE.Clock();
let _uniforms: any;
let _satellites: SatProps[];

export const update = async (
  viewer: Viewer,
  uniforms: any,
  satellites: SatProps[],
  _satMat: THREE.ShaderMaterial
) => {
  _viewer = viewer;
  _uniforms = uniforms;
  _satellites = satellites;

  clock.start();

  loop();
};

const loop = async () => {
  requestAnimationFrame(loop);

  for (let sat of _satellites) {
    sat.coord;
  }

  if (_uniforms != null) {
    _uniforms.map((uni: any) => {
      uni.time.value = clock.getElapsedTime();
      uni.cameraViewMatrix.value = _viewer.camera.matrixWorldInverse;
      const camPos = _viewer.camera.position;
      uni.camPos.value = camPos;
    });
  }

  _viewer.update();
};
