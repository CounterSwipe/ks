define(["cs/core/Eid"], function(Eid) {
    class DecksG {
        constructor() {
            this.name = "DecksG";
            this.modules = null;
            this.mChan = 0;
            this.mDeck = 0;
            this.mCards = 0;
            this.mProg = 0;
            this.mDreq = 0;
            this.mModel = 0;
            this.mRank = 0;
            this.mCost = 0;
            this.mCsort = 0;
            this.mPsort = 0;
            this.mDcost = 0;
            this.mDmodel = 0;
            this.mDtier = 0;
            this.mDrank = 0;
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
            this.mDreq = this.moduleID("Dreq");
            this.mProg = this.moduleID("Prog");
            this.mModel = this.moduleID("Model");
            this.mRank = this.moduleID("Rank");
            this.mCost = this.moduleID("Cost");
            this.mCsort = this.moduleID("Csort");
            this.mPsort = this.moduleID("Psort");
            this.mDcost = this.moduleID("Dcost");
            this.mDmodel = this.moduleID("Dmodel");
            this.mDtier = this.moduleID("Dtier");
            this.mDrank = this.moduleID("Drank");
            this.mView = this.moduleID("View");
            this.mXfun = this.moduleID("Xfun");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
            this.mXtwo = this.moduleID("Xtwo");
            this.mXnode = this.moduleID("Xnode");
            this.bootDeck();
            this.onDeck();
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        bootDeck() {
            //let deck = this.modules[this.moduleID("Deck")].search(0); //1|2|3
            //let saveDeck = (typeof deck !== "undefined") ? deck : 1;
            let pLoa = this.modules[this.moduleID("Kind")].search(0); //->[myCred pts]
            let dMax = pLoa < 10 ? 1 : 3;
            //deck d1{11,12,13,14,15}, d2{21,22,23,24,25}, d3{31,32,33,34,35}
            let a = [11, 21, 31];
            let d;
            for (let b = 0; b < dMax; b++) {
                let c = a[b];
                let e = c + 5;
                for (c; c < e; c++) {
                    d = this.modules[this.moduleID("Deck")].search(c);
                    this.bootStats(c, d);
                }
            }
            //this.modules[this.moduleID("Deck")].add(0, saveDeck);
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
        bootAvg(c, cost, skill) {
            if (c > 100) { c = +c.toString().substr(-2, 2); }
            let dAvg = (c < 20) ? 10 : (c < 30) ? 20 : 30;
            let nueCost;
            let nueSkill;
            nueCost = (+c.toString().substr(-1, 1) === 1 || typeof this.modules[this.moduleID("Dcost")].search(dAvg) === "undefined") ? cost : Math.round((this.modules[this.moduleID("Dcost")].search(dAvg) + cost), 0);
            nueSkill = (+c.toString().substr(-1, 1) === 1 || typeof this.modules[this.moduleID("Dskill")].search(dAvg) === "undefined") ? skill : Math.round((this.modules[this.moduleID("Dskill")].search(dAvg) + skill), 1);
            if (+c.toString().substr(-1, 1) === 5) {
                nueCost = Math.round((nueCost / 5), 0);
                let mSort = (typeof this.modules[this.mChan].search(411) === "undefined") ? nueCost : Math.round((nueSkill), 1);
                this.preDraw([5, 400, 2, mSort]); //xfun(5:tC), xid|pg, abc[xone], xtwo(2:on), xnode
            }
            this.modules[this.moduleID("Dcost")].add(dAvg, nueCost);
            this.modules[this.moduleID("Dskill")].add(dAvg, nueSkill);
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
        onDeck(deck) {
            let deckNow;
            if (deck) {
                deckNow = deck + "" + this.modules[this.mDeck].search(0);
            }
            let xa23 = document.getElementById("x-a-23"); //dMugBase
            let ixa23 = xa23.cloneNode(true);
            ixa23.id = "";
            let xa4 = document.getElementById("x-a-4"); //dPoseBack
            let ixa4 = xa4.cloneNode(true);
            ixa4.id = "";
            let xa40 = document.getElementById("x-a-40"); //dPoseBase
            let ixa40 = xa40.cloneNode(true);
            ixa40.id = "";
            for (let i = 0; i < 5; i++) {
                this.buildDeckMug(i, ixa23, deckNow);
                this.buildDeckPose(i, ixa40, deckNow);
            }
            ixa4.children[1].appendChild(ixa40);
            this.prepDraw(ixa23, ixa4);
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
        buildDeckPose(i, ixa40, deckNow) {
            let xa400 = document.getElementById("x-a-400");
            let ixa400 = xa400.cloneNode(true);
            ixa400.id = "";
            let deck = deckNow || this.modules[this.mDeck].search(0); //1|2|3
            let j = i + 1;
            let cost = this.modules[this.mDcost].search(deck + "" + j); //1|2|3 + 1^5
            let uNum = this.modules[this.mDeck].search(deck + "" + j); //1|2|3 + 1^5
            let model = this.modules[this.mDmodel].search(deck + "" + j); //1^7
            let rank = this.modules[this.mDrank].search(deck + "" + j);
            let xmodel = ixa400.children[2].children[0].children[0].children[1].children[0];
            let xrox = ixa400.children[2].children[0].children[0].children[2].children[0];
            let xrank = ixa400.children[2].children[0].children[0].children[2].children[1];
            this.getDawnTier(xmodel, xrox, xrank, model, rank);
            ixa400.children[2].children[0].children[0].children[0].children[1].textContent = cost;
            let nuImg = "url(/wp-content/uploads/" + "u" + uNum + "m" + model + "pose" + ".png)";
            ixa400.children[1].children[0].children[0].style.backgroundImage = nuImg;
            if (this.modules[this.mChan].search(418) === j) {
                this.buildsU(ixa400);
            }
            ixa40.children[i].appendChild(ixa400);
        }
        buildsU(ixa400) {
            let xa401 = document.getElementById("x-a-401");
            let ixa401 = xa401.cloneNode(true);
            ixa401.id = "";
            ixa400.children[1].appendChild(ixa401);
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
        inDeck(uNum, deckNow) {
            let pos;
            let dPos;
            for (let d = 1; d < 6; d++) {
                dPos = deckNow + "" + d;
                pos = this.modules[this.mDeck].search(dPos);
                if (pos === uNum) { return dPos; }
            }
            return false;
        }
        tempStats(ddPos, uNum) {
            let model = this.modules[this.moduleID("Model")].search(uNum);
            let tier = this.modules[this.moduleID("Tier")].search(uNum);
            let rank = this.modules[this.moduleID("Rank")].search(uNum);
            let skill = this.modules[this.moduleID("Skill")].search(uNum);
            let cost = this.modules[this.moduleID("Cost")].search(uNum);
            this.modules[this.moduleID("Dmodel")].add(ddPos, model);
            this.modules[this.moduleID("Dtier")].add(ddPos, tier);
            this.modules[this.moduleID("Drank")].add(ddPos, rank);
            this.modules[this.moduleID("Dskill")].add(ddPos, skill);
            this.modules[this.moduleID("Dcost")].add(ddPos, cost);
        }
        restoreDeck() {
            //console.log("restoreDeck");
            this.clearDeck();
            this.onDeck();
        }
        clearDeck() {
            this.preDraw([3, 2, 0, 1]); //xfun(3:remove), xid|pg, abc[xone], xtwo:1
            this.preDraw([3, 3, 0, 0]); //xfun(3:remove), xid|pg, abc[xone], xtwo:0
            this.preDraw([3, 4, 0, 0]); //xfun(3:remove), xid|pg, abc[xone], xtwo:0
        }
        buildDupDeck(deckNow) {
            //console.log("create dupDeck", deckNow);
            let dPos;
            let ddPos;
            let uNum;
            for (let d = 1; d < 6; d++) {
                dPos = deckNow + "" + d;
                ddPos = 1 + "" + dPos;
                uNum = this.modules[this.mDeck].search(dPos);
                this.modules[this.mDeck].add(ddPos, uNum);
            }
        }
        clearDupDeck(deckNow) {
            //console.log("clear dupDeck", deckNow);
            let ddPos;
            for (let d = 1; d < 6; d++) {
                ddPos = 1 + "" + deckNow + "" + d;
                this.modules[this.mDeck].remove(ddPos);
                this.modules[this.moduleID("Dmodel")].remove(ddPos);
                this.modules[this.moduleID("Dtier")].remove(ddPos);
                this.modules[this.moduleID("Drank")].remove(ddPos);
                this.modules[this.moduleID("Dskill")].remove(ddPos);
                this.modules[this.moduleID("Dcost")].remove(ddPos);
            }
            this.modules[this.mChan].remove(417);
        }
        update(sts) {
            if (typeof this.modules[this.mChan].search(415) === "undefined") { return; }
            else {
                let tapNum = this.modules[this.mChan].search(415);
                let uNum = this.modules[this.mChan].search(416);
                if (this.modules[this.mCards].search(uNum) < 1) {
                    this.modules[this.mChan].remove(418);
                    if (tapNum === 2) { this.modules[this.mChan].remove(416); }
                    if (tapNum === 4) { this.clearDupDeck(this.modules[this.mDeck].search(0)); }
                    this.restoreDeck();
                }
                else {
                    let nuPos;
                    let deckNow = this.modules[this.mDeck].search(0); //savedDeck = deckVisible@pg4 //1|2|3
                    let dPos = this.inDeck(uNum, deckNow);
                    let ddPos = this.modules[this.mChan].search(417); //this.inDeck(uNum, 1 + "" + deckNow);
                    let nuddPos;
                    let xNum;
                    let xPos;
                    let d;
                    let dNum;
                    let nuNum;
                    switch (tapNum) {
                        case 1:
                            this.modules[this.mChan].remove(418);
                            if (dPos) {
                                nuddPos = +(1 + "" + dPos);
                                this.restoreDeck();
                            }
                            else {
                                nuddPos = +(1 + "" + deckNow + "" + 1);
                                this.modules[this.mChan].add(417, nuddPos);
                                xPos = nuddPos - 100;
                                xNum = this.modules[this.mDeck].search(xPos);
                                this.buildDupDeck(deckNow);
                                this.modules[this.moduleID("Deck")].add(nuddPos, uNum);
                                this.modules[this.mChan].add(418, xPos - 10);
                                for (d = 1; d < 6; d++) {
                                    dNum = 1 + "" + deckNow + "" + d;
                                    nuNum = this.modules[this.moduleID("Deck")].search(dNum);
                                    this.tempStats(dNum, nuNum);
                                }
                                this.clearDeck();
                                this.onDeck(1);
                            }
                            this.modules[this.mChan].add(417, nuddPos);
                            break;
                        case 2:
                            for (d = 1; d < 6; d++) {
                                dNum = 1 + "" + deckNow + "" + d;
                                nuNum = this.modules[this.moduleID("Deck")].search(dNum);
                                this.modules[this.moduleID("Deck")].add(deckNow + "" + d, nuNum);
                                this.bootStats(dNum, nuNum);
                                /*global localStorage*/
                                localStorage.setItem("d" + deckNow + "" + d, nuNum);
                            }
                            this.modules[this.mChan].remove(418);
                            this.clearDupDeck(deckNow);
                            this.restoreDeck();
                            this.modules[this.mChan].remove(416); //per not removed @ trait
                            break;
                        case 3:
                            this.modules[this.mChan].remove(418);
                            if (dPos) {
                                nuddPos = +(1 + "" + dPos);
                                this.restoreDeck();
                            }
                            else {
                                nuddPos = +(1 + "" + deckNow + "" + 1);
                                this.modules[this.mChan].add(417, nuddPos);
                                xPos = nuddPos - 100;
                                xNum = this.modules[this.mDeck].search(xPos);
                                this.buildDupDeck(deckNow);
                                this.modules[this.moduleID("Deck")].add(nuddPos, uNum);
                                this.modules[this.mChan].add(418, xPos - 10);
                                for (d = 1; d < 6; d++) {
                                    dNum = 1 + "" + deckNow + "" + d;
                                    nuNum = this.modules[this.moduleID("Deck")].search(dNum);
                                    this.tempStats(dNum, nuNum);
                                }
                                this.clearDeck();
                                this.onDeck(1);
                            }
                            this.modules[this.mChan].add(417, nuddPos);
                            break;
                        case 4:
                            this.modules[this.mChan].remove(418);
                            this.clearDupDeck(deckNow);
                            this.restoreDeck();
                            break;
                        case 51:
                            nuddPos = +ddPos.toString().substr(-1, 1) === 1 ? +(+ddPos + 4) : +(+ddPos - 1);
                            xPos = nuddPos - 100;
                            xNum = this.modules[this.mDeck].search(xPos);
                            this.buildDupDeck(deckNow);
                            this.modules[this.moduleID("Deck")].add(nuddPos, uNum);
                            this.modules[this.mChan].add(417, nuddPos);
                            this.modules[this.mChan].add(418, xPos - 10);
                            if (dPos) { this.modules[this.moduleID("Deck")].add(1 + "" + dPos, xNum); }
                            for (d = 1; d < 6; d++) {
                                dNum = 1 + "" + deckNow + "" + d;
                                nuNum = this.modules[this.moduleID("Deck")].search(dNum);
                                this.tempStats(dNum, nuNum);
                            }
                            this.clearDeck();
                            this.onDeck(1);
                            break;
                        case 53:
                            nuddPos = +ddPos.toString().substr(-1, 1) === 5 ? +(+ddPos - 4) : +(+ddPos + 1);
                            xPos = nuddPos - 100;
                            xNum = this.modules[this.mDeck].search(xPos);
                            this.buildDupDeck(deckNow);
                            this.modules[this.moduleID("Deck")].add(nuddPos, uNum);
                            this.modules[this.mChan].add(417, nuddPos);
                            this.modules[this.mChan].add(418, xPos - 10);
                            if (dPos) { this.modules[this.moduleID("Deck")].add(1 + "" + dPos, xNum); }
                            for (d = 1; d < 6; d++) {
                                dNum = 1 + "" + deckNow + "" + d;
                                nuNum = this.modules[this.moduleID("Deck")].search(dNum);
                                this.tempStats(dNum, nuNum);
                            }
                            this.clearDeck();
                            this.onDeck(1);
                            break;
                        default:
                            this.buildDupDeck(deckNow);
                            if (dPos) {
                                nuddPos = +(1 + "" + dPos);
                                this.restoreDeck();
                                this.modules[this.mChan].add(417, nuddPos);
                            }
                            else {
                                nuddPos = +(1 + "" + deckNow + "" + 1);
                                this.modules[this.mChan].add(417, nuddPos);
                                xPos = nuddPos - 100;
                                xNum = this.modules[this.mDeck].search(xPos);
                                this.buildDupDeck(deckNow);
                                this.modules[this.moduleID("Deck")].add(nuddPos, uNum);
                                this.modules[this.mChan].add(418, xPos - 10);
                                for (d = 1; d < 6; d++) {
                                    dNum = 1 + "" + deckNow + "" + d;
                                    nuNum = this.modules[this.moduleID("Deck")].search(dNum);
                                    this.tempStats(dNum, nuNum);
                                }
                                this.clearDeck();
                                this.onDeck(1);
                            }
                    }
                }
                this.modules[this.mChan].remove(415);
            }
            //(remove deck) update pg2|3|4 decks, update dAvg cost|skill
        }
    }
    return DecksG;
});
