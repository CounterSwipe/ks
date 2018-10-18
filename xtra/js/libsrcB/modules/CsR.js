define(function(require) {
    var Module = require("cs/core/Module");
    class CsR extends Module {
        constructor(area) {
            super(area);
            this.name = "CsR";
        }
    }
    return CsR;
});
