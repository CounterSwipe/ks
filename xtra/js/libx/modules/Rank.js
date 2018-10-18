define(function(require) {
    var Module = require("cs/core/Module");
    class Rank extends Module {
        constructor(area) {
            super(area);
            this.name = "Rank";
        }
    }
    return Rank;
});
