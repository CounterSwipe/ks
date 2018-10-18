define(function(require) {
    var Module = require("cs/core/Module");
    class Xtwo extends Module {
        constructor(area) {
            super(area);
            this.name = "Xtwo";
        }
    }
    return Xtwo;
});
