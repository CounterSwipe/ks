/*global Crafty*/
import round from "/dist/game/util/round.js";
let C = Crafty;
C.s("_HPDMG", {
  init: function () {
    //let e = Crafty("1P Energy").get(0);
    //this.e = e[0];
  },
  update: function () {
    let c = "HPDMG";
    let uQ = C(c).get();
    if (uQ.length) {
      for (let i = uQ.length - 1; i >= 0; i--) {
        let u = uQ[i];
        u.removeComponent(c);
        this.setHpDmg(u);
      }
    } else {
      return;
    }
  },
  setHpDmg: function (u) {
    let dmg = u.db._hpDmg;
    u.db._hpNow -= dmg;
    u.db._hpDmg = 0;
    if (u.db._hpNow <= 0) {
      u.db._hpNow = 0;
      this.renderDmg(u);
      this.exhaust(u);
      /*
          let dmg = u.db[1][1]._hpDmg;
          u.db[1][1]._hpNow -= dmg;
          u.db[1][1]._hpDmg = 0;
          if (u.db[1][1]._hpNow <= 0) {
            u.db[1][1]._hpNow = 0;*/
      //C.log("u.exhaust");
    } else {
      this.renderDmg(u);
    }
  },
  exhaust: function (u) {
    u.removeComponent("U");
    u.addComponent("EXHAUST");
    let db = u.db;
    let kids = [db.key.c, db.key.h, db.key.i];
    if (db.orb.length) {
      for (let i = 0, iLen = db.orb.length; i < iLen; i++) {
        let orb = db.orb[i];
        kids.push(orb);
        if (C(orb).__c["Pulse"]) {
          C(orb).removeComponent("Pulse");
        }
      }
    }
    for (let j = 0, jLen = kids.length; j < jLen; j++) {
      C(kids[j]).addComponent("EXHAUST");
    }
  },
  renderDmg: function (u) {
    let hp = u.db._hpNow;
    let max = u.db._hpMax;
    //let hp = u.db[1][1]._hpNow;
    //let max = u.db[1][1]._hpMax;
    let perc = hp / max;
    let h = C(u.db.key.h);
    //C.log(hp, max, perc, h);
    let hpW = h.vuW((1 / 16 * 100) * 3);
    let w = hpW * perc;
    h.w = w >> 0;
  },
  /*
    eRender: function (e) {
      let eng = C(this.e).db._energy;
      if (e.__c["Ebar"]) {
        let ePerc = eng / 10;
        let eW = e.vuW((1 / 16) * 100 * 10);
        let eRender = eW * ePerc;
        let v = 1;
        let amt = 0;
        if (eRender < e.w) {
          v = -1;
          amt = e.w - eRender;
        } else {
          amt = eRender - e.w;
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
    },*/
});
C.c("EXHAUST", {
  init: function () {
    let fx = 8; //1:deploy ? 
    let prop = "alpha";
    let cFun = function (cArg) {
      //cArg.cba.removeComponent("Op0").removeComponent("Op").removeComponent("DEPLOY");
      //cArg.cba.removeComponent(cArg.fx + "fx");
      //cArg.cba.fx[cArg.fx] = {};
      //C.log(this);
      if (cArg.cba.__c["uAlive"]) {
        let p = cArg.cba.db.d.p;
        let range = cArg.cba.db.range;
        let cNum = cArg.cba.db._cNum;
        //let cells = range.sort((a, b) => a - b);
        for (let i = 0, iLen = range.length; i < iLen; i++) {
          let cell = C(range[i] + "CELL").get(0);
          cell.removeComponent("RESERVED").removeComponent("P" + p);
        }
        if (cNum) {
          let c = C(cNum + "CELL").get(0);
          c.removeComponent("RESERVED").removeComponent("P" + p);
        }
      }
      cArg.cba.destroy();
    };
    let self = this;
    let f = {
      e: self,
      fx: fx,
      now: 1,
      dur: 100, //TODO unit.spd + 50 etc
      v: -1,
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