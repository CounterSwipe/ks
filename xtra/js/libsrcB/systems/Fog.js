define(["cs/core/Eid"], function(Eid) {
    class Fog {
        constructor() {
            this.name = "Fog";
            this.modules = null;
            this.mPaths = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mPaths = this.moduleID("Paths");
            this.modules[this.mPaths].add(3, 1); //init dualPaths|fog
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        getEID() {
                    let eid = new Eid();
            return eid.id;
        }
        update(sts) {
            if (typeof this.modules[this.mPaths].search(0) === "undefined") { return; }
            else if (typeof this.modules[this.mPaths].search(3) === "undefined") { return; }
            else {
                let nuID = this.getEID();
                this.modules[this.mPaths].remove(3);
                this.modules[this.moduleID("View")].add(nuID, nuID);
                this.modules[this.moduleID("Kind")].add(nuID, 7);
            }
        }
    }
    return Fog;
});
