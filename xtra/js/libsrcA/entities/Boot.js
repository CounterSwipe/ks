define(function(require) {
    var Eid = require("cs/core/Eid");
    var decks = require("db/decks");
    var deck1 = decks[0];
    var deck2 = decks[1];
    class Boot {
        constructorx() {
            this.name = "Boot";
            this.modules = null;
        }
        initx(game) {
            this.modules = game.modules;
            //this.setup();
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        setupx() {
            /*global localStorage*/
            //localStorage.clear();
            this.loadPlayer();
            this.loadRoster();
            this.loadDeck();
            //console.log(localStorage);
        }
        loadPlayerx() {
            let self = this;
            require(["/wp-content/themes/blankslate-child/js/db/player.js"], function(pScript) { pScript[0](self); });
        }
        constructor() {
            this.name = "Boot";
            this.modules = null;
            this.mHand = 0;
            this.mDeck = 0;
            this.mCards = 0;
            this.mModel = 0;
            this.mTier = 0;
            this.mLevel = 0;
            this.mCost = 0;
        }
        init(game) {
            this.modules = game.modules;
            this.mHand = this.moduleID("Hand");
            this.mDeck = this.moduleID("Deck");
            this.mCards = this.moduleID("Cards");
            this.mModel = this.moduleID("Model");
            this.mTier = this.moduleID("Tier");
            this.mLevel = this.moduleID("Level");
            this.mCost = this.moduleID("Cost");
            this.getCards(this.mCards, this.mModel, this.mTier, this.mLevel, 1);
            this.getCards(this.mCards, this.mModel, this.mTier, this.mLevel, 2);
            //todo:localStorage.get(card#), assign Eid(), [mCards].add(eid,card#)
            //normally: p2 already shuffled!
        }
        getCards(mCards, mModel, mTier, mLevel, player) {
            let self = this;
            let cardPos = [1, 5, 9, 13, 17];
            let shuf = [];
            for (let i = 0; i < 5; i++) {
                let cid = this.getEID();
                shuf.push(cid);
                let cPos = cardPos[i];
                let uNum = player === 1 ? deck1[cPos] : deck2[cPos];
                let mNum = player === 1 ? deck1[cPos + 1] : deck2[cPos + 1];
                let tNum = player === 1 ? deck1[cPos + 2] : deck2[cPos + 2];
                let lNum = player === 1 ? deck1[cPos + 3] : deck2[cPos + 3];
                this.modules[mCards].add(cid, uNum);
                this.modules[mModel].add(cid, mNum);
                this.modules[mTier].add(cid, tNum);
                this.modules[mLevel].add(cid, lNum);
                this.getCost(self, uNum, cid);
            }
            this.shuffle(shuf);
            this.getDeck(shuf, player);
        }
        getEID() {
            let eid = new Eid();
            return eid.id;
        }
        shuffle(deck) {
            for (let i = deck.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]];
            }
        }
        getCost(self, uNum, cid) {
            require(["/wp-content/themes/blankslate-child/js/adb/unit" + uNum + ".js"], function(uScript) {
                var cost = uScript[0];
                self.modules[self.mCost].add(cid, cost);
            });
        }
        getDeck(shuf, player) {
            let mDeck = this.mDeck; //deck: p1:11^15, p2:21^25
            let dNum = player === 1 ? 11 : 21; //deck: points to cards = [mCards].search(deckPos)
            for (let j = 0; j < 5; j++) {
                let deckPos = shuf[j];
                this.modules[mDeck].add(dNum, deckPos);
                ++dNum;
            }
            this.getHand(player);
        }
        getHand(player) {
            let mHand = this.mHand; //hand: p1:10:cardNow,11^13:cards,14:cardNext, p2:20:cardNow,21^23:cards,24:cardNext
            let hNum = player === 1 ? 11 : 21; //hand: (1|2+1^4) points to deckPos = [mDeck].search(hNum)
            for (let k = 0; k < 4; k++) {
                this.modules[mHand].add(hNum, hNum);
                if (k === 0) { this.modules[mHand].add(hNum - 1, hNum); }
                ++hNum;
            }
        }
    }
    return Boot;
});
