define(["cs/core/Eid"], function(Eid) {
    class NuFocus {
        constructor() {
            this.name = "NuFocus";
            this.modules = null;
            this.mChan = 0;
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
            this.mHand = this.moduleID("Hand");
            this.mView = this.moduleID("View");
            this.mXfun = this.moduleID("Xfun");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
            this.mXtwo = this.moduleID("Xtwo");
            this.preDraw([7, 110, 3, 2]); //start@h-110 = 7:o0o99 110:id 3:h 2:on
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        autoFocus() {
            let focused = this.modules[this.mHand].search(10);
            let focus = +(focused + "" + 0);
            let nuFocus = focused === 11 ? 12 : focused === 12 ? 13 : 11;
            let nueFocus = +(nuFocus + "" + 0);
            //console.log("focused:", focused, "focus", focus, "nuFocus", nuFocus, "nueFocus", nueFocus);
            this.preDraw([7, focus, 3, 0]); //off
            this.preDraw([7, nueFocus, 3, 2]); //on
            this.modules[this.mHand].add(10, nuFocus);
            this.modules[this.mChan].remove(31);
            if (typeof this.modules[this.mChan].search(33) === "undefined") { this.reqMet(focus); }
        }
        reqMet(focus) {
            this.preDraw([7, 21, 3, 0]); //ebar ylo off
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
            if (typeof this.modules[this.mChan].search(31) === "undefined") { return; }
            else { this.autoFocus(); }
        }
    }
    return NuFocus;
});
