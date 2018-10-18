define(["cs/core/Eid"], function(Eid) {
    class Msg {
        constructor() {
            this.name = "Msg";
            this.modules = null;
            this.mChan = 0;
            this.mHand = 0;
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
            this.mHand = this.moduleID("Hand");
            this.mView = this.moduleID("View");
            this.mXfun = this.moduleID("Xfun");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
            this.mXtwo = this.moduleID("Xtwo");
            //this.preDraw([11, 1, 3, 69]); //11:pad 2:id 3:h nuPath
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        onMsg(msg) {
            if (msg.deck) {
                if (msg.side === 2) {
                    this.loadDeck(msg.side, msg.deck);
                }
            }
            else {
                console.log("launch P", msg.side, msg.move);
                let player = msg.side;
                let p = msg.move.p;
                let amt = msg.move.amt;
                this.modules[this.moduleID("Chan")].add(player + "" + p, amt); // trigger captured(player + "" + p)
            }
        }
        buildState(player) {
            //console.log(localStorage);
            var pState = {};
            pState[0] = player;
            for (let d = 1; d < 6; d++) {
                let dPos = +(player + "" + d);
                let uNum = this.modules[this.moduleID("Cards")].search(dPos); //getDeck(uNums)->cards
                let dModel = this.modules[this.moduleID("Model")].search(dPos);
                let dTier = this.modules[this.moduleID("Tier")].search(dPos);
                let dRank = this.modules[this.moduleID("Rank")].search(dPos);
                pState[dPos] = uNum;
                pState[dPos + "m"] = dModel;
                pState[dPos + "t"] = dTier;
                pState[dPos + "r"] = dRank;
            }
            this.modules[this.moduleID("Pub")].add(0, pState);
            //console.log("@boot pState", pState);
        }
        loadDeck(player, deck) {
            this.loadHand(player);
            for (let d = 1; d < 6; d++) {
                let dPos = +(player + "" + d);
                let uNum = deck[d];
                let uModel = deck[d + "m"];
                let uTier = deck[d + "t"];
                let uRank = deck[d + "r"];
                this.modules[this.moduleID("Deck")].add(dPos, dPos); //getDeck(uNums)->cards
                this.modules[this.moduleID("Cards")].add(dPos, uNum); //getDeck(uNums)->cards
                this.modules[this.moduleID("Model")].add(dPos, uModel);
                this.modules[this.moduleID("Tier")].add(dPos, uTier);
                this.modules[this.moduleID("Rank")].add(dPos, uRank);
                this.loadCost(uNum, dPos);
            }
            console.log("setDeck P", player, deck);
        }
        loadCost(uNum, dPos) {
            let self = this;
            require(["/wp-content/themes/blankslate-child/js/adb/unit" + uNum + ".js"], function(uScript) {
                let cost = uScript[1];
                self.modules[self.moduleID("Cost")].add(dPos, cost);
            });
        }
        loadHand(player) {
            //cardNow = player+0, handNow = player+1^3, cardNext = player+4
            //hand->pointTo->deck->pointTo->cards
            for (let h = 0; h < 5; h++) {
                let hPos = +(player + "" + h);
                let hNum = h === 0 ? hPos + 1 : hPos;
                this.modules[this.moduleID("Hand")].add(hPos, hNum);
            }
            //this.buildState(player);
        }
        reqMet() {
            this.preDraw([7, 21, 3, 0]); //ebar ylo off
            let focused = this.modules[this.mHand].search(10);
            let focus = +(focused + "" + 0);
            this.preDraw([7, focus + 1, 3, 0]); //focus ylo off
            this.modules[this.mChan].add(33, 1);
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
        update(sts) {
            //sU = alt|nextPath//board(launchPos) = player(1|2) + path(a:0|b:1|c:2) + pos(1|2|3)
            //if (typeof this.modules[this.mChan].search(32) === "undefined") { return; }
            //else { this.onPath(); }
        }
    }
    return Msg;
});
