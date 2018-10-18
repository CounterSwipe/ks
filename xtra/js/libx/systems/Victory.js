define(function() {
    class Victory {
        constructor() {
            this.name = "Victory";
            this.modules = null;
            this.mChan = 0;
            this.mTicker = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mChan = this.moduleID("Chan");
            this.mTicker = this.moduleID("Ticker");
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        onVictory() {
            //let m = [100, 110, 120, 200, 210, 220];
            let p1 = [];
            let p2 = [];
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            for (let i = 0; i < 6; i++) {
                let cap = this.captured(i);
                if (i < 3) {
                    p1.push(cap);
                }
                else if (i > 2) {
                    p2.push(cap);
                }
            }
            /*global game*/
            let p1m = p1.reduce(reducer);
            let p2m = p2.reduce(reducer);
            if (p1m > p2m) {
                console.log("Victory! p1 wins:", p1m, "moments captured, p2:", p2m, "moments captured.");
                this.modules[this.mChan].remove(0); //TODO
                game.stop(console.log(game));
            }
            else if (p2m > p1m) {
                console.log("Victory! p2 wins:", p2m, "moments captured, p1:", p1m, "moments captured.");
                this.modules[this.mChan].remove(0); //TODO
            }
            else {
                if (typeof this.modules[this.mTicker].search(300) === "undefined") {
                    let overTime = 5; // 1/3 regulation - 1s //so final # = 0
                    this.modules[this.mTicker].add(0, 121); //regulation ticks - (overtime * 10) + 1 //so as to not retrigger 2x energy etc
                    this.modules[this.mTicker].add(1, 0); //init ticker
                    this.modules[this.mTicker].add(2, overTime); //init timer
                    this.modules[this.mTicker].add(300, 1);
                    this.modules[this.mChan].remove(0); //TODO
                }
                else {
                    console.log("It's a push! p1:", p1m, "moments captured, p2:", p2m, "moments captured.");
                    this.modules[this.mChan].remove(0);
                    game.stop(console.log(game));
                }
            }
            //this.modules[this.mChan].remove(0);
            //game.stop(); 
        }
        captured(i) {
            let m = [102, 112, 122, 202, 212, 222];
            if (typeof this.modules[this.mChan].search(m[i]) === "undefined") { return 0; }
            else { return 1; }
        }
        update(sts) {
            if (typeof this.modules[this.mChan].search(0) === "undefined") { return; }
            else { this.onVictory(); }
        }
    }
    return Victory;
});
