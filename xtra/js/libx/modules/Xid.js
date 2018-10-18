define(function(require) {
    var Module = require("cs/core/Module");
    class Xid extends Module {
        constructor(area) {
            super(area);
            this.name = "Xid";
        }
    }
    return Xid;
});
