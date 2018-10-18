/*global Crafty*/
let C = Crafty;
C.s("_SLIDEUP", {
  init: function () {},
  update: function (dt) {
    let c = "SLIDEUP";
    let eQ = C(c).get();
    if (eQ.length) {
      for (let i = eQ.length - 1; i >= 0; i--) {
        let e = eQ[i];
        this.slideUp(e, dt);
      }
    } else {
      return;
    }
  },
  slideUp: function (e, dt) {
    let spd = e.db.spd;
    e.y = e.y - spd * (dt / 1000);
    C.log(spd, dt, e.y - spd * (dt / 1000));

  },
}, true);
C.s("_MOVABLE", {
  init: function () {},
  update: function () {
    //TODO: MOVABLE ONLY? no u?
    let c = "MOVABLE U"; //NOTE: "READY" before "U"
    let uQ = C(c).get();
    if (uQ.length) {
      for (let i = uQ.length - 1; i >= 0; i--) {
        let u = uQ[i];
        this.movable(u);
      }
    } else {
      return;
    }
  },
  uReady: function (u) {
    if (u.__c["TARGETABLE"]) {
      this.handle(u);
    } else {
      //TODO: check if not targetable      
      if (u.db.target) {
        this.handle(u);
      } else {
        u.addComponent("TARGETABLE");
        this.handle(u);
      }
    }
  },
  movable: function (u) {
    let range = u.db.range;
    let p = u.db.d.p;
    let dir = u.db.area.dir;
    //let row = u.db.area.row;
    let cNum = dir === 1 ? range[1] + 1 : range[0] - 1;
    if (C(cNum + "CELL").get(0)) {
      let cell = C(cNum + "CELL").get(0);
      if (!cell.__c["RESERVED"]) {
        cell.addComponent("RESERVED").addComponent("P" + p);
        u.db.area.cNum = cNum;
        //
        //u.db.u._hpDmg += 2.5;
        //u.addComponent("HPDMG");
        //
        u.removeComponent("MOVABLE").addComponent("MOVING");
      } else {
        //
      }
    } else {
      u.removeComponent("MOVABLE").addComponent("EDGE");
    }
  },
  flipped: function (u) {
    let i = C(u.db.key.i);
    if (u.db.area.dir === 1) {
      i.unflip("X");
    } else {
      i.flip("X");
    }
  },
}, true);
C.c("OpDelay", {
  init: function () {
    let e = this;
    let fx = 7;
    let cFun = function (cArg) {
      cArg.cba.removeComponent("Op3").removeComponent("Op");
      cArg.cba.alpha = 1;
    };
    let f = {
      e: e,
      fx: fx,
      now: 1,
      dur: 25,
      v: 0,
      amt: 0,
      start: 0,
      ease: 0,
      prop: 0,
      cFun: cFun,
      cArg: {
        cba: e,
        fx: fx
      }
    };
    e.addFX(f);
  },
  remove: function () {
    this.fx[7] = {};
    this.removeComponent("7fx");
  },
});
C.c("OrbX", {
  init: function () {
    let e = this;
    let fx = 6;
    let prop = "x";
    let cFun = function (cArg) {
      cArg.cba.destroy();
    };
    let side = this.__c["1P"] ? 1 : 2;
    let amt = side === 1 ? (this.x + this.w) : this.vuW(100) - this.x;
    let f = {
      e: e,
      fx: fx,
      now: 1,
      dur: 50,
      v: side === 1 ? -1 : 1,
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
  remove: function () {
    this.fx[6] = {};
    this.removeComponent("6fx");
  },
});
C.c("OrbY", {
  init: function () {
    let e = this;
    let fx = 3;
    let prop = "y";
    let cFun = function (cArg) {
      cArg.cba.destroy();
    };
    let amt = (this.y + this.h);
    let f = {
      e: e,
      fx: fx,
      now: 1,
      dur: 50,
      v: -1,
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
  remove: function () {
    this.fx[3] = {};
    this.removeComponent("3fx");
  },
});
C.c("MOVING", {
  init: function () {
    if (!this.db.move.count) {
      let ease = ["None", "In", "Out"];
      let db = this.db;
      let kids = [db.key.g, db.key.h, db.key.i, db.key.v];
      if (db.key.o) {
        kids.push(db.key.o);
      }
      let start = [];
      for (let j = 0, jLen = kids.length; j < jLen; j++) {
        start.push(C(kids[j]).x);
      }
      let amt = C(kids[0]).vuW(1 / 8 * 100);
      let move = {
        kids: kids,
        count: db[1].vals[4],
        duration: db[1].vals[4],
        valence: db.area.dir,
        amount: amt,
        start: start,
        ease: "ease" + ease[0],
      };
      this.db.move = move;
    }
  }
});