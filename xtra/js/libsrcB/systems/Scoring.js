define(function() {
    class Scoring {
        constructor() {
            this.name = "Scoring";
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
            //calcuate per player LoA, (pushZonedef etc?) points needed to capture each moment
            //then display & update score pts & bars width when req etc
            //if win condition met before timer ends, game.end()
            //p1|2 + path0|1|2 + 0:now|1:max|2:width%|3:+|4:-
            this.isReady = true;
        }
        moduleID(mID) {
            for (var id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        update(sts) {}
    }
    return Scoring;
});
