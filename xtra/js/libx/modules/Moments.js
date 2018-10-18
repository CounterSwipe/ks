define(function(require) {
    var Module = require("cs/core/Module");
    class Moments extends Module {
        constructor(area) {
            super(area);
            this.name = "Moments";
        }
    }
    return Moments;
});
