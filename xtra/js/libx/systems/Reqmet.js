define(["cs/core/Eid"], function(Eid) {
    class Reqmet {
        constructor() {
            this.name = "Reqmet";
            this.modules = null;
            this.mChan = 0;
            this.mEnergy = 0;
            this.mPaths = 0;
            this.mHand = 0;
            this.mDeck = 0;
            this.mCost = 0;
            this.mDeployed = 0;
            this.mView = 0;
            this.mXfun = 0;
            this.Xid = 0;
            this.Xone = 0;
            this.Xtwo = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mChan = this.moduleID("Chan");
            this.mEnergy = this.moduleID("Energy");
            this.mPaths = this.moduleID("Paths");
            this.mHand = this.moduleID("Hand");
            this.mDeck = this.moduleID("Deck");
            this.mCost = this.moduleID("Cost");
            this.mDeployed = this.moduleID("Deployed");
            this.mView = this.moduleID("View");
            this.mXfun = this.moduleID("Xfun");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
            this.mXtwo = this.moduleID("Xtwo");
            this.modules[this.mChan].add(33, 1); //init reqMet
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        getCostReq() {
            let eNow = this.modules[this.mEnergy].search(1);
            let hPos = this.modules[this.mHand].search(10);
            let dNum = this.modules[this.mHand].search(hPos);
            let cNum = this.modules[this.mDeck].search(dNum);
            let cost = this.modules[this.mCost].search(cNum);
            //console.log(cost, eNow, cost > eNow, player);
            if (cost > eNow) { return; }
            else { this.getPathReq(); }
        }
        getPathReq() {
            let pNum = this.modules[this.mPaths].search(1); //mPaths:5|37|69
            let path = pNum === 37 ? 1 : pNum === 69 ? 2 : 0; //path(a:0|b:1|c:2)
            let cell = +(1 + "" + path + "" + 0); //board(cell) = player(1|2) + path(a:0|b:1|c:2) + pos(1|2|3)
            if (typeof this.modules[this.mDeployed].search(cell) === "undefined") { this.reqMet(); }
        }
        reqMet() {
            this.preDraw([7, 21, 3, 2]); //ebar ylo on
            let focused = this.modules[this.mHand].search(10);
            let focus = +(focused + "" + 0);
            this.preDraw([7, focus + 1, 3, 2]); //focus ylo on
            this.modules[this.mChan].remove(33);
        }
        preDraw(drawn) {
            let nuID = this.getEID();
            this.modules[this.mView].add(nuID, nuID);
            this.modules[this.mXfun].add(nuID, drawn[0]);
            this.modules[this.mXid].add(nuID, drawn[1]);
            this.modules[this.mXone].add(nuID, drawn[2]);
            this.modules[this.mXtwo].add(nuID, drawn[3]);
        }
        getEID() {
            let eid = new Eid();
            return eid.id;
        }
        update(sts) {
            if (typeof this.modules[this.mChan].search(33) === "undefined") { return; }
            else { this.getCostReq(); }
        }
    }
    return Reqmet;
});
