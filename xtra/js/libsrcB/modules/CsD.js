define(function(require) {
    var Module = require("cs/core/Module");
    class CsD extends Module {
        constructor(area) {
            super(area);
            this.name = "CsD";
        }
    }
    return CsD;
});
