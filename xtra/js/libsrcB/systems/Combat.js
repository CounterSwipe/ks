define(function() {
    class Combat {
        constructor() {
            this.name = "Combat";
            this.modules = null;
            this.mMoments = 0;
            this.mView = 0;
            this.mKind = 0;
            this.mXone = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mMoments = this.moduleID("Moments");
            this.mView = this.moduleID("View");
            this.mKind = this.moduleID("Kind");
            this.mXone = this.moduleID("Xone");
            //perhaps collision system = range activation target detection system etc
            //iow perhaps auto check if units are in target range (per transit & stateChangeTriggers etc)
            //& if True -> do mod sequence [(chargeup) + mod (push|pull etc) + (cooldown)] & repeat|change state etc
            this.isReady = true;
        }
        moduleID(mID) {
            for (var id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        update(sts) {}
    }
    return Combat;
});
