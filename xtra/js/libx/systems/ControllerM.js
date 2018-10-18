define(function() {
    class ControllerM {
        constructor() {
            this.name = "ControllerM";
            this.modules = null;
            this.mControls = 0;
            this.mTicker = 0;
            this.mChan = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mControls = this.moduleID("Controls");
            this.mTicker = this.moduleID("Ticker");
            this.mChan = this.moduleID("Chan");
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
                            this.modules[this.mChan].add(31, 1); //trigger nuFocus
                            break;
                        case (2):
                            console.log("sU", k, j);
                            this.modules[this.mChan].add(32, 1); //trigger nuPath
                            //this.pub();
                            //window.location.replace("/match/"); //history.backBtn(false)
                            break;
                        case (3):
                            let path = this.modules[this.moduleID("Paths")].search(1);
                            console.log("sR", k, j, path);
                            let p = path === 69 ? 2 : path === 37 ? 1 : 0;
                            let amt = 5;
                            /*global game*/
                            let msg = {
                                move: {
                                    p: p,
                                    amt: amt}
                            };
                            game.pubnub.sendMsg(msg);
                            //this.modules[this.mChan].add(1 + "" + p, 5); / / trigger captured(player + "" + p)
                            break;
                        case (4):
                            console.log("sD", k, j);
                            //window.location.href = "/gui/"; //history.backBtn(true) 
                            window.location.replace("/gui/"); //history.backBtn(false) 
                            break;
                        default:
                            console.log("tap", k, j);
                    }
                    this.modules[mControls].remove(k);
                }
            }
        }
        pub() {
            var newMsg = {
                move: "b1"
            };
            /*global game*/
            game.pubnub.sendMsg(newMsg);
        }
        update(sts) {
            if (this.modules[this.mControls].length()) { this.getControls(this.mControls, sts); }
        }
    }
    return ControllerM;
});
