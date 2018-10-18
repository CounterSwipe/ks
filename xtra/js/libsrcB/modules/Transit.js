define(function(require) {
    var Module = require("cs/core/Module");
    class Transit extends Module {
        constructor(area) {
            super(area);
            this.name = "Transit";
        }
    }
    return Transit;
});
