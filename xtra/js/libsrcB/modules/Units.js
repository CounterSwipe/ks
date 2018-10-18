define(function(require) {
    var Module = require("cs/core/Module");
    class Units extends Module {
        constructor(area) {
            super(area);
            this.name = "Units";
        }
    }
    return Units;
});
