define(function(require) {
    var Module = require("cs/core/Module");
    class Channel extends Module {
        constructor(area) {
            super(area);
            this.name = "Channel";
        }
    }
    return Channel;
});
