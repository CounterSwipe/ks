define(["cs/core/Eid"], function(Eid) {
    class Resolve {
        constructor() {
            this.name = "Resolve";
            this.modules = null;
            this.mPosV = 0;
            this.mPosU = 0;
            this.mResMax = 0;
            this.mResNow = 0;
            this.mResPos = 0;
            this.mResNeg = 0;
            this.mView = 0;
            this.mKind = 0;
            this.mXid = 0;
            this.mXone = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mPosV = this.moduleID("PosV");
            this.mPosU = this.moduleID("PosU");
            this.mResMax = this.moduleID("ResMax");
            this.mResNow = this.moduleID("ResNow");
            this.mResPos = this.moduleID("ResPos");
            this.mResNeg = this.moduleID("ResNeg");
            this.mView = this.moduleID("View");
            this.mKind = this.moduleID("Kind");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
            //calcuate per total per tick, & if req, preDraw
            //if @ 0 -> trigger exhaust & if req exhaust function|ability
            this.isReady = true;
        }
        moduleID(mID) {
            for (var id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        onEnter(mPosU, sts) {
            var preSorted = this.modules[mPosU].reveal();
            let sorted = [...preSorted];
            for (var t = 0, tLen = sorted.length; t < tLen; t++) {
                var u = sorted[t];
                sorted.push(u);
                this.checkUnitRes(u);
            }
            sorted.sort(function(a, b) { return a - b; });
        }
        checkUnitRes(cNum) {
            var resNow = this.modules[this.mResNow].search(cNum);
            var resPos = (typeof this.modules[this.mResPos].search(cNum) === "undefined") ? 0 : this.modules[this.mResPos].search(cNum);
            var resNeg = (typeof this.modules[this.mResNeg].search(cNum) === "undefined") ? 0 : this.modules[this.mResNeg].search(cNum);
            //var nuRes = Math.round((resNow + resPos - resNeg), 2);
            var nuRes = Math.round((resNow - 5), 2); //todo:remove this test!
            if (nuRes < 0) { nuRes = 0; }
            if (resNow === nuRes) { return; }
            else {
                var resMax = this.modules[this.mResMax].search(cNum);
                var resPerc = Math.round((nuRes / resMax), 2); //;(Math.round((85 * .01), 3) + 15) + "%"; //@15% = 0!
                var resBar = (Math.round((85 * resPerc), 2) + 15);
                this.modules[this.mPosV].add(cNum, resBar);
                this.modules[this.mResNow].add(cNum, nuRes);
                this.modules[this.mResPos].remove(cNum);
                this.modules[this.mResNeg].remove(cNum);
                this.preDraw(15, cNum, resBar);
            }
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
        update(sts) {
            /*var mResPos = this.mResPos;
            var mResNeg = this.mResNeg;
            if (this.modules[mResPos].length() || this.modules[mResNeg].length()) { this.onEnter(mResPos, mResNeg, sts); }*/
            var mPosU = this.mPosU;
            if (this.modules[mPosU].length()) { this.onEnter(mPosU, sts); }
        }
    }
    return Resolve;
});
