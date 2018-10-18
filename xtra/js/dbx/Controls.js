define(function() {
    class Controls {
        constructor() {
            this.name = "Controls";
            this.modules = null;
            this.mInputs = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mInputs = this.moduleID("Inputs");
            this.isReady = true;
        }
        clearDir(mInputs) {
            this.modules[mInputs].add(0, 0); //unplugged (status)
            this.modules[mInputs].add(1, 0); //playerInput (dir)
        }
        moduleID(mID) {
            for (var id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) {
                    return id;
                }
            }
        }
        sD(mInputs, dir) {
            this.modules[mInputs].add(4, 1);
        }
        sL(mInputs, dir) {
            this.modules[mInputs].add(3, 1);
        }
        sR(mInputs, dir) {
            this.modules[mInputs].add(5, 1);
        }
        sU(mInputs, dir) {
            this.modules[mInputs].add(6, 1);
        }
        tapL(mInputs, dir) {
            this.modules[mInputs].add(2, 1);
        }
        tapR(mInputs, dir) {
            this.modules[mInputs].add(2, 2);
        }
        update(sts) {
            var mInputs = this.mInputs;
            var dir = this.modules[mInputs].search(1);
            switch (dir) {
                case 0:
                    return;
                case 1:
                    this.tapL(mInputs, dir);
                    break;
                case 2:
                    this.tapR(mInputs, dir);
                    break;
                case 3:
                    this.sU(mInputs, dir);
                    break;
                case 4:
                    this.sR(mInputs, dir);
                    break;
                case 5:
                    this.sD(mInputs, dir);
                    break;
                case 6:
                    this.sL(mInputs, dir);
                    break;
            }
        }
    }
    return Controls;
});
