define(function(require) {
    var Module = require("cs/core/Module");
    class Scost extends Module {
        constructor(area) {
            super(area);
            this.name = "Scost";
        }
    }
    return Scost;
});
