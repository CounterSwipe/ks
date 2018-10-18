define(function() {
    class Launched {
        constructor() {
            this.name = "Launched";
            this.modules = null;
            this.mTicker = 0;
            this.mCards = 0;
            this.mDeployed = 0;
            this.mBoard = 0;
            this.mPos = 0;
            this.mResMax = 0;
            this.mResNow = 0;
            //this.mView = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mTicker = this.moduleID("Ticker");
            this.mCards = this.moduleID("Cards");
            this.mDeployed = this.moduleID("Deployed");
            this.mBoard = this.moduleID("Board");
            this.mPos = this.moduleID("Pos");
            this.mPosU = this.moduleID("PosU");
            this.mResMax = this.moduleID("ResMax");
            this.mResNow = this.moduleID("ResNow");
            //this.mView = this.moduleID("View");//todo: create visual that indicates when unit isActive
            this.isReady = true;
        }
        moduleID(mID) {
            for (var id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        onLaunched(mDeployed, dNum) {
            if (this.modules[mDeployed].search(dNum).tick === this.modules[this.mTicker].search(0)) {
                //var self = this;
                var launched = this.modules[mDeployed].search(dNum);
                var cNum = launched.cnum;
                var cell = launched.cell;
                var nuID = launched.nuid;
                var uNum = this.modules[this.mCards].search(cNum);
                this.modules[this.mBoard].add(dNum, nuID);
                this.modules[this.mPos].add(nuID, dNum);
                this.modules[this.mPosU].add(nuID, nuID);
                this.getResolve(nuID, cNum, uNum, cell);
                this.modules[mDeployed].add(dNum, 1);
            }
        }
        getResolve(nuID, cNum, uNum, cell) {
            var self = this;
            require(["/wp-content/themes/blankslate-child/js/adb/unit" + uNum + ".js"], function(uScript) {
                var resolve = uScript[3](self, cNum, uNum, cell);
                //var resolve = uScript[3]();
                self.modules[self.mResMax].add(nuID, resolve);
                self.modules[self.mResNow].add(nuID, resolve);
            });
        }
        update(sts) {
            var mDeployed = this.mDeployed;
            var deployed = [100, 110, 120, 200, 210, 220];
            for (var d = 0; d < 6; d++) {
                (typeof this.modules[mDeployed].search(deployed[d]) === "undefined") ? false: (typeof this.modules[mDeployed].search(deployed[d]) === "number") ? false : this.onLaunched(mDeployed, deployed[d]);
            }
        }
    }
    return Launched;
});
