define(function(require) {
    var Module = require("cs/core/Module");
    class Skill extends Module {
        constructor(area) {
            super(area);
            this.name = "Skill";
        }
    }
    return Skill;
});
