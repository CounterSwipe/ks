define(function(require) {
    var Module = require("cs/core/Module");
    class Gui extends Module {
        constructor(area) {
            super(area);
            this.name = "Gui";
        }
    }
    return Gui;
});
