define(function(require) {
    var Module = require("cs/core/Module");
    class Dcost extends Module {
        constructor(area) {
            super(area);
            this.name = "Dcost";
        }
    }
    return Dcost;
});
