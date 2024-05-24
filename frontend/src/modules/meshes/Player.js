var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { AnimationMixer, Mesh } from 'three';
import { Stuff } from './Stuff';
import { cm, meshes, model } from '../common';
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(info) {
        var _this = _super.call(this, info) || this;
        _this.moving = false;
        cm.gltfLoader.load(model.player, function (glb) {
            //Shadow
            glb.scene.traverse(function (child) {
                if (child instanceof Mesh) {
                    child.castShadow = true;
                }
            });
            _this.mesh = glb.scene.children[0];
            _this.mesh.name = _this.name;
            _this.mesh.position.set(_this.x, _this.y, _this.z);
            cm.scene.add(_this.mesh);
            meshes.push(_this.mesh);
            //Animation
            _this.actions = [];
            _this.mixer = new AnimationMixer(_this.mesh);
            glb.animations.forEach(function (item) {
                _this.actions.push(_this.mixer.clipAction(item));
            });
            _this.actions[0].clampWhenFinished = true;
            _this.actions[1].clampWhenFinished = true;
            _this.actions[0].play();
        });
        return _this;
    }
    return Player;
}(Stuff));
export { Player };
