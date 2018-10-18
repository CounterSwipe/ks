define(function(require) {
    var Module = require("cs/core/Module");
    class PosO extends Module {
        constructor(area) {
            super(area);
            this.name = "PosO";
        }
    }
    return PosO;
});
