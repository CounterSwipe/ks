define(function(require) {
    var Module = require("cs/core/Module");
    class View extends Module {
        constructor(area) {
            super(area);
            this.name = "View";
        }
    }
    return View;
});
