define(function() {
    class Unit {
        constructor() {
            this.name = "Unit";
            this.modules = null;
            this.mControls = 0;
            this.mCards = 0;
            this.mModel = 0;
            this.mTier = 0;
            this.mLevel = 0;
            this.mDeployed = 0;
            this.mUnits = 0;
            this.mPos = 0;
            this.mPosX = 0;
            this.mPosY = 0;
            this.mPosR = 0;
            this.mPosV = 0;
            //this.mPosU = 0;
            this.mPosO = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mControls = this.moduleID("Controls");
            this.mCards = this.moduleID("Cards");
            this.mModel = this.moduleID("Model");
            this.mTier = this.moduleID("Tier");
            this.mLevel = this.moduleID("Level");
            this.mDeployed = this.moduleID("Deployed");
            this.mUnits = this.moduleID("Units");
            this.mPos = this.moduleID("Pos");
            this.mPosX = this.moduleID("PosX");
            this.mPosY = this.moduleID("PosY");
            this.mPosR = this.moduleID("PosR");
            this.mPosV = this.moduleID("PosV");
            //this.mPosU = this.moduleID("PosU");
            this.mPosO = this.moduleID("PosO");
            this.isReady = true;
        }
        moduleID(mID) {
            for (var id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        onUnit(player, u) {
            if (typeof this.modules[this.mControls].search(u) === "undefined") { return; }
            else { this.preSpawn(player, u); }
        }
        preSpawn(player, u) {
            var mDeployed = this.mDeployed;
            var launch = this.modules[mDeployed].search(player); //cell, hPos, cNum, side, tick, nuid
            var cell = launch.cell;
            var cNum = launch.cnum;
            var nuID = launch.nuid;
            var perCell = this.perCell(cell, player);
            var uNum = this.modules[this.mCards].search(cNum);
            var model = this.modules[this.mModel].search(cNum);
            var tier = this.modules[this.mTier].search(cNum);
            var level = this.modules[this.mLevel].search(cNum);
            this.modules[this.mUnits].add(nuID, uNum);
            this.modules[this.mModel].add(nuID, model);
            this.modules[this.mTier].add(nuID, tier);
            this.modules[this.mLevel].add(nuID, level);
            //this.modules[this.mBoard].add(cell, nuID),
            //this.modules[this.mPos].add(nuID, cell),
            this.modules[this.mPosX].add(nuID, perCell[0]); //%
            this.modules[this.mPosY].add(nuID, perCell[1]); //vh
            this.modules[this.mPosR].add(nuID, perCell[2]); //rem
            this.modules[this.mPosV].add(nuID, 100); //%
            //this.modules[this.mPosU].add(nuID, nuID);
            //this.modules[this.mPosO].add(nuID, 1);//o0o99
            //this.modules[mDeployed].remove(player); //remove hub trigger
            this.modules[this.mControls].remove(u); //remove unit trigger
            this.modules[this.mControls].add(player + 6, 1); //add spawn trigger
        }
        perCell(cell, player) {
            var onCell;
            switch (cell) {
                case (100):
                case (200):
                    onCell = [player === 1 ? 0 : 66, 3, .4];
                    break;
                case (110):
                case (210):
                    onCell = [player === 1 ? 0 : 66, 3.25, .7];
                    break;
                case (120):
                case (220):
                    onCell = [player === 1 ? 0 : 66, 3.5, 1];
                    break;
            }
            return onCell;
        }
        update(sts) {
            this.onUnit(1, 5);
            this.onUnit(2, 6);
        }
    }
    return Unit;
});
