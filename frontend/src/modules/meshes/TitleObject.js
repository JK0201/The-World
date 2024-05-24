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
import { Mesh } from 'three';
import { Stuff } from './Stuff';
import { cm, geo, mat } from '../common';
var TitleObject = /** @class */ (function (_super) {
    __extends(TitleObject, _super);
    function TitleObject(info) {
        var _this = _super.call(this, info) || this;
        if (info.material) {
            _this.material = "title".concat(info.material);
        }
        else {
            _this.material = 'noTitle';
        }
        _this.mesh = new Mesh(geo.title, mat[_this.material]);
        _this.mesh.name = _this.name;
        _this.mesh.rotation.x = -Math.PI / 2;
        _this.mesh.position.set(_this.x, 0.005, _this.z - 2.5);
        _this.mesh.receiveShadow = true;
        cm.scene.add(_this.mesh);
        return _this;
    }
    return TitleObject;
}(Stuff));
export { TitleObject };
