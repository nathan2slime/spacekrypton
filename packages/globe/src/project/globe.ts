import { Color, DoubleSide } from 'three';

import { Viewer } from '../init';
import * as mad from '../loaders/MadFunctions';
import * as SL from '../shaders_lib/shader_lib';
import { BaseCustomUniforms } from '../types/interfaces';
import { PostScene } from '../utils/post';
import { initParticles } from '../types/particles';

let uniforms: BaseCustomUniforms;
let s = 1.5;

async function SetupEnvironment(viewer: Viewer) {
  viewer.scene.background = new Color(0x000000);
  viewer.camera.position.z = 4.5;
  viewer.scene.background = await mad.LoadTexture('back.png');
}

async function SetupGlobe(viewer: Viewer, _uniforms: BaseCustomUniforms) {
  PostScene(viewer);
  initParticles(viewer);
  uniforms = _uniforms;

  SetupEnvironment(viewer);
  uniforms.base.value = await mad.LoadTexture('globeStroke.png');
  uniforms._texture.value = await mad.LoadTexture('globeMask.png');

  const globeMat = await mad.NewMaterial(
    SL.vertex.GLOBE,
    SL.frag.GLOBE_BASE,
    uniforms
  );
  const atmMat = await mad.NewMaterial(
    SL.vertex.GLOBE,
    SL.frag.GLOBE_ATMOSPHERE,
    uniforms
  );

  globeMat.transparent = true;
  globeMat.side = DoubleSide;
  atmMat.side = DoubleSide;
  atmMat.transparent = true;

  const model = await mad.LoadModel('globe');
  const atm = model.clone();
  atm.scale.set(s, s, s);

  model.traverse((childs: any) => {
    childs.material = globeMat;
  });

  atm.traverse((childs: any) => {
    childs.material = atmMat;
  });

  viewer.scene.add(model, atm);
}

function UpdateGlobe(dt: number) {
  uniforms.time.value += dt;
}
export { SetupGlobe, UpdateGlobe };
