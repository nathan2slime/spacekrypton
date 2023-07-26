import { Color, Texture, Vector3 } from 'three';

export interface BaseCustomUniforms {
  time: { value: number };
  base: { value: Texture };
  _texture: { value: Texture };
  fresn: { value: number };
  strokeColor: { value: Vector3 | Color };
  atmosphereColor: { value: Vector3 | Color };
  alpha: { value: number };
  ballDensity: { value: number };
  radius: { value: number };
  atmFresn: { value: number };
  atmAtmosphereColor: { value: Vector3 | Color };
  atmAlpha: { value: number };
}
