define(function(require) {
    var Module = require("cs/core/Module");
    class CtL extends Module {
        constructor(area) {
            super(area);
            this.name = "CtL";
        }
    }
    return CtL;
});
