define(function(require) {
    var Module = require("cs/core/Module");
    class Xnode extends Module {
        constructor(area) {
            super(area);
            this.name = "Xnode";
        }
    }
    return Xnode;
});
