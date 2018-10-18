define(function(require) {
    var Module = require("cs/core/Module");
    class Sprog extends Module {
        constructor(area) {
            super(area);
            this.name = "Sprog";
        }
    }
    return Sprog;
});
