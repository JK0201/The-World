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
import { Mesh, RepeatWrapping } from 'three';
import { Stuff } from './Stuff';
import { cm, geo, mat, tex } from '../common';
var Wall = /** @class */ (function (_super) {
    __extends(Wall, _super);
    function Wall(info) {
        var _this = _super.call(this, info) || this;
        //Texture
        var texture = tex.wall;
        texture.wrapS = RepeatWrapping;
        texture.repeat.x = 10;
        _this.mesh = new Mesh(geo.wall, mat.wall);
        _this.mesh.name = _this.name;
        _this.mesh.rotation.y = _this.rotationY;
        _this.mesh.position.set(_this.x, 0.5, _this.z);
        cm.scene.add(_this.mesh);
        return _this;
    }
    return Wall;
}(Stuff));
export { Wall };
