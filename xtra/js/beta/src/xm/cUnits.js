define(function() {
  /*global Crafty*/
  Crafty.s("SET_UNITS", {
    update: function() {
      let uQ = Crafty("_UNIT").get();
      if (uQ.length) {
        let i, u, iQ = uQ.length;
        for (i = 0; i < iQ; i++) {
          u = Crafty("_UNIT").get(i);
          this.handle(u);
        }
      }
      else { return; }
    },
    handle: function(u) {
      switch (true) {
        /*case u.__c["LOGIC"]:
          this.logic(u);
          break;
        case u.__c["GOEW"]:
          this.goEW(u);
          break;
        case u.__c["GONS"]:
          this.goNS(u);
          break;
        case u.__c["READY"]:
          return;
        case u.__c["DEPLOYED"]:
          this.deployed(u);
          break;*/
        default: this.ticking(u);
      }
    },
    ticking: function(u) {
      u.tock();
    },
    deployed: function(u) {
      let uImg = Crafty(u.keyz.iKey);
      uImg.removeComponent("GrowIn");
      u.removeComponent("DEPLOYED").
      addComponent("READY"); //LOGIC");TODO
      //console.log("this.targetInRange()");
    },
    logic: function(u) {
      this.orbCheck({ a: u.d.a, b: u.d.b, p: u.d.p, c: u.d.uID });
      u.d.d === 1 ? this.dir1(u) : u.d.d === 2 ? this.dir2(u) : this.dir3(u);
    },
    orbCheck: function(u) {
      if (Crafty.s("Orbs").capture(u.a, u.p) || Crafty.s("Orbs").capture(u.b, u.p)) {
        Crafty.s("Orbs").onCapture(u.c, u.p);
      }
    },
    nxc: function(ab) {
      if (ab.dX === 1) { return ab.b + 1; }
      else { return ab.a - 1; }
    },
    nyc: function(ab) {
      if (ab.dY === 1) { return [ab.a + 300, ab.b + 300]; }
      else { return [ab.a - 300, ab.b - 300]; }
    },
    dir1: function(u) {
      if (u.d.dX === 1 || u.d.dX === -1) {
        let nuCell = this.nxc({ dX: u.d.dX, a: u.d.a, b: u.d.b });
        let cells = Crafty("Cells").get(0);
        if (cells.search(nuCell)) {
          if (cells.search(nuCell).v) {
            Crafty.s("Grid").claim({ c: nuCell, p: u.d.p, u: u[0] });
            u.d.mT = u.d.s;
            u.removeComponent("LOGIC").addComponent("GOEW");
          }
          else {
            //console.log("area occupied, unit waiting");
            return;
          }
        }
        else {
          if (u.d.a > 700 || (u.d.p === 1 && u.d.a < 700 && u.d.a > 400)) {
            u.d.dY = -1;
          }
          else {
            u.d.dY = 1;
          }
          u.d.dX = 0;
          nuCell = this.nyc({ dY: u.d.dY, a: u.d.a, b: u.d.b });
          this.claimY(u, nuCell);
          u.d.mT = u.d.s;
          u.removeComponent("LOGIC").addComponent("GONS");
        }
      }
      else {
        if (u.d.a > 700 || (u.d.p === 1 && u.d.a < 700 && u.d.a > 400)) {
          u.d.dX = -1; //>700:p2only
        }
        else {
          u.d.dX = 1; //<400:p1only
        }
        this.dir1(u);
      }
    },
    claimY: function(u, nuCell) {
      let c = Crafty(u.d.uID);
      Crafty.s("Grid").claim({ c: nuCell[0], p: u.d.p, u: u[0] });
      Crafty.s("Grid").claim({ c: nuCell[1], p: u.d.p, u: u[0] });
      Crafty.s("Grid").unClaim({ c: u.d.a, p: u.d.p, u: 0 });
      Crafty.s("Grid").unClaim({ c: u.d.b, p: u.d.p, u: 0 });
      u.d.a = nuCell[0];
      u.d.b = nuCell[1];
      if (c._flipX) {
        //console.log("unflip");
        c.attr({ x: c.x - c.vuW(2.25), z: u.d.a }).unflip("X");
      }
      else {
        //console.log("flip", c);
        c.attr({ x: c.x + c.vuW(2.25), z: u.d.a }).flip("X");
      }
    },
    dir2: function() {
      console.log("diagonal2");
    },
    dir3: function() {
      console.log("diagonal3");
    },
    goNS: function(u) {
      let c = Crafty(u.d.uID);
      let dir = u.d.dY === 1 ? "s" : "n";
      let dist = c.vuH(22 / u.d.s);
      c.move(dir, dist);
      u.d.mT--;
      if (u.d.mT < 1) {
        u.d.dY = 0;
        u.removeComponent("GONS").addComponent("LOGIC");
      }
    },
    goEW: function(u) {
      let c = Crafty(u.d.uID);
      let dir = u.d.dX === 1 ? "e" : "w";
      let dist = c.vuW(this.getX(1) / u.d.s);
      c.move(dir, dist);
      u.d.mT--;
      if (u.d.mT < 1) {
        this.nuClaim(u);
        u.removeComponent("GOEW").addComponent("LOGIC");
      }
    },
    nuClaim: function(u) {
      let c = Crafty(u.d.uID);
      if (u.d.dX === 1) {
        Crafty.s("Grid").unClaim({ c: u.d.a, p: 0, u: 0 });
        u.d.a = u.d.b;
        u.d.b = u.d.b + 1;
      }
      else {
        Crafty.s("Grid").unClaim({ c: u.d.b, p: 0, u: 0 });
        u.d.b = u.d.a;
        u.d.a = u.d.a - 1;
      }
      if (c.__c["CARRYING"]) {
        Crafty.s("Orbs").scoreCheck(u);
      }
      else { return; }
    },
    getX: function(x) {
      //let x = v.vuW(100 * 1 / 15 * x);
      let nuX = 1 / .15 * x;
      return nuX;
    }
  }, true);
});
