var Stuff = /** @class */ (function () {
    function Stuff(info) {
        if (info === void 0) { info = {}; }
        this.name = info.name || '';
        this.x = info.x || 0;
        this.y = info.y || 0;
        this.z = info.z || 0;
        this.rotationX = info.rotationX || 0;
        this.rotationY = info.rotationY || 0;
        this.rotationZ = info.rotationZ || 0;
        this.width = info.width || 0;
        this.height = info.height || 0;
    }
    return Stuff;
}());
export { Stuff };
