define(function(require) {
    var Module = require("cs/core/Module");
    class PosY extends Module {
        constructor(area) {
            super(area);
            this.name = "PosY";
        }
    }
    return PosY;
});
