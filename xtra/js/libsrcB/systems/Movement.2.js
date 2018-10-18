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
            //var doomed = [];
            var sorted = [];
            //var tNow = this.modules[this.mGui].search(0).tn;
            for (var t = 0, tLen = this.modules[mTransit].length(); t < tLen; t++) {
                var u = this.modules[mTransit].reveal()[t];
                //var v = this.modules[mTransit].search(u);
                //if (v.time <= tNow) { doomed.push(u); }
                sorted.push(u);
                this.moveUnit(u);
                //console.log("moveUnit", u);
                //sorted.push(v);
            }
            sorted.sort(function(a, b) {
                return a - b;
            });
            //v.time >= t.tn ? [transit].remove(id), [isActive].add(id, unit@w.pos) w.pos
            //ex: {id: 24, time: 19} {id: 24, pos: 110}
            //this.onEvent(sorted, doomed, mTransit, sts, tNow);
            //this.onExit(mTransit, sorted, sts);
            //this.onExit(mTransit, doomed, sts);
        }
        moveUnit(cNum) {
            if (typeof this.modules[this.mTicker].search(cNum) === "undefined") {
                //var uNum;
                if (typeof this.modules[this.mUnits].search(cNum) === "undefined") {
                    //todo: fix bug: occurs when more than 1 unit in transit!
                    console.log("error!", cNum, this.modules[this.mTicker].search(cNum));
                    return;
                } //catches errors per slow loading uNumScripts!
                else {
                    var uNum = this.modules[this.mUnits].search(cNum);
                    this.getSpd(cNum, uNum);
                }
                //var uNum = this.modules[this.mUnits].search(cNum);
                /*if (this.modules[this.mPosX].search(cNum) === 66 && this.modules[this.mPos].search(cNum) < 199) {
                    console.log("error!", cNum);
                    this.modules[this.mTicker].remove(cNum);
                    this.modules[this.mTransit].remove(cNum);
                    this.modules[this.mPosU].add(cNum, cNum);
                } */ //catches errors per slow loading uNumScripts!
                /*var pos = this.modules[this.mPos].search(cNum);
                var posX = this.modules[this.mPosX].search(cNum);
                var posY = this.modules[this.mPosY].search(cNum);
                var posR = this.modules[this.mPosR].search(cNum);
                var nuPosX = pos < 200 ? Math.round((posX + 33), 0) : Math.round((posX - 33), 0);
                var nuPosY = Math.round((posY - .5), 2);
                var nuPosR = Math.round((posR - .2), 2);
                this.modules[this.mPosX].add(cNum, nuPosX);
                this.modules[this.mPosY].add(cNum, nuPosY);
                this.modules[this.mPosR].add(cNum, nuPosR);
                this.preDraw(12, cNum, nuPosX);
                this.preDraw(13, cNum, nuPosY);
                this.preDraw(14, cNum, nuPosR);*/
            }
            else {
                var nuTick = this.modules[this.mTicker].search(cNum) - 1;
                if (nuTick === 0) {
                    //console.log("end move", cNum);
                    var cell = this.modules[this.mPos].search(cNum);
                    var nuCell = cell + 1;
                    //console.log(cell, nuCell);
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
        getSpd(cNum, uNum) {
            var self = this;
            //console.log(uNum);
            require(["/wp-content/themes/blankslate-child/js/adb/unit" + uNum + ".js"], function(uScript) {
                var spd = uScript[1];
                //console.log("begin move", cNum);
                self.modules[self.mTicker].add(cNum, spd);
                self.move(cNum);
            });
        }
        preDraw(kind, xid, xone) {
            var nuID = this.getEID();
            this.modules[this.mView].add(nuID, nuID);
            this.modules[this.mKind].add(nuID, kind);
            this.modules[this.mXid].add(nuID, xid);
            this.modules[this.mXone].add(nuID, xone);
            //console.log(nuID, kind, xid, xone)
        }
        onEvent(sorted, doomed, mTransit, sts, tNow) {
            for (var s = 0, sLen = sorted.length; s < sLen; s++) {
                this.nuWidth(sorted[s], sts, tNow); //pose posX
                this.nuMar(sorted[s], sts, tNow); //pose posY
                this.nuPad(sorted[s], sts, tNow); //resBar posY
            }
            sorted = [];
            this.onExit(mTransit, doomed, sts);
        }
        getEID() {
            var eid = new Eid();
            return eid.id;
        }
        nextPoint(a, b, step) {
            //var delta = step / 50; // so t goes from 0 at the start to 1 at step 29. //100 //50 x2 to|fro
            var delta = step;
            var xx = Math.round(((1 - delta) * a[0] + delta * b[0]), 3);
            var yy = Math.round(((1 - delta) * a[1] + delta * b[1]), 3);
            return [xx, yy];
        }
        nuWidth(uSort, sts, tNow) {
            var vID = this.getEID();
            var jsID = "js-" + uSort.id + "-width"; //unit html Eid
            var nuWidth = this.getWidth(uSort.pos, uSort.time, sts, tNow);
            var draw = { id: vID, jsID: jsID, nuWidth: nuWidth, vDraw: 2 };
            this.modules[this.mView].add(vID, draw);
        }
        getWidth(pos, ticked, sts, tNow) {
            var sideW = 33;
            var step = Math.round(((ticked - tNow) * (sts * .01)), 3);
            var nuPerc = Math.round((1 - (step * .1)), 3);
            var stepW = Math.round((sideW * nuPerc), 3);
            var nuW = pos < 200 ? Math.round((stepW), 3) : Math.round((66 - stepW), 3);
            return nuW + "%";
        }
        nuMar(uSort, sts, tNow) {
            var vID = this.getEID();
            var jsID = "js-" + uSort.id + "-martop"; //unit html Eid
            var nuMar = this.getMar(uSort.pos, uSort.time, sts, tNow);
            var draw = { id: vID, jsID: jsID, nuMar: nuMar, vDraw: 6 };
            this.modules[this.mView].add(vID, draw);
        }
        getMar(pos, ticked, sts, tNow) {
            var baseM = pos === 100 || pos === 200 ? .4 : pos === 110 || pos === 210 ? .7 : pos === 120 || pos === 220 ? 1 : console.log("error")
            var step = Math.round(((ticked - tNow) * (sts * .01)), 3);
            var nuPerc = Math.round((1 - (step * .1)), 3);
            var subP = Math.round((.2 * nuPerc), 3);
            var nuM = Math.round((baseM - subP), 3);
            return nuM + "rem";
        }
        nuPad(uSort, sts, tNow) {
            var vID = this.getEID();
            var jsID = "js-" + uSort.id + "-pad"; //unit html Eid
            var nuPad = this.getPad(uSort.pos, uSort.time, sts, tNow);
            var draw = { id: vID, jsID: jsID, nuPad: nuPad, vDraw: 1 };
            this.modules[this.mView].add(vID, draw);
        }
        getPad(pos, ticked, sts, tNow) {
            var baseP = pos === 100 || pos === 200 ? 3 : pos === 110 || pos === 210 ? 3.25 : pos === 120 || pos === 220 ? 3.5 : console.log("error")
            var step = Math.round(((ticked - tNow) * (sts * .01)), 3);
            var nuPerc = Math.round((1 - (step * .1)), 3);
            var subP = Math.round((.5 * nuPerc), 3);
            var nuP = Math.round((baseP - subP), 3);
            return nuP + "vh";
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
