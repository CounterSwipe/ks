define(function(require) {
    var Module = require("cs/core/Module");
    class Deployed extends Module {
        constructor(area) {
            super(area);
            this.name = "Deployed";
        }
    }
    return Deployed;
});
