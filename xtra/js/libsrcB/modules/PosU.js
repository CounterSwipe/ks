define(function(require) {
    var Module = require("cs/core/Module");
    class PosU extends Module {
        constructor(area) {
            super(area);
            this.name = "PosU";
        }
    }
    return PosU;
});
