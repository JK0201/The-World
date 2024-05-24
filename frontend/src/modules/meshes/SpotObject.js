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
import { Box3, Mesh, Vector3 } from 'three';
import { cm } from '../common';
import { Stuff } from './Stuff';
var SpotObject = /** @class */ (function (_super) {
    __extends(SpotObject, _super);
    function SpotObject(info) {
        var _this = _super.call(this, info) || this;
        if (info.objectUrl) {
            _this.objectUrl = "../../models/".concat(info.objectUrl, ".glb");
        }
        else {
            _this.objectUrl = '../../models/house.glb';
        }
        _this.loadObject();
        return _this;
    }
    SpotObject.prototype.loadObject = function () {
        var _this = this;
        return new Promise(function () {
            cm.gltfLoader.load(_this.objectUrl, function (glb) {
                //Shadow
                glb.scene.traverse(function (child) {
                    if (child instanceof Mesh) {
                        child.castShadow = true;
                    }
                });
                _this.mesh = glb.scene.children[0];
                _this.mesh.name = _this.name;
                _this.mesh.visible = false;
                //Height for Object
                var calcHeight = new Box3().setFromObject(_this.mesh);
                var height = calcHeight.getSize(new Vector3()).y / 2;
                // console.log(calcHeight.getSize(new Vector3()));
                _this.mesh.position.set(_this.x + 3, -height, _this.z - 3);
                cm.scene.add(_this.mesh);
            });
        });
    };
    return SpotObject;
}(Stuff));
export { SpotObject };
