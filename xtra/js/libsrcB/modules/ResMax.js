define(function(require) {
    var Module = require("cs/core/Module");
    class ResMax extends Module {
        constructor(area) {
            super(area);
            this.name = "ResMax";
        }
    }
    return ResMax;
});
