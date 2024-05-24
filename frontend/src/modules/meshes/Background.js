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
import { cm, geo, mat, meshes, tex } from '../common';
var Background = /** @class */ (function (_super) {
    __extends(Background, _super);
    function Background(info) {
        var _this = _super.call(this, info) || this;
        //Texture
        var texture = tex.background;
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.x = 8;
        texture.repeat.y = 8;
        _this.mesh = new Mesh(geo.background, mat.background);
        _this.mesh.name = _this.name;
        _this.mesh.rotation.x = -Math.PI / 2;
        _this.mesh.position.y = -0.005;
        _this.mesh.receiveShadow = true;
        cm.scene.add(_this.mesh);
        meshes.push(_this.mesh);
        return _this;
    }
    return Background;
}(Stuff));
export { Background };
