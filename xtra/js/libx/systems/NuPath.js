define(["cs/core/Eid"], function(Eid) {
    class NuPath {
        constructor() {
            this.name = "NuPath";
            this.modules = null;
            this.mChan = 0;
            this.mPaths = 0;
            this.mHand = 0;
            this.mView = 0;
            this.mXfun = 0;
            this.mXid = 0;
            this.mXone = 0;
            this.mXtwo = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mChan = this.moduleID("Chan");
            this.mPaths = this.moduleID("Paths");
            this.mHand = this.moduleID("Hand");
            this.mView = this.moduleID("View");
            this.mXfun = this.moduleID("Xfun");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
            this.mXtwo = this.moduleID("Xtwo");
            this.modules[this.mPaths].add(1, 69); //start@69
            this.preDraw([11, 1, 3, 69]); //11:pad 2:id 3:h nuPath
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        onPath() {
            let nuPath = this.getPath();
            this.preDraw([11, 1, 3, nuPath]); //11:pad 2:id 3:h nuPath
            this.modules[this.mPaths].add(1, nuPath);
            this.modules[this.mChan].remove(32);
            if (typeof this.modules[this.mChan].search(33) === "undefined") { this.reqMet(); }
        }
        getPath() {
            let pNow = this.modules[this.mPaths].search(1); //preFog|postFog
            if (typeof this.modules[this.mPaths].search(0) === "undefined") {
                return pNow === 69 ? 37 : 69;
            }
            else {
                return pNow === 69 ? 37 : pNow === 37 ? 5 : 69;
            }
        }
        reqMet() {
            this.preDraw([7, 21, 3, 0]); //ebar ylo off
            let focused = this.modules[this.mHand].search(10);
            let focus = +(focused + "" + 0);
            this.preDraw([7, focus + 1, 3, 0]); //focus ylo off
            this.modules[this.mChan].add(33, 1);
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
            //sU = alt|nextPath//board(launchPos) = player(1|2) + path(a:0|b:1|c:2) + pos(1|2|3)
            if (typeof this.modules[this.mChan].search(32) === "undefined") { return; }
            else { this.onPath(); }
        }
    }
    return NuPath;
});
