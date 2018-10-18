define(function() {
    class Tick {
        constructor() {
            this.name = "Tick";
            this.modules = null;
            this.mGui = 0;
            this.mView = 0;
            this.nTick = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mGui = this.moduleID("Gui");
            this.mView = this.moduleID("View");
            this.nTick = this.getTick(this.mGui);
            this.isReady = true;
        }
        getTick(mGui) {
            for (var g = 0, gLen = this.modules[mGui].length(); g < gLen; g++) {
                var h = this.modules[mGui].reveal()[g];
                var i = this.modules[mGui].search(h); //gNum: 0:tick, 1:ebar, 2:pbar
                if (i.gNum === 0) {
                    return i.id;
                }
            }
        }
        moduleID(mID) {
            for (var id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) {
                    return id;
                }
            }
        }
        onEnter(mGui, nTick, ticks, sts) {
            //10 ticks / second = 10 ticks / 1000 ms = 0.01 ticks / 1 ms * (1000 ms / 10 ticksPerSecond = 100) = 1 ticks / 100 ms
            var ticked = (Math.round((10 * 0.001), 5) * sts);
            var nuTick = Math.round((ticks.tick + ticked), 0);
            this.modules[mGui].search(nTick).tick = nuTick;
            this.onTick(mGui, nTick, ticks);
        }
        onTick(mGui, nTick, ticks) {
            var ticker = ticks.ticker;
            var nuTicker = ticker === 9 ? 0 : ++ticker;
            this.modules[mGui].search(nTick).ticker = nuTicker;
            if (nuTicker === 0) {
                this.onEvent(mGui, nTick, ticks);
                ticks.tick !== ticks.t1 ? false : this.liftFog(ticks.tick);
            }
        }
        onEvent(mGui, nTick, ticks) {
            var time = ticks.time;
            var nuTime = --time;
            this.modules[mGui].search(nTick).time = nuTime;
            this.onExit(ticks.id, nuTime);
        }
        liftFog(tick) {
            var jsID = "fog";
            var draw = { id: tick.vID, jsID: jsID, offClass: "o99", onClass: "o0", vDraw: 0 };
            this.modules[this.mView].add(tick.vID, draw);
        }
        onExit(tID, time) {
            var jsID = "js-timer";
            var draw = { id: tID, jsID: jsID, nuText: time, vDraw: 4 };
            this.modules[this.mView].add(tID, draw);
        }
        endGame(ticks) {
            /*global game*/
            game.stop(console.log("@endGame", ticks));
        }
        update(sts) {
            var mGui = this.mGui;
            var nTick = this.nTick;
            var ticks = this.modules[mGui].search(nTick);
            ticks.tick < ticks.timer ? this.onEnter(mGui, nTick, ticks, sts) : this.endGame(ticks);
        }
    }
    return Tick;
});
