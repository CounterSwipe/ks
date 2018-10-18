define(function(require) {
    var Module = require("cs/core/Module");
    class Prog extends Module {
        constructor(area) {
            super(area);
            this.name = "Prog";
        }
    }
    return Prog;
});
