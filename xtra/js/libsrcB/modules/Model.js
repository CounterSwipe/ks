define(function(require) {
    var Module = require("cs/core/Module");
    class Model extends Module {
        constructor(area) {
            super(area);
            this.name = "Model";
        }
    }
    return Model;
});
