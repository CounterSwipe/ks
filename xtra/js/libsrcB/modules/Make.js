define(function(require) {
    var Module = require("cs/core/Module");
    class Make extends Module {
        constructor(area) {
            super(area);
            this.name = "Make";
        }
    }
    return Make;
});
