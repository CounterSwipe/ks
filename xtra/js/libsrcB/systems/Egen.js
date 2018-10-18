define(function() {
    class Egen {
        constructor() {
            this.name = "Egen";
            this.modules = null;
            this.mTicker = 0;
            this.mEnergy = 0;
            this.mView = 0;
            this.mKind = 0;
            this.mXid = 0;
            this.mXone = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mTicker = this.moduleID("Ticker");
            this.mEnergy = this.moduleID("Energy");
            this.mView = this.moduleID("View");
            this.mKind = this.moduleID("Kind");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
            this.modules[this.mTicker].add(3, 0); //init eTicker
            this.modules[this.mEnergy].add(1, 60); //init p1 energy
            this.modules[this.mEnergy].add(2, 60); //init p2 energy
            this.preDraw(1, 60); //trigger draw energy
            this.preDraw(2, 60);
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        genE(player, sts) {
            let eNow = this.modules[this.mEnergy].search(player);
            if (eNow < 100) {
                let generate = Math.round((Math.round((7 * 0.001), 5) * sts), 5);
                let eGen = Math.round((generate * 10), 5); //per 1x / 10 ticks = eTicker 
                let eNew = Math.round((eNow + eGen), 5);
                if (eNew > 100) { eNew = 100; }
                this.modules[this.mEnergy].add(player, eNew);
                this.preDraw(player, eNew);
            }
        }
        preDraw(player, eNew) {
            let ePerc = Math.round((eNew * .01), 5); //eMax = 100 => eNew / 100 = eNew * .01
            let nuPad = Math.round((30 - (30 * ePerc)), 5); //vhMax = 30
            this.modules[this.mView].add(player, player);
            this.modules[this.mKind].add(player, 1);
            this.modules[this.mXid].add(player, player);
            this.modules[this.mXone].add(player, nuPad);
        }
        update(sts) {
            let t = this.modules[this.mTicker].search(3);
            t++;
            switch (true) {
                case (t === 20 && (typeof this.modules[this.mEnergy].search(0) === "undefined")):
                case (t === 10 && (typeof this.modules[this.mEnergy].search(0) !== "undefined")):
                    t = 0;
                    this.modules[this.mTicker].add(3, t);
                    this.genE(1, sts);
                    this.genE(2, sts);
                    break;
                default:
                    this.modules[this.mTicker].add(3, t);
            }
        }
    }
    return Egen;
});
