define(function(require) {
    var Module = require("cs/core/Module");
    class Energy extends Module {
        constructor(area) {
            super(area);
            this.name = "Energy";
        }
    }
    return Energy;
});
