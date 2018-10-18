define({
    "npcId": "1",
    "npcImg": "path/to/some/image.png",
    "npcArea": {
        "x": 10,
        "y": 10,
        "w": 5,
        "h": 5
    },
    "customScript": function() {
        var life = unit.getLife(); /*global unit*/
        if (life > 10) { unit.move(); }
        else { unit.stay(); }
    },
    loadNpcDialog: function(dialogNumber) {
        require(["npc_dialog_level_" + dialogNumber + ".js"], function(dialog) {
            //  log(dialog);
        });
    }
});
require(['someExtension'], function(ext) {
    ext.customScript();
});
define(function() {
    class Launched {
        constructor() {
            this.name = "Launched";
            this.modules = null;
            this.mBoard = 0;
            this.mDeployed = 0;
            this.mGui = 0;
            //this.mView = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mBoard = this.moduleID("Board");
            this.mDeployed = this.moduleID("Deployed");
            this.mGui = this.moduleID("Gui");
            //this.mView = this.moduleID("View");//todo: create visual that indicates when unit isActive
            this.isReady = true;
        }
        moduleID(mID) {
            for (var id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        onLaunched(mDeployed, dNum) {
            if (this.modules[mDeployed].search(dNum).tick === this.modules[this.mGui].search(0)) {
                this.modules[this.mBoard].add(dNum, this.modules[mDeployed].search(dNum));
                this.modules[mDeployed].add(dNum, 1);
                //console.log(dNum, "activated", this.modules[this.mBoard].search(dNum).tick, this.modules[this.mGui].search(0));
            }
        }
        update(sts) {
            var mDeployed = this.mDeployed;
            var deployed = [100, 110, 120, 200, 210, 220];
            for (var d = 0, dLen = deployed.length; d < dLen; d++) {
                (typeof this.modules[mDeployed].search(deployed[d]) === "undefined") ? false: (typeof this.modules[mDeployed].search(deployed[d]) === "number") ? false : this.onLaunched(mDeployed, deployed[d]);
            }
        }
    }
    return Launched;
});
