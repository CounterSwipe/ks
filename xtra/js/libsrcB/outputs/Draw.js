define(function() {
    class Draw {
        constructor() {
            this.name = "Draw";
            this.modules = null;
            this.mView = 0;
            this.mKind = 0;
            this.mXid = 0;
            this.mXone = 0;
            this.mXtwo = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mView = this.moduleID("View");
            this.mKind = this.moduleID("Kind");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
            this.mXtwo = this.moduleID("Xtwo");
            this.onEnter(this.mView);
            this.isReady = true;
        }
        moduleID(mID) {
            for (var id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) {
                    return id;
                }
            }
        }
        onEnter(mView, fdsts) {
            var doomed = [];
            var sorted = [];
            for (var t = 0, tLen = this.modules[mView].length(); t < tLen; t++) {
                var u = this.modules[mView].reveal()[t];
                var v = this.modules[mView].search(u);
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
            //console.log(sorted);
            var xid;
            var xone;
            var xtwo;
            for (var s = 0, sLen = sorted.length; s < sLen; s++) {
                var v = sorted[s];
                var kind = this.modules[this.mKind].search(v);
                //console.log(kind);
                //if (typeof this.modules[this.mXone].search(v) !== "undefined") { xone = this.modules[this.mXone].search(v); }
                //if (typeof this.modules[this.mXtwo].search(v) !== "undefined") { xtwo = this.modules[this.mXtwo].search(v); }
                switch (kind) {
                    case 0:
                        xone = this.modules[this.mXone].search(v);
                        document.getElementById("h-" + v + "-t").textContent = xone;
                        break;
                    case 1:
                        xid = this.modules[this.mXid].search(v);
                        xone = this.modules[this.mXone].search(v);
                        //console.log(xid, xone);
                        document.getElementById("h-" + xid + "-c").style.paddingTop = xone + "vh";
                        break;
                    case 2:
                        xid = this.modules[this.mXid].search(v);
                        xone = this.modules[this.mXone].search(v);
                        document.getElementById("h-" + xid + "-a").style.paddingTop = xone + "vh";
                        break;
                    case 3:
                        xid = this.modules[this.mXid].search(v);
                        document.getElementById("h-" + xid + "-b").classList.replace("o99", "o0");
                        break;
                    case 4:
                        xid = this.modules[this.mXid].search(v);
                        document.getElementById("h-" + xid + "-b").classList.replace("o0", "o99");
                        break;
                    case 5:
                        xid = this.modules[this.mXid].search(v);
                        xone = this.modules[this.mXone].search(v); //uNum|make
                        xtwo = this.modules[this.mXtwo].search(v); //model
                        var nuImg = "url(/wp-content/uploads/" + "u" + xone + "m" + xtwo + "mug" + ".png)";
                        //console.log(xid, nuImg);
                        document.getElementById("h-" + xid + "-a").style.backgroundImage = nuImg;
                        break;
                    case 6:
                        xid = this.modules[this.mXid].search(v);
                        xone = this.modules[this.mXone].search(v); //cost
                        document.getElementById("h-" + xid + "-d").textContent = xone;
                        break;
                    case 7:
                        document.getElementById("fog").classList.replace("o99", "o0");
                        break;
                    case 8:
                        xid = this.modules[this.mXid].search(v);
                        var nuID = xid < 19 ? 1 : 2;
                        document.getElementById("h-" + nuID + "-b").classList.replace("o99", "o0");
                        document.getElementById("h-" + xid + "-c").classList.replace("o99", "o0");
                        break;
                    case 9:
                        xid = this.modules[this.mXid].search(v);
                        var nuID = xid < 19 ? 1 : 2;
                        document.getElementById("h-" + nuID + "-b").classList.replace("o0", "o99");
                        document.getElementById("h-" + xid + "-c").classList.replace("o0", "o99");
                        break;
                    case 10:
                        xid = this.modules[this.mXid].search(v);
                        xone = this.modules[this.mXone].search(v); //node
                        document.getElementById("u-" + xid + "-cs").appendChild(xone);
                        break;
                    case 11:
                        xid = this.modules[this.mXid].search(v);
                        document.getElementById("u-" + xid + "-o").classList.replace("o0", "fadeInn");
                        break;
                    case 12:
                        xid = this.modules[this.mXid].search(v);
                        xone = this.modules[this.mXone].search(v);
                        //console.log(12, xid, xone);
                        document.getElementById("u-" + xid + "-x").style.width = xone + "%";
                        break;
                    case 13:
                        xid = this.modules[this.mXid].search(v);
                        xone = this.modules[this.mXone].search(v);
                        //console.log(13, xid, xone);
                        document.getElementById("u-" + xid + "-y").style.paddingTop = xone + "vh";
                        break;
                    case 14:
                        xid = this.modules[this.mXid].search(v);
                        xone = this.modules[this.mXone].search(v);
                        //console.log(14, xid, xone);
                        document.getElementById("u-" + xid + "-r").style.marginTop = xone + "rem";
                        break;
                    case 15:
                        xid = this.modules[this.mXid].search(v);
                        xone = this.modules[this.mXone].search(v);
                        //console.log(12, xid, xone);
                        document.getElementById("u-" + xid + "-v").style.width = xone + "%";
                        break;
                }
            }
            sorted = [];
            this.onExit(mView, doomed);
        }
        onExit(mView, doomed) {
            var mKind = this.mKind;
            var mXid = this.mXid;
            var mXone = this.mXone;
            var mXtwo = this.mXtwo;
            for (var d = 0, dLen = doomed.length; d < dLen; d++) {
                this.modules[mView].remove(doomed[d]);
                this.modules[mKind].remove(doomed[d]);
                this.modules[mXid].remove(doomed[d]);
                this.modules[mXone].remove(doomed[d]);
                this.modules[mXtwo].remove(doomed[d]);
            }
            doomed = [];
        }
        render(fdsts) {
            if (this.modules[this.mView].length()) { this.onEnter(this.mView, fdsts); }
        }
    }
    return Draw;
});
