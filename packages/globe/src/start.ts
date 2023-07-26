import { Viewer } from './init';
import * as update from './update';
import * as mad from './loaders/MadFunctions';
import * as globe from './project/globe';

// LOADERS
import { BaseCustomUniforms } from './types/interfaces';

// code here :D -> this function runs once before the application loop be called
export async function start(viewer: Viewer) {
  //setup
  const u: BaseCustomUniforms = mad.CreateUniforms();
  globe.SetupGlobe(viewer, u);
  update.update(viewer);
}
