define(function(require) {
    var Eid = require("cs/core/Eid");
    class Boot {
        constructor() {
            this.name = "Boot";
            this.modules = null;
        }
        init(game) {
            this.modules = game.modules;
            this.setup();
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        setup() {
            this.loadPlayer(1); //player1
        }
        loadPlayer(player) {
            let self = this;
            require(["/wp-content/themes/blankslate-child/js/db/players.js"], function(pScript) { pScript[player](self, player); });
        }
        getEID() {
            let eid = new Eid();
            return eid.id;
        }
        preDraw(drawn) {
            let nuID = this.getEID();
            let mods = ["View", "Veid", "Vone", "Vtwo", "Vnode"];
            for (let d = 0, dLen = drawn.length; d < dLen; d++) {
                this.modules[this.moduleID(mods[d])].add(nuID, drawn[d]);
            }
        }
    }
    return Boot;
});
