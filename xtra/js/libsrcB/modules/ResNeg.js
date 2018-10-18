define(function(require) {
    var Module = require("cs/core/Module");
    class ResNeg extends Module {
        constructor(area) {
            super(area);
            this.name = "ResNeg";
        }
    }
    return ResNeg;
});
