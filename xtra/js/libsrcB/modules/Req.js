define(function(require) {
    var Module = require("cs/core/Module");
    class Req extends Module {
        constructor(area) {
            super(area);
            this.name = "Req";
        }
    }
    return Req;
});
