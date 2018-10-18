define(function(require) {
    var Module = require("cs/core/Module");
    class Xone extends Module {
        constructor(area) {
            super(area);
            this.name = "Xone";
        }
    }
    return Xone;
});
