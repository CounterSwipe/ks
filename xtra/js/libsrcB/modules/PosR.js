define(function(require) {
    var Module = require("cs/core/Module");
    class PosR extends Module {
        constructor(area) {
            super(area);
            this.name = "PosR";
        }
    }
    return PosR;
});
