define(function() {
    class Timer {
        constructor() {
            this.name = "Timer";
            this.modules = null;
            this.mTicker = 0;
            this.mView = 0;
            this.mXfun = 0;
            this.mXid = 0;
            this.mXone = 0;
            this.mXtwo = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mTicker = this.moduleID("Ticker");
            this.mView = this.moduleID("View");
            this.mXfun = this.moduleID("Xfun");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
            this.mXtwo = this.moduleID("Xtwo");
            let startTime = 18;
            this.modules[this.mTicker].add(1, 0); //init ticker
            this.modules[this.mTicker].add(2, startTime); //init timer
            //this.modules[this.mView].add(0, 0); //trigger draw timer
            //this.modules[this.mXfun].add(0, 0);
            //this.modules[this.mXid].add(0, 0);
            //this.modules[this.mXone].add(0, startTime);
            //this.modules[this.mXtwo].add(0, startTime);
            this.preDraw([5, 1001, 0, startTime]); //5:tC 1001:id 0:p startTime
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        preDraw(drawn) {
            let nuID = 0;
            this.modules[this.mView].add(nuID, nuID);
            this.modules[this.mXfun].add(nuID, drawn[0]);
            this.modules[this.mXid].add(nuID, drawn[1]);
            this.modules[this.mXone].add(nuID, drawn[2]);
            this.modules[this.mXtwo].add(nuID, drawn[3]);
        }
        update(sts) {
            let t = this.modules[this.mTicker].search(1);
            t++;
            switch (t) {
                case (10):
                    let s = this.modules[this.mTicker].search(2);
                    --s;
                    t = 0;
                    if (s < 0) { return; }
                    this.modules[this.mTicker].add(1, t);
                    this.modules[this.mTicker].add(2, s);
                    this.preDraw([5, 1001, 0, s]);
                    //this.modules[this.mView].add(0, 0);
                    //this.modules[this.mXfun].add(0, 0);
                    //this.modules[this.mXid].add(0, 0);
                    //this.modules[this.mXone].add(0, s);
                    //this.modules[this.mXtwo].add(0, s);
                    break;
                default:
                    this.modules[this.mTicker].add(1, t);
            }
        }
    }
    return Timer;
});
