define(function() {
    class Launch {
        constructor() {
            this.name = "Launch";
            this.modules = null;
            this.mTicker = 0;
            this.mReq = 0;
            this.mPaths = 0;
            this.mHand = 0;
            this.mDeck = 0;
            this.mCards = 0;
            this.mDeployed = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mTicker = this.moduleID("Ticker");
            this.mReq = this.moduleID("Req");
            this.mPaths = this.moduleID("Paths");
            this.mHand = this.moduleID("Hand");
            this.mDeck = this.moduleID("Deck");
            this.mCards = this.moduleID("Cards");
            this.mDeployed = this.moduleID("Deployed");
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        onLaunch(player) {
            if (typeof this.modules[this.mReq].search(player + 10) === "undefined") { return; }
            else { this.getCell(player); }
        }
        getCell(player) {
            let tNum = this.modules[this.mTicker].search(0); //add unit.deploySpd
            let pNum = this.modules[this.mPaths].search(player); //mPaths:0|34|68
            let path = pNum === 34 ? 1 : pNum === 68 ? 2 : 0;
            let cell = +(player + "" + path + "" + 0);
            this.getUnit(player, tNum, cell);
        }
        getUnit(player, tNum, cell) {
            let self = this;
            let hNum = player === 1 ? 10 : 20;
            let hPos = this.modules[this.mHand].search(hNum);
            let dNum = this.modules[this.mHand].search(hPos);
            let cNum = this.modules[this.mDeck].search(dNum);
            let uNum = this.modules[this.mCards].search(cNum);
            this.getSpd(self, player, hPos, cNum, uNum, tNum, cell);
        }
        getSpd(self, player, hPos, cNum, uNum, tNum, cell) {
            require(["/wp-content/themes/blankslate-child/js/adb/unit" + uNum + ".js"], function(uScript) {
                var spd = uScript[1];
                //var tNow = self.modules[self.mTicker].search(0);
                //var launch = { tNum: tNum, spd: spd, tick: tNum + spd, tNow: tNow };
                var launch = { cell: cell, hpos: hPos, cnum: cNum, side: player, tick: tNum + spd };
                self.modules[self.mDeployed].add(player, launch);
                //console.log("launched:", launch);
                //var lNum = player === 1 ? 3 : 4;
                //function movetrait(cell, hPos, cNum, player, tNum, spd) {
                //  var launch = { cell: cell, hpos: hPos, cnum: cNum, side: player, tick: tNum + spd };
                //var publishPlease = { channel: mychannel, message: launch }; /*global mychannel*/
                //    pubnub.publish(publishPlease, function(m) { console.log("player: " + player + " sU"); }); /*global pubnub*/
                //    }
                self.modules[self.mReq].remove(player + 10);
                //self.modules[self.mControls].remove(lNum);
            });
        }
        update(sts) {
            this.onLaunch(1);
            this.onLaunch(2);
        }
    }
    return Launch;
});
