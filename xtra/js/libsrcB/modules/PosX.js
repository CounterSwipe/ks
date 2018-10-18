define(function(require) {
    var Module = require("cs/core/Module");
    class PosX extends Module {
        constructor(area) {
            super(area);
            this.name = "PosX";
        }
    }
    return PosX;
});
