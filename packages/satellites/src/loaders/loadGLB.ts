import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const CustomLoadModel = async (name: string) =>
  new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      `assets/${name}.glb`,
      function (glb) {
        let model = glb.scene as THREE.Group;
        model.traverse(n => {
          if (n.isObject3D) {
            n.castShadow = true;
            n.receiveShadow = true;
          }
        });
        resolve(model);
      },
      _xhr => {},
      _error => {}
    );
  }) as Promise<THREE.Group>;
