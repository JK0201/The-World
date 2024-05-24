import { Mesh, RepeatWrapping, Texture } from 'three';
import { Stuff } from './Stuff';
import { cm, geo, mat, meshes, tex } from '../common';
import { InfoType } from '../../types';

export class Background extends Stuff {
  mesh: Mesh;
  constructor(info: InfoType) {
    super(info);

    //Texture
    const texture: Texture = tex.background;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.x = 8;
    texture.repeat.y = 8;

    this.mesh = new Mesh(geo.background, mat.background);
    this.mesh.name = this.name;
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.y = -0.005;
    this.mesh.receiveShadow = true;
    cm.scene.add(this.mesh);
    meshes.push(this.mesh);
  }
}
