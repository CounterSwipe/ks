define(function() {
    class TickM {
        constructor() {
            this.name = "TickM";
            this.modules = null;
            this.mTicker = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mTicker = this.moduleID("Ticker");
            this.modules[this.mTicker].add(0, 0); //init tick
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        update(sts) {
            let t = this.modules[this.mTicker].search(0);
            //ticks = 10 * regulation = 180, 1/3@60, 2/3@120 TODO: init these via chan|timer|this.m1st, this.m2nd properties ? etc
            t++;
            this.modules[this.mTicker].add(0, t);
            switch (true) {
                case ((t !== 60) && (t !== 120) && !(t >= 180)):
                    break;
                case (t === 60):
                    this.modules[this.moduleID("Paths")].add(0, 1);
                    break;
                case (t === 120):
                    this.modules[this.moduleID("Energy")].add(0, 1);
                    break;
                case (t >= 180):
                    if (t === 180) {
                        this.modules[this.moduleID("Chan")].add(0, 1);
                    }
                    else {
                        game.stop(); /*global game*/
                    }
                    break;
            }
            //game.stop(); /*global game*/
        }
    }
    return TickM;
});
