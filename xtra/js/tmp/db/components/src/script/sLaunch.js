define(function (require) {
  let Crafty = require("crafty");
  let Console = console;
  let logit = Console.log;
  Crafty.s("SET_LAUNCH", {
    update: function () {
      let lQ = Crafty("_LAUNCH").get();
      if (lQ.length) {
        for (let i = lQ.length - 1; i >= 0; i--) {
          let e = lQ[i];
          this.setLaunch(e);
        }
      } else {
        return;
      }
    },
    setLaunch: function (e) {
      e.r.delay--;
      e.alpha += e.r.dur;
      if (e.r.delay <= 0) {
        logit("LAUNCHED!");
        e.removeComponent("_LAUNCH").
          addComponent("DIMMER, _LAUNCHED");
      }
      /*if (this.hasSplash()) {
        if (this.chargeUp) {
          this.addComponent("TICKING, Ticker").
          ticker({
            dur: this.cooldown,
            cb: ["removeComponent", "addComponent"],
            args: ["TICKING", "DEPLOYED"]
          });
        }
        this.aimRockets();
        this.launchRockets();
      }
      else {
        //else aim&launch singleRocket
        //""launch protocol
        this.aimRockets();
        this.launchRockets();
      }*/
      //logit("@launch");
    },
  }, true);
  Crafty.s("SET_LAUNCHED", {
    update: function () {
      let lQ = Crafty("_LAUNCHED").get();
      if (lQ.length) {
        for (let i = lQ.length - 1; i >= 0; i--) {
          let r = lQ[i];
          this.setLaunched(r);
        }
      } else {
        return;
      }
    },
    setLaunched: function (r) {
      this.goEW(r);
    },
    goEW: function (r) {
      let dir = r.r.dX === 1 ? "e" : "w";
      let dist = r.vuW(this.getX(1) / r.r.spd);
      let mT = r.r.mT;
      r.r.mT = mT - 1;
      r.move(dir, dist);
      if (r.r.mT < 1) {
        this.mcb(r);
      }
    },
    mcb: function (r) {
      r.r.range--;
      r.r.mT = r.r.spd;
      r.r.cKey = r.r.cKey + r.r.dX;
      let c = Crafty("_CELLS").get(0);
      let p = c.search(r.r.cKey + 4000);
      if (p) {
        if (p !== r.r.p) {
          let foe = c.search(r.r.cKey + 5000);
          let f = Crafty(foe);
          let cell = f.keyz.dX === 1 ? f.keyz.cKeyR : f.keyz.cKeyL;
          if (cell === r.r.cKey) {
            logit("dmg:", foe, r.r.dmg);
            f.keyz.hp.now = f.keyz.hp.now - r.r.dmg;
            f.addComponent("_HPDMG");
            let rc = r.clone();
            rc.r = r.r;
            rc.removeComponent("_LAUNCHED").addComponent("EXPLODE");
            logit(rc, rc.__c);
            if (r.__c["ONIMPACT"]) {
              this.explode(r);
            }
          } else {
            return;
          }
        }
      }
      if (r.r.range <= 0) {
        this.explode(r);
      }
    },
    explode: function (r) {
      r.removeComponent("_LAUNCHED").
        addComponent("EXPLODE");
    },
    getX: function (x) {
      //let x = v.vuW(100 * 1 / 15 * x);
      let nuX = 1 / 0.15 * x;
      return nuX;
    }
  }, true);
  Crafty.s("SET_HP", {
    update: function () {
      let hpQ = Crafty("_HPDMG").get();
      if (hpQ.length) {
        for (let i = hpQ.length - 1; i >= 0; i--) {
          let u = hpQ[i];
          this.setHP(u);
        }
      } else {
        return;
      }
    },
    setHP: function (u) {
      if (u.keyz.hp.now <= 0) {
        this.exhaust(u);
      } else {
        u.removeComponent("_HPDMG");
        this.render(u);
      }
    },
    exhaust: function (u) {
      Crafty(u.keyz.hKey).destroy();
      Crafty(u.keyz.iKey).destroy();
      if (u.keyz.dX === 1) {
        this.clearCell(u.keyz.nuKeyR);
      } else {
        this.clearCell(u.keyz.nuKeyL);
      }
      this.clearCell(u.keyz.cKeyL);
      this.clearCell(u.keyz.cKeyR);
      u.destroy();
      logit("unit exhausted, TODO exhaust unclaim cell, gfx (perhaps @ remove uImg|hp etc) momentDropCheck, callback");
    },
    clearCell: function (cKey) {
      logit(cKey);
      let c = Crafty("_CELLS").get(0);
      c.add(cKey + 3000, 1); //vacant:T
      c.add(cKey + 4000, 0); //player
      c.add(cKey + 5000, 0); //uKey
    },
    render: function (u) {
      let hPerc = ((u.keyz.hp.now / u.keyz.hp.max) * 100) >> 0;
      logit(u[0], u.keyz.hp.now, u.keyz.hp.max, u.keyz.hp.now / u.keyz.hp.max, ((u.keyz.hp.now / u.keyz.hp.max) * 100) >> 0, hPerc);
      if (hPerc > 20) {
        Crafty(u.keyz.hKey).alpha = hPerc;
      } else if (hPerc > 10) {
        Crafty(u.keyz.hKey).alpha = 0.5;
        Crafty(u.keyz.hKey).color(255, 0, 0, 1);
      } else {
        Crafty(u.keyz.hKey).alpha = 1;
        Crafty(u.keyz.hKey).color(255, 0, 0, 1);
      }
    }
  }, true);
});