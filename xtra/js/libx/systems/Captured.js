define(["cs/core/Eid"], function(Eid) {
    class Captured {
        constructor() {
            this.name = "Captured";
            this.modules = null;
            this.mChan = 0;
            this.mPaths = 0;
            this.mMoments = 0;
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
            this.mMoments = this.moduleID("Moments");
            this.mView = this.moduleID("View");
            this.mXfun = this.moduleID("Xfun");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
            this.mXtwo = this.moduleID("Xtwo");
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
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
        inMoment(moment) {
            if (typeof this.modules[this.mChan].search(moment) === "undefined") { return; }
            else { this.onCapture(moment); }
        }
        onCapture(moment) {
            //(now|max) channels[100|101,110|111,120|121,200|201,210|211,220|221] //max = now + 1
            let player = moment < 19 ? 1 : 2;
            console.log("player", player);
            let mNew = this.modules[this.mChan].search(moment);
            let mNow = this.modules[this.mChan].search(moment + "" + 0);
            let mMax = this.modules[this.mChan].search(moment + "" + 1);
            let mNue = Math.round((mNew + mNow), 5);
            if (mNow === mMax) { return; }
            if (mNue >= mMax) {
                mNue = mMax;
                this.captured(moment, player);
                this.modules[this.mChan].add(moment + "" + 2, 1); //captured
                if (moment < 19) {
                    //p1 -> check victory condition: moments + 2
                    if (this.modules[this.mChan].search(102) && this.modules[this.mChan].search(112) && this.modules[this.mChan].search(122)) {
                        this.modules[this.mChan].add(0, 1); //alert victory
                    }
                }
                else {
                    //p2 ""TODO: update this for p2
                    if (this.modules[this.mChan].search(202) && this.modules[this.mChan].search(212) && this.modules[this.mChan].search(222)) {
                        this.modules[this.mChan].add(0, 1); //alert victory
                    }
                }
            }
            this.modules[this.mChan].add(moment + "" + 0, mNue);
            let mPerc = Math.round((mNue / mMax), 5); //mMax = 100% 
            let nuPad = Math.round((25 - (25 * mPerc)), 3); //vhMax = 25
            let nuNow = Math.round((25 - nuPad), 3); //vhMax = 25
            //console.log(moment, mNue, mPerc, nuPad, nuNow);
            let abc = moment < 11 ? 0 : moment < 12 ? 1 : moment < 13 ? 2 : moment < 21 ? 0 : moment < 22 ? 1 : 2;
            this.preDraw([11, +(player + "" + 1), abc, nuPad]); //11:pad player + 1:id [abc] nuPad
            this.preDraw([11, +(player + "" + 0), abc, nuNow]); //11:pad player + 0:id [abc] nunow
            this.modules[this.mChan].remove(moment);
        }
        captured(moment, player) {
            console.log("player", player);
            let abc = moment < 11 ? 0 : moment < 12 ? 1 : moment < 13 ? 2 : moment < 21 ? 0 : moment < 22 ? 1 : 2;
            //111:replace(blk, blu):4 111:replace(o5, o99):6, 110:replace(o0,o99):2
            console.log("captured");
            this.preDraw([7, +(player + "" + 11), abc, +Math.round((player * 4), 0)]); //p1:4, p2:8
            this.preDraw([7, +(player + "" + 11), abc, 6]);
            this.preDraw([7, +(player + "" + 10), abc, 2]);
        }
        update(sts) {
            //sU = alt|nextPath//board(launchPos) = player(1|2) + path(a:0|b:1|c:2) + pos(1|2|3)
            //update(new) channels[10,11,12,20,21,22]
            let m = [10, 11, 12, 20, 21, 22];
            for (let i = 0; i < 6; i++) {
                this.inMoment(m[i]);
            }
        }
    }
    return Captured;
});
