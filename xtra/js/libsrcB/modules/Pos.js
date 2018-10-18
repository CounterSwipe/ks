define(function(require) {
    var Module = require("cs/core/Module");
    class Pos extends Module {
        constructor(area) {
            super(area);
            this.name = "Pos";
        }
    }
    return Pos;
});
