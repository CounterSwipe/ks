define(function(require) {
    var Module = require("cs/core/Module");
    class Hand extends Module {
        constructor(area) {
            super(area);
            this.name = "Hand";
        }
    }
    return Hand;
});
