define(["cs/core/Eid"], function(Eid) {
    class LaunchG {
        constructor() {
            this.name = "LaunchG";
            this.modules = null;
            this.mChan = 0;
            this.mDeck = 0;
            this.mDmodel = 0;
            this.mDtier = 0;
            this.mDrank = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mChan = this.moduleID("Chan");
            this.mDeck = this.moduleID("Deck");
            this.mDmodel = this.moduleID("Dmodel");
            this.mDtier = this.moduleID("Dtier");
            this.mDrank = this.moduleID("Drank");
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        getDeck() {
            /*global localStorage*/
            let deck = this.modules[this.mDeck].search(0); //1|2|3 
            localStorage.setItem("d0", deck);
            for (let d = 1; d < 6; d++) {
                let dNum = deck + "" + d;
                let uNum = this.modules[this.mDeck].search(dNum);
                let dModel = this.modules[this.mDmodel].search(dNum);
                let dTier = this.modules[this.mDtier].search(dNum);
                let dRank = this.modules[this.mDrank].search(dNum);
                localStorage.setItem("d" + dNum, uNum);
                localStorage.setItem("d" + dNum + "m", dModel);
                localStorage.setItem("d" + dNum + "t", dTier);
                localStorage.setItem("d" + dNum + "r", dRank);
            }
            this.joinLobby();
        }
        joinLobby() {
            window.location.href = "/lob/";
        }
        update(sts) {
            if (typeof this.modules[this.mChan].search(30) === "undefined") { return; }
            else {
                this.getDeck();
            }
        }
    }
    return LaunchG;
});
