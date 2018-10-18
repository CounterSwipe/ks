define(["cs/core/Eid"], function(Eid) {
    class Route {
        constructor() {
            this.name = "Route";
            this.modules = null;
            this.mCsD = 0;
            this.mCsL = 0;
            this.mReq = 0;
            this.mPaths = 0;
            this.mHand = 0;
            this.mView = 0;
            this.mKind = 0;
            this.mXid = 0;
            this.mXone = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mCsD = this.moduleID("CsD");
            this.mCsL = this.moduleID("CsL");
            this.mReq = this.moduleID("Req");
            this.mPaths = this.moduleID("Paths");
            this.mHand = this.moduleID("Hand");
            this.mView = this.moduleID("View");
            this.mKind = this.moduleID("Kind");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
            this.modules[this.mPaths].add(1, 34); //init p1 path1
            this.modules[this.mPaths].add(2, 34); //init p2 path1
            this.preDraw(2, 1, 34); //trigger draw path
            this.preDraw(2, 2, 34);
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        inRoute(mSwipe, player) {
            if (this.modules[mSwipe].length()) {
                let values = this.modules[mSwipe].reveal();
                let v = [...values];
                this.onRoute(mSwipe, player, v[0]);
            }
        }
        onRoute(mSwipe, player, pNum) {
            let nuPad = this.getPad(player);
            this.modules[this.mPaths].add(player, nuPad);
            this.preDraw(2, player, nuPad);
            this.modules[mSwipe].remove(pNum);
            if (typeof this.modules[this.mReq].search(player) === "undefined") { this.reqMet(player); }
        }
        preDraw(kind, player, nuPad) {
            let nuID = this.getEID();
            this.modules[this.mView].add(nuID, nuID);
            this.modules[this.mKind].add(nuID, kind);
            this.modules[this.mXid].add(nuID, player);
            this.modules[this.mXone].add(nuID, nuPad);
        }
        getPad(player) {
            let pNow = this.modules[this.mPaths].search(player);
            if (typeof this.modules[this.mPaths].search(0) === "undefined") {
                return pNow === 68 ? Math.round((pNow - 34), 0) : Math.round((pNow + 34), 0);
            }
            else {
                return pNow === 68 ? Math.round((pNow - 68), 0) : Math.round((pNow + 34), 0);
            }
        }
        reqMet(player) {
            let h = player === 1 ? 10 : 20;
            let hPos = this.modules[this.mHand].search(h);
            let nuID = this.getEID();
            this.modules[this.mView].add(nuID, nuID);
            this.modules[this.mKind].add(nuID, 8);
            this.modules[this.mXid].add(nuID, hPos); //hand: p1|2 + 1|2|3 pos
            this.modules[this.mReq].add(player, 1);
        }
        getEID() {
            let eid = new Eid();
            return eid.id;
        }
        update(sts) {
            this.inRoute(this.mCsD, 1);
            this.inRoute(this.mCsL, 2);
        }
    }
    return Route;
});
