import { Mesh, MeshStandardMaterial, PlaneGeometry } from 'three';
import { InfoType } from '../../types';
import { Stuff } from './Stuff';
import { cm, mat } from '../common';

export class Doodle extends Stuff {
  mesh: Mesh;
  constructor(info: InfoType) {
    super(info);

    const geo = new PlaneGeometry(info.width, info.height);
    this.mesh = new Mesh(geo, mat[this.name]);

    // const test = new MeshStandardMaterial({
    //   color: 'pink',
    // });
    // this.mesh = new Mesh(geo, test);

    this.mesh.name = this.name;
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.set(this.x, 0.005, this.z);
    this.mesh.receiveShadow = true;
    cm.scene.add(this.mesh);
  }
}
