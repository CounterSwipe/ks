define(function() {
    class DrawG {
        constructor() {
            this.name = "DrawG";
            this.modules = null;
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
            this.mView = this.moduleID("View");
            this.mXfun = this.moduleID("Xfun");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
            this.mXtwo = this.moduleID("Xtwo");
            this.mXnode = this.moduleID("Xnode");
            this.onEnter(this.mView);
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) {
                    return id;
                }
            }
        }
        onEnter(mView, fdsts) {
            let doomed = [];
            let sorted = [];
            for (let t = 0, tLen = this.modules[mView].length(); t < tLen; t++) {
                let u = this.modules[mView].reveal()[t];
                let v = this.modules[mView].search(u);
                //console.log(u);
                //console.log(v);
                doomed.push(u);
                sorted.push(v);
            }
            sorted.sort(function(a, b) {
                //return a["1"] - b["1"];
                return a - b;
            });
            this.onEvent(mView, doomed, sorted);
        }
        onEvent(mView, doomed, sorted) {
            let abc;
            let xyz;
            let xid;
            let xone;
            let xtwo;
            let xnode;
            //console.log(sorted);
            for (let s = 0, sLen = sorted.length; s < sLen; s++) {
                let v = sorted[s];
                let xfun = this.modules[this.mXfun].search(v);
                switch (xfun) {
                    case 1:
                        xid = this.modules[this.mXid].search(v); //pgOff
                        document.getElementById("a-" + xid).classList.replace("o99", "o0");
                        document.getElementById("b-" + xid).classList.replace("o99", "o0");
                        document.getElementById("c-" + xid).classList.replace("o99", "o0");
                        document.getElementById("d-" + xid + "-1633").classList.replace("w33p", "w16p");
                        document.getElementById("d-" + xid + "-o0o99").classList.replace("o99", "o0");
                        document.getElementById("d-" + xid + "-o3o5").classList.replace("o5", "o3");
                        break;
                    case 2:
                        xid = this.modules[this.mXid].search(v); //pgOn
                        document.getElementById("a-" + xid).classList.replace("o0", "o99");
                        document.getElementById("b-" + xid).classList.replace("o0", "o99");
                        document.getElementById("c-" + xid).classList.replace("o0", "o99");
                        document.getElementById("d-" + xid + "-1633").classList.replace("w16p", "w33p");
                        document.getElementById("d-" + xid + "-o0o99").classList.replace("o0", "o99");
                        document.getElementById("d-" + xid + "-o3o5").classList.replace("o3", "o5");
                        break;
                    case 3:
                        abc = ["a", "b", "c"]; //removeNode
                        xid = this.modules[this.mXid].search(v);
                        xone = this.modules[this.mXone].search(v);
                        xtwo = this.modules[this.mXtwo].search(v);
                        xnode = abc[xone];
                        document.getElementById(xnode + "-" + xid).children[xtwo].parentNode.removeChild(document.getElementById(xnode + "-" + xid).children[xtwo]);
                        //document.getElementById("u-row").children[1].parentNode.removeChild(document.getElementById("u-row").children[1]);
                        break;
                    case 4:
                        abc = ["a", "b", "c"]; //appendNode
                        xid = this.modules[this.mXid].search(v);
                        xone = this.modules[this.mXone].search(v);
                        xnode = this.modules[this.mXnode].search(v);
                        xtwo = abc[xone];
                        document.getElementById(xtwo + "-" + xid).appendChild(xnode);
                        break;
                    case 5:
                        //console.log(v);
                        abc = ["p", "x", "d"]; //textContent
                        xid = this.modules[this.mXid].search(v);
                        xone = this.modules[this.mXone].search(v);
                        xtwo = this.modules[this.mXtwo].search(v);
                        xnode = abc[xone];
                        //console.log(xnode + "-" + xid, xtwo);
                        document.getElementById(xnode + "-" + xid).textContent = xtwo;
                        break;
                    case 6:
                        abc = ["a", "b", "c"];
                        xyz = ["o99", "o0", "o0", "o99"]; //0:off|2:on
                        xid = this.modules[this.mXid].search(v);
                        xone = this.modules[this.mXone].search(v);
                        xtwo = this.modules[this.mXtwo].search(v);
                        xnode = abc[xone];
                        //console.log(xnode + "-" + xid, xtwo, xyz[xtwo], xyz[xtwo + 1], document.getElementById(xnode + "-" + xid).children);
                        document.getElementById(xnode + "-" + xid).children[0].classList.replace(xyz[xtwo], xyz[xtwo + 1]);
                        break;
                    case 7:
                        abc = ["a", "b", "c"];
                        xyz = ["o99", "o0", "o0", "o99"]; //0:off|2:on
                        xid = this.modules[this.mXid].search(v);
                        xone = this.modules[this.mXone].search(v);
                        xtwo = this.modules[this.mXtwo].search(v);
                        xnode = abc[xone];
                        //console.log(xnode + "-" + xid, xtwo, xyz[xtwo], xyz[xtwo + 1], document.getElementById(xnode + "-" + xid).children);
                        document.getElementById(xnode + "-" + xid).classList.replace(xyz[xtwo], xyz[xtwo + 1]);
                        break;
                    case 10:
                        xid = this.modules[this.mXid].search(v);
                        xone = this.modules[this.mXone].search(v);
                        document.getElementById("p-" + xid).style.width = xone + "%";
                        break;
                }
            }
            sorted = [];
            this.onExit(mView, doomed);
        }
        onExit(mView, doomed) {
            let mXfun = this.mXfun;
            let mXid = this.mXid;
            let mXone = this.mXone;
            let mXtwo = this.mXtwo;
            let mXnode = this.mXnode;
            for (let d = 0, dLen = doomed.length; d < dLen; d++) {
                this.modules[mView].remove(doomed[d]);
                this.modules[mXfun].remove(doomed[d]);
                this.modules[mXid].remove(doomed[d]);
                this.modules[mXone].remove(doomed[d]);
                this.modules[mXtwo].remove(doomed[d]);
                this.modules[mXnode].remove(doomed[d]);
            }
            doomed = [];
        }
        render(fdsts) {
            if (this.modules[this.mView].length()) { this.onEnter(this.mView, fdsts); }
        }
    }
    return DrawG;
});
