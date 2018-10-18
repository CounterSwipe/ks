define(function(require) {
    var Module = require("cs/core/Module");
    class ResNow extends Module {
        constructor(area) {
            super(area);
            this.name = "ResNow";
        }
    }
    return ResNow;
});
