/*global Crafty*/
let C = Crafty;
C.s("_GUI", {
  init: function () {
    this.dragBoxes();
    this.tapBoxes();
    this.setBtns();
  },
  dragBoxes: function () {
    C.e("0BTN");
    for (let i = 5; i < 11; i++) {
      C.e(i + "DRAG, WebGL, " + i + "BTN, DragBox");
      C.e(i + "DRAG, DOM, Dragon, DragBox");
      C.e(i + "PIN, DOM, PIN");
    }
  },
  tapBoxes: function () {
    for (let i = 1; i < 5; i++) {
      C.e("1P, " + i + "Box, Box, " + i + "BTN, BTN");
    }
  },
  setBtns: function () {
    for (let pos = 1; pos < 5; pos++) {
      let t = C(pos + "T").get(0).db;
      this.setBtn(t, pos);
    }
  },
  setBtn: function (t, pos) {
    for (let aNum = 1; aNum < 4; aNum++) {
      this.setAction(t, pos, aNum);
    }
    C.e("1P, FX, " + pos + "Box, Box, Cover, BtnReady");
    //C.e("1P, FX, " + pos + "Box, Box, Cover, BtnReady, BtnBusy");
  },
  setAction: function (t, pos, aNum) {
    let action = t[aNum];
    let ss = t.ss[aNum];
    let r = t.r;
    let cost = action.vals[2];
    let orb = action.vals[9];
    let color = ["Blk", "Grn", "Trq", "Prp", "Ylo"]; //Gry
    let grd = color[r];
    let status = aNum === 1 ? "PRI" : aNum === 2 ? "ALT, OpOff" : aNum === 3 ? "ULT, OpOff" : C.log("error@btns");
    C.e("1P, STATE, " + pos + "Box, Box, Mar48, Rnd3, Rnd, Op3, Op, " + grd + ", " + status); //rarityColor
    C.e("1P, STATE, " + pos + "Box, Box, Mar51, Rnd3, Rnd, " + status + ", " + grd); //rarityColor
    C.e("1P, STATE, Mar, " + ss + ",  " + pos + "Box, Box, DOM, " + status); //cardSS
    if (orb) {
      for (let i = 0; i < orb; i++) {
        C.e("1P, STATE, " + pos + "Box, Box, p1Orb" + orb + ", OrbBg, " + status + ", " + grd);
      }
    }
    C.e("1P, STATE, " + pos + "Box, Box, CostBg, " + status);
    C.e("1P, STATE, " + pos + "Box, Box, CostTx, " + status).tx({
      fS: 0.75,
      tx: cost.toFixed(1)
    });
  },
}, true);