define(function(require) {
    var Module = require("cs/core/Module");
    class Drank extends Module {
        constructor(area) {
            super(area);
            this.name = "Drank";
        }
    }
    return Drank;
});
