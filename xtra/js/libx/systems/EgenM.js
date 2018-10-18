define(["cs/core/Eid"], function(Eid) {
    class EgenM {
        constructor() {
            this.name = "EgenM";
            this.modules = null;
            this.mTicker = 0;
            this.mEnergy = 0;
            this.mView = 0;
            this.mXid = 0;
            this.mXfun = 0;
            this.mXone = 0;
            this.mXtwo = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mTicker = this.moduleID("Ticker");
            this.mEnergy = this.moduleID("Energy");
            this.mView = this.moduleID("View");
            this.mXfun = this.moduleID("Xfun");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
            this.mXtwo = this.moduleID("Xtwo");
            this.modules[this.mTicker].add(3, 0); //init eTicker
            this.modules[this.mEnergy].add(1, 60); //p1 start@60 energy
            this.modules[this.mEnergy].add(2, 60); //p2 start@60 energy
            this.prepDraw(60);
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        genE(player, sts) {
            let eNow = this.modules[this.mEnergy].search(player);
            //console.log(eNow);
            if (eNow < 100) {
                let generate = Math.round((Math.round((7 * 0.001), 5) * sts), 5);
                let eGen = Math.round((generate * 10), 5); //per 1x / 10 ticks = eTicker 
                let eNew = Math.round((eNow + eGen), 5);
                if (eNew > 100) { eNew = 100; }
                this.modules[this.mEnergy].add(player, eNew);
                if (player === 1) { this.prepDraw(eNew); }
            }
        }
        prepDraw(eNew) {
            let ePerc = Math.round((eNew * .01), 5); //eMax = 100 => eNew / 100 = eNew * .01
            let nuPad = Math.round((30 - (30 * ePerc)), 5); //vhMax = 30
            let nuEng = Math.round((30 - nuPad), 5); //vhMax = 30
            //console.log(eNew, nuPad, nuEng);
            this.preDraw([11, 2, 3, nuPad]); //11:pad 2:id 3:h nuPad
            this.preDraw([11, 20, 3, nuEng]);
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
            let t = this.modules[this.mTicker].search(3);
            t++;
            switch (true) {
                case (t === 20 && (typeof this.modules[this.mEnergy].search(0) === "undefined")):
                case (t >= 10 && (typeof this.modules[this.mEnergy].search(0) !== "undefined")): //===10
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
    return EgenM;
});
