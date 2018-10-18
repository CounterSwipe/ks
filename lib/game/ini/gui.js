/*global Crafty*/
let C = Crafty;
C.s("_GUI", {
  init: function () {
    /*let y = -7;
      for (let i = 0; i < 8; i++) {
      C.e("TEST1, VUES, DOM").vues({
        x: (1 / 16 * 100) * -4,
        y: (1 / 16 * 100) * y,
        wy: 1,
        w: (1 / 16 * 100) * 22,
        h: (1 / 16 * 100) * 20,
        wh: 1
      });
      y += 1.8;
      }
    */
    this.dragBoxes();
    this.tapBoxes();
    this.setBtns();

  },
  dragBoxes: function () {
    C.e("0BTN");
    //TODO: add label text: Dual|Triple|Tower|Tank etc
    for (let i = 5; i < 12; i++) {
      C.e(i + "DRAG, WebGL, " + i + "BTN, DragBox");
      C.e(i + "DRAG, DOM, Dragon, DragBox");
      C.e(i + "PIN, DOM, PIN");
    }
  },
  tapBoxes: function () {
    for (let i = 1; i < 5; i++) {
      C.e("1P, " + i + "Box, Box, " + i + "BTN, BTN, Trq, Op3, Op");
    }
  },
  setBtns: function () {
    let tLen = C("SETTINGS").get(0).db.tMax + 1;
    for (let pos = 1; pos < tLen; pos++) {
      let t = C(pos + "T").get(0).db;
      this.setBtn(t, pos);
    }
  },
  setBtn: function (t, pos) {
    for (let aNum = 1; aNum < 4; aNum++) {
      //this.setAction(t, pos, aNum);
      let card = C.e("1P, STATE, " + pos + "Box, Box, Mar48, Rnd3, Rnd, Op3, Op, Prp, PRI"); //rarityColor
      card.db.y = card.y;

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