define(function(require) {
    var Module = require("cs/core/Module");
    class Cards extends Module {
        constructor(area) {
            super(area);
            this.name = "Cards";
        }
    }
    return Cards;
});
