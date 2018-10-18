define(function(require) {
    var Module = require("cs/core/Module");
    class Deck extends Module {
        constructor(area) {
            super(area);
            this.name = "Deck";
        }
    }
    return Deck;
});
