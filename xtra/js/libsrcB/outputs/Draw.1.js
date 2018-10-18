define(function() {
    class Draw {
        constructor() {
            this.name = "Draw";
            this.modules = null;
            this.mView = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mView = this.moduleID("View");
            this.onEnter(this.mView); //var draw = { "1": eid, "2": kind, "3": jID, "4": var1, "5": var2 };
            this.isReady = true;
        }
        moduleID(mID) {
            for (var id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) {
                    return id;
                }
            }
        }
        onEnter(mView, fdsts) {
            var doomed = [];
            var sorted = [];
            for (var t = 0, tLen = this.modules[mView].length(); t < tLen; t++) {
                var u = this.modules[mView].reveal()[t];
                var v = this.modules[mView].search(u);
                console.log(u);
                console.log(v);
                sorted.push(v);
                doomed.push(u);
            }
            sorted.sort(function(a, b) {
                return a["1"] - b["1"];
            });
            this.onEvent(sorted, doomed, mView);
        }
        onEvent(sorted, doomed, mView) {
            for (var s = 0, sLen = sorted.length; s < sLen; s++) {
                var v = sorted[s];
                var kind = v["2"];
                switch (kind) {
                    case 0:
                        document.getElementById(v["3"]).classList.replace(v["4"], v["5"]);
                        break;
                    case 1:
                        document.getElementById(v["3"]).style.paddingTop = v["4"];
                        break;
                    case 2:
                        document.getElementById(v["3"]).style.width = v["4"];
                        break;
                    case 3:
                        document.getElementById(v["3"]).style.backgroundImage = v["4"];
                        break;
                    case 4:
                        document.getElementById(v["3"]).textContent = v["4"];
                        break;
                    case 5:
                        document.getElementById(v["3"]).appendChild(v["4"]);
                        break;
                    case 6:
                        document.getElementById(v["3"]).style.marginTop = v["4"];
                }
            }
            sorted = [];
            this.onExit(mView, doomed);
        }
        onExit(mView, doomed) {
            for (var d = 0, dLen = doomed.length; d < dLen; d++) {
                this.modules[mView].remove(doomed[d]);
            }
            doomed = [];
        }
        render(fdsts) {
            var mView = this.mView;
            if (this.modules[mView].length()) { this.onEnter(mView, fdsts); }
        }
    }
    return Draw;
});
