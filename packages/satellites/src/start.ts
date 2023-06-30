import * as THREE from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

import * as loader from './loaders/loadGLB';
import * as SL from './shaders_lib/shader_lib';
import * as loaderTex from './loaders/loadTexture';
import * as loaderShader from './loaders/loadShader';
import { place3DPin, SatProps } from './placePin';
import * as particles from './particles';
import { Viewer } from './init';
import * as update from './update';

export type Coordinates = {
  lat: number;
  long: number;
};

const satellites: SatProps[] = [];

export type ObjectCoordinates = {
  coords: Coordinates[];
};

export const start = async (
  viewer: Viewer,
  objectCoordinates: ObjectCoordinates[]
) => {
  // Setup
  viewer.camera.position.z = 3.5;
  const background = await loaderTex.load_texture('back');

  viewer.scene.background = background;
  const pass = new RenderPass(viewer.scene, viewer.camera);
  pass.renderToScreen = true;

  viewer.composer.addPass(pass);

  // Satellites
  const sat = await loader.CustomLoadModel('sat');

  // Globe

  const u_globe = await loaderShader.create_uniforms();
  let u_globeAtm = await loaderShader.create_uniforms();

  u_globe.base.value = await loaderTex.load_texture('globe');
  u_globe._texture.value = await loaderTex.load_texture('globeBase');
  u_globeAtm = u_globe;

  const globeMat = await loaderShader.compose_material(
    SL.vertex.VERTEX,
    SL.frag.FRAGMENT,
    u_globe
  );

  const satelliteMat = await loaderShader.compose_material(
    SL.vertex.VERTEX,
    SL.frag.RING,
    u_globe
  );

  const pathMat = await loaderShader.compose_material(
    SL.vertex.VERTEX,
    SL.frag.PATH,
    u_globe
  );
  const globeAtmMat = await loaderShader.compose_material(
    SL.vertex.VERTEX,
    SL.frag.ATM,
    u_globeAtm
  );

  globeAtmMat.depthWrite = false;
  globeMat.transparent = true;
  globeAtmMat.transparent = true;
  satelliteMat.wireframe = true;

  const globeGeometry = new THREE.SphereGeometry(1, 30, 30);
  const globeMesh = new THREE.Mesh(globeGeometry, globeMat);
  const atmosphere = new THREE.Mesh(globeGeometry, globeAtmMat);

  globeMesh.layers.set(0);

  atmosphere.scale.set(1.6, 1.6, 1.6);

  const bloom = new UnrealBloomPass(
    new THREE.Vector2(innerWidth, innerHeight),
    0.5,
    1,
    0.4
  );

  viewer.composer.addPass(bloom);
  particles.initParticles(viewer);

  sat.scale.set(0.5, 0.5, 0.5);

  for (const coord of objectCoordinates) {
    const currentSat = {
      radius: 1.35,
      sat: sat.clone(),
      coord: coord.coords[0],
    };

    (currentSat.sat.children[0] as any).material = satelliteMat;

    viewer.scene.add(currentSat.sat);

    satellites.push(place3DPin(currentSat));
  }

  viewer.scene.add(globeMesh, atmosphere);
  u_globe.color.value = new THREE.Vector3(111, 114, 208);

  const uniforms = [u_globe];

  update.update(viewer, uniforms, satellites, pathMat);
};
