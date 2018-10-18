define(["cs/core/Eid"], function(Eid) {
    class Movement {
        constructor() {
            this.name = "Movement";
            this.modules = null;
            this.mGui = 0;
            this.mTransit = 0;
            this.mView = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mGui = this.moduleID("Gui");
            this.mTransit = this.moduleID("Transit");
            this.mView = this.moduleID("View");
            this.isReady = true;
        }
        moduleID(mID) {
            for (var id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) {
                    return id;
                }
            }
        }
        onEnter(mTransit, sts) {
            var doomed = [];
            var sorted = [];
            var tNow = this.modules[this.mGui].search(0).tn;
            for (var t = 0, tLen = this.modules[mTransit].length(); t < tLen; t++) {
                var u = this.modules[mTransit].reveal()[t];
                var v = this.modules[mTransit].search(u);
                if (v.time <= tNow) { doomed.push(u); }
                sorted.push(v);
            }
            sorted.sort(function(a, b) {
                return a.id - b.id;
            });
            //v.time >= t.tn ? [transit].remove(id), [isActive].add(id, unit@w.pos) w.pos
            //ex: {id: 24, time: 19} {id: 24, pos: 110}
            this.onEvent(sorted, doomed, mTransit, sts, tNow);
        }
        onEvent(sorted, doomed, mTransit, sts, tNow) {
            for (var s = 0, sLen = sorted.length; s < sLen; s++) {
                this.nuWidth(sorted[s], sts, tNow); //pose posX
                this.nuMar(sorted[s], sts, tNow); //pose posY
                this.nuPad(sorted[s], sts, tNow); //resBar posY
            }
            sorted = [];
            this.onExit(mTransit, doomed, sts);
        }
        getEID() {
            var eid = new Eid();
            return eid.id;
        }
        nextPoint(a, b, step) {
            //var delta = step / 50; // so t goes from 0 at the start to 1 at step 29. //100 //50 x2 to|fro
            var delta = step;
            var xx = Math.round(((1 - delta) * a[0] + delta * b[0]), 3);
            var yy = Math.round(((1 - delta) * a[1] + delta * b[1]), 3);
            return [xx, yy];
        }
        nuWidth(uSort, sts, tNow) {
            var vID = this.getEID();
            var jsID = "js-" + uSort.id + "-width"; //unit html Eid
            var nuWidth = this.getWidth(uSort.pos, uSort.time, sts, tNow);
            var draw = { id: vID, jsID: jsID, nuWidth: nuWidth, vDraw: 2 };
            this.modules[this.mView].add(vID, draw);
        }
        getWidth(pos, ticked, sts, tNow) {
            var sideW = 33;
            var step = Math.round(((ticked - tNow) * (sts * .01)), 3);
            var nuPerc = Math.round((1 - (step * .1)), 3);
            var stepW = Math.round((sideW * nuPerc), 3);
            var nuW = pos < 200 ? Math.round((stepW), 3) : Math.round((66 - stepW), 3);
            return nuW + "%";
        }
        nuMar(uSort, sts, tNow) {
            var vID = this.getEID();
            var jsID = "js-" + uSort.id + "-martop"; //unit html Eid
            var nuMar = this.getMar(uSort.pos, uSort.time, sts, tNow);
            var draw = { id: vID, jsID: jsID, nuMar: nuMar, vDraw: 6 };
            this.modules[this.mView].add(vID, draw);
        }
        getMar(pos, ticked, sts, tNow) {
            var baseM = pos === 100 || pos === 200 ? .4 : pos === 110 || pos === 210 ? .7 : pos === 120 || pos === 220 ? 1 : console.log("error")
            var step = Math.round(((ticked - tNow) * (sts * .01)), 3);
            var nuPerc = Math.round((1 - (step * .1)), 3);
            var subP = Math.round((.2 * nuPerc), 3);
            var nuM = Math.round((baseM - subP), 3);
            return nuM + "rem";
        }
        nuPad(uSort, sts, tNow) {
            var vID = this.getEID();
            var jsID = "js-" + uSort.id + "-pad"; //unit html Eid
            var nuPad = this.getPad(uSort.pos, uSort.time, sts, tNow);
            var draw = { id: vID, jsID: jsID, nuPad: nuPad, vDraw: 1 };
            this.modules[this.mView].add(vID, draw);
        }
        getPad(pos, ticked, sts, tNow) {
            var baseP = pos === 100 || pos === 200 ? 3 : pos === 110 || pos === 210 ? 3.25 : pos === 120 || pos === 220 ? 3.5 : console.log("error")
            var step = Math.round(((ticked - tNow) * (sts * .01)), 3);
            var nuPerc = Math.round((1 - (step * .1)), 3);
            var subP = Math.round((.5 * nuPerc), 3);
            var nuP = Math.round((baseP - subP), 3);
            return nuP + "vh";
        }
        onExit(mTransit, doomed, sts) {
            for (var d = 0, dLen = doomed.length; d < dLen; d++) {
                this.modules[mTransit].remove(doomed[d]);
            }
            doomed = [];
        }
        update(sts) {
            var mTransit = this.mTransit;
            if (this.modules[mTransit].length()) { this.onEnter(mTransit, sts); }
        }
    }
    return Movement;
});
