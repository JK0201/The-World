import { Mesh, RepeatWrapping, Texture } from 'three';
import { Stuff } from './Stuff';
import { cm, geo, mat, meshes, tex } from '../common';
import { InfoType } from '../../types';

export class Floor extends Stuff {
  mesh: Mesh;
  constructor(info: InfoType) {
    super(info);

    this.mesh = new Mesh(geo.floor, mat.floor);
    this.mesh.name = this.name;
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.set(this.x, this.y, this.z);
    this.mesh.receiveShadow = true;
    cm.scene.add(this.mesh);
    meshes.push(this.mesh);
  }
}
