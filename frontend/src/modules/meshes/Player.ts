import { AnimationAction, AnimationMixer, Mesh, Object3D } from 'three';
import { Stuff } from './Stuff';
import { cm, meshes, model } from '../common';
import { InfoType } from '../../types';

export class Player extends Stuff {
  moving: boolean;
  mesh: Object3D;
  mixer: AnimationMixer;
  actions: AnimationAction[];
  constructor(info: InfoType) {
    super(info);
    this.moving = false;

    cm.gltfLoader.load(model.player, (glb) => {
      //Shadow
      glb.scene.traverse((child: Object3D) => {
        if (child instanceof Mesh) {
          child.castShadow = true;
        }
      });

      this.mesh = glb.scene.children[0];
      this.mesh.name = this.name;
      this.mesh.position.set(this.x, this.y, this.z);
      cm.scene.add(this.mesh);
      meshes.push(this.mesh);

      //Animation
      this.actions = [];

      this.mixer = new AnimationMixer(this.mesh);
      glb.animations.forEach((item) => {
        this.actions.push(this.mixer.clipAction(item));
      });

      this.actions[0].clampWhenFinished = true;
      this.actions[1].clampWhenFinished = true;
      this.actions[0].play();
    });
  }
}
