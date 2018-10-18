define(["cs/core/Eid"], function(Eid) {
    class Reqmet {
        constructor() {
            this.name = "Reqmet";
            this.modules = null;
            this.mReq = 0;
            this.mEnergy = 0;
            this.mPaths = 0;
            this.mHand = 0;
            this.mDeck = 0;
            this.mCost = 0;
            this.mDeployed = 0;
            this.mView = 0;
            this.mKind = 0;
            this.Xid = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mReq = this.moduleID("Req");
            this.mEnergy = this.moduleID("Energy");
            this.mPaths = this.moduleID("Paths");
            this.mHand = this.moduleID("Hand");
            this.mDeck = this.moduleID("Deck");
            this.mCost = this.moduleID("Cost");
            this.mDeployed = this.moduleID("Deployed");
            this.mView = this.moduleID("View");
            this.mKind = this.moduleID("Kind");
            this.mXid = this.moduleID("Xid");
            this.preDraw(1, 11); //init reqMet
            this.preDraw(2, 21);
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        onReq(player) {
            if (typeof this.modules[this.mReq].search(player) === "undefined") { return; }
            else { this.getCostReq(player); }
        }
        getCostReq(player) {
            let hNum = player === 1 ? 10 : 20;
            let eNow = this.modules[this.mEnergy].search(player);
            let hPos = this.modules[this.mHand].search(hNum);
            let dNum = this.modules[this.mHand].search(hPos);
            let cNum = this.modules[this.mDeck].search(dNum);
            let cost = this.modules[this.mCost].search(cNum);
            //console.log(cost, eNow, cost > eNow, player);
            if (cost > eNow) { return; }
            else { this.getPathReq(player, hPos); }
        }
        getPathReq(player, hPos) {
            let pNum = this.modules[this.mPaths].search(player); //mPaths:0|34|68
            let path = pNum === 34 ? 1 : pNum === 68 ? 2 : 0;
            let cell = +(player + "" + path + "" + 0);
            //console.log(cell, player);
            if (typeof this.modules[this.mDeployed].search(cell) === "undefined") { this.preDraw(player, hPos); }
        }
        preDraw(player, hPos) {
            let nuID = this.getEID();
            this.modules[this.mView].add(nuID, nuID);
            this.modules[this.mKind].add(nuID, 9);
            this.modules[this.mXid].add(nuID, hPos); //hand: p1|2 + 1|2|3 pos
            this.modules[this.mReq].remove(player);
        }
        getEID() {
            let eid = new Eid();
            return eid.id;
        }
        update(sts) {
            this.onReq(1);
            this.onReq(2);
        }
    }
    return Reqmet;
});
