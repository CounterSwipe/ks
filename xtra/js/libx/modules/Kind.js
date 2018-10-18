define(function(require) {
    var Module = require("cs/core/Module");
    class Kind extends Module {
        constructor(area) {
            super(area);
            this.name = "Kind";
        }
    }
    return Kind;
});
