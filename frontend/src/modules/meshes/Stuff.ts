import { InfoType } from '../../types';

export class Stuff {
  name: string;
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  width: number;
  height: number;
  constructor(info: InfoType = {}) {
    this.name = info.name || '';
    this.x = info.x || 0;
    this.y = info.y || 0;
    this.z = info.z || 0;

    this.rotationX = info.rotationX || 0;
    this.rotationY = info.rotationY || 0;
    this.rotationZ = info.rotationZ || 0;

    this.width = info.width || 0;
    this.height = info.height || 0;
  }
}
