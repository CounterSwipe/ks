define(function() {
    document.addEventListener("touchmove", function(e) {
        e.preventDefault();
    });
    var aX = 0,
        aY = 0,
        zX = 0,
        zY = 0,
        uWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        uW = Math.round((uWidth / 20), 3),
        uHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        uH = Math.round((uHeight / 25), 3),
        gpad = document.getElementById("gpad0");
    class Touches {
        constructor() {
            this.name = "Touches";
            this.modules = null;
            this.mControls = 0;
            this.mTicker = 0;
            this.isReady = false;
        }
        init(game) {
            var self = this;
            this.modules = game.modules;
            this.mControls = this.moduleID("Controls");
            this.mTicker = this.moduleID("Ticker");
            gpad.addEventListener("touchstart", function(event) {
                aX = event.touches[0].screenX;
                aY = event.touches[0].screenY;
            }, false);
            gpad.addEventListener("touchend", function(event) {
                zX = event.changedTouches[0].screenX;
                zY = event.changedTouches[0].screenY;
                Math.round((zX - aX), 3) === Math.round((zY - aY), 3) || (uW > Math.abs(Math.round((zX - aX), 3)) && uH > Math.abs(Math.round((zY - aY), 3))) ? self.tap(event.target.id) : self.dir();
            }, false);
            this.isReady = true;
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        dir() {
            var x = Math.round((zX - aX), 3),
                y = Math.round((zY - aY), 3),
                tick = this.modules[this.mTicker].search(0);
            if (Math.abs(x) >= Math.abs(y)) {
                return x < 0 ? this.swipe(tick, 1) : this.swipe(tick, 3);
            }
            return y < 0 ? this.swipe(tick, 2) : this.swipe(tick, 4);
        }
        swipe(tick, dNum) {
            this.modules[this.mControls].add(tick, dNum);
            game.start(); /*global game*/
        }
        tap(boxID) {
            let tapNum = +boxID.toString().substr(-2, 2),
                tick = this.modules[this.mTicker].search(0);
            this.modules[this.mControls].add(tick, tapNum);
            game.start(); /*global game*/
        }
    }
    return Touches;
});
