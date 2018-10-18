define(["cs/core/Eid"], function(Eid) {
    class Gui {
        constructor() {
            this.name = "Gui";
            this.modules = null;
            this.mCtL = 0;
            this.mCtR = 0;
            this.mReq = 0;
            this.mHand = 0;
            this.mView = 0;
            this.mKind = 0;
            this.mXid = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mCtL = this.moduleID("CtL");
            this.mCtR = this.moduleID("CtR");
            this.mReq = this.moduleID("Req");
            this.mHand = this.moduleID("Hand");
            this.mView = this.moduleID("View");
            this.mKind = this.moduleID("Kind");
            this.mXid = this.moduleID("Xid");
            this.preDraw(4, 11);
            this.preDraw(4, 21);
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        /*focused(player) {
            let hPos = player === 1 ? 11 : 21;
            for (let i = 0; i < 3; i++) {
                let dNum = this.modules[this.mHand].search(hPos);
                let cNum = this.modules[this.mDeck].search(dNum);
                let uNum = this.modules[this.mCards].search(cNum);
                let model = this.modules[this.mModel].search(cNum);
                let cost = this.modules[this.mCost].search(cNum);
                for (let j = 0; j < 2; j++) {
                    let nuID = this.getEID();
                    let kind = j === 0 ? 4 : 5;
                    this.modules[this.mView].add(nuID, nuID);
                    this.modules[this.mKind].add(nuID, kind);
                    this.modules[this.mXid].add(nuID, hPos); //hand: p1|2 + 1|2|3 pos
                    if (j === 0) {
                        this.modules[this.mXone].add(nuID, uNum); //uNum|make
                        this.modules[this.mXtwo].add(nuID, model); //model
                    }
                    else { this.modules[this.mXone].add(nuID, cost); }
                }
                ++hPos;
            }
        }*/
        inFocus(mSwipe, player) {
            if (this.modules[mSwipe].length()) {
                let values = this.modules[mSwipe].reveal();
                let v = [...values];
                this.autoFocus(mSwipe, player, v[0]);
            }
        }
        autoFocus(mSwipe, player, hNum) {
            let h = player === 1 ? 10 : 20;
            let hMax = player === 1 ? 13 : 23;
            let hPosOld = this.modules[this.mHand].search(h);
            let hPosNew = hPosOld === hMax ? hPosOld - 2 : hPosOld + 1;
            this.modules[this.mHand].add(h, hPosNew);
            this.preDraw(3, hPosOld);
            this.preDraw(4, hPosNew);
            this.modules[mSwipe].remove(hNum);
            if (typeof this.modules[this.mReq].search(player) === "undefined") { this.reqMet(player, hPosOld); }
        }
        preDraw(kind, hPos) {
            let nuID = this.getEID();
            this.modules[this.mView].add(nuID, nuID);
            this.modules[this.mKind].add(nuID, kind); //3:Old,4:Nue
            this.modules[this.mXid].add(nuID, hPos); //hand: p1|2 + 1|2|3 pos
        }
        reqMet(player, hPos) {
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
            this.inFocus(this.mCtL, 1);
            this.inFocus(this.mCtR, 2);
        }
    }
    return Gui;
});
