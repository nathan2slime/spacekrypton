import * as THREE from "three";

export function get_ground_vertex_positions_array(model: THREE.Mesh | any) {
  const raw_vertex = model.geometry.attributes.position.array as [];
  const vertex_data = get_vertex_from_array(raw_vertex);
  return vertex_data;
}
export function get_ground_vertex_normals_array(model: THREE.Mesh | any) {
  const raw_vertex_normals = model.geometry.attributes.normal.array as [];
  const vertex_normals = get_vertex_from_array(raw_vertex_normals);
  return vertex_normals;
}
export function get_ground_vertex_colors_array(model: THREE.Mesh | any) {
  const raw_vertex_colors = model.geometry.attributes.color.array as [];
  const vertex_colors = get_vertex_from_array(raw_vertex_colors);
  return vertex_colors;
}
export function get_vertex_from_array(vertex: number[]): number[][] {
  let result: number[][] = [];
  for (let i = 2; i < vertex.length; i += 3) {
    const buffer: number[] = [vertex[i - 2], vertex[i - 1], vertex[i]];
    result.push(buffer);
  }
  return result;
}
