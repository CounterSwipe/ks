define(["cs/core/Eid"], function(Eid) {
    class RosterG {
        constructor() {
            this.name = "RosterG";
            this.modules = null;
            this.mChan = 0;
            this.mCards = 0;
            this.mProg = 0;
            this.mDreq = 0;
            this.mModel = 0;
            this.mRank = 0;
            this.mCost = 0;
            this.mScost = 0;
            this.mSprog = 0;
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
            this.mChan = this.moduleID("Chan");
            this.mCards = this.moduleID("Cards");
            this.mDreq = this.moduleID("Dreq");
            this.mProg = this.moduleID("Prog");
            this.mModel = this.moduleID("Model");
            this.mRank = this.moduleID("Rank");
            this.mCost = this.moduleID("Cost");
            this.mScost = this.moduleID("Scost");
            this.mSprog = this.moduleID("Sprog");
            this.mView = this.moduleID("View");
            this.mXfun = this.moduleID("Xfun");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
            this.mXtwo = this.moduleID("Xtwo");
            this.mXnode = this.moduleID("Xnode");
            this.onSort(1);
            this.sortBtn(1);
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        onSort(onSort, offSort) {
            let xb24 = document.getElementById("x-b-24");
            let ixb24 = xb24.cloneNode(true);
            let mSort = onSort === 1 ? this.mScost : this.mSprog;
            ixb24.id = "";
            let nodeNums = [1, 3, 5, 7, 10, 12, 14, 16];
            for (let n = 0; n < 8; n++) {
                let nNum = nodeNums[n];
                let uNum = this.modules[mSort].search(n);
                this.build(ixb24, nNum, uNum);
            }
            if (offSort) {
                this.preDraw([3, 4, 1, 0]); //3:remove, xid:pg4, xone:abc[1], xtwo:0
                this.preDraw([3, 4, 2, 0]); //3:remove, xid:pg4, xone:abc[1], xtwo:0
                this.sortBtn(onSort);
            }
            this.preDraw([4, 4, 1, null, ixb24]); //4:append, xid:pg4, xone:abc[1], xtwo:null, node
            if (onSort === 1) { this.modules[this.moduleID("Chan")].remove(411); }
            else { this.modules[this.moduleID("Chan")].add(411, 1); }
            this.modules[this.moduleID("Chan")].remove(41);
        }
        sortBtn(onSort) {
            let xc234 = document.getElementById("x-c-234"); //c-numsBase
            let ixc234 = xc234.cloneNode(true);
            ixc234.id = "";
            let nodeNums = [1, 3, 5];
            let xNums = 400;
            for (let n = 0; n < 3; n++) {
                let xNum = xNums + n;
                let nNum = nodeNums[n];
                this.buildSortBtn(ixc234, xNum, nNum, onSort);
            }
            this.preDraw([4, 4, 2, null, ixc234]); //4:append, xid:pg4, xone:abc[2], xtwo:null, node
        }
        buildSortBtn(ixc234, xNum, nNum, onSort) {
            let xc = document.getElementById("x-c-" + xNum); //c- < dcost|dskill >
            let ixc = xc.cloneNode(true);
            ixc.id = "";
            if (xNum === 400 || xNum === 402) {
                if (this.modules[this.moduleID("Kind")].search(0) < 5) { return; }
            }
            if (xNum === 401) {
                let savedDeck = this.modules[this.moduleID("Deck")].search(0);
                let dAvg = savedDeck + "" + 0;
                ixc.children[1].children[1].children[0].children[0].id = "d-400";
                if (onSort === 1) {
                    if (typeof this.modules[this.moduleID("Dcost")].search(dAvg) !== "undefined") {
                        ixc.children[1].children[1].children[0].children[0].textContent = this.modules[this.moduleID("Dcost")].search(dAvg);
                    }
                }
                else {
                    if (typeof this.modules[this.moduleID("Dskill")].search(dAvg) !== "undefined") {
                        ixc.children[1].children[1].children[0].children[0].textContent = this.modules[this.moduleID("Dskill")].search(dAvg);
                    }
                    ixc.children[1].children[2].children[0].children[0].textContent = "Skill Set";
                    ixc.children[1].children[6].classList.add("Lside");
                    ixc.children[1].children[6].children[0].classList.add("rot-90");
                    ixc.children[1].children[6].children[0].classList.replace("ico-sigma", "ico-bars");
                }
            }
            ixc234.children[nNum].appendChild(ixc);
        }
        build(ixb24, nNum, uNum) {
            let xb410 = document.getElementById("x-b-410");
            let ixb410 = xb410.cloneNode(true);
            let dups = this.modules[this.mCards].search(uNum);
            let dreq = this.modules[this.mDreq].search(uNum);
            let prog = this.modules[this.mProg].search(uNum);
            let model = this.modules[this.mModel].search(uNum);
            let rank = this.modules[this.mRank].search(uNum);
            let xmodel = ixb410.children[2].children[0].children[0].children[0].children[0];
            let xrox = ixb410.children[2].children[0].children[0].children[1].children[0];
            let xrank = ixb410.children[2].children[0].children[0].children[1].children[1];
            ixb410.id = "";
            ixb410.children[0].children[0].children[0].children[0].children[1].textContent = this.modules[this.mCost].search(uNum);
            ixb410.children[0].children[2].children[1].children[0].style.width = prog + "%";
            if (prog === 100) { ixb410.children[0].children[2].children[1].children[0].children[0].classList.replace("blu", "grn"); }
            ixb410.children[0].children[2].children[3].children[0].textContent = dups;
            ixb410.children[0].children[2].children[3].children[2].textContent = dreq;
            ixb410.children[1].style.backgroundImage = "url(/wp-content/uploads/" + "u" + uNum + "m" + model + "mug" + ".png)";
            this.getDawnTier(xmodel, xrox, xrank, model, rank);
            if (dups < 1) {
                xrox.classList.replace("wht", "red");
                xrox.classList.replace("rnds", "ico-locked");
                xrank.classList.replace("kf", "wf");
                xrank.textContent = "locked";
            }
            ixb24.children[nNum].appendChild(ixb410);
        }
        getDawnTier(xmodel, xrox, xrank, model, rank) {
            if (model > 1) {
                let hModel = document.getElementById("m-" + model);
                let mClone = hModel.cloneNode(true);
                mClone.id = "";
                xmodel.appendChild(mClone);
                if (model === 3) {
                    xrox.classList.replace("wht", "gry");
                }
                if (model === 4) {
                    xrox.classList.replace("wht", "ylo");
                }
                if (model === 5) {
                    xrox.classList.replace("wht", "blk");
                    xrank.classList.replace("kf", "yf");
                }
                if (model === 6) {
                    xrox.classList.replace("wht", "blk");
                    xrank.classList.replace("kf", "gf");
                }
                if (model === 7) {
                    xrox.classList.replace("wht", "grn");
                }
            }
            xrank.textContent = rank;
        }
        getEID() {
            let eid = new Eid();
            return eid.id;
        }
        preDrawx(xfun, xid, xone, xnode) {
            let nuID = this.getEID();
            this.modules[this.mView].add(nuID, nuID);
            this.modules[this.mXfun].add(nuID, xfun);
            this.modules[this.mXid].add(nuID, xid);
            this.modules[this.mXone].add(nuID, xone);
            //this.modules[this.mXtwo].add(nuID, xtwo);
            if (xnode) { this.modules[this.mXnode].add(nuID, xnode); }
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
        update(sts) {
            if (typeof this.modules[this.mChan].search(41) === "undefined") { return; }
            let tapNum = this.modules[this.mChan].search(41);
            let mSort = this.modules[this.mChan].search(411);
            switch (tapNum) {
                case 2:
                    console.log(tapNum, "sU, nextPg");
                    this.modules[this.mChan].remove(41);
                    break;
                case 4:
                    console.log(tapNum, "sD, prevPg");
                    this.modules[this.mChan].remove(41);
                    break;
                default:
                    if (typeof mSort === "undefined") { this.onSort(2, 1); } //sortProg
                    else { this.onSort(1, 1); } //sortCost
            }
        }
    }
    return RosterG;
});
