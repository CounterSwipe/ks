/*global Crafty*/
let C = Crafty;
C.s("_LAUNCHED", {
  init: function () {},
  update: function () {
    let c = "LAUNCH";
    let mQ = C(c).get();
    if (mQ.length) {
      for (let i = mQ.length - 1; i >= 0; i--) {
        let m = mQ[i];
        this.launch(m);
      }
    } else {
      return;
    }
  },
  launch: function (m) {
    let db = m.db;
    let itarget = C(db.itarget);
    let x = itarget.x + (itarget.w * 0.5);
    let mx = m.x + (m.w * 0.5);
    if (db.dir === 1) {
      if (mx >= x) {
        C.log("hit!");
        let u = C(db.utarget);
        u.db.u._hpDmg += 10;
        u.addComponent("HPDMG");
        m.removeComponent("LAUNCH").addComponent("EXPLODE");
      } else {
        return;
      }
    } else {
      if (mx <= x) {
        C.log("hit!");
        let u = C(db.utarget);
        u.db.u._hpDmg += 10;
        u.addComponent("HPDMG");
        m.removeComponent("LAUNCH").addComponent("EXPLODE");
      } else {
        return;
      }
    }

  },
}, true);

C.c("EXPLODE", {
  required: "FX",
  init: function () {
    //this.launchX(this.db.amtX, this.db.dirX);
    //this.launchY(this.db.amtY, this.db.dirY);
    let w = this.w;
    this.explodeX(w * 0.5, -1);
    this.explodeY(w * 0.5, -1);
    this.explodeW(w * 2, 1);
    this.explodeH(w * 2, 1);
    this.explodeA(1, -1);
  },
  explodeX: function (a, v) {
    let e = this;
    let fx = 4;
    let prop = "x";
    let cFun = function (cArg) {
      //cArg.cba.destroy();
      cArg.cba.removeComponent(cArg.fx + "fx");
      cArg.cba.fx[cArg.fx] = {};
    };
    //let side = this.__c["1P"] ? 1 : 2;
    //let amt = side === 1 ? (this.x + this.w) : this.vuW(100) - this.x;
    let f = {
      e: e,
      fx: fx,
      now: 1,
      dur: 100,
      v: v, //side === 1 ? -1 : 1,
      amt: a,
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
  explodeY: function (a, v) {
    let e = this;
    let fx = 5;
    let prop = "y";
    let cFun = function (cArg) {
      //cArg.cba.destroy();
      cArg.cba.removeComponent(cArg.fx + "fx");
      cArg.cba.fx[cArg.fx] = {};
    };
    //let amt = (this.y + this.h);
    let f = {
      e: e,
      fx: fx,
      now: 1,
      dur: 100,
      v: a,
      amt: v,
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
  explodeW: function (a, v) {
    let e = this;
    let fx = 6;
    let prop = "w";
    let cFun = function (cArg) {
      //cArg.cba.destroy();
      cArg.cba.removeComponent(cArg.fx + "fx");
      cArg.cba.fx[cArg.fx] = {};
    };
    //let side = this.__c["1P"] ? 1 : 2;
    //let amt = side === 1 ? (this.x + this.w) : this.vuW(100) - this.x;
    let f = {
      e: e,
      fx: fx,
      now: 1,
      dur: 100,
      v: v, //side === 1 ? -1 : 1,
      amt: a,
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
  explodeH: function (a, v) {
    let e = this;
    let fx = 7;
    let prop = "h";
    let cFun = function (cArg) {
      //cArg.cba.removeComponent("EXPLODE");
      //cArg.cba.destroy();
      cArg.cba.removeComponent(cArg.fx + "fx");
      cArg.cba.fx[cArg.fx] = {};
    };
    //let side = this.__c["1P"] ? 1 : 2;
    //let amt = side === 1 ? (this.x + this.w) : this.vuW(100) - this.x;
    let f = {
      e: e,
      fx: fx,
      now: 1,
      dur: 100,
      v: v, //side === 1 ? -1 : 1,
      amt: a,
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
  explodeA: function (a, v) {
    let e = this;
    let fx = 8;
    let prop = "alpha";
    let cFun = function (cArg) {
      //cArg.cba.removeComponent("EXPLODE");
      cArg.cba.destroy();
      //cArg.cba.removeComponent(cArg.fx + "fx");
      //cArg.cba.fx[cArg.fx] = {};
    };
    //let side = this.__c["1P"] ? 1 : 2;
    //let amt = side === 1 ? (this.x + this.w) : this.vuW(100) - this.x;
    let f = {
      e: e,
      fx: fx,
      now: 1,
      dur: 100,
      v: v, //side === 1 ? -1 : 1,
      amt: a,
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
  remove: function () {
    //this.destroy();
    //this.fx[2] = {};
    //this.removeComponent("2fx");
  },
});