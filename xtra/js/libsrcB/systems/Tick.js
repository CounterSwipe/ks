define(function() {
    class Tick {
        constructor() {
            this.name = "Tick";
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
            t++;
            this.modules[this.mTicker].add(0, t);
            switch (t) {
                case (!33 && !66 && !201):
                    break;
                case (33):
                    this.modules[this.moduleID("Paths")].add(0, 1);
                    break;
                case (66):
                    this.modules[this.moduleID("Energy")].add(0, 1);
                    break;
                case (201):
                    game.stop(); /*global game*/
                    break;
            }
            //this.modules[this.mTicker].add(0, t);
        }
    }
    return Tick;
});
