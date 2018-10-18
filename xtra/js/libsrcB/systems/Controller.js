define(function() {
    class Controller {
        constructor() {
            this.name = "Controller";
            this.modules = null;
            this.mControls = 0;
            this.mTicker = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mControls = this.moduleID("Controls");
            this.mTicker = this.moduleID("Ticker");
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        getControls(mControls, sts) {
            let values = this.modules[mControls].reveal();
            let keyRing = this.modules[mControls].unveil();
            let entry = [...values];
            let tick = [...keyRing];
            let tickNow = this.modules[this.mTicker].search(0);
            let i = entry.length;
            while (i--) {
                let j = entry[i];
                let k = +tick[i];
                if (k <= tickNow) {
                    switch (j) {
                        case (1):
                            this.modules[this.moduleID("CsU")].add(k, k);
                            break;
                        case (2):
                            this.modules[this.moduleID("CsR")].add(k, k);
                            break;
                        case (3):
                            this.modules[this.moduleID("CtL")].add(k, k);
                            break;
                        case (4):
                            this.modules[this.moduleID("CtR")].add(k, k);
                            break;
                        case (5):
                            this.modules[this.moduleID("CsD")].add(k, k);
                            break;
                        case (6):
                            this.modules[this.moduleID("CsL")].add(k, k);
                            break;
                    }
                    this.modules[mControls].remove(k);
                }
            }
        }
        update(sts) {
            if (this.modules[this.mControls].length()) { this.getControls(this.mControls, sts); }
        }
    }
    return Controller;
});
