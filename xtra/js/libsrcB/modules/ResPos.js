define(function(require) {
    var Module = require("cs/core/Module");
    class ResPos extends Module {
        constructor(area) {
            super(area);
            this.name = "ResPos";
        }
    }
    return ResPos;
});
