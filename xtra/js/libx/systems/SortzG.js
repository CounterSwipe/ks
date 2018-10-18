define(["cs/core/Eid"], function(Eid) {
    class SortzG {
        constructor() {
            this.name = "SortzG";
            this.modules = null;
            this.mChan = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mChan = this.moduleID("Chan");
            this.sortRoster();
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        sortRoster() {
            let uMax = this.modules[this.moduleID("Cards")].search(0);
            let sorted = [];
            for (let i = 1; i < uMax + 1; i++) {
                let prog = this.modules[this.moduleID("Prog")].search(i);
                let kind = this.modules[this.moduleID("Kind")].search(i);
                let cost = this.modules[this.moduleID("Cost")].search(i);
                sorted.push({ cost: cost, prog: prog, kind: kind, unum: i });
            }
            this.sortCost(uMax, sorted);
        }
        sortCost(uMax, sorted) {
            sorted.sort((a, b) => { return a.cost - b.cost || b.kind - a.kind || a.unum - b.unum; });
            for (let j = 0; j < uMax; j++) { this.modules[this.moduleID("Scost")].add(j, sorted[j].unum); }
            this.sortProg(uMax, sorted);
        }
        sortProg(uMax, sorted) {
            sorted.sort((a, b) => { return b.prog - a.prog || a.kind - b.kind || b.unum - a.unum; });
            for (let k = 0; k < uMax; k++) { this.modules[this.moduleID("Sprog")].add(k, sorted[k].unum); }
            //this.sortBtn();
            this.setRoster();
        }
        setRoster() {
            let uMax = this.modules[this.moduleID("Cards")].search(0);
            let pgMax = uMax < 9 ? 1 : uMax < 17 ? 2 : uMax < 25 ? 3 : uMax < 33 ? 4 : 5;
            this.modules[this.moduleID("Chan")].add(41, 1); //trigger rosterUpdate
            //this.modules[this.moduleID("Chan")].add(42, 1); //trigger traitUpdate
            this.modules[this.moduleID("Chan")].remove(410); //state:roster
            //this.modules[this.moduleID("Chan")].add(410,1); //state:trait
            this.modules[this.moduleID("Chan")].remove(411); //sortState:cost
            //this.modules[this.moduleID("Chan")].add(411,1); //sortState:prog
            this.modules[this.moduleID("Chan")].remove(412); //traitState:(roster)
            //this.modules[this.moduleID("Chan")].add(412,seq#); //traitState:traitNow(seq#)
            this.modules[this.moduleID("Chan")].add(413, 1); //pgNow / pgMax
            this.modules[this.moduleID("Chan")].add(414, pgMax);
            //this.modules[this.moduleID("Chan")].add(415,uNum); //trigger deckUpdate
            //this.modules[this.moduleID("Chan")].add(416,uNum); //traitState:traitNow(uNum)
            //this.modules[this.moduleID("Chan")].add(417,ddPos); //dupDeckPos -> uNum
            //this.modules[this.moduleID("Chan")].add(418,dPos); //@deck -> if !u = sU ico
        }
        /*sortBtn() {
            let xc234 = document.getElementById("x-c-234"); //c-numsBase
            let ixc234 = xc234.cloneNode(true);
            ixc234.id = "";
            let nodeNums = [1, 3, 5];
            let xNums = 400;
            for (let n = 0; n < 3; n++) {
                let xNum = xNums + n;
                let nNum = nodeNums[n];
                this.buildSortBtn(ixc234, xNum, nNum);
            }
            this.preDraw(11, 4, 2, ixc234); //11:append, page:4 abc[2], node
        }
        buildSortBtn(ixc234, xNum, nNum) {
            let xc = document.getElementById("x-c-" + xNum); //c- < dcost|dskill >
            let ixc = xc.cloneNode(true);
            ixc.id = "";
            if (xNum === 401) {
                ixc.children[1].children[1].children[0].children[0].id = "x-4010";
            }
            ixc234.children[nNum].appendChild(ixc);
        }*/
        getEID() {
            let eid = new Eid();
            return eid.id;
        }
        /*preDraw(xfun, xid, xone, xnode) {
            let nuID = this.getEID();
            this.modules[this.moduleID("View")].add(nuID, nuID);
            this.modules[this.moduleID("Xfun")].add(nuID, xfun);
            this.modules[this.moduleID("Xid")].add(nuID, xid);
            this.modules[this.moduleID("Xone")].add(nuID, xone);
            //this.modules[this.moduleID("Xtwo")].add(nuID, xtwo);
            if (xnode) { this.modules[this.moduleID("Xnode")].add(nuID, xnode); }
        }*/
        update(sts) {}
    }
    return SortzG;
});
