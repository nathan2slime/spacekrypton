import * as THREE from 'three';
import { randFloat } from 'three/src/math/MathUtils';

import { Viewer } from './init';
import { load_texture } from './loaders/loadTexture';

export const initParticles = async (viewer: Viewer) => {
  const geometry = new THREE.BufferGeometry();
  const pCount = 200;
  const posArray = new Float32Array(pCount * 3);

  const size = 5;

  for (let a = 0; a < pCount * 3; a++) {
    posArray[a] = Math.random() * size;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const point = await load_texture('point');

  const mat = new THREE.PointsMaterial({
    size: randFloat(0.01, 0.03),
    map: point,
    transparent: true,
  });

  const sphere = new THREE.Points(geometry, mat);

  sphere.position.x = -size / 2;
  sphere.position.y = -size / 2;
  sphere.position.z = -size / 2;

  viewer.scene.add(sphere);
};
