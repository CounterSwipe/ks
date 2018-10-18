define(function(require) {
    var Module = require("cs/core/Module");
    class Cost extends Module {
        constructor(area) {
            super(area);
            this.name = "Cost";
        }
    }
    return Cost;
});
