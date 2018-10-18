define(function (require) {
  let Crafty = require("crafty");
  let Console = console;
  let logit = Console.log;
  Crafty.s("SET_MOVED", {
    update: function () {
      let mQ = Crafty("_MOVED").get();
      if (mQ.length) {
        for (let i = mQ.length - 1; i >= 0; i--) {
          let u = mQ[i];
          this.setMoved(u);
        }
      } else {
        return;
      }
    },
    setMoved: function (u) {
      if (u.__c["_E"]) {
        this.clearCell(u.keyz.cKeyL);
        u.removeComponent("_E");
      }
      if (u.__c["_W"]) {
        this.clearCell(u.keyz.cKeyR);
        u.removeComponent("_W");
      }
      u.keyz.cKeyL = u.keyz.nuKeyL;
      u.keyz.cKeyR = u.keyz.nuKeyR;
      if (u.__c["CARRY"]) {
        this.scoreCheck(u);
      }
      u.addComponent("_MOVABLE").
        removeComponent("_MOVED");
    },
    scoreCheck: function (u) {
      if (u.keyz.p === 1) {
        if (u.keyz.cKeyR === 126 || u.keyz.cKeyR === 226 || u.keyz.cKeyR === 326) {
          this.score(u, u.keyz.p);
        }
      } else {
        if (u.keyz.cKeyL === 714 || u.keyz.cKeyL === 814 || u.keyz.cKeyL === 914) {
          this.score(u, u.keyz.p);
        }
      }
    },
    score: function (u, p) {
      u.removeComponent("CARRY");
      Crafty("_MOMENTS _P" + p).get(0).
        removeComponent("CAPTURED");
      Crafty.s("SET_MOMENTS").setMoments(p);
      Crafty("_SCORE").get(0).addComponent("SCORED").
        score["p" + p] += 1;
      logit(p, "scored!");
    },
    clearCell: function (cKey) {
      let c = Crafty("_CELLS").get(0);
      c.add(cKey + 3000, 1); //vacant:T
      c.add(cKey + 4000, 0); //player
      c.add(cKey + 5000, 0); //uKey
    }
  }, true);
});