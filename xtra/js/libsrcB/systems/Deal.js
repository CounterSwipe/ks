define(["cs/core/Eid"], function(Eid) {
    class Deal {
        constructor() {
            this.name = "Deal";
            this.modules = null;
            this.mControls = 0;
            this.mHand = 0;
            this.mDeck = 0;
            this.mCards = 0;
            this.mModel = 0;
            this.mCost = 0;
            this.mView = 0;
            this.mKind = 0;
            this.mXid = 0;
            this.mXone = 0;
            this.mXtwo = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mControls = this.moduleID("Controls");
            this.mHand = this.moduleID("Hand");
            this.mDeck = this.moduleID("Deck");
            this.mCards = this.moduleID("Cards");
            this.mModel = this.moduleID("Model");
            this.mCost = this.moduleID("Cost");
            this.mView = this.moduleID("View");
            this.mKind = this.moduleID("Kind");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
            this.mXtwo = this.moduleID("Xtwo");
            this.dealt(1);
            this.dealt(2);
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        dealt(player) {
            let hPos = player === 1 ? 11 : 21;
            for (let i = 0; i < 3; i++) {
                let dNum = this.modules[this.mHand].search(hPos);
                let cNum = this.modules[this.mDeck].search(dNum);
                let uNum = this.modules[this.mCards].search(cNum);
                let model = this.modules[this.mModel].search(cNum);
                let cost = this.modules[this.mCost].search(cNum);
                for (let j = 0; j < 2; j++) {
                    let nuID = this.getEID();
                    let kind = j === 0 ? 5 : 6;
                    this.modules[this.mView].add(nuID, nuID);
                    this.modules[this.mKind].add(nuID, kind);
                    this.modules[this.mXid].add(nuID, hPos); //hand: p1|2 + 1|2|3 pos
                    if (j === 0) {
                        this.modules[this.mXone].add(nuID, uNum); //uNum|make
                        this.modules[this.mXtwo].add(nuID, model); //model
                    }
                    else { this.modules[this.mXone].add(nuID, cost); }
                }
                ++hPos;
            }
        }
        onDeal(player, dNum) {
            if (typeof this.modules[this.mControls].search(dNum) === "undefined") { return; }
            else { this.autoDeal(player, dNum) }
        }
        autoDeal(player, dNum) {
            let hPos = this.modules[this.mControls].search(dNum); //1|2 + 1|2|3 = handPosToBeReplaced
            let nNum = player === 1 ? 14 : 24; //next
            let nMax = player === 1 ? 15 : 25; //next
            let nPos = this.modules[this.mHand].search(nNum); //next deckPos
            let cNum = this.modules[this.mDeck].search(nPos); //next cardID
            let uNum = this.modules[this.mCards].search(cNum); //next unitNum|make
            let model = this.modules[this.mModel].search(cNum); //next unitModel
            let cost = this.modules[this.mCost].search(cNum); //next unitCost
            let nuNum = nPos === nMax ? nPos - 4 : nPos + 1; //get new next card
            this.modules[this.mHand].add(hPos, nPos); //deal next card
            this.modules[this.mHand].add(nNum, nuNum); //deal new next card
            this.preDraw(player, 5, hPos, uNum, model, cost);
            this.preDraw(player, 6, hPos, uNum, model, cost);
            this.modules[this.mControls].remove(dNum);
        }
        preDraw(player, kind, hPos, uNum, model, cost) {
            let nuID = this.getEID();
            this.modules[this.mView].add(nuID, nuID);
            this.modules[this.mKind].add(nuID, kind); //5mug|6cost
            this.modules[this.mXid].add(nuID, hPos); //hand: p1|2 + 1|2|3 pos
            if (kind === 5) {
                this.modules[this.mXone].add(nuID, uNum); //uNum|make
                this.modules[this.mXtwo].add(nuID, model); //model
            }
            else { this.modules[this.mXone].add(nuID, cost); }
        }
        getEID() {
            let eid = new Eid();
            return eid.id;
        }
        update(sts) {
            //this.onDeal(1, 11);
            //this.onDeal(2, 12);
        }
    }
    return Deal;
});
