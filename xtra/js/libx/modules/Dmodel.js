define(function(require) {
    var Module = require("cs/core/Module");
    class Dmodel extends Module {
        constructor(area) {
            super(area);
            this.name = "Dmodel";
        }
    }
    return Dmodel;
});
