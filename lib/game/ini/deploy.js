/*global Crafty*/
let C = Crafty;
C.c("Unit", {
  required: "VUES, WebGL, Mar",
  init: function () {
    let v = this.v;
    let wx = (1 / 16 * 100);
    let gh = (v.gap + 14) / 8;
    let c = this.__c;
    let y = c["1Row"] ? 0 : c["2Row"] ? 1 : c["3Row"] ? 2 : c["4Row"] ? 3 : c["5Row"] ? 4 : c["6Row"] ? 5 : c["7Row"] ? 6 : 7;
    this.vues({
      x: 0,
      y: wx * (v.top + 2 + (gh * y) - 0.25), //+ 0.5
      wy: 1,
      w: wx * 4,
      h: wx * 8,
      wh: 1
    });
  },
});
C.c("ORB", {
  required: "VUES, WebGL, Mar, FX",
  init: function () {
    let v = this.v;
    let wx = (1 / 16 * 100);
    let gh = (v.gap + 14) / 8;
    let c = this.__c;
    let y = c["1Row"] ? 0 : c["2Row"] ? 1 : c["3Row"] ? 2 : c["4Row"] ? 3 : c["5Row"] ? 4 : c["6Row"] ? 5 : c["7Row"] ? 6 : 7;
    this.vues({
      x: c["FLIP"] ? wx * 3 : wx * 0.2,
      y: wx * (v.top + 2 + (gh * y) + 7), //7.75
      wy: 1,
      w: wx * 1,
      h: wx * 1,
      wh: 1
    });
  },
});
C.c("CW", {
  required: "Rotate"
});
C.c("CCW", {
  required: "Rotate"
});
C.c("Rotate", {
  init: function () {
    let v = this.__c["CW"] ? 1 : -1;
    let e = this;
    let fx = 5;
    let prop = "rotation";
    let cFun = function (cArg) {
      cArg.cba[prop] = e[prop];
      cArg.cba.fx[fx].count = cArg.cba.fx[fx].duration;
    };
    let f = {
      e: e,
      fx: fx,
      now: 1,
      dur: 150,
      v: v,
      amt: 360,
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
    e.rotate = true;
  },
});
C.c("Pulse", {
  init: function () {
    let e = this;
    let fx = 3;
    let prop = "alpha";
    let cFun = function (cArg) {
      cArg.cba.fx[fx].valence = cArg.cba.fx[fx].valence * -1;
      cArg.cba.fx[fx].start = cArg.cba.alpha;
      cArg.cba.fx[fx].count = cArg.cba.fx[fx].duration;
    };
    let f = {
      e: e,
      fx: fx,
      now: 1,
      dur: 50,
      v: -1,
      amt: 0.9,
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
    e.pulse = true;
  },
  remove: function () {
    this.fx[3] = {};
    this.removeComponent("3fx");
  },
});
C.c("Via", {
  required: "VUES, WebGL, Mar",
  init: function () {
    let v = this.v;
    let wx = (1 / 16 * 100);
    let gh = (v.gap + 14) / 8;
    let c = this.__c;
    let y = c["1Row"] ? 0 : c["2Row"] ? 1 : c["3Row"] ? 2 : c["4Row"] ? 3 : c["5Row"] ? 4 : c["6Row"] ? 5 : c["7Row"] ? 6 : 7;
    this.vues({
      x: 0,
      y: wx * (v.top + 2 + (gh * y) + 6.75), //7.5
      wy: 1,
      w: wx * 4,
      h: wx * 4, //1.25
      wh: 1
    });
  },
});
C.c("Hpbar", {
  required: "VUES, WebGL, Mar",
  init: function () {
    let v = this.v;
    let wx = (1 / 16 * 100);
    let gh = (v.gap + 14) / 8;
    let c = this.__c;
    let y = c["1Row"] ? 0 : c["2Row"] ? 1 : c["3Row"] ? 2 : c["4Row"] ? 3 : c["5Row"] ? 4 : c["6Row"] ? 5 : c["7Row"] ? 6 : 7;
    this.vues({
      x: 0,
      y: wx * (v.top + 2 + (gh * y) + 8), //8.75
      wy: 1,
      w: wx * 4,
      h: wx * 0.25,
      wh: 1
    });
  },
});
C.c("DEPLOY", {
  required: "FX, HOVER",
  init: function () {
    this.addComponent("Op0").addComponent("Op");
    let fx = 1; //1:deploy ? 
    let prop = "alpha";
    let cFun = function (cArg) {
      cArg.cba.removeComponent("Op0").removeComponent("Op").removeComponent("DEPLOY");
      cArg.cba.removeComponent(cArg.fx + "fx");
      cArg.cba.fx[cArg.fx] = {};
    };
    let self = this;
    let f = {
      e: self,
      fx: fx,
      now: 1,
      dur: 100, //TODO unit.spd + 50 etc
      v: 1,
      amt: 1,
      start: self[prop],
      ease: 0,
      prop: prop,
      cFun: cFun,
      cArg: {
        cba: self,
        fx: fx
      }
    };
    this.addFX(f);
  },
});
C.c("DEPLOYING", {
  required: "FX",
  init: function () {
    let fx = 9;
    let cFun = function (cArg) {
      //TODO: handle tank tower movable ready here etc
      cArg.cba.removeComponent("DEPLOYING");
      if (cArg.cba.__c["TANK"]) {
        cArg.cba.addComponent("MOVABLE");
      }
      if (cArg.cba.__c["URGENCY"]) {
        cArg.cba.addComponent("READY");
      } else {
        cArg.cba.addComponent("COOLDOWN");
      }
      //...addComponent("MOVABLE");
      //C.log(cArg.cba.db);
      //TODO: perhaps add Tower|Tank instead of ready?
      //@_UREADY + Tower|Tank => coolingDown|seekingTarget, +move|edge(if Tank)?
      //OR if u.__c["FIRSTSTRIKE"] -> u.addComponent(TARGETREADY)
      //else u.addComponent("COOLDOWN") -> 
      //@[c]CoolDown.init() -> dur = u.db.u.dur etc
      //@cFun -> u.addComponent(READY)
      cArg.cba.removeComponent(cArg.fx + "fx");
      cArg.cba.fx[cArg.fx] = {};
    };
    let self = this;
    let f = {
      e: self,
      fx: fx,
      now: 1,
      dur: 100,
      v: 0,
      amt: 0,
      start: 0,
      ease: 0,
      prop: 0,
      cFun: cFun,
      cArg: {
        cba: self,
        fx: fx
      }
    };
    this.addFX(f);
  },
});
C.c("HOVER", {
  required: "FX",
  init: function () {
    let iAmt = this.vuW(1 / 16 * 100);
    let amt = iAmt * 0.5 >> 0;
    let fx = 2; //2:hover ? 
    let prop = "y";
    let cFun = function (cArg) {
      cArg.cba["fx"][fx].valence = cArg.cba["fx"][fx].valence * -1;
      cArg.cba["fx"][fx].start = cArg.cba.y;
      cArg.cba["fx"][fx].count = cArg.cba["fx"][fx].duration;
    };
    let self = this;
    let f = {
      e: self,
      fx: fx,
      now: 1,
      dur: 50,
      v: -1,
      amt: amt,
      start: self[prop],
      ease: 0,
      prop: prop,
      cFun: cFun,
      cArg: {
        cba: self,
        fx: fx
      }
    };
    this.addFX(f);
  },
  remove: function () {
    this.fx[2] = {};
    this.removeComponent("2fx");
  },
});