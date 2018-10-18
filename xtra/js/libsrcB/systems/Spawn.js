define(["cs/core/Eid"], function(Eid) {
    class Spawn {
        constructor() {
            this.name = "Spawn";
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
            this.mView = 0;
            this.mKind = 0;
            this.mXid = 0;
            this.mXone = 0;
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
            this.mView = this.moduleID("View");
            this.mKind = this.moduleID("Kind");
            this.mXid = this.moduleID("Xid");
            this.mXone = this.moduleID("Xone");
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
            var launch = this.modules[this.mDeployed].search(player); //cell, hPos, cNum, side, tick, nuid
            this.spawn(player, launch.cell, launch.cnum, launch.nuid);
            this.modules[this.mDeployed].remove(player); //remove hub trigger
            this.modules[this.mControls].remove(u); //remove spawn trigger 
        }
        spawn(player, cell, cNum, nuID, u) {
            var iID = "u-" + nuID; //perUnit[0];
            var hUnit = document.getElementById("h-unit");
            var iClone = hUnit.cloneNode(true);
            var iSide = iClone.children[1];
            var iPosX = iClone.children[2].children[0].children[0];
            var iShort = iClone.children[2].children[0].children[1];
            var iLong = iShort.children[0].children[1].children[0].children[0].children[0];
            var iPosV = iLong.children[2].children[1].children[0].children[0];
            var iPosU = iShort.children[1].children[1].children[0];
            var uSize = +cell.toString().substr(-2, 1);
            var uDepth = uSize === 0 ? 0 : uSize === 1 ? "31.5vh" : "65.25vh";
            var uNum = this.modules[this.mUnits].search(nuID);
            var model = this.modules[this.mModel].search(nuID);
            iClone.id = iID;
            iClone.children[0].style.marginTop = uDepth;
            if (player === 2) {
                iSide.style.width = "50%";
                iSide.style.height = "32vh";
            }
            iPosX.id = iID + "-x";
            iPosX.style.width = this.modules[this.mPosX].search(nuID) + "%";
            iShort.children[0].children[0].id = iID + "-y";
            iShort.children[0].children[0].style.paddingTop = this.modules[this.mPosY].search(nuID) + "vh";
            iShort.children[1].id = iID + "-r";
            iShort.children[1].style.marginTop = this.modules[this.mPosR].search(nuID) + "rem";
            iShort.children[1].children[1].id = iID + "-o";
            iShort.children[1].children[1].children[0].id = iID + "-u";
            iLong.children[1].children[1].children[0].textContent = this.modules[this.mLevel].search(nuID);
            iLong.children[2].children[1].children[0].id = iID + "-v";
            iLong.children[2].children[1].children[0].style.width = this.modules[this.mPosV].search(nuID) + "%";
            //(Math.round((85 * .01), 3) + 15) + "%"; //@15% = 0!
            iPosV.classList.add(player === 1 ? "blu" : "red");
            this.getTier(iLong, this.modules[this.mTier].search(nuID));
            iPosU.classList.add("size-" + uSize); //"size-" + 0|1|2
            if (player === 1) iPosU.classList.add("Lside");
            iPosU.style.backgroundImage = "url(/wp-content/uploads/" + "u" + uNum + "m" + model + "pose" + ".png)";
            this.preDraw(10, cell, iClone);
            this.preDraw(11, nuID);
        }
        preDraw(kind, xid, xone) {
            var nuID = this.getEID();
            this.modules[this.mView].add(nuID, nuID);
            this.modules[this.mKind].add(nuID, kind);
            this.modules[this.mXid].add(nuID, xid);
            if (kind === 10) { this.modules[this.mXone].add(nuID, xone); }
        }
        getEID() {
            var eid = new Eid();
            return eid.id;
        }
        getTier(iLong, iTier) {
            switch (true) {
                case (iTier === 1):
                    this.getStars(iLong, 4, 0);
                    break;
                case (iTier === 2):
                    iLong.children[0].children[0].classList.replace("o0", "o99");
                    this.getStars(iLong, 3, 1);
                    break;
                case (iTier === 3):
                    this.getStars(iLong, 1, 0);
                    iLong.children[0].children[0].classList.replace("o0", "o99");
                    this.getStars(iLong, 2, 1);
                    iLong.children[1].children[0].classList.replace("wht", "gry");
                    break;
                case (iTier === 4):
                    this.getStars(iLong, 2, 0);
                    iLong.children[0].children[0].classList.replace("o0", "o99");
                    this.getStars(iLong, 1, 1);
                    iLong.children[1].children[0].classList.replace("wht", "blk");
                    iLong.children[1].children[1].classList.replace("kf", "yf");
                    break;
                case (iTier === 5):
                    this.getStars(iLong, 3, 0);
                    iLong.children[0].children[0].classList.replace("o0", "o99");
                    iLong.children[1].children[0].classList.replace("wht", "ylo");
                    break;
            }
        }
        getStars(iLong, cycles, iNum) {
            for (var i = 0; i < cycles; i++) {
                iLong.children[0].children[iNum].parentNode.removeChild(iLong.children[0].children[iNum]);
            }
        }
        update(sts) {
            this.onUnit(1, 7);
            this.onUnit(2, 8);
        }
    }
    return Spawn;
});
