define(function (require) {
  let Crafty = require("crafty");
  Crafty.s("SET_TARGETING", {
    update: function () {
      let tQ = Crafty("_TARGETING").get();
      if (tQ.length) {
        for (let i = tQ.length - 1; i >= 0; i--) {
          let u = tQ[i];
          this.setTargeting(u);
        }
      } else {
        return;
      }
    },
    setTargeting: function (u) {
      u.keyz.atkT--;
      if (u.keyz.atkT <= 0) {
        u.removeComponent("_TARGETING").addComponent("_TARGET");
      }
    }
  }, true);
  Crafty.s("SET_TARGET", {
    update: function () {
      let tQ = Crafty("_TARGET").get();
      if (tQ.length) {
        for (let i = tQ.length - 1; i >= 0; i--) {
          let u = tQ[i];
          this.seekTarget(u);
        }
      } else {
        return;
      }
    },
    seekTarget: function (u) {
      //console.log("findTarget()", this.findTarget(u), this.isTower(u));
      u.removeComponent("_TARGET");
      if (!u.__c["_TARGETING"] && this.setTarget(u)) {
        u.addComponent("_TARGETING");
        if (u.__c["_TOWER"]) {
          u.removeComponent("_MOVABLE");
        }
        this.launch(u);
      } else {
        return;
      }
      //else { u.removeComponent("_TARGETING"); }
    },
    outOfBounds: function (u) {
      let cell = +(u.keyz.cKeyL.toString().substr(1, 2));
      let dX = u.keyz.dX;
      if (dX === 1) {
        if ((cell < 14) || (cell > 23)) {
          return true;
        }
      } else {
        if ((cell < 16) || (cell > 25)) {
          return true;
        }
      }
      return false;
    },
    setTarget: function (u) {
      let dX = u.keyz.dX;
      if (!dX || this.outOfBounds(u)) {
        return false;
      } else {
        let p = u.keyz.p;
        let d = Crafty("_DECK _P" + p).get(0);
        let dKey = u.keyz.dKey;
        let uNum = d.search(dKey);
        let splash = d.search(uNum + 1700);
        let max = d.search(uNum + 2000);
        let range = [];
        let c = Crafty("_CELLS").get(0);
        dX === 1 ? range.push(u.keyz.cKeyR) : range.push(u.keyz.cKeyL);
        if (splash) {
          let row = range[0];
          if (row < 200 || row < 500 && row > 400 || row < 800 && row > 700) {
            range.push(row + 100);
          } else if (row > 900 || row > 600 && row < 700 || row > 300 && row < 400) {
            range.push(row - 100);
          } else {
            range.push(row + 100);
            range.push(row - 100);
          }
        }
        for (let i = 0, rLen = range.length; i < rLen; i++) {
          for (let j = 0; j < max; j++) {
            let cKey = range[i] + ((j + 1) * dX);
            let player = c.search(cKey + 4000);
            if (player) {
              if (player !== p) {
                return true;
              }
            }
          }
        }
        return false;
      }
    },
    launch: function (u) {
      let dKey = u.keyz.dKey;
      let p = u.keyz.p;
      let d = Crafty("_DECK _P" + p).get(0);
      let r = Crafty.e("_ROCKET");
      let uNum = d.search(dKey);
      let delay = d.search(uNum + 2100);
      let spd = d.search(uNum + 2200);
      let range = d.search(uNum + 2300);
      let dmg = d.search(uNum + 2400);
      let atkDur = 25 + delay; //animation frames + chargeUp
      if (d.search(uNum + 2500)) {
        r.addComponent("ONIMPACT");
      }
      if (u.__c["_URGENCY"]) {
        atkDur = 25;
      }
      u.keyz.atkT = delay + atkDur;
      let cKey = u.keyz.dX === 1 ? u.keyz.cKeyR : u.keyz.cKeyL;
      r.rocket({
        delay: atkDur,
        spd: spd,
        range: range,
        dmg: dmg,
        dur: 1 / atkDur,
        p: p,
        dX: u.keyz.dX,
        cKey: cKey,
        mT: spd
      }).
        addComponent("_LAUNCH");
      //console.log("launchRocket", r);
    },
  }, true);
});