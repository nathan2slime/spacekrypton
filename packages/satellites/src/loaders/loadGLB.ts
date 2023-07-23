import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const CustomLoadModel = async (name: string) =>
  new Promise((resolve, _reject) => {
    new GLTFLoader().load(`/assets/${name}.glb`, glb => {
      let model = glb.scene as THREE.Group;

      model.traverse(n => {
        if (n.isObject3D) {
          n.castShadow = true;
          n.receiveShadow = true;
        }
      });

      resolve(model);
    });
  }) as Promise<THREE.Group>;
