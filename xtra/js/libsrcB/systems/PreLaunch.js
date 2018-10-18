define(function() {
    class PreLaunch {
        constructor() {
            this.name = "PreLaunch";
            this.modules = null;
            this.mCsU = 0;
            this.mCsR = 0;
            this.mReq = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mCsU = this.moduleID("CsU");
            this.mCsR = this.moduleID("CsR");
            this.mReq = this.moduleID("Req");
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        prep(mSwipe, player) {
            if (this.modules[mSwipe].length()) {
                let values = this.modules[mSwipe].reveal();
                let v = [...values];
                if (typeof this.modules[this.mReq].search(player) === "undefined") {
                    this.modules[this.mReq].add(player + 10, v[0]); //[mReq](11|12,launchTick)
                }
                this.modules[mSwipe].remove(v[0]);
            }
        }
        update(sts) {
            this.prep(this.mCsU, 1);
            this.prep(this.mCsR, 2);
        }
    }
    return PreLaunch;
});
