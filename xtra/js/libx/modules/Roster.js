define(function(require) {
    var Module = require("cs/core/Module");
    class Roster extends Module {
        constructor(area) {
            super(area);
            this.name = "Roster";
        }
    }
    return Roster;
});
