/*global Crafty*/
let C = Crafty;
C.s("_PDRAW", {
  init: function () {
    let pau = C("1P PAU").get(0);
    this.pau = pau[0];
  },
  update: function () {
    let c = "PDRAW";
    let pQ = C(c).get();
    if (pQ.length) {
      for (let i = pQ.length - 1; i >= 0; i--) {
        let p = pQ[i];
        p.removeComponent(c);
        this.pDraw(p);
      }
    } else {
      return;
    }
  },
  pDraw: function (p) {
    let pau = C(this.pau);
    let db = pau.__c["_PRI"] ? pau.db.alt : pau.db.ult;
    let perc = (db.req - db.count) / db.req;
    let pW = p.vuW((1 / 16) * 100 * 2);//4.5 //3
    let pDraw = pW * perc;
    let amt = pDraw - p.w;
    this.pfx(p, amt);
  },
  pfx: function (p, amt) {
    let fx = 9; //11
    let prop = "w";
    let cFun = function (cArg) {
      cArg.cba.removeComponent(cArg.fx + "fx");
      cArg.cba.fx[cArg.fx] = {};
    };
    let f = {
      e: p,
      fx: fx,
      now: 1,
      dur: 25,
      v: 1,
      amt: amt,
      start: p[prop],
      ease: 0,
      prop: prop,
      cFun: cFun,
      cArg: {
        cba: p,
        fx: fx
      }
    };
    p.addFX(f);
  },
}, true);
C.s("_POTENTIAL", {
  init: function () {
    let abar = C("1P ALTBAR").get(0);
    let ubar = C("1P ULTBAR").get(0);
    this.abar = abar[0];
    this.ubar = ubar[0];
  },
  update: function () {
    let pQ = C("Potential").get();
    if (pQ.length) {
      for (let i = pQ.length - 1; i >= 0; i--) {
        let p = pQ[i];
        this.potential(p);
      }
    } else {
      return;
    }
  },
  potential: function (p) {
    let c = p.__c;
    if (c["PRIEXIT"]) {
      p.removeComponent("_PRI").removeComponent("PRIEXIT").addComponent("_ALT");
      if (c["1P"]) {
        let aIcon = C("_ALT Blk").get(0);
        aIcon.removeComponent("Op0").removeComponent("Op").addComponent("Op10").addComponent("Op");
        C.s("_INPUTS").vNote("ALTERNATE TRAITS <br> AVAILABLE!"); //TODO: own comp?
      } else {
        C.log("2P Alt available!");
      }
    }
    let db = c["_PRI"] ? p.db.alt : p.db.ult;
    db.count--;
    if (db.count < 1) {
      if (c["_PRI"]) {
        p.addComponent("PRIEXIT");
      } else {
        p.removeComponent("_ALT").addComponent("_ULT").removeComponent("Potential");
        if (p.__c["1P"]) {
          let uIcon = C("_ULT Blk").get(0);
          uIcon.removeComponent("Op0").removeComponent("Op").addComponent("Op10").addComponent("Op");
          C.s("_INPUTS").vNote("ULTIMATE TRAITS <br> UNLOCKED!"); //TODO: own comp?
        } else {
          C.log("2P Ult available!");
        }
      }
    }
    if (p.__c["1P"]) {
      let c = "PDRAW";
      let pbar = p.__c["_PRI"] ? this.abar : this.ubar;
      C(pbar).addComponent(c);
    }
  }
}, true);