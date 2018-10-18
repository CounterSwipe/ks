define(function(require) {
    var Module = require("cs/core/Module");
    class Dreq extends Module {
        constructor(area) {
            super(area);
            this.name = "Dreq";
        }
    }
    return Dreq;
});
