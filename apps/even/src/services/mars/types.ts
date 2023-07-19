export type Camera = {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
};

export type Rover = {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
  max_sol: number;
  max_date: string;
  total_photos: number;
  cameras: Camera[];
};
export type MarsPhoto = {
  id: number;
  sol: number;
  camera: Camera;
  img_src: string;
  earth_date: string;
  rover: Rover;
};

export type MarsPhotos = {
  photos: MarsPhoto[];
};

export type HoverImagePayload = {
  date?: string;
  sun?: number;
  camera: string;
  page: number;
  rover: string;
};
