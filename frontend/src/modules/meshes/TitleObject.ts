import { Mesh } from 'three';
import { Stuff } from './Stuff';
import { cm, geo, mat } from '../common';
import { InfoType } from '../../types';

export class TitleObject extends Stuff {
  mesh: Mesh;
  material: string;
  constructor(info: InfoType) {
    super(info);
    if (info.material) {
      this.material = `title${info.material}`;
    } else {
      this.material = 'noTitle';
    }

    this.mesh = new Mesh(geo.title, mat[this.material]);

    this.mesh.name = this.name;
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.set(this.x, 0.005, this.z - 2.5);
    this.mesh.receiveShadow = true;
    cm.scene.add(this.mesh);
  }
}
