import * as THREE from 'three';

const load_texture_as_promise = async (texture: string) => {
  return new Promise((resolve, _reject) => {
    const texture_loader = new THREE.TextureLoader();
    const textureLoaded = texture_loader.load(`/assets/textures/${texture}.png`);
    resolve(textureLoaded);
  }) as Promise<THREE.Texture>;
};

export const load_texture = async (texture: string) => {
  const textures_promise = await load_texture_as_promise(texture);

  return Promise.resolve(textures_promise).then(texture => {
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
  });
};
