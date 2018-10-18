define(function(require) {
    var Module = require("cs/core/Module");
    class Board extends Module {
        constructor(area) {
            super(area);
            this.name = "Board";
        }
    }
    return Board;
});
