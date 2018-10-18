define(["cs/core/Eid"], function(Eid) {
    class ExpandG {
        constructor() {
            this.name = "ExpandG";
            this.modules = null;
            this.mCam = 0;
            this.mChan = 0;
            this.mView = 0;
            this.mXfun = 0;
            this.mXid = 0;
            this.mXone = 0;
            this.mXtwo = 0;
            this.mXnode = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mCam = this.moduleID("Cam");
            this.mChan = this.moduleID("Chan");
            this.mView = this.moduleID("View");
            this.mXfun = this.moduleID("Xfun");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
            this.mXtwo = this.moduleID("Xtwo");
            this.mXnode = this.moduleID("Xnode");
            this.onBuildB();
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        onBuildB() {
            let xb24 = document.getElementById("x-b-24"); //b-numsBase
            let ixb24 = xb24.cloneNode(true);
            ixb24.id = "";
            let nodeNums = [1, 3, 5, 7, 10, 12, 14, 16];
            for (let n = 0; n < 8; n++) {
                let aNum = nodeNums[n];
                let nNum = n + 1;
                this.build(ixb24, nNum, aNum);
            }
            //this.preDraw(3, 2, 1, ixb2); //4:append, page:2, abc[1], node
            this.preDraw([4, 2, 1, null, ixb24]);
            this.onBuildC();
        }
        onBuildC() {
            let xc234 = document.getElementById("x-c-234"); //c-numsBase
            let xc20 = document.getElementById("x-c-20"); //c-backspace
            let ixc234 = xc234.cloneNode(true);
            let ixc20 = xc20.cloneNode(true);
            ixc234.id = "";
            ixc20.id = "";
            let nodeNums = [1, 3];
            for (let n = 0; n < 2; n++) {
                let aNum = nodeNums[n];
                let nNum = n === 0 ? 9 : 0;
                this.build(ixc234, nNum, aNum);
            }
            ixc234.children[5].appendChild(ixc20);
            //this.preDraw(3, 2, 2, ixc234); //4:append, page:2, abc[2], node
            this.preDraw([4, 2, 2, null, ixc234]);
        }
        build(ixbc, nNum, aNum) {
            let xbc20 = document.getElementById("x-bc-20"); //b-nNums
            let ixbc20 = xbc20.cloneNode(true);
            ixbc20.id = "";
            ixbc20.children[1].children[0].textContent = nNum;
            if (nNum === 0 || nNum === 9) { ixbc20.children[1].children[0].classList.replace("pad4", "pad2-5") }
            ixbc.children[aNum].appendChild(ixbc20);
        }
        onExpand() {
            let iCode = typeof this.modules[this.mChan].search(21) === "undefined" ? "" : this.modules[this.mChan].search(21).toString();
            let nuNum = this.modules[this.mChan].search(22);
            let nuCode;
            if (nuNum === 999) {
                nuCode = (iCode - (iCode % 10)) / 10;
                if (nuCode === 0) { nuCode = ""; }
                //console.log(nuNum, nuCode);
            }
            else {
                nuCode = iCode.length < 6 ? iCode + "" + nuNum : iCode;
            }
            if (nuCode !== "") { this.modules[this.mChan].add(21, nuCode); }
            else { this.modules[this.mChan].remove(21); }
            this.prepDraw();
            this.preDraw([5, 200, 1, nuCode]);
            this.modules[this.mChan].remove(20);
            this.modules[this.mChan].remove(22);
        }
        onJoin() {
            //let m = "http://counterswipe.com/nubattle/?id=";
            let m = "https://mytestgame-counterswipe.c9users.io/xbattle/?id=";
            let yURL = this.modules[this.mChan].search(21);
            let myURL = m + yURL;
            console.log(myURL);
            window.location.replace(myURL); //replace = no back btn (android etc)
        }
        prepDraw() {
            let joinState = typeof this.modules[this.mChan].search(21) === "undefined" ? 0 : 1;
            let onState = typeof this.modules[this.mChan].search(23) === "undefined" ? 0 : 1;
            if (joinState < 1 & onState === 1) {
                this.modules[this.mChan].remove(23);
                this.preDraw([7, 2000, 0, 2]); //xfun:6, xid:2001|2|3|4 , xone:0, xtwo:0
                this.preDraw([7, 2001, 0, 0]); //xfun:6, xid:2001|2|3|4 , xone:0, xtwo:2
                this.preDraw([7, 2002, 0, 0]); //xfun:6, xid:2001|2|3|4 , xone:0, xtwo:2
                this.preDraw([7, 2003, 0, 0]); //xfun:6, xid:2001|2|3|4 , xone:0, xtwo:2
                this.preDraw([7, 2004, 0, 0]); //xfun:6, xid:2001|2|3|4 , xone:0, xtwo:2
            }
            else if (joinState === 1 & onState < 1) {
                this.modules[this.mChan].add(23, 1);
                this.preDraw([7, 2000, 0, 0]); //xfun:6, xid:2001|2|3|4 , abc[xone], xtwo:0
                this.preDraw([7, 2001, 0, 2]); //xfun:6, xid:2001|2|3|4 , abc[xone], xtwo:2
                this.preDraw([7, 2002, 0, 2]); //xfun:6, xid:2001|2|3|4 , abc[xone], xtwo:2
                this.preDraw([7, 2003, 0, 2]); //xfun:6, xid:2001|2|3|4 , abc[xone], xtwo:2
                this.preDraw([7, 2004, 0, 2]); //xfun:6, xid:2001|2|3|4 , abc[xone], xtwo:2
            }
            else { return; }
        }
        preDraw(drawn) {
            let xtwo;
            let xnode;
            let xfun = drawn[0];
            let xid = drawn[1];
            let xone = drawn[2];
            let nuID = this.getEID();
            this.modules[this.mView].add(nuID, nuID);
            this.modules[this.mXfun].add(nuID, xfun);
            this.modules[this.mXid].add(nuID, xid);
            this.modules[this.mXone].add(nuID, xone);
            if (drawn[3] !== null) {
                xtwo = drawn[3];
                this.modules[this.mXtwo].add(nuID, xtwo);
            };
            if (drawn[4]) {
                xnode = drawn[4];
                this.modules[this.mXnode].add(nuID, xnode);
            };
        }
        getEID() {
            let eid = new Eid();
            return eid.id;
        }
        update(sts) {
            if (typeof this.modules[this.mCam].search(2) !== "undefined") {
                if (typeof this.modules[this.mChan].search(24) !== "undefined") { this.onJoin(); }
                else if (typeof this.modules[this.mChan].search(20) === "undefined") { return; }
                else { this.onExpand(); }
            }
        }
    }
    return ExpandG;
});
