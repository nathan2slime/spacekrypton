import { Vector3, BufferGeometry, Float32BufferAttribute, Line } from 'three';

let paths: number[][] = [[]];

const getXYZCoordinates = (sat_r: number, lat: number, long: number) => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((360 - long) * Math.PI) / 180;

  let pos: number[] = [];

  pos[0] = Math.sin(phi) * Math.cos(theta) * sat_r;
  pos[1] = Math.cos(phi) * 1;
  pos[2] = Math.sin(phi) * Math.sin(theta) * sat_r;

  return pos;
};

export const drawLineRoute = (
  path: SatProps[],
  path_material: THREE.ShaderMaterial
) => {
  path.map(p => paths.push(getXYZCoordinates(1.35, p.coord.lat, p.coord.long)));

  const geometry = new BufferGeometry();

  const position = new Float32Array(paths.flat(1));

  geometry.setAttribute('position', new Float32BufferAttribute(position, 3));

  const line = new Line(geometry, path_material);

  return line;
};

export type SatProps = {
  radius: number;
  sat: THREE.Group;
  coord: { lat: number; long: number };
};

export const place3DPin = ({ coord, radius, sat }: SatProps): SatProps => {
  const sat_r = radius;
  const pos: number[] = getXYZCoordinates(sat_r, coord.lat, coord.long);
  sat.position.set(pos[0], pos[1], pos[2]);
  sat.lookAt(new Vector3(0, 0, 0));

  return {
    coord,
    radius,
    sat,
  };
};

export const updatePinPosition = (sat: SatProps) => {
  const satPos = getXYZCoordinates(sat.radius, sat.coord.lat, sat.coord.long);

  sat.sat.position.set(satPos[0], satPos[1], satPos[2]);
};
