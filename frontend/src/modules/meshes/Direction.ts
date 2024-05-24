import { Mesh } from 'three';
import { InfoType } from '../../types';
import { Stuff } from './Stuff';
import { cm, geo, mat } from '../common';

export class Direction extends Stuff {
  mesh: Mesh;
  constructor(info: InfoType) {
    super(info);

    this.mesh = new Mesh(geo.direction, mat[this.name]);

    // this.mesh = new Mesh(
    //   geo.direction,
    //   new MeshStandardMaterial({
    //     color: 'yellow',
    //   })
    // );

    this.mesh.name = this.name;
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.set(this.x, 0.005, this.z);
    this.mesh.receiveShadow = true;
    cm.scene.add(this.mesh);
  }
}
