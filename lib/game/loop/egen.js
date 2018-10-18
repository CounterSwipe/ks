/*global Crafty*/
import round from "/lib/game/util/round.js";
let C = Crafty;
C.s("_EDRAW", {
  init: function () {
    let e = C("1P Energy").get(0);
    this.e = e[0];
  },
  update: function () {
    let c = "EDRAW";
    let eQ = C(c).get();
    if (eQ.length) {
      for (let i = eQ.length - 1; i >= 0; i--) {
        let e = eQ[i];
        e.removeComponent(c);
        this.eDraw(e);
      }
    } else {
      return;
    }
  },
  eDraw: function (e) {
    let eng = C(this.e).db._energy;
    if (e.__c["Ebar"]) {
      let ePerc = eng / 10;
      let eW = e.vuW((1 / 16) * 100 * 8); //10
      let eDraw = eW * ePerc;
      let v = 1;
      let amt = 0;
      if (eDraw < e.w) {
        v = -1;
        amt = e.w - eDraw;
      } else {
        amt = eDraw - e.w;
      }
      this.efx(e, v, amt);
    } else {
      let tx = eng.toFixed(1);
      e.text(tx);
    }
  },
  efx: function (e, v, amt) {
    let fx = 1; //11
    let prop = "w";
    let cFun = function (cArg) {
      cArg.cba.removeComponent(cArg.fx + "fx");
      cArg.cba.fx[cArg.fx] = {};
    };
    let f = {
      e: e,
      fx: fx,
      now: 1,
      dur: 50,
      v: v,
      amt: amt,
      start: e[prop],
      ease: 0,
      prop: prop,
      cFun: cFun,
      cArg: {
        cba: e,
        fx: fx
      }
    };
    e.addFX(f);
  },
}, true);
C.s("_EGEN", {
  init: function () {
    let etx = C("1P Ebox Tx").get(0);
    let ebar = C("1P Ebar").get(0);
    this.e = {
      tx: etx[0],
      bar: ebar[0]
    };
    C("1P Energy").addComponent("eRate1");
    C("2P Energy").addComponent("eRate1");
  },
  update: function () {
    let eQ = C("Energy").get();
    if (eQ.length) {
      for (let i = eQ.length - 1; i >= 0; i--) {
        let e = eQ[i];
        this.egen(e);
      }
    } else {
      return;
    }
  },
  egen: function (e) {
    let db = e.db;
    if (db._energy < 10) {
      let c = e.__c;
      let rate = c["eRate3"] ? 2 : c["eRate2"] ? 1.5 : 1;
      let egen = round(db._energy + (rate * 0.35), 3);
      if (egen >= 10) {
        egen = 10;
      }
      e.db._energy = egen;
      if (c["1P"]) {
        let c = "EDRAW";
        C(this.e.tx).addComponent(c);
        C(this.e.bar).addComponent(c);
      }
    }
  }
}, true);