define(function() {
    class ControllerA {
        constructor() {
            this.name = "ControllerA";
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
                        case (0):
                            break;
                        case (1):
                            console.log("sL", k, j);
                            break;
                        case (2):
                            console.log("sU", k, j);
                            window.location.href = "/wp-login.php"; //history.backBtn(true) 
                            //window.location.replace("/wp-login.php"); //history.backBtn(false) 
                            break;
                        case (3):
                            console.log("sR", k, j);
                            break;
                        case (4):
                            console.log("sD", k, j);
                            break;
                        default:
                            console.log("tap", k, j);
                    }
                    this.modules[mControls].remove(k);
                }
            }
        }
        update(sts) {
            if (this.modules[this.mControls].length()) { this.getControls(this.mControls, sts); }
        }
    }
    return ControllerA;
});
