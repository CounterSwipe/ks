define(function(require) {
    var Module = require("cs/core/Module");
    class Paths extends Module {
        constructor(area) {
            super(area);
            this.name = "Paths";
        }
    }
    return Paths;
});
