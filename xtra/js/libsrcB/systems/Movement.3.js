define(["cs/core/Eid"], function(Eid) {
    class Movement {
        constructor() {
            this.name = "Movement";
            this.modules = null;
            this.mTicker = 0;
            this.mDeployed = 0;
            this.mBoard = 0;
            this.mTransit = 0;
            this.mUnits = 0;
            this.mPos = 0;
            this.mPosX = 0;
            this.mPosY = 0;
            this.mPosR = 0;
            this.mPosU = 0;
            this.mView = 0;
            this.mKind = 0;
            this.mXid = 0;
            this.mXone = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mTicker = this.moduleID("Ticker");
            this.mDeployed = this.moduleID("Deployed");
            this.mBoard = this.moduleID("Board");
            this.mTransit = this.moduleID("Transit");
            this.mUnits = this.moduleID("Units");
            this.mPos = this.moduleID("Pos");
            this.mPosX = this.moduleID("PosX");
            this.mPosY = this.moduleID("PosY");
            this.mPosR = this.moduleID("PosR");
            this.mPosU = this.moduleID("PosU");
            this.mView = this.moduleID("View");
            this.mKind = this.moduleID("Kind");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
            this.isReady = true;
        }
        moduleID(mID) {
            for (var id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) {
                    return id;
                }
            }
        }
        onEnter(mTransit, sts) {
            //console.log(this.modules[this.mTicker].search(0), this.modules[mTransit].reveal());
            var preSorted = this.modules[mTransit].reveal();
            let sorted = [...preSorted];
            //var sorted = [];
            //for (var t = 0, tLen = this.modules[mTransit].length(); t < tLen; t++) {
            for (var t = 0, tLen = sorted.length; t < tLen; t++) {
                var u = sorted[t];
                //var u = this.modules[mTransit].reveal()[t];
                sorted.push(u);
                //console.log(this.modules[this.mTicker].search(0), u);
                this.moveUnit(u);
            }
            sorted.sort(function(a, b) {
                return a - b;
            });
        }
        moveUnit(cNum) {
            if (typeof this.modules[this.mTicker].search(cNum) === "undefined") {
                if (typeof this.modules[this.mUnits].search(cNum) === "undefined") {
                    //todo: fix bug: occurs when more than 1 unit in transit!
                    console.log(this.modules[this.mTicker].search(0), "error!", cNum, this.modules[this.mTicker].search(cNum));
                    return;
                }
                else {
                    var uNum = this.modules[this.mUnits].search(cNum);
                    this.getSpd(cNum, uNum);
                }
            }
            else {
                var nuTick = this.modules[this.mTicker].search(cNum) - 1;
                if (nuTick === 0) {
                    //console.log("end move", cNum);
                    var cell = this.modules[this.mPos].search(cNum);
                    var nuCell = cell + 1;
                    if (+cell.toString().substr(-1, 1) === 0) {
                        this.modules[this.mDeployed].remove(cell);
                    };
                    this.modules[this.mTicker].remove(cNum);
                    this.modules[this.mTransit].remove(cNum);
                    this.modules[this.mBoard].remove(cell);
                    this.modules[this.mBoard].add(nuCell, cNum);
                    this.modules[this.mPosU].add(cNum, cNum);
                    this.modules[this.mPos].add(cNum, nuCell);
                }
                else {
                    this.modules[this.mTicker].add(cNum, nuTick);
                }
            }
        }
        getSpd(cNum, uNum) {
            var self = this;
            require(["/wp-content/themes/blankslate-child/js/adb/unit" + uNum + ".js"], function(uScript) {
                var spd = uScript[1];
                self.modules[self.mTicker].add(cNum, spd);
                self.move(cNum);
            });
        }
        move(cNum) {
            var pos = this.modules[this.mPos].search(cNum);
            var posX = this.modules[this.mPosX].search(cNum);
            var posY = this.modules[this.mPosY].search(cNum);
            var posR = this.modules[this.mPosR].search(cNum);
            var nuPosX = pos < 199 ? Math.round((posX + 33), 0) : Math.round((posX - 33), 0);
            var nuPosY = Math.round((posY - 0.5), 3);
            var nuPosR = Math.round((posR - 0.2), 3);
            this.modules[this.mPosX].add(cNum, nuPosX);
            this.modules[this.mPosY].add(cNum, nuPosY);
            this.modules[this.mPosR].add(cNum, nuPosR);
            this.preDraw(12, cNum, nuPosX);
            this.preDraw(13, cNum, nuPosY);
            this.preDraw(14, cNum, nuPosR);
        }
        preDraw(kind, xid, xone) {
            var nuID = this.getEID();
            this.modules[this.mView].add(nuID, nuID);
            this.modules[this.mKind].add(nuID, kind);
            this.modules[this.mXid].add(nuID, xid);
            this.modules[this.mXone].add(nuID, xone);
            //console.log(nuID, kind, xid, xone)
        }
        getEID() {
            var eid = new Eid();
            return eid.id;
        }
        onExit(mTransit, doomed, sts) {
            for (var d = 0, dLen = doomed.length; d < dLen; d++) {
                this.modules[mTransit].remove(doomed[d]);
            }
            doomed = [];
        }
        update(sts) {
            var mTransit = this.mTransit;
            if (this.modules[mTransit].length()) { this.onEnter(mTransit, sts); }
        }
    }
    return Movement;
});
