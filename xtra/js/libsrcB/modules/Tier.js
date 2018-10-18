define(function(require) {
    var Module = require("cs/core/Module");
    class Tier extends Module {
        constructor(area) {
            super(area);
            this.name = "Tier";
        }
    }
    return Tier;
});
