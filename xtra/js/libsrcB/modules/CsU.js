define(function(require) {
    var Module = require("cs/core/Module");
    class CsU extends Module {
        constructor(area) {
            super(area);
            this.name = "CsU";
        }
    }
    return CsU;
});
