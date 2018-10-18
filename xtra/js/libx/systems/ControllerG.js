define(function() {
    class ControllerG {
        constructor() {
            this.name = "ControllerG";
            this.modules = null;
            this.mControls = 0;
            this.mTicker = 0;
            this.mChan = 0;
            this.mCam = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mControls = this.moduleID("Controls");
            this.mTicker = this.moduleID("Ticker");
            this.mChan = this.moduleID("Chan");
            this.mCam = this.moduleID("Cam");
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
                            if (typeof this.modules[this.mCam].search(4) !== "undefined") {
                                if (typeof this.modules[this.mChan].search(410) !== "undefined") {
                                    this.modules[this.mChan].add(42, j);
                                    break;
                                }
                            }
                            this.modules[this.mChan].add(0, j);
                            break;
                        case (2):
                            if (typeof this.modules[this.mCam].search(2) !== "undefined") {
                                if (typeof this.modules[this.mChan].search(21) !== "undefined") {
                                    this.modules[this.mChan].add(24, j);
                                    break;
                                }
                            }
                            if (typeof this.modules[this.mCam].search(3) !== "undefined") {
                                (typeof playerInfo === "undefined") ? window.location.href = "/wp-login.php": this.modules[this.mChan].add(30, j);
                                //(typeof playerInfo === "undefined") ? window.location.href = "/wp-login.php": window.location.href = "/lob/";
                                //window.location.href = "/lobby/" ; //history.backBtn(true) 
                                //window.location.replace("/lobby/"); //history.backBtn(false)
                                break;
                            }
                            if (typeof this.modules[this.mCam].search(4) !== "undefined") {
                                if (typeof this.modules[this.mChan].search(410) === "undefined") {
                                    this.modules[this.mChan].add(41, j);
                                    break;
                                }
                                else {
                                    this.modules[this.mChan].add(42, j);
                                    this.modules[this.mChan].add(415, j); //trigger deck update
                                    break;
                                }
                            }
                            //this.modules[this.mChan].add(0, j);
                            break;
                        case (3):
                            if (typeof this.modules[this.mCam].search(4) !== "undefined") {
                                if (typeof this.modules[this.mChan].search(410) !== "undefined") {
                                    this.modules[this.mChan].add(42, j);
                                    break;
                                }
                            }
                            this.modules[this.mChan].add(0, j);
                            break;
                        case (4):
                            if (typeof this.modules[this.mCam].search(4) !== "undefined") {
                                if (typeof this.modules[this.mChan].search(410) === "undefined") {
                                    this.modules[this.mChan].add(41, j);
                                    break;
                                }
                                else {
                                    this.modules[this.mChan].add(42, j);
                                }
                            }
                            break;
                        case (11):
                            /*global playerInfo*/
                            //(typeof playerInfo === "undefined") ? window.location.replace("/wp-login.php"): window.location.replace("/wp-admin/profile.php");
                            (typeof playerInfo === "undefined") ? window.location.href = "/wp-login.php": window.location.href = "/wp-admin/profile.php";
                            break;
                        case (31):
                        case (32):
                        case (33):
                        case (34):
                        case (41):
                        case (42):
                        case (43):
                        case (44):
                            if (typeof this.modules[this.mCam].search(2) !== "undefined") {
                                let keyPad;
                                if (j < 40) {
                                    if (j < 33) {
                                        keyPad = j === 31 ? 1 : 2;
                                    }
                                    else {
                                        keyPad = j === 33 ? 3 : 4;
                                    }
                                }
                                else {
                                    if (j < 43) {
                                        keyPad = j === 41 ? 5 : 6;
                                    }
                                    else {
                                        keyPad = j === 43 ? 7 : 8;
                                    }
                                }
                                this.modules[this.mChan].add(20, 1);
                                this.modules[this.mChan].add(22, keyPad);
                                //console.log(keyPad);
                                break;
                            }
                            else if (typeof this.modules[this.mCam].search(4) !== "undefined") {
                                if (typeof this.modules[this.mChan].search(410) === "undefined") {
                                    this.modules[this.mChan].add(42, j);
                                }
                            }
                            break;
                        case (51):
                            if (typeof this.modules[this.mCam].search(2) !== "undefined") {
                                this.modules[this.mChan].add(20, 1);
                                this.modules[this.mChan].add(22, 9);
                                break;
                            }
                            else if (typeof this.modules[this.mCam].search(4) !== "undefined") {
                                if (typeof this.modules[this.mChan].search(410) !== "undefined") {
                                    //let uNum = this.modules[this.mChan].search(415);
                                    //this.modules[this.mChan].add(4000, uNum);
                                    //this.modules[this.mChan].add(4001, j);
                                    this.modules[this.mChan].add(415, j); //trigger deck update, prevDeck
                                    break;
                                }
                            }
                            break;
                        case (52):
                            if (typeof this.modules[this.mCam].search(2) !== "undefined") {
                                this.modules[this.mChan].add(20, 1);
                                this.modules[this.mChan].add(22, 0);
                                break;
                            }
                            else if (typeof this.modules[this.mCam].search(4) !== "undefined") {
                                if (typeof this.modules[this.mChan].search(410) === "undefined") {
                                    this.modules[this.mChan].add(41, j);
                                }
                                else {
                                    //@profile -> 152 => L^reqMet() etc 
                                    this.modules[this.mChan].add(42, j);
                                }
                            }
                            break;
                        case (53):
                            if (typeof this.modules[this.mCam].search(2) !== "undefined") {
                                let keyPad = 999;
                                this.modules[this.mChan].add(20, 1);
                                this.modules[this.mChan].add(22, keyPad);
                                break;
                            }
                            else if (typeof this.modules[this.mCam].search(4) !== "undefined") {
                                if (typeof this.modules[this.mChan].search(410) !== "undefined") {
                                    //let uNum = this.modules[this.mChan].search(415);
                                    //this.modules[this.mChan].add(4000, uNum);
                                    //this.modules[this.mChan].add(4001, j);
                                    this.modules[this.mChan].add(415, j); //trigger deck update, prevDeck
                                    break;
                                }
                            }
                            break;
                        default:
                            console.log(k, j);
                    }
                    this.modules[mControls].remove(k);
                }
            }
        }
        update(sts) {
            if (this.modules[this.mControls].length()) { this.getControls(this.mControls, sts); }
        }
    }
    return ControllerG;
});
