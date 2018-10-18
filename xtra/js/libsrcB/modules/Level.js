define(function(require) {
    var Module = require("cs/core/Module");
    class Level extends Module {
        constructor(area) {
            super(area);
            this.name = "Level";
        }
    }
    return Level;
});
