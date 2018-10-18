define(function() {
  /*global Crafty*/
  Crafty.s("SET_MOVING", {
    update: function() {
      let mQ = Crafty("_MOVING").get();
      if (mQ.length) {
        for (let i = mQ.length - 1; i >= 0; i--) {
          let u = mQ[i];
          this.setMoving(u);
        }
      }
      else { return; }
    },
    setMoving: function(u) {
      if (u.keyz.dX) { this.goEW(u); }
      else { this.goNS(u); }
    },
    goEW: function(u) {
      let uImg = Crafty(u.keyz.iKey);
      let dir = u.keyz.dX === 1 ? "e" : "w";
      let dist = uImg.vuW(this.getX(1) / u.keyz.spd);
      let mT = u.keyz.mT;
      u.keyz.mT = mT - 1;
      uImg.move(dir, dist);
      if (u.keyz.mT < 1) { this.mcb(u); }
    },
    goNS: function(u) {
      let uImg = Crafty(u.keyz.iKey);
      let dir = u.keyz.dY === 1 ? "s" : "n";
      let dist = uImg.vuH(22 / u.keyz.spd);
      uImg.move(dir, dist);
      let mT = u.keyz.mT;
      u.keyz.mT = mT - 1;
      if (u.keyz.mT < 1) { this.mcb(u); }
    },
    mcb: function(u) {
      if (u.__c["_nuE"]) {
        u.addComponent("_E").
        removeComponent("_nuE");
      }
      if (u.__c["_nuW"]) {
        u.addComponent("_W").
        removeComponent("_nuW");
      }
      u.addComponent("_MOVED").
      removeComponent("_MOVING");
      this.addTargets();
    },
    addTargets: function() {
      let uQ = Crafty("_UNIT").get();
      for (let i = 0, iLen = uQ.length; i < iLen; i++) {
        Crafty("_UNIT").get(i).addComponent("_TARGET");
      }
    },
    getX: function(x) {
      //let x = v.vuW(100 * 1 / 15 * x);
      let nuX = 1 / .15 * x;
      return nuX;
    }
  }, true);
});
