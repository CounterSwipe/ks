define(function(require) {
    var Module = require("cs/core/Module");
    class CsL extends Module {
        constructor(area) {
            super(area);
            this.name = "CsL";
        }
    }
    return CsL;
});
