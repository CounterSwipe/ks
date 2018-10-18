define(function(require) {
    var Module = require("cs/core/Module");
    class PosV extends Module {
        constructor(area) {
            super(area);
            this.name = "PosV";
        }
    }
    return PosV;
});
