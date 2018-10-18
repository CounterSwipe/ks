define(function(require) {
    var Module = require("cs/core/Module");
    class Chan extends Module {
        constructor(area) {
            super(area);
            this.name = "Chan";
        }
    }
    return Chan;
});
