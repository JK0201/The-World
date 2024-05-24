import { Mesh } from 'three';
import { Stuff } from './Stuff';
import { cm, geo, mat, spots } from '../common';
import { SpotObject } from './SpotObject';
import { TitleObject } from './TitleObject';
import { InfoType } from '../../types';

export class Spot extends Stuff {
  mesh: Mesh;
  touchdown: boolean;
  titleObject: TitleObject;
  spotObject: SpotObject;
  constructor(info: InfoType) {
    super(info);
    this.touchdown = false;
    this.createObject();

    this.mesh = new Mesh(geo.spot, mat.spot);
    this.mesh.name = this.name;
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.set(this.x, 0.005, this.z);
    this.mesh.receiveShadow = true;
    cm.scene.add(this.mesh);
    spots.push(this);
  }

  async createObject() {
    this.titleObject = new TitleObject({ x: this.x, z: this.z, material: this.name });
    this.spotObject = new SpotObject({ x: this.x, z: this.z, objectUrl: this.name });
    await this.spotObject.loadObject();
  }
}
