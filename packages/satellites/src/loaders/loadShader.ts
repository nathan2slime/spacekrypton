import * as THREE from 'three';
import { Vector3 } from 'three';

const loadFile = async (filename: string) => {
  return new Promise((resolve, _reject) => {
    const loader = new THREE.FileLoader();
    loader.load(filename, data => {
      resolve(data);
    });
  });
};

const create_uniforms = async () => {
  const default_uniforms = {
    time: { type: 'f', value: 0 },
    camPos: { type: 'v3', value: new Vector3() },
    color: { type: 'v3', value: new Vector3() },
    cameraViewMatrix: { type: 'm4', value: new THREE.Matrix4() },
    base: { type: 't', value: new THREE.Texture() },
    _texture: { type: 't', value: new THREE.Texture() },
    _texture0: { type: 't', value: new THREE.Texture() },
  };

  return default_uniforms;
};

const compose_material = async (vert: any, frag: any, uniforms: any) => {
  const default_material = new THREE.ShaderMaterial({
    precision: 'mediump',
    opacity: 1,
    side: THREE.DoubleSide,
    uniforms: uniforms,
  });

  const vertex_shader_promises = loadFile(
    `assets/shaders/${vert}.glsl`
  ) as Promise<string>;
  const fragment_shader_promises = loadFile(
    `assets/shaders/${frag}.glsl`
  ) as Promise<string>;

  return Promise.all([vertex_shader_promises, fragment_shader_promises]).then(
    ([v, f]) => {
      default_material.vertexShader = v;
      default_material.fragmentShader = f;
      return default_material;
    }
  );
};

const compose_uniforms_material = (
  material: THREE.ShaderMaterial,
  uniforms: any
) => (material.uniforms = uniforms);

export { create_uniforms, compose_material, compose_uniforms_material };
