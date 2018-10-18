define(function(require) {
    var Eid = require("cs/core/Eid");
    class Boot {
        constructor() {
            this.name = "Boot";
            this.modules = null;
        }
        init(game) {
            this.modules = game.modules;
            /*let uNum = [1, 2, 3];
            let model = 1;
            let nuImg = function(num) { return "url(/wp-content/uploads/" + "u" + uNum[num] + "m" + model + "pose" + ".png)"; };
            document.getElementById("pose1").classList.add("size-2");
            document.getElementById("pose2").classList.add("size-2");
            document.getElementById("pose3").classList.add("size-2");
            document.getElementById("pose1").classList.add("Lside");
            document.getElementById("pose1").style.backgroundImage = nuImg(0);
            document.getElementById("pose2").style.backgroundImage = nuImg(1);
            document.getElementById("pose3").style.backgroundImage = nuImg(2);*/
            //console.log("@boot", playerInfo);
            this.setup();
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        setup() {
            /*global localStorage*/
            //localStorage.clear();
            this.loadPlayer();
            this.loadDeck(1); //player 1
            this.buildHud();
            this.buildGfx();
        }
        loadPlayer() {
            let player = 1;
            let pLoa = +localStorage.getItem("pLoa"); //->[myCred pts]
            this.loadStage(player, pLoa);
            this.loadStage(2, pLoa); //player2 TODO:sent via player2 team lead etc -> 'unlocks bg|playstyle|behaviors|triggers|perks|customizations' etc
            this.loadMoments(player, pLoa); //TODO: load p2 ploa per pl, p1 pla per p2 etc -> for now load all
            let self = this;
            require(["/wp-content/themes/blankslate-child/js/db/player.js"], function(pScript) { pScript[2](self); });
        }
        getStage(pLoa) {
            let sNum = 0;
            let stage = ["bgstone"];
            switch (pLoa) {
                case 1:
                    sNum = 0;
                    break;
                default:
                    // todo: stages per team lead|pLoa|player choice etc
            }
            return [stage[sNum] + "A", stage[sNum] + "B"];
        }
        loadStage(player, pLoa) {
            //console.log(player, this.getStage(pLoa));
            let stage = this.getStage(pLoa);
            let xa = document.getElementById("x-a");
            let ixa = xa.cloneNode(true);
            let xa0 = document.getElementById("x-a-0");
            ixa.children[0].children[0].classList.add(stage[0]);
            ixa.children[1].children[0].classList.add(stage[1]);
            if (player > 1) {
                ixa.children[1].children[0].classList.add("bgL");
            }
            for (let i = 0; i < 3; i++) {
                let ixa0 = xa0.cloneNode(true);
                ixa0.id = "";
                ixa.children[0].children[1].children[1].children[0].children[0].children[2].appendChild(ixa0);
            }
            ixa.children[0].children[1].children[1].children[0].children[0].children[1].id = "a-" + player + "" + 1;
            ixa.children[0].children[1].children[1].children[0].children[0].children[1].children[0].id = "a-" + player + "" + 0;
            if (player > 1) {
                ixa.children[0].children[1].children[1].children[0].children[0].children[1].children[0].children[0].classList.replace("blu", "red");
            }
            ixa.children[0].children[1].children[1].children[0].children[0].children[2].children[1].id = "";
            ixa.children[1].children[1].children[1].children[0].id = "a-" + player + "" + 11;
            //ixa.children[1].children[1].children[1].children[0].id = "a-1" + player + "" + 1;
            ixa.children[1].children[1].children[1].children[1].children[0].children[0].children[0].id = "a-" + player + "" + 10;
            //ixa.children[1].children[1].children[1].children[1].children[0].children[0].children[0].id = "a-1" + player + "" + 0;
            ixa.id = "";
            for (let j = 0; j < 2; j++) {
                let ixbc = ixa.cloneNode(true);
                let bc = j === 0 ? "b" : "c";
                ixbc.children[0].children[1].children[1].children[0].children[0].children[1].id = bc + "-" + player + "" + 1;
                ixbc.children[0].children[1].children[1].children[0].children[0].children[1].children[0].id = bc + "-" + player + "" + 0;
                ixbc.children[1].children[1].children[1].children[0].id = bc + "-" + "" + player + "" + 11;
                //ixbc.children[1].children[1].children[1].children[0].id = bc + "-1" + "" + player + "" + 1;
                ixbc.children[1].children[1].children[1].children[1].children[0].children[0].children[0].id = bc + "-" + "" + player + "" + 10;
                //ixbc.children[1].children[1].children[1].children[1].children[0].children[0].children[0].id = bc + "-1" + "" + player + "" + 0;
                if (player > 1) {
                    ixbc.children[1].children[1].children[0].parentNode.removeChild(ixbc.children[1].children[1].children[0]);
                    ixbc.children[0].children[1].children[0].parentNode.removeChild(ixbc.children[0].children[1].children[0]);
                }
                document.getElementById(bc + "-" + player).appendChild(ixbc);
            }
            if (player > 1) {
                ixa.children[1].children[1].children[0].parentNode.removeChild(ixa.children[1].children[1].children[0]);
                ixa.children[0].children[1].children[0].parentNode.removeChild(ixa.children[0].children[1].children[0]);
            }
            document.getElementById("a-" + player).appendChild(ixa);
        }
        loadMoments(player, pLoa) {
            //(now|max) channels[100|101,110|111,120|121,200|201,210|211,220|221] //max = now + 1
            //max: per pLoa, distribution: per lead trait bg etc
            let max = pLoa > 1 ? 300 : 100; //TODO: script|formulas for this etc
            let p = [.4, .3, .3, .4, .3, .3];
            let m = [100, 110, 120, 200, 210, 220];
            for (let i = 0; i < 6; i++) {
                let mNow = m[i];
                let mMax = m[i] + 1;
                let perc = Math.round((max * p[i]), 5);
                this.modules[this.moduleID("Chan")].add(mNow, 0);
                this.modules[this.moduleID("Chan")].add(mMax, perc);
            }
        }
        loadDeck(player) {
            let deck = +localStorage.getItem("d0"); //saved deck -> 1|2|3
            if (!deck) { deck = 1; }
            for (let d = 1; d < 6; d++) {
                let dNum = deck + "" + d;
                let dPos = +(player + "" + d);
                let uNum = +localStorage.getItem("d" + dNum);
                let dModel = +localStorage.getItem("d" + dNum + "m");
                let dTier = +localStorage.getItem("d" + dNum + "t");
                let dRank = +localStorage.getItem("d" + dNum + "r");
                //console.log(dNum, dPos, uNum, dModel, dTier, dRank);
                this.modules[this.moduleID("Cards")].add(dPos, uNum); //getDeck(uNums)->cards
                this.modules[this.moduleID("Model")].add(dPos, dModel);
                this.modules[this.moduleID("Tier")].add(dPos, dTier);
                this.modules[this.moduleID("Rank")].add(dPos, dRank);
                this.getCost(uNum, dNum);
            }
            let dec = [+(player + "" + 1), +(player + "" + 2), +(player + "" + 3), +(player + "" + 4), +(player + "" + 5)]; //deckPosNums
            this.shuffle(dec);
            this.getDeck(player, dec);
        }
        getEID() {
            let eid = new Eid();
            return eid.id;
        }
        getCost(uNum, dNum) {
            let self = this;
            require(["/wp-content/themes/blankslate-child/js/adb/unit" + uNum + ".js"], function(uScript) {
                let cost = uScript[1];
                self.modules[self.moduleID("Cost")].add(dNum, cost);
            });
        }
        shuffle(deck) {
            for (let i = deck.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]];
            }
        }
        getDeck(player, dec) {
            let dPos = +(player + "" + 1); //deck->pointTo->cards
            for (let k = 0; k < 5; k++) {
                this.modules[this.moduleID("Deck")].add(dPos, dec[k]);
                ++dPos;
            }
            this.getHand(player);
        }
        getHand(player) {
            //cardNow = player+0, handNow = player+1^3, cardNext = player+4
            //hand->pointTo->deck->pointTo->cards
            for (let h = 0; h < 5; h++) {
                let hPos = +(player + "" + h);
                let hNum = h === 0 ? hPos + 1 : hPos;
                this.modules[this.moduleID("Hand")].add(hPos, hNum);
            }
            this.buildState(player);
        }
        buildState(player) {
            console.log(localStorage);
            var pState = {};
            pState[0] = player;
            for (let d = 1; d < 6; d++) {
                let dPos = +(player + "" + d);
                let uNum = this.modules[this.moduleID("Cards")].search(dPos); //getDeck(uNums)->cards
                let dModel = this.modules[this.moduleID("Model")].search(dPos);
                let dTier = this.modules[this.moduleID("Tier")].search(dPos);
                let dRank = this.modules[this.moduleID("Rank")].search(dPos);
                pState[d] = uNum;
                pState[d + "m"] = dModel;
                pState[d + "t"] = dTier;
                pState[d + "r"] = dRank;
            }
            this.modules[this.moduleID("Pub")].add(0, pState);
            //console.log("@boot pState", pState);
        }
        buildHud() {
            let xa0 = document.getElementById("x-a-0");
            let h_1 = document.getElementById("h-1");
            for (let i = 0; i < 9; i++) {
                let ixa0 = xa0.cloneNode(true);
                ixa0.classList.replace("h5h", "h3h");
                ixa0.id = "";
                h_1.children[0].children[0].children[0].children[2].appendChild(ixa0);
            }
            for (let i = 0; i < 2; i++) {
                let ih1 = h_1.children[0].children[0].children[1].children[0].children[0].cloneNode(true);
                ih1.children[0].id = i === 0 ? "h-12" : "h-11";
                ih1.children[1].id = i === 0 ? "h-120" : "h-110";
                ih1.children[1].children[1].id = i === 0 ? "h-121" : "h-111";
                h_1.children[0].children[0].children[1].children[0].appendChild(ih1);
            }
        }
        buildGfx() {
            //TODO: gfx -> from 200ms -> 100ms per tick time etc
            let xgfx = document.getElementById("x-gfx");
            let gfx = document.getElementById("gfx");
            let abc = [1, 2, 3]; //a:1,b:2,c:3
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let ixgfx = xgfx.cloneNode(true);
                    ixgfx.id = "gfx-" + abc[i] + "" + abc[j];
                    gfx.children[abc[i] + 1].children[j].appendChild(ixgfx);
                }
            }
        }
    }
    return Boot;
});
