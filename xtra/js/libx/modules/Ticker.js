define(function(require) {
    var Module = require("cs/core/Module");
    class Ticker extends Module {
        constructor(area) {
            super(area);
            this.name = "Ticker";
        }
    }
    return Ticker;
});
