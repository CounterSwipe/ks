define(function() {
  /*global Crafty*/
  Crafty.s("SET_MOVABLE", {
    update: function() {
      let mQ = Crafty("_MOVABLE").get();
      if (mQ.length) {
        for (let i = mQ.length - 1; i >= 0; i--) {
          let u = mQ[i];
          this.handle(u);
        }
      }
      else { return; }
    },
    handle: function(u) {
      u.removeComponent("_MOVABLE").
      addComponent("_MOVING");
      this.setMovable(u);
    },
    setMovable: function(u) {
      let dX = u.keyz.dX;
      if (dX === 1 || dX === -1) {
        if (this.atEdge(u)) { this.setY(u); }
        else {
          if (this.cellVacant(u, 1)) {
            if (this.cellVacant(u, 2)) { this.cKeysX(u); }
            else { this.idle(u); }
          }
          else { this.idle(u); }
        }
      }
      else { this.setX(u); }
    },
    atEdge: function(u) {
      let dX = u.keyz.dX;
      let edgeR = [127, 227, 327, 427, 527, 627, 727, 827, 927];
      let edgeL = [113, 213, 313, 413, 513, 613, 713, 813, 913];
      //let edgeR = [125, 225, 325, 425, 525, 625, 725, 825, 925];
      //let edgeL = [115, 215, 315, 415, 515, 615, 715, 815, 915];
      let edge = dX === 1 ? edgeR : edgeL;
      let start = dX === 1 ? u.keyz.cKeyR : u.keyz.cKeyL;
      for (let i = 0; i < 9; i++) {
        if (start === edge[i]) { return true; }
      }
      return false;
    },
    setY: function(u) {
      u.keyz.dY = this.dirY(u);
      u.keyz.dX = 0;
      this.cKeysY(u);
    },
    dirY: function(u) {
      let p = u.keyz.p;
      let cKey = u.keyz.dX === 1 ? u.keyz.cKeyR : u.keyz.cKeyL;
      if (p === 1) {
        if (cKey > 400) { return -1; }
        else { return 1; }
      }
      else {
        if (cKey < 700) { return 1; }
        else { return -1; }
      }
    },
    cKeysY: function(u) {
      let dY = u.keyz.dY;
      let cKeyL = u.keyz.cKeyL;
      let cKeyR = u.keyz.cKeyR;
      u.keyz.nuKeyR = cKeyR + (dY * 300);
      u.keyz.nuKeyL = cKeyL + (dY * 300);
      u.addComponent("_nuE");
      u.addComponent("_nuW");
      u.keyz.mT = u.keyz.spd;
    },
    setX: function(u) {
      u.keyz.dX = this.dirX(u);
      if (u.keyz.dX === -1) {
        let uImg = Crafty(u.keyz.iKey).
        addComponent("FLIPPED").flip("X");
        uImg.attr({ x: uImg.x - this.getX(.8) });
      }
      else {
        let uImg = Crafty(u.keyz.iKey).
        removeComponent("FLIPPED").unflip("X");
        uImg.attr({ x: uImg.x + this.getX(.8) });
      }
      u.keyz.dY = 0;
      this.setMovable(u);
    },
    dirX: function(u) {
      let p = u.keyz.p;
      let cKey = u.keyz.dY === 1 ? u.keyz.cKeyR : u.keyz.cKeyL;
      if (p === 1) {
        if (cKey < 400 || cKey > 700) { return 1; }
        else { return -1; }
      }
      else {
        if (cKey < 400 || cKey > 700) { return -1; }
        else { return 1; }
      }
    },
    cellVacant: function(u, cell) {
      let dX = u.keyz.dX;
      let start = dX === 1 ? u.keyz.cKeyR : u.keyz.cKeyL;
      let cKey = start + (dX * cell);
      let c = Crafty("_CELLS").get(0);
      if (c.search(cKey + 3000) === 1) { return true; }
      else {
        if (cell > 1) {
          if (c.search(cKey + 4000) === u.keyz.p) { return true; }
          else { return this.winCollision(u, Crafty(c.search(cKey + 5000))); }
        }
        return false;
      }
    },
    winCollision: function(u, foe) {
      if (u.keyz.spd < foe.keyz.spd) { return true; }
      else if (u.keyz.spd > foe.keyz.spd) { return false; }
      else {
        if (u.keyz.f > foe.keyz.f) { return true; }
        else { return false; }
      }
    },
    cKeysX: function(u) {
      let cKey = this.getCkey(u);
      this.setCells(u, cKey);
    },
    getCkey: function(u) {
      let dX = u.keyz.dX;
      let cKeyL = u.keyz.cKeyL;
      let cKeyR = u.keyz.cKeyR;
      if (dX === 1) {
        u.keyz.nuKeyL = cKeyR;
        u.keyz.nuKeyR = cKeyR + dX;
        u.addComponent("_nuE");
        return cKeyR + dX;
      }
      else {
        u.keyz.nuKeyR = cKeyL;
        u.keyz.nuKeyL = cKeyL + dX;
        u.addComponent("_nuW");
        return cKeyL + dX;
      }
    },
    setCells: function(u, cKey) {
      let c = Crafty("_CELLS").get(0);
      c.add(cKey + 3000, 0); //vacant:F
      c.add(cKey + 4000, u.keyz.p); //player
      c.add(cKey + 5000, u[0]); //uKey
      u.keyz.mT = u.keyz.spd;
      this.setZ(u, cKey);
    },
    setZ: function(u, cKey) {
      Crafty(u.keyz.iKey).attr({ z: cKey });
    },
    idle: function(u) {
      u.removeComponent("_MOVING").
      addComponent("_MOVABLE");
    },
    getX: function(x) {
      //let x = v.vuW(100 * 1 / 15 * x);
      let nuX = 1 / .15 * x;
      return nuX;
    }
  }, true);
});
