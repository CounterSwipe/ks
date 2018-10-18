define(function(require) {
    var Module = require("cs/core/Module");
    class Pub extends Module {
        constructor(area) {
            super(area);
            this.name = "Pub";
        }
    }
    return Pub;
});
