import { Mesh, RepeatWrapping, Texture } from 'three';
import { InfoType } from '../../types';
import { Stuff } from './Stuff';
import { cm, geo, mat, tex } from '../common';

export class Wall extends Stuff {
  mesh: Mesh;
  constructor(info: InfoType) {
    super(info);

    //Texture
    const texture: Texture = tex.wall;
    texture.wrapS = RepeatWrapping;
    texture.repeat.x = 10;

    this.mesh = new Mesh(geo.wall, mat.wall);
    this.mesh.name = this.name;
    this.mesh.rotation.y = this.rotationY;
    this.mesh.position.set(this.x, 0.5, this.z);
    cm.scene.add(this.mesh);
  }
}
