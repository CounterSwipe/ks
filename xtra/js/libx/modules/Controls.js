define(function(require) {
    var Module = require("cs/core/Module");
    class Controls extends Module {
        constructor(area) {
            super(area);
            this.name = "Controls";
        }
    }
    return Controls;
});
