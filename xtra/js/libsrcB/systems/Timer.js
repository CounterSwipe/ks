define(function() {
    class Timer {
        constructor() {
            this.name = "Timer";
            this.modules = null;
            this.mTicker = 0;
            this.mView = 0;
            this.mKind = 0;
            this.mXone = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mTicker = this.moduleID("Ticker");
            this.mView = this.moduleID("View");
            this.mKind = this.moduleID("Kind");
            this.mXone = this.moduleID("Xone");
            let startTime = 15;
            this.modules[this.mTicker].add(1, 0); //init ticker
            this.modules[this.mTicker].add(2, startTime); //init timer
            this.modules[this.mView].add(0, 0); //trigger draw timer
            this.modules[this.mKind].add(0, 0);
            this.modules[this.mXone].add(0, startTime);
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
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
                    this.modules[this.mView].add(0, 0);
                    this.modules[this.mKind].add(0, 0);
                    this.modules[this.mXone].add(0, s);
                    break;
                default:
                    this.modules[this.mTicker].add(1, t);
            }
        }
    }
    return Timer;
});
