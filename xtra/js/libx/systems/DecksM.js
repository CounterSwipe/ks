define(["cs/core/Eid"], function(Eid) {
    class DecksM {
        constructor() {
            this.name = "DecksM";
            this.modules = null;
            this.mChan = 0;
            this.mDeck = 0;
            this.mCards = 0;
            this.mModel = 0;
            this.mRank = 0;
            this.mCost = 0;
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
            this.mDeck = this.moduleID("Deck");
            this.mCards = this.moduleID("Cards");
            this.mModel = this.moduleID("Model");
            this.mRank = this.moduleID("Rank");
            this.mCost = this.moduleID("Cost");
            this.mView = this.moduleID("View");
            this.mXfun = this.moduleID("Xfun");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
            this.mXtwo = this.moduleID("Xtwo");
            this.mXnode = this.moduleID("Xnode");
            //this.bootDeck();
            //this.onDeck();
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        bootDeck() {
            let deck = this.modules[this.moduleID("Deck")].search(0); //1|2|3
            let saveDeck = deck ? deck : 1;
            let pLoa = this.modules[this.moduleID("Kind")].search(0); //->[myCred pts]
            let dMax = pLoa < 10 ? 1 : 3;
            //deck d1{11,12,13,14,15}, d2{21,22,23,24,25}, d3{31,32,33,34,35}
            let a = [11, 21, 31];
            let d;
            for (let b = 0; b < dMax; b++) {
                let c = a[b];
                let e = c + 5;
                for (c; c < e; c++) {
                    let d = this.modules[this.moduleID("Deck")].search(c);
                    this.bootStats(c, d);
                }
            }
            this.modules[this.moduleID("Deck")].add(0, saveDeck);
        }
        bootStats(c, d) {
            if (c > 100) { c = +c.toString().substr(-2, 2); }
            let model = this.modules[this.moduleID("Model")].search(d);
            let tier = this.modules[this.moduleID("Tier")].search(d);
            let rank = this.modules[this.moduleID("Rank")].search(d);
            let skill = this.modules[this.moduleID("Skill")].search(d);
            let cost = this.modules[this.moduleID("Cost")].search(d);
            this.modules[this.moduleID("Dmodel")].add(c, model);
            this.modules[this.moduleID("Dtier")].add(c, tier);
            this.modules[this.moduleID("Drank")].add(c, rank);
            this.modules[this.moduleID("Dskill")].add(c, skill);
            this.modules[this.moduleID("Dcost")].add(c, cost);
            this.bootAvg(c, cost, skill);
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
        buildDeckMug(i, ixa23, deckNow) {
            let xa230 = document.getElementById("x-a-230"); //dMug
            let ixa230 = xa230.cloneNode(true);
            ixa230.id = "";
            let deck = deckNow || this.modules[this.mDeck].search(0); //1|2|3
            //console.log(deckNow, deck);
            let j = i + 1;
            let cost = this.modules[this.mDcost].search(deck + "" + j); //1|2|3 + 1^5
            let uNum = this.modules[this.mDeck].search(deck + "" + j); //1|2|3 + 1^5
            let model = this.modules[this.mDmodel].search(deck + "" + j); //1^7
            let rank = this.modules[this.mDrank].search(deck + "" + j);
            let xmodel = ixa230.children[2].children[0].children[0].children[0].children[0];
            let xrox = ixa230.children[2].children[0].children[0].children[1].children[0];
            let xrank = ixa230.children[2].children[0].children[0].children[1].children[1];
            this.getDawnTier(xmodel, xrox, xrank, model, rank);
            ixa230.children[0].children[0].children[0].children[0].children[1].textContent = cost;
            ixa230.children[1].style.backgroundImage = "url(/wp-content/uploads/" + "u" + uNum + "m" + model + "mug" + ".png)";
            ixa23.children[i].appendChild(ixa230);
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
        prepDraw(iax23, iax4) {
            let jax23 = iax23.cloneNode(true);
            this.preDraw([4, 2, 0, null, iax23]); //xfun(4:append), xid|pg, abc[xone], xtwo:null, xnode
            this.preDraw([4, 3, 0, null, jax23]); //xfun(4:append), xid|pg, abc[xone], xtwo:null, xnode
            this.preDraw([4, 4, 0, null, iax4]); //xfun(4:append), xid|pg, abc[xone], xtwo:null, xnode
        }
        getEID() {
            let eid = new Eid();
            return eid.id;
        }
        clearDeck() {
            this.preDraw([3, 2, 0, 1]); //xfun(3:remove), xid|pg, abc[xone], xtwo:1
            this.preDraw([3, 3, 0, 0]); //xfun(3:remove), xid|pg, abc[xone], xtwo:0
            this.preDraw([3, 4, 0, 0]); //xfun(3:remove), xid|pg, abc[xone], xtwo:0
        }
        update(sts) {
            //if (typeof this.modules[this.mChan].search("") === "undefined") { return; }
            //else {}
        }
    }
    return DecksM;
});
