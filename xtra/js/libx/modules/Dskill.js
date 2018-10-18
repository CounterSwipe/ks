define(function(require) {
    var Module = require("cs/core/Module");
    class Dskill extends Module {
        constructor(area) {
            super(area);
            this.name = "Dskill";
        }
    }
    return Dskill;
});
