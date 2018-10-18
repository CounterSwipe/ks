define(["cs/core/Eid"], function(Eid) {
    class Spawn {
        constructor() {
            this.modules = null;
            this.name = "Spawn";
            this.modules = null;
            this.mBoard = 0;
            this.mCards = 0;
            this.mGui = 0;
            this.mInputs = 0;
            this.mView = 0;
            this.num = 0;
            this.isReady = false;
        }
        activate(game) {
            this.modules = game.modules;
            this.mBoard = this.moduleID("Board");
            this.mCards = this.moduleID("Cards");
            this.mGui = this.moduleID("Gui");
            this.mInputs = this.moduleID("Inputs");
            this.mView = this.moduleID("View");
            this.isReady = true;
            //console.log(localStorage); /*global localStorage*/
            //this.setup();
        }
        moduleID(mID) {
            for (var id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) {
                    return id;
                }
            }
        }
        clearTouch(mInputs) {
            console.log("@spawn");
            this.modules[mInputs].remove(10); //p1|2unit
        }
        onEventx(mGui, player, pUnit) {
            var actor = this.getEID();
            var aID = actor.id;
            switch (true) {
                case (aID === 0):
                    this.build(aID, "js-pasteTop1", "0", "0", "topSize", "Lside", "0.4rem", "0", "0", "3vh", "blu");
                    break;
                case (aID === 1):
                    this.build(aID, "js-pasteTop1", "0", "33%", "topSize", "Lside", "0.2rem", "0", "0", "2.5vh", "blu");
                    break;
                case (aID === 2):
                    this.build(aID, "js-pasteTop1", "0", "66%", "topSize", "Lside", "0", "0", "0", "2vh", "blu");
                    break;
                case (aID === 3):
                    this.build(aID, "js-pasteTop2", "0", "0", "topSize", "z", "0", "50%", "32vh", "2vh", "red");
                    break;
                case (aID === 4):
                    this.build(aID, "js-pasteTop2", "0", "33%", "topSize", "z", "0.2rem", "50%", "32vh", "2.5vh", "red");
                    break;
                case (aID === 5):
                    this.build(aID, "js-pasteTop2", "0", "66%", "topSize", "z", "0.4rem", "50%", "32vh", "3vh", "red");
                    break;
                case (aID === 6):
                    this.build(aID, "js-pasteMid1", "31.5vh", "0", "midSize", "Lside", "0.7rem", "0", "0", "3.25vh", "blu");
                    break;
                case (aID === 7):
                    this.build(aID, "js-pasteMid1", "31.5vh", "33%", "midSize", "Lside", "0.5rem", "0", "0", "2.75vh", "blu");
                    break;
                case (aID === 8):
                    this.build(aID, "js-pasteMid1", "31.5vh", "66%", "midSize", "Lside", "0.3rem", "0", "0", "2.25vh", "blu");
                    break;
                case (aID === 9):
                    this.build(aID, "js-pasteMid2", "31.5vh", "0", "midSize", "z", "0.3rem", "50%", "32vh", "2.25vh", "red");
                    break;
                case (aID === 10):
                    this.build(aID, "js-pasteMid2", "31.5vh", "33%", "midSize", "z", "0.5rem", "50%", "32vh", "2.75vh", "red");
                    break;
                case (aID === 11):
                    this.build(aID, "js-pasteMid2", "31.5vh", "66%", "midSize", "z", "0.7rem", "50%", "32vh", "3.25vh", "red");
                    break;
                case (aID === 12):
                    this.build(aID, "js-pasteBtm1", "65.25vh", "0", "btmSize", "Lside", "1rem", "0", "0", "3.5vh", "blu");
                    break;
                case (aID === 13):
                    this.build(aID, "js-pasteBtm1", "65.25vh", "33%", "btmSize", "Lside", "0.8rem", "0", "0", "3vh", "blu");
                    break;
                case (aID === 14):
                    this.build(aID, "js-pasteBtm1", "65.25vh", "66%", "btmSize", "Lside", "0.6rem", "0", "0", "2.5vh", "blu");
                    break;
                case (aID === 15):
                    this.build(aID, "js-pasteBtm2", "65.25vh", "0", "btmSize", "z", "0.6rem", "50%", "32vh", "2.5vh", "red");
                    break;
                case (aID === 16):
                    this.build(aID, "js-pasteBtm2", "65.25vh", "33%", "btmSize", "z", "0.8rem", "50%", "32vh", "3vh", "red");
                    break;
                case (aID === 17):
                    this.build(aID, "js-pasteBtm2", "65.25vh", "66%", "btmSize", "z", "1rem", "50%", "32vh", "3.5vh", "red");
                    break;
            }
            this.clearTouch(this.mInputs);
        }
        onEvent(mGui, player, pUnit) {
            var aID = this.getEID();
            switch (true) {
                case (player === 1):
                    this.build(aID, "js-pasteMid1", "31.5vh", "0", "midSize", "Lside", "0.7rem", "0", "0", "3.25vh", "blu");
                    break;
                case (player === 2):
                    this.build(aID, "js-pasteMid2", "31.5vh", "0", "midSize", "z", "0.3rem", "50%", "32vh", "2.25vh", "red");
                    break;
            }
        }
        build(aID, iPaste, iDepth, iWidth, iSize, iSide, iMartop, iSideW, iSideH, iPad, iColor) {
            //console.log("@Actor", aID, iWidth, iMartop, iPad);
            //this.modules[this.mView].add(aID, aID); //add(aID, jID)
            var jID = "js-" + aID;
            var jUnit = document.getElementById("js-unit");
            //var jPaste = document.getElementById(iPaste);
            var jClone = jUnit.cloneNode(true);
            jClone.id = jID;
            jClone.children[2].children[0].children[0].id = jID + "-width"; //position
            var jShort = jClone.children[2].children[0].children[1];
            jShort.children[1].id = jID + "-martop"; //pad upose
            jShort.children[0].children[0].id = jID + "-pad"; // pad resbar
            jShort.children[1].children[0].children[0].id = jID + "-uPose"; //upose
            var jLong = jShort.children[0].children[1].children[0].children[0].children[0];
            var jPaste = document.getElementById(iPaste);
            var jFx = jClone.children[2].children[0].id = jID + "-fx";
            var jsPose = jID + "-uPose";
            //var jShort = jClone.children[2].children[0].children[1];
            //var jLong = jShort.children[0].children[1].children[0].children[0].children[0];
            jLong.children[0].children[0].parentNode.removeChild(jLong.children[0].children[0]);
            jLong.children[0].children[0].parentNode.removeChild(jLong.children[0].children[0]);
            jLong.children[0].children[0].parentNode.removeChild(jLong.children[0].children[0]);
            //*[@id="js-33"]/div[3]/div
            //jLong.children[0].children[0].id = actorId + "-star1";
            //jLong.children[0].children[1].id = actorId + "-star2";
            //jLong.children[0].children[2].id = actorId + "-star3";
            //jLong.children[0].children[3].id = actorId + "-star4";
            jLong.children[2].children[1].children[0].id = jID + "-resbar"; //resbar
            //jLong.children[0].children[0].parentNode.removeChild(jLong.children[0].children[0]);
            //jLong.children[0].children[0].parentNode.removeChild(jLong.children[0].children[0]);
            //jLong.children[0].children[0].parentNode.removeChild(jLong.children[0].children[0]);
            //var jDepth = jClone.children[0];
            jClone.children[0].id = jID + "-D";
            //var jMartop = jShort.children[1];
            jShort.children[1].id = jID + "-M";
            jClone.children[1].id = jID + "-side";
            //var jSide = jClone.children[1];
            jClone.children[2].children[0].children[0].id = jID + "-W";
            //var jWidth = jClone.children[2].children[0].children[0];
            //var jPose = jShort.children[1].children[0].children[0];
            //var jPad = jShort.children[0].children[0];
            //var jStar = jLong.children[0].children[0]; //dynamic per removeChild
            //var jBox = jLong.children[1].children[0];
            //var jLevel = jLong.children[1].children[1].children[0];
            //var jRescolor = jLong.children[2].children[1].children[0].children[0];
            //var jResbar = jLong.children[2].children[1].children[0];
            //var resWidth = (Math.round((85 * .01), 3) + 15) + "%"; //@15% = 0
            //jDepth.style.marginTop = iDepth;
            //jMartop.style.marginTop = iMartop;
            this.nuM(jID + "-D", iDepth);
            this.nuM(jID + "-M", iMartop);
            this.nuW(jID + "-W", iWidth);
            //jWidth.style.width = iWidth;
            //jPose.classList.add(iSize);
            //jPose.classList.add(iSide);
            //jPose.classList.add("ecpose1");
            //jSide.style.width = iSideW;
            this.nuW(jID + "-side", iSideW);
            this.nuHeight(jID + "-side", iSideH);
            //jSide.style.height = iSideH;
            this.nuPad(jID + "-pad", iPad);
            //jPad.style.paddingTop = iPad;
            //jStar.classList.replace("o0", "o99");
            //jBox.classList.add("wht");
            //jLevel.textContent = "22";
            //jResbar.style.width = resWidth;
            //jRescolor.classList.add(iColor);
            //jPaste.appendChild(jClone);
            //console.log(jClone);
            //console.log(jClone.children);
            //var jPose = jShort.children[1].children[0].children[0];
            jLong.children[0].children[0].id = jID + "-star"; //dynamic per removeChild
            //var jStar = jLong.children[0].children[0]; //dynamic per removeChild
            jLong.children[1].children[0].id = jID + "-box";
            //var jBox = jLong.children[1].children[0];
            jLong.children[1].children[1].children[0].id = jID + "-level";
            //var jLevel = jLong.children[1].children[1].children[0];
            jLong.children[2].children[1].children[0].children[0].id = jID + "-rescolor";
            //var jRescolor = jLong.children[2].children[1].children[0].children[0];
            jLong.children[2].children[1].children[0].id = jID + "-rwidth";
            //var jResbar = jLong.children[2].children[1].children[0];
            var resWidth = (Math.round((85 * .01), 3) + 15) + "%"; //@15% = 0
            //jPose.classList.add(iSize);
            //jPose.classList.add(iSide);
            //jPose.classList.add("ecpose1");
            //jBox.classList.add("wht");
            //jLevel.textContent = "22";
            //jResbar.style.width = resWidth;
            //jRescolor.classList.add(iColor);
            //jStar.classList.replace("o0", "o99");
            jPaste.appendChild(jClone);
            //document.getElementById(jFx).classList.replace("o0", "o99");
            this.nuExit(jsPose, iSize);
            this.nuExit(jsPose, iSide);
            this.nuExit(jsPose, "ecpose1");
            this.nuExit(jID + "-box", "wht");
            this.nuTx(jID + "-level", "27");
            this.nuW(jID + "-rwidth", resWidth);
            this.nuExit(jID + "-rescolor", iColor);
            this.onExit(jID + "-star");
            this.onExit(jFx);
            this.clearTouch(this.mInputs);
            //console.log(jClone);
            //console.log(jClone.children);
        }
        nuM(jsID, nuMar) {
            var vID = this.getEID();
            var draw = { id: vID, jsID: jsID, nuMar: nuMar, vDraw: 7 };
            this.modules[this.mView].add(vID, draw);
        }
        nuHeight(jsID, nuH) {
            var vID = this.getEID();
            var draw = { id: vID, jsID: jsID, nuH: nuH, vDraw: 6 };
            this.modules[this.mView].add(vID, draw);
        }
        nuW(jsID, nuW) {
            var vID = this.getEID();
            var draw = { id: vID, jsID: jsID, nuWidth: nuW, vDraw: 2 };
            this.modules[this.mView].add(vID, draw);
        }
        nuPad(jsID, nuPad) {
            var vID = this.getEID();
            var draw = { id: vID, jsID: jsID, nuPad: nuPad, vDraw: 1 };
            this.modules[this.mView].add(vID, draw);
        }
        nuExit(jsID, nuClass) {
            var vID = this.getEID();
            var draw = { id: vID, jsID: jsID, nuClass: nuClass, vDraw: 5 };
            //console.log(draw);
            this.modules[this.mView].add(vID, draw);
        }
        nuTx(jsID, nuText) {
            var vID = this.getEID();
            var draw = { id: vID, jsID: jsID, nuText: nuText, vDraw: 4 };
            this.modules[this.mView].add(vID, draw);
        }
        onExit(jFx) {
            var vID = this.getEID();
            var draw = { id: vID, jsID: jFx, offClass: "o0", onClass: "o99", vDraw: 0 };
            this.modules[this.mView].add(vID, draw);
        }
        getEID() {
            var eid = new Eid();
            return eid.id;
        }
        onEnter(iNum, player) { if (typeof this.modules[this.mInputs].search(iNum) === "number") this.onEvent(this.mGui, player, this.modules[this.mInputs].search(iNum)) }
        update(sts) {
            this.onEnter(10, 1);
            this.onEnter(10, 2);
        }
    }
    return Spawn;
});
