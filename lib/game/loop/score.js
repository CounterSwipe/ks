/*global Crafty*/
let C = Crafty;
C.s("_SDRAW", {
  init: function () {
    let blu = C("BluBar").get(0);
    let red = C("RedBar").get(0);
    let score = C("Score").get(0);
    let p1now = C("1P pScore sNow").get(0);
    let p2now = C("2P pScore sNow").get(0);
    this.db = {
      blu: blu[0],
      red: red[0],
      score: score[0],
      p1now: p1now[0],
      p2now: p2now[0]
    };
    //score.db._dur2 = 500;
    //score.db._dur3 = 300;
    //score.addComponent("sRate1").addComponent("Countdown");
  },
  update: function () {
    let c = "SDRAW";
    let sQ = C(c).get();
    if (sQ.length) {
      for (let i = sQ.length - 1; i >= 0; i--) {
        let b = sQ[i];
        b.removeComponent(c);
        this.sDraw(b);
      }
    } else {
      return;
    }
  },
  sDraw: function (b) {
    let p = b.__c["BluBar"] ? 1 : 2;
    let s = C(this.db.score).db;
    //let eng = C(this.e).db._energy;
    let max = s._max;
    let orbs = s["_p" + p];
    let perc = orbs / max;
    let sW = b.vuW((1 / 16) * 100 * 14); //10
    let sDraw = sW * perc;
    let amt = sDraw - b.w;
    //C.log(max, orbs, perc, sW, amt);
    this.sfx(b, amt);
    let tx = orbs; //.toFixed(1);
    C(this.db["p" + p + "now"]).text(tx);
    //let score = s.db["_p" + p];
    if (orbs === max) {
      C.e("GAMEOVER");
    }
  },
  sfx: function (b, amt) {
    let fx = 1; //11
    let prop = "w";
    let cFun = function (cArg) {
      cArg.cba.removeComponent(cArg.fx + "fx");
      cArg.cba.fx[cArg.fx] = {};
    };
    let f = {
      e: b,
      fx: fx,
      now: 1,
      dur: 50,
      v: 1,
      amt: amt,
      start: b[prop],
      ease: 0,
      prop: prop,
      cFun: cFun,
      cArg: {
        cba: b,
        fx: fx
      }
    };
    b.addFX(f);
  },
}, true);
C.s("_SCORE", {
  init: function () {
    //let blu = C("BluBar").get(0);
    //let red = C("RedBar").get(0);
    let score = C("Score").get(0);
    let p1 = C("1P pScore sMax").get(0);
    let p2 = C("2P pScore sMax").get(0);
    let max = 100;
    score.db._max = max;
    p1.text("/" + max);
    p2.text("/" + max);
    this.db = {
      //blu: blu[0],
      //red: red[0],
      score: score[0],
      //p1now: p1now[0],
      //p2now: p2now[0]
    };
    //score.db._dur2 = 500;
    //score.db._dur3 = 300;
    //score.addComponent("sRate1").addComponent("Countdown");
  },
  update: function () {
    let c = "ORBSCORE";
    let sQ = C(c).get();
    if (sQ.length) {
      for (let i = sQ.length - 1; i >= 0; i--) {
        let u = sQ[i];
        u.removeComponent(c);
        this.score(u);
      }
    } else {
      return;
    }
  },
  score: function (u) {
    //C.log(s.db);
    let s = C(this.db.score);
    let p = u.db.d.p;
    let orbs = u.db.orbs;
    let max = s.db._max;
    s.db["_p" + p] += orbs;
    let score = s.db["_p" + p];
    if (score > max) {
      s.db["_p" + p] = max;
    }
    this.handleOrbs(u, p);
  },
  scorex: function (s) {
    if (s.__c["TALLY"]) {
      this.tally(s);
    } else {
      this.sDraw(s);
    }
  },
  tally: function (s) {
    //C.log("Tally:", s.db);
    s.removeComponent("TALLY").addComponent("Countdown");
    let red = C(this.db.red);
    let blu = C(this.db.blu);
    let maxW = red.vuW((1 / 16) * 100 * 8);
    blu.x = 0;
    blu.w = maxW;
    red.w = maxW;
    this.orbScore(s);
  },
  orbScore: function (s) {
    //TODO: make into own system!
    for (let i = 1; i < 9; i++) {
      let p = i < 5 ? 2 : 1;
      this.scored(s, p, i);
    }
    let p1 = C(this.db.p1);
    let p2 = C(this.db.p2);
    p1.text("" + s.db._p1 + "");
    p2.text("" + s.db._p2 + "");
  },
  scored: function (s, p, r) {
    let sQ = C(r + "Row " + p + "P U").get(); //TODO add OrbCarry etc
    if (sQ.length) {
      for (let i = sQ.length - 1; i >= 0; i--) {
        let ou = sQ[i];
        this.tallyUp(s, p, ou);
      }
    } else {
      return;
    }
  },
  tallyUp: function (s, p, ou) {
    //TODO filter for not counting u teleport incomplete -> iow those dont count!
    let orbs = ou.db.orbs;
    if (orbs) {
      s.db["_p" + p] += orbs; //TODO:move to orbScore cfun! -> own score tx.update system!
      this.handleOrbs(ou, p);
    } else {
      return; //TODO this not req when filtered for OrbCarry etc
    }
  },
  handleOrbs: function (u, p) {
    let o = u.db.key.o;
    C(o).addComponent(p + "P").addComponent("oScore");
    u.db.key.o = 0;
    u.db.orbs = 0;
    u.addComponent("uDance");
    //TODO: u addComponent(2s timer + dance) -> addComponent(Edge)
  },
  sDrawcd: function (s) {
    if (s.fx[5]) {
      let count = s.fx[5].count;
      let dur = s.fx[5].duration;
      let perc = count / dur;
      let red = C(this.db.red);
      let blu = C(this.db.blu);
      let maxW = red.vuW((1 / 16) * 100 * 8);
      let nuW = maxW * perc;
      let nuX = maxW - nuW;
      blu.x = nuX >> 0;
      blu.w = nuW >> 0;
      red.w = nuW >> 0;
    }
  },
}, true);
C.c("GAMEOVER", {
  required: "FX",
  init: function () {
    //TODO: change this & countdown to 1s update count-- -> doesnt need to be every tick@vfx!
    //let p = this.__c["1P"] ? "BluBar" : "RedBar";
    //C(p).get(0).addComponent("SDRAW");
    let fx = 9;
    let self = this;
    let cFun = function (cArg) {

      cArg.cba.fx[cArg.fx] = {};
      //cArg.cba.removeComponent("uDance").addComponent("READY");
      //C(p).get(0).addComponent("SDRAW");
      cArg.cba.removeComponent(cArg.fx + "fx");
      C.s("Ticked").end();
    };
    let f = {
      e: self,
      fx: fx,
      now: 1,
      dur: 50,
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
    self.addFX(f);
  },
});
C.c("uDance", {
  required: "FX",
  init: function () {
    //TODO: change this & countdown to 1s update count-- -> doesnt need to be every tick@vfx!
    let p = this.__c["1P"] ? "BluBar" : "RedBar";
    //C(p).get(0).addComponent("SDRAW");
    let fx = 4;
    let self = this;
    let cFun = function (cArg) {
      cArg.cba.fx[cArg.fx] = {};
      //TODO: if Tower vs Tank orb score etc
      cArg.cba.removeComponent("uDance").addComponent("MOVABLE");
      C(p).get(0).addComponent("SDRAW");
      cArg.cba.removeComponent(cArg.fx + "fx");
    };
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
    self.addFX(f);
  },
});
C.c("oScore", {
  required: "FX",
  init: function () {
    //C.log("oScore", this);
    let p = this.__c["1P"] ? 1 : 2;
    this.scoreX(p);
    this.scoreY(p);
  },
  scoreX: function (p) {
    let self = this;
    let fx = 8; //?
    let prop = "x";
    //let bar = p === 1 ? "BluBar" : "RedBar";

    let cFun = function (cArg) {
      //C(bar).get(0).addComponent("SDRAW");

      //cArg.cba.removeComponent(cArg.fx + "fx");
      // cArg.cba.fx[cArg.fx] = {};
      cArg.cba.destroy();
    };
    let amt = p === 1 ? this.x : this.vuW(100) - this.x;
    let f = {
      e: self,
      fx: fx,
      now: 1,
      dur: 100,
      v: p === 1 ? -1 : 1,
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
    self.addFX(f);
  },
  scoreY: function (p) {
    let self = this;
    let fx = 9; //?
    let prop = "y";
    let cFun = function (cArg) {
      //cArg.cba.removeComponent(cArg.fx + "fx");
      //cArg.cba.fx[cArg.fx] = {};
      cArg.cba.destroy();
    };
    let f = {
      e: self,
      fx: fx,
      now: 1,
      dur: 50,
      v: -1,
      amt: self[prop],
      start: self[prop],
      ease: 0,
      prop: prop,
      cFun: cFun,
      cArg: {
        cba: self,
        fx: fx
      }
    };
    self.addFX(f);
  }
});

C.c("Score", {
  required: "DB",
  init: function () {
    this.db = {
      //_dur1: 600,
      //_dur2: 600,
      //_dur3: 600,
      _p1: 0,
      _p2: 0,
      _max: 100,
    };
  },
});
C.c("sRate", {
  required: "FX",
  init: function () {
    //TODO: change this & countdown to 1s update count-- -> doesnt need to be every tick@vfx!
    let fx = 3;
    let self = this;
    let cFun = function (cArg) {
      cArg.cba.removeComponent(cArg.fx + "fx");
      cArg.cba.fx[cArg.fx] = {};
      C.s("_INPUTS").vNote("FASTER COUNTDOWN!"); //TODO: own comp?
      if (cArg.cba.__c["sRate1"]) {
        cArg.cba.removeComponent("sRate1").removeComponent("sRate").addComponent("sRate2");
      } else {
        cArg.cba.removeComponent("sRate2").addComponent("sRate3");
      }
    };
    let f = {
      e: self,
      fx: fx,
      now: 1,
      dur: 1500,
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
    self.addFX(f);
  },
});
C.c("sRate1", {
  required: "sRate",
});
C.c("sRate2", {
  required: "sRate",
});

C.c("Countdown", {
  required: "FX",
  init: function () {
    /*let red = C("RedBar").get(0);
    let blu = C("BluBar").get(0);
    let maxW = red.vuW((1 / 16) * 100 * 8);
    red.w = maxW;
    blu.x = 0;
    blu.w = maxW;
    */
    let fx = 5;
    let self = this;
    let dur = self.__c["sRate1"] ? self.db._dur1 : self.__c["sRate2"] ? self.db._dur2 : self.db._dur3;
    let cFun = function (cArg) {
      let red = C("RedBar").get(0);
      let blu = C("BluBar").get(0);
      red.w = 0;
      //blu.x = 0;
      blu.w = 0;
      cArg.cba.removeComponent("Countdown").addComponent("TALLY");
      cArg.cba.removeComponent(cArg.fx + "fx");
      cArg.cba.fx[cArg.fx] = {};
      //C.s("_INPUTS").vNote("FASTER COUNTDOWN!"); //TODO: own comp?
      //if (cArg.cba.__c["sRate1"]) {
      //cArg.cba.removeComponent("sRate1").removeComponent("sRate").addComponent("sRate2");
      //} else {
      //cArg.cba.removeComponent("sRate2").addComponent("sRate3");
      //}
    };
    let f = {
      e: self,
      fx: fx,
      now: 1,
      dur: dur,
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
    self.addFX(f);
  },
});