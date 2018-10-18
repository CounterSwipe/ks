define(function(require) {
    var Module = require("cs/core/Module");
    class CtR extends Module {
        constructor(area) {
            super(area);
            this.name = "CtR";
        }
    }
    return CtR;
});
