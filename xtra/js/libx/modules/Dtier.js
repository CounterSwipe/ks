define(function(require) {
    var Module = require("cs/core/Module");
    class Dtier extends Module {
        constructor(area) {
            super(area);
            this.name = "Dtier";
        }
    }
    return Dtier;
});
