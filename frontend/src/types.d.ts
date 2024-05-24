import { MeshStandardMaterial } from 'three';

interface InfoType {
  name?: string;
  x?: number;
  y?: number;
  z?: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  width?: number;
  height?: number;
  objectUrl?: string;
  material?: string;
}

interface MatType {
  [key: string]: MeshStandardMaterial;
  floor: MeshStandardMaterial;
  spot: MeshStandardMaterial;
  title0: MeshStandardMaterial;
  title1: MeshStandardMaterial;
  title2: MeshStandardMaterial;
}

interface PostingType {
  id: number;
  type: string;
  title: string;
  count: number;
  langs: string;
  content: string;
  link: string;
  github: string;
  image: string;
}
