define(["cs/core/Eid"], function(Eid) {
    class TraitG {
        constructor() {
            this.name = "TraitG";
            this.modules = null;
            this.mChan = 0;
            this.mCards = 0;
            this.mKind = 0;
            this.mProg = 0;
            this.mDreq = 0;
            this.mModel = 0;
            this.mTier = 0;
            this.mRank = 0;
            this.mSkill = 0;
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
            this.mKind = this.moduleID("Kind");
            this.mDreq = this.moduleID("Dreq");
            this.mProg = this.moduleID("Prog");
            this.mModel = this.moduleID("Model");
            this.mTier = this.moduleID("Tier");
            this.mRank = this.moduleID("Rank");
            this.mSkill = this.moduleID("Skill");
            this.mCost = this.moduleID("Cost");
            this.mScost = this.moduleID("Scost");
            this.mSprog = this.moduleID("Sprog");
            this.mView = this.moduleID("View");
            this.mXfun = this.moduleID("Xfun");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
            this.mXtwo = this.moduleID("Xtwo");
            this.mXnode = this.moduleID("Xnode");
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        buildProfile(uNum) {
            let xb42 = document.getElementById("x-b-42");
            let ixb42 = xb42.cloneNode(true);
            ixb42.id = "";
            this.getName(ixb42, uNum);
            this.buildCard(ixb42, uNum);
            this.buildTrait(ixb42, uNum);
            //console.log(uNum);
            this.preDraw([4, 4, 1, null, ixb42]); //xfun(4:append), xid|pg, abc[xone], xtwo(0:off), xnode
        }
        getName(ixb42, uNum) {
            let self = this;
            let name;
            let bio;
            let values;
            let resolve;
            let push;
            let pull;
            require(["/wp-content/themes/blankslate-child/js/adb/unit" + uNum + ".js"], function(uScript) {
                name = uScript[3];
                values = uScript[4]();
                resolve = values[0].toLocaleString();
                push = values[1].toLocaleString();
                pull = values[2].toLocaleString();
                bio = uScript[8];
                ixb42.children[5].children[0].children[1].children[1].children[1].children[1].children[1].textContent = resolve;
                ixb42.children[6].children[0].children[1].children[1].children[0].children[1].children[1].textContent = push;
                ixb42.children[7].children[0].children[1].children[1].children[1].children[1].children[1].textContent = pull;
                ixb42.children[10].children[0].children[1].textContent = name;
                ixb42.children[10].children[0].children[6].children[1].children[0].textContent = bio;
            });
        }
        buildCard(ixb42, uNum) {
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
            this.getDawnTier(xmodel, xrox, xrank, model, rank, dups);
            if (dups < 1) {
                xrox.classList.replace("wht", "red");
                xrox.classList.replace("rnds", "ico-locked");
                xrank.classList.replace("kf", "wf");
                xrank.textContent = "locked";
            }
            ixb42.children[1].appendChild(ixb410);
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
        buildTrait(ixb42, uNum) {
            for (let i = 0; i < 4; i++) {
                this.buildStats(ixb42, uNum, i);
            }
            //this.buildValues(ixb42, uNum);
            this.buildInfo(ixb42, uNum);
            this.buildSP(ixb42, uNum);
        }
        buildStats(ixb42, uNum, i) {
            let xb420 = document.getElementById("x-b-420");
            let ixb420 = xb420.cloneNode(true);
            let mtrs = ["Model", "Tier", "Rank", "Skills"];
            let model = this.modules[this.mModel].search(uNum);
            let tier = this.modules[this.mTier].search(uNum);
            let t = [0, "I", "II", "III", "IV", "V", "VI", "VII"];
            let tNum = t[tier];
            let rank = this.modules[this.mRank].search(uNum);
            let skill = this.modules[this.mSkill].search(uNum);
            let mNum = i === 0 ? model : i === 1 ? tNum : i === 2 ? rank : skill;
            ixb420.id = "";
            ixb420.children[1].children[0].textContent = mtrs[i];
            ixb420.children[1].children[1].textContent = mNum;
            if (i > 1) { ixb420.children[1].children[1].classList.replace("size-9", "size-8"); }
            if ((i === 1 || i === 3) && model === 1 && tier < 1) { return; }
            else { ixb42.children[3].children[0].children[i].appendChild(ixb420); }
        }
        buildInfo(ixb42, uNum) {
            let kind = this.modules[this.mKind].search(uNum);
            let f = ["kf", "wf", "redf", "bluf"];
            let k = ["core", "rare", "alpha", "omega"];
            let ktype = k[kind];
            let ftype = f[kind];
            ixb42.children[10].children[0].children[4].children[0].textContent = ktype;
            if (kind > 0) { ixb42.children[10].children[0].children[4].children[0].classList.replace("kf", ftype); } //color font
        }
        buildSP(ixb42, uNum) {
            if (this.modules[this.mModel].search(uNum) === 1 && this.modules[this.mTier].search(uNum) < 1) { return; }
            else {
                for (let j = 0; j < 2; j++) {
                    this.buildSynPrim(ixb42, uNum, j);
                }
            }
        }
        buildSynPrim(ixb42, uNum, j) {
            let xb421 = document.getElementById("x-b-421");
            let ixb421 = xb421.cloneNode(true);
            let k = j === 0 ? j : 2;
            ixb421.id = "";
            if (j > 0) { ixb421.children[0].children[0].children[0].textContent = "Primary:"; }
            ixb42.children[12].children[0].children[k].appendChild(ixb421);
        }
        getN(xNum) {
            let n;
            switch (xNum) {
                case 31:
                    n = 0;
                    break;
                case 32:
                    n = 1;
                    break;
                case 33:
                    n = 2;
                    break;
                case 34:
                    n = 3;
                    break;
                case 41:
                    n = 4;
                    break;
                case 42:
                    n = 5;
                    break;
                case 43:
                    n = 6;
                    break;
                case 44:
                    n = 7;
                    break;
            }
            return n;
        }
        updateBtn(uNum) {
            let xc234 = document.getElementById("x-c-234"); //c-Base
            let ixc234 = xc234.cloneNode(true);
            ixc234.id = "";
            let nodeNums = [1, 3, 5];
            let xNums = 400;
            for (let n = 0; n < 3; n++) {
                let xNum = xNums + n;
                if (n === 1) { xNum = 411; }
                let nNum = nodeNums[n];
                if (this.modules[this.mCards].search(uNum)) {
                    this.buildUpdateBtn(ixc234, xNum, nNum);
                }
            }
            this.preDraw([4, 4, 2, null, ixc234]); //4:append, xid:pg4, xone:abc[2], xtwo:null, node
        }
        buildUpdateBtn(ixc234, xNum, nNum) {
            let xc = document.getElementById("x-c-" + xNum); //c- < dcost|dskill >
            let ixc = xc.cloneNode(true);
            ixc.id = "";
            //^Potential | Update Model //f2-5 -> f2
            /*if (xNum === 400 || xNum === 402) {
            // replace(ico-back|next etc with ico-tsLR etc)
                if (this.modules[this.moduleID("Kind")].search(0) < 5) { return; }
            }
            if (xNum === 411) {
                //update model | ^potential
                //if reqmet color ylo -> grn etc
                let savedDeck = this.modules[this.moduleID("Deck")].search(0);
                let dAvg = savedDeck + "" + 0;
                ixc.children[1].children[1].children[0].children[0].id = "d-401";
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
            }*/
            ixc234.children[nNum].appendChild(ixc);
        }
        getEID() {
            let eid = new Eid();
            return eid.id;
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
            if (typeof this.modules[this.mChan].search(42) === "undefined") { return; }
            let tapNum = this.modules[this.mChan].search(42);
            let mSort;
            let n;
            let uNum;
            let nNum;
            switch (tapNum) {
                case 1:
                    mSort = (typeof this.modules[this.mChan].search(411) === "undefined") ? this.mScost : this.mSprog;
                    n = this.modules[this.mChan].search(412);
                    nNum = n === 7 ? 0 : n + 1;
                    uNum = this.modules[mSort].search(nNum);
                    this.modules[this.mChan].add(412, nNum);
                    this.modules[this.mChan].add(415, tapNum); //trigger deck update
                    this.modules[this.mChan].add(416, uNum);
                    this.preDraw([3, 4, 1, 1]); //xfun(3:remove), xid|pg, abc[xone], xtwo:1
                    this.preDraw([3, 4, 2, 1]); //xfun(3:remove), xid|pg, abc[xone], xtwo:1
                    this.buildProfile(uNum);
                    this.updateBtn(uNum);
                    break;
                case 2:
                    this.preDraw([3, 4, 1, 1]); //xfun(3:remove), xid|pg, abc[xone], xtwo:1
                    this.preDraw([3, 4, 2, 1]); //xfun(3:remove), xid|pg, abc[xone], xtwo:1
                    this.preDraw([6, 4, 1, 2, null]); //xfun, xid|pg, abc[xone], xtwo(2:on), xnode
                    this.preDraw([6, 4, 2, 2, null]); //xfun, xid|pg, abc[xone], xtwo(2:on), xnode
                    this.modules[this.mChan].remove(410);
                    this.modules[this.mChan].add(415, tapNum); //trigger deck update
                    //this.modules[this.mChan].remove(416); -> removed @ deck.js
                    break;
                case 3:
                    mSort = (typeof this.modules[this.mChan].search(411) === "undefined") ? this.mScost : this.mSprog;
                    n = this.modules[this.mChan].search(412);
                    nNum = n === 0 ? 7 : n - 1;
                    uNum = this.modules[mSort].search(nNum);
                    this.modules[this.mChan].add(412, nNum);
                    this.modules[this.mChan].add(415, tapNum); //trigger deck update
                    this.modules[this.mChan].add(416, uNum);
                    this.preDraw([3, 4, 1, 1]); //xfun(3:remove), xid|pg, abc[xone], xtwo:1
                    this.preDraw([3, 4, 2, 1]); //xfun(3:remove), xid|pg, abc[xone], xtwo:1
                    this.buildProfile(uNum);
                    this.updateBtn(uNum);
                    break;
                case 4:
                    this.preDraw([3, 4, 1, 1]); //xfun(3:remove), xid|pg, abc[xone], xtwo:1
                    this.preDraw([3, 4, 2, 1]); //xfun(3:remove), xid|pg, abc[xone], xtwo:1
                    this.preDraw([6, 4, 1, 2, null]); //xfun, xid|pg, abc[xone], xtwo(2:on), xnode
                    this.preDraw([6, 4, 2, 2, null]); //xfun, xid|pg, abc[xone], xtwo(2:on), xnode
                    this.modules[this.mChan].remove(410);
                    this.modules[this.mChan].add(415, tapNum); //trigger deck update
                    this.modules[this.mChan].remove(416);
                    break;
                case 52:
                    console.log("atState: @trait(now) -> toState: @trait(reqMetCheck)");
                    break;
                default:
                    mSort = (typeof this.modules[this.mChan].search(411) === "undefined") ? this.mScost : this.mSprog;
                    nNum = this.getN(tapNum);
                    uNum = this.modules[mSort].search(nNum);
                    this.modules[this.mChan].add(410, 1);
                    this.modules[this.mChan].add(412, nNum);
                    this.modules[this.mChan].add(415, tapNum); //trigger deck update
                    this.modules[this.mChan].add(416, uNum);
                    this.preDraw([6, 4, 1, 0, null]); //xfun, xid|pg, abc[xone], xtwo(0:off), xnode
                    this.preDraw([6, 4, 2, 0, null]); //xfun, xid|pg, abc[xone], xtwo(0:off), xnode
                    this.buildProfile(uNum);
                    this.updateBtn(uNum);
            }
            this.modules[this.mChan].remove(42);
        }
    }
    return TraitG;
});
