define(function(require) {
    var Module = require("cs/core/Module");
    class Cam extends Module {
        constructor(area) {
            super(area);
            this.name = "Cam";
        }
    }
    return Cam;
});
