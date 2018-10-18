define(["cs/core/Eid"], function(Eid) {
    class Hub {
        constructor() {
            this.name = "Hub";
            this.modules = null;
            this.mControls = 0;
            this.mTicker = 0;
            this.mEnergy = 0;
            this.mPaths = 0;
            this.mHand = 0;
            this.mDeck = 0;
            this.mCards = 0;
            this.mCost = 0;
            this.mDeployed = 0;
            this.mView = 0;
            this.mKind = 0;
            this.mXid = 0;
            this.mXone = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mControls = this.moduleID("Controls");
            this.mTicker = this.moduleID("Ticker");
            this.mEnergy = this.moduleID("Energy");
            this.mPaths = this.moduleID("Paths");
            this.mHand = this.moduleID("Hand");
            this.mDeck = this.moduleID("Deck");
            this.mCards = this.moduleID("Cards");
            this.mCost = this.moduleID("Cost");
            this.mDeployed = this.moduleID("Deployed");
            this.mView = this.moduleID("View");
            this.mKind = this.moduleID("Kind");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        onHub(player) {
            if (typeof this.modules[this.mDeployed].search(player) === "undefined") { return; }
            else { this.payCost(player); }
        }
        payCost(player) {
            let eNow = this.modules[this.mEnergy].search(player);
            let launch = this.modules[this.mDeployed].search(player);
            let hPos = launch.hpos;
            let cell = launch.cell;
            let nuID = this.getEID();
            let dNum = this.modules[this.mHand].search(hPos);
            let cNum = this.modules[this.mDeck].search(dNum);
            //var uNum = this.modules[this.mCards].search(cNum);
            //var model = this.modules[this.mModel].search(cNum);
            let cost = this.modules[this.mCost].search(cNum);
            let eNew = Math.round((eNow - cost), 5);
            if (eNew < 0) { eNew = 0; }
            launch.nuid = nuID;
            //this.modules[this.mEnergy].add(player, eNew);todo:turn on cost!
            this.modules[this.mDeployed].add(launch.cell, launch);
            this.preDraw(player, eNew); //draw energy
            this.autoHub(player, hPos, cell);
        }
        preDraw(player, eNew) {
            let ePerc = Math.round((eNew * .01), 5); //eMax = 100 => eNew / 100 = eNew * .01
            let nuPad = Math.round((30 - (30 * ePerc)), 5); //vhMax = 30
            let nuID = this.getEID();
            this.modules[this.mView].add(nuID, nuID);
            this.modules[this.mKind].add(nuID, 1);
            this.modules[this.mXid].add(nuID, player);
            this.modules[this.mXone].add(nuID, nuPad);
        }
        autoHub(player, hPos, cell) {
            let nuUnit = player === 1 ? 5 : 6; //trigger unit
            let nuDeal = player === 1 ? 11 : 12; //publish hPos to nuDeal channel
            let nuRoute = player === 1 ? 21 : 22;
            let nuGui = player === 1 ? 13 : 14;
            this.modules[this.mControls].add(nuUnit, 1);
            this.modules[this.mControls].add(nuDeal, hPos);
            this.modules[this.mControls].add(nuRoute, 1);
            this.autoGui(player, hPos, nuGui);
            this.autoRoute(player, cell, nuRoute);
            //this.modules[this.mDeployed].remove(player); //unit removes this data
        }
        autoGui(player, hPos, nuGui) {
            let hNum = player === 1 ? 10 : 20;
            let hNow = this.modules[this.mHand].search(hNum);
            let hNew = hPos;
            if (hNow === hNew) {
                this.modules[this.mControls].add(nuGui, 1);
            }
            else if (hNow === hNew + 2 || hNow === hNew - 1) {
                let h = player === 1 ? 10 : 20;
                let hMax = player === 1 ? 13 : 23;
                let hPosNew = hNow === hMax ? hNow - 2 : hNow + 1;
                this.modules[this.mHand].add(h, hPosNew);
                this.modules[this.mControls].add(nuGui, 1);
            }
            else {
                //else if (hNow === hNew + 1 || hNow === hNew - 2) {
                //reqMet Only: remove hNow spotlight via draw
                //& trigger reqMet[controls](rNum, 1)
            }
        }
        /*getPad(player) {
            var nuPad;
            var pNow = this.modules[this.mPaths].search(player);
            if (typeof this.modules[this.mPaths].search(0) === "undefined") {
                return pNow === 68 ? Math.round((pNow - 34), 0) : Math.round((pNow + 34), 0)
            }
            else {
                return pNow === 68 ? Math.round((pNow - 68), 0) : Math.round((pNow + 34), 0);
            }
        }*/
        autoRoute(player, cell, nuRoute) {
            if (cell) {
                this.modules[this.mControls].add(nuRoute, 1); //todo: seperate scripts for newRoute & newGui
            }
        }
        getEID() {
            let eid = new Eid();
            return eid.id;
        }
        update(sts) {
            //todo: iterate all mHub -> per multiplayer re|connect etc
            this.onHub(1);
            this.onHub(2);
        }
    }
    return Hub;
});
