import { Box3, Mesh, Object3D, Vector3 } from 'three';
import { cm } from '../common';
import { Stuff } from './Stuff';
import { InfoType } from '../../types';

export class SpotObject extends Stuff {
  visible: boolean;
  mesh: Object3D;
  objectUrl: string;
  constructor(info: InfoType) {
    super(info);

    if (info.objectUrl) {
      this.objectUrl = `../../models/${info.objectUrl}.glb`;
    } else {
      this.objectUrl = '../../models/house.glb';
    }

    this.loadObject();
  }

  loadObject() {
    return new Promise(() => {
      cm.gltfLoader.load(this.objectUrl, (glb) => {
        //Shadow
        glb.scene.traverse((child: Object3D) => {
          if (child instanceof Mesh) {
            child.castShadow = true;
          }
        });

        this.mesh = glb.scene.children[0];
        this.mesh.name = this.name;
        this.mesh.visible = false;

        //Height for Object
        const calcHeight = new Box3().setFromObject(this.mesh);
        const height = calcHeight.getSize(new Vector3()).y / 2;
        // console.log(calcHeight.getSize(new Vector3()));

        this.mesh.position.set(this.x + 3, -height, this.z - 3);
        cm.scene.add(this.mesh);
      });
    });
  }
}
