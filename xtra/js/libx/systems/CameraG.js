define(["cs/core/Eid"], function(Eid) {
    class CameraG {
        constructor() {
            this.name = "CameraG";
            this.modules = null;
            this.mChan = 0;
            this.mCam = 0;
            this.mView = 0;
            this.mXfun = 0;
            this.mXid = 0;
            //this.mXone = 0;
            //this.mXtwo = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mChan = this.moduleID("Chan");
            this.mCam = this.moduleID("Cam");
            this.mView = this.moduleID("View");
            this.mXfun = this.moduleID("Xfun");
            this.mXid = this.moduleID("Xid");
            //this.mXone = this.moduleID("Xone");
            //this.mXtwo = this.moduleID("Xtwo");
            this.modules[this.mCam].add(3, 1); //initCam: L:2, C:3, R:4
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        direct(mCam, sDir) {
            if (typeof this.modules[mCam].search(2) !== "undefined") {
                if (sDir === 1) {
                    this.modules[mCam].remove(2);
                    this.modules[mCam].add(3, 1);
                    this.preDraw(1, 2); //off2
                    this.preDraw(2, 3); //on3
                }
            }
            else if (typeof this.modules[mCam].search(3) !== "undefined") {
                this.modules[mCam].remove(3);
                this.preDraw(1, 3); //off3
                if (sDir === 1) {
                    this.modules[mCam].add(4, 1);
                    this.preDraw(2, 4); //on4
                    //this.preDraw(3, 0);
                }
                else {
                    this.modules[mCam].add(2, 1);
                    this.preDraw(2, 2); //on2
                }
            }
            else {
                if (sDir === 3) {
                    this.modules[mCam].remove(4);
                    this.modules[mCam].add(3, 1);
                    this.preDraw(1, 4); //off4
                    this.preDraw(2, 3); //on3
                    //this.preDraw(4, 0);
                }
            }
            this.modules[this.mChan].remove(0);
            this.modules[mCam].remove(0);
            game.stop(console.log(game)); /*global game*/
        }
        getEID() {
            let eid = new Eid();
            return eid.id;
        }
        preDraw(kind, xid) {
            let nuID = this.getEID();
            this.modules[this.mView].add(nuID, nuID);
            this.modules[this.mXfun].add(nuID, kind);
            this.modules[this.mXid].add(nuID, xid);
            //this.modules[this.mXone].add(nuID, xone);
            //this.modules[this.mXtwo].add(nuID, xtwo);
        }
        update(sts) {
            if (typeof this.modules[this.mChan].search(0) === "undefined") { return; }
            else { this.direct(this.mCam, this.modules[this.mChan].search(0)) };
        }
    }
    return CameraG;
});
