import { randFloat } from 'three/src/math/MathUtils';
import * as mad from '../loaders/MadFunctions';
import { Viewer } from '../init';
import * as THREE from 'three';

export const initParticles = async (viewer: Viewer) => {
  const geometry = new THREE.BufferGeometry();
  const pCount = 150;
  const posArray = new Float32Array(pCount * 3);

  const size = 5;

  for (let a = 0; a < pCount * 3; a++) {
    posArray[a] = Math.random() * size;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const point = await mad.LoadTexture('point.png');

  const mat = new THREE.PointsMaterial({
    map: point,
    size: randFloat(0.02, 0.05),
    transparent: true,
    color: 0x8a18fb,
    alphaTest: 0.1,
  });

  const sphere = new THREE.Points(geometry, mat);

  sphere.position.x = -size / 2;
  sphere.position.y = -size / 2;
  sphere.position.z = -size / 2;

  viewer.scene.add(sphere);
};
