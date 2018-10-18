define(function() {
    class Behavior {
        constructor() {
            this.name = "Behavior";
            this.modules = null;
            this.mCards = 0;
            this.mBoard = 0;
            this.mTransit = 0;
            this.mUnits = 0;
            this.mPos = 0;
            this.mPosX = 0;
            this.mPosY = 0;
            this.mPosR = 0;
            this.mPosU = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mCards = this.moduleID("Cards");
            this.mBoard = this.moduleID("Board");
            this.mTransit = this.moduleID("Transit");
            this.mUnits = this.moduleID("Units");
            this.mPos = this.moduleID("Pos");
            this.mPosX = this.moduleID("PosX");
            this.mPosY = this.moduleID("PosY");
            this.mPosR = this.moduleID("PosR");
            this.mPosU = this.moduleID("PosU");
            this.isReady = true;
        }
        moduleID(mID) {
            for (var id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        /*onLaunched(mDeployed, dNum) {
            if (this.modules[mDeployed].search(dNum).tick === this.modules[this.mTicker].search(0)) {
                //var self = this;
                var launched = this.modules[mDeployed].search(dNum);
                var cNum = launched.cnum;
                var cell = launched.cell;
                var uNum = this.modules[this.mCards].search(cNum);
                this.modules[this.mBoard].add(dNum, launched.nuid);
                this.modules[this.mPos].add(launched.nuid, dNum);
                this.getResolve(cNum, uNum, cell);
                this.modules[mDeployed].add(dNum, 1);
            }
        }*/
        onEnter(mPosU, sts) {
            //var doomed = [];
            var sorted = [];
            //var tNow = this.modules[this.mGui].search(0).tn;
            for (var t = 0, tLen = this.modules[mPosU].length(); t < tLen; t++) {
                var u = this.modules[mPosU].reveal()[t];
                //var v = this.modules[mPosU].search(u);
                //if (v.time <= tNow) { doomed.push(u); }
                //console.log(u, v);
                sorted.push(u);
                //sorted.push(v);
            }
            sorted.sort(function(a, b) {
                return a - b;
            });
            //v.time >= t.tn ? [transit].remove(id), [isActive].add(id, unit@w.pos) w.pos
            //ex: {id: 24, time: 19} {id: 24, pos: 110}
            this.getBehavior(sorted);
            //console.log(sorted, "isReady");
            //this.onEvent(sorted, doomed, mPosU, sts, tNow);
        }
        getBehavior(sorted) {
            //var nuSort = sorted.slice();
            let nuSort = [...sorted];
            sorted = [];
            for (var s = 0, sLen = nuSort.length; s < sLen; s++) {
                var cNum = nuSort[s];
                var uNum = this.modules[this.mUnits].search(cNum);
                var cell = this.modules[this.mPos].search(cNum);
                this.getScript(cNum, uNum, cell);
            }
            nuSort = [];
        }
        getScript(cNum, uNum, cell) {
            var self = this;
            require(["/wp-content/themes/blankslate-child/js/adb/unit" + uNum + ".js"], function(uScript) {
                uScript[4](self, cNum, uNum, cell);
                //console.log(self, cNum, uNum, cell);
                /* var resolve = uScript[4](self, cNum, uNum, cell);
                //console.log(self, resolve);
                //var tNow = self.modules[self.mTicker].search(0);
                //var launch = { tNum: tNum, spd: spd, tick: tNum + spd, tNow: tNow };
                //var launch = { cell: cell, hpos: hPos, cnum: cNum, side: player, tick: tNum + spd };
                //self.modules[self.mDeployed].add(player, launch);
                //console.log("launched:", launch);
                //var lNum = player === 1 ? 3 : 4;
                //self.modules[self.mControls].remove(player);
                //self.modules[self.mControls].remove(lNum); */
            });
        }
        /*onExit(mTransit, doomed, sts) {
            for (var d = 0, dLen = doomed.length; d < dLen; d++) {
                this.modules[mTransit].remove(doomed[d]);
            }
            doomed = [];
        }*/
        update(sts) {
            var mPosU = this.mPosU;
            if (this.modules[mPosU].length()) { this.onEnter(mPosU, sts); }
        }
    }
    return Behavior;
});
