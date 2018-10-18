define(function(require) {
    var Eid = require("cs/core/Eid");
    class Boot {
        constructor() {
            this.name = "Boot";
            this.modules = null;
        }
        init(game) {
            this.modules = game.modules;
            this.setup();
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        setup() {
            /*global localStorage*/
            //console.log(localStorage);
            //localStorage.clear();
            this.loadPlayer();
            let self = this;
            var onModulesReady = function(testModule) {
                return new Promise((resolve) => {
                    var waitForModules = function() {
                        if (testModule()) { resolve(testModule); }
                        else { window.requestAnimationFrame(waitForModules); }
                    };
                    waitForModules();
                });
            };
            var testModule = function() { return (localStorage.getItem("pLoa") !== null && localStorage.getItem("pXp") !== null); }; //TODO:perhaps add # to module etc
            //iow m[#]:mModule !== undefined etc => pScripts loaded 
            onModulesReady(testModule).then(() => {
                self.loadRoster();
                self.loadDeck();
            });
            //console.log(localStorage);
        }
        loadPlayer() {
            let self = this;
            require(["/wp-content/themes/blankslate-child/js/db/player.js"], function(pScript) { pScript[0](self); });
        }
        loadRoster() {
            let pLoa = +localStorage.getItem("pLoa"); //->[myCred pts]
            let uMax = this.unitsUnlocked(pLoa);
            this.modules[this.moduleID("Cards")].add(0, uMax); //for roster|sortz! -? perhaps change to chan[#]
            this.modules[this.moduleID("Kind")].add(0, pLoa); //->[myCred pts] for deck! remove!
            for (let j = 1; j < uMax + 1; j++) { this.loadUnit(j); }
        }
        unitsUnlocked(pLoa) {
            let uMax;
            switch (true) {
                case (pLoa > 9):
                    uMax = 40;
                    break;
                case (pLoa > 6):
                    uMax = 32;
                    break;
                case (pLoa > 4):
                    uMax = 24;
                    break;
                case (pLoa > 2):
                    uMax = 16;
                    break;
                default:
                    uMax = 8;
            }
            return uMax;
        }
        loadUnit(uNum) {
            let self = this;
            require(["/wp-content/themes/blankslate-child/js/adb/unit.js"], function(uScript) { uScript[0](self, uNum); });
        }
        loadDeck() {
            let deck = +localStorage.getItem("d0"); //saved deck -> 1|2|3
            let saveDeck = deck ? deck : 1;
            let pLoa = this.modules[this.moduleID("Kind")].search(0); //+localStorage.getItem("pLoa"); //->[myCred pts]
            let dMax = pLoa < 10 ? 1 : 3;
            //deck d1{11,12,13,14,15}, d2{21,22,23,24,25}, d3{31,32,33,34,35}
            let a = [11, 21, 31];
            let d;
            for (let b = 0; b < dMax; b++) {
                let c = a[b];
                let e = c + 5;
                for (c; c < e; c++) {
                    if (deck) { d = +localStorage.getItem("d" + c); }
                    else {
                        d = (c - 10);
                        localStorage.setItem("d" + c, d);
                    }
                    this.modules[this.moduleID("Deck")].add(c, d);
                }
            }
            if (!deck) { localStorage.setItem("d0", 1); }
            this.modules[this.moduleID("Deck")].add(0, saveDeck);
        }
        getEID() {
            let eid = new Eid();
            return eid.id;
        }
    }
    return Boot;
});
