define(function() {
  /*global Crafty TweenMax*/
  Crafty.c("Defense", {
    def: {}
  });
  Crafty.c("BASE", {
    required: "Defense, NuVue, WebGL, Color",
  });
  Crafty.s("Bases", {
    init: function() {
      Crafty.e("BASE, P1");
      Crafty.e("BASE, P2");
      this.resetBase(1);
      this.resetBase(2);
    },
    resetBase: function(player) {
      if (player === 1) {
        this.p1base();
      }
      else {
        this.p2base();
      }
    },
    p1base: function() {
      let b = Crafty("BASE P1").get(0);
      //TODO load loa per player loa etc
      b.def = { p: 1, loa: 1, dmg: 30, 1: 713, 2: 813, 3: 913, t: 50, a: 20, cell: 0 };
      b.attr({
        alpha: 0,
        x: 0,
        y: b.vuH(70),
        w: b.vuW(this.getX(1)),
        h: b.vuH(12),
        z: 713
      }).color(0, 255, 255, .5).
      addComponent("DORMANT");
    },
    p2base: function() {
      let b = Crafty("BASE P2").get(0);
      //TODO load loa per player loa etc
      b.def = { p: 2, loa: 1, dmg: 30, 1: 127, 2: 227, 3: 327, t: 50, a: 20, cell: 0 };
      b.attr({
        alpha: 0,
        x: b.vuW(this.getX(14)),
        y: b.vuH(26),
        w: b.vuW(this.getX(1)),
        h: b.vuH(12),
        z: 127
      }).color(255, 0, 0, .5).
      addComponent("DORMANT");
    },
    getX: function(x) {
      //let x = v.vuW(100 * 1 / 15 * x);
      let nuX = 1 / .15 * x;
      return nuX;
    },
    onFrame: function() {
      //TODO for player 2 as well!
      let i, b, bQ = Crafty("BASE").get().length;
      for (i = 0; i < bQ; i++) {
        b = Crafty("BASE").get(i);
        //if (b.__c["CAPTURED"]) { this.captured(b); }
        this.handle(b);
      }
    },
    handle: function(b) {
      switch (true) {
        case b.__c["BASING"]:
          this.active(b);
          break;
        case b.__c["WAKING"]:
          this.waking(b);
          break;
        default:
          this.dormant(b);
      }
    },
    active: function(b) {
      let dir = b.def.p === 1 ? "e" : "w";
      let dist = b.vuW(this.getX(5) / 50);
      b.def.a--;
      b.def.t--;
      b.move(dir, dist);
      if (b.def.a < 1) {
        b.def.cell = b.def.cell + 1;
        let c = Crafty("Cells").get(0);
        let cell = b.def.cell;
        let cells = b.def.p === 1 ? [(b.def[1] + cell), (b.def[2] + cell), (b.def[3] + cell)] : [b.def[1] - cell, b.def[2] - cell, b.def[3] - cell];
        b.def.a = 20;
        for (let i = 0; i < 3; i++) {
          //console.log(b.def[1], cell, cells[i], c.search(cells[i]));
          if (c.search(cells[i]).p) {
            if (c.search(cells[i]).p !== b.def.p) {
              let u = Crafty("UID" + c.search(cells[i]).u).get(0);
              //console.log(c.search(cells[i]).p, c.search(cells[i]).u);
              let hp = u.res.hp - (b.def.loa * b.def.dmg);
              if (hp < 0) { hp = 0; }
              u.res.hp = hp;
              u.addComponent("DMGD");
            }
            //else { return; }
          }
          //else { return; }
        }
        //b.removeComponent("ACTIVE");
        //this.resetBase(b.def.p);
      }
      if (b.def.t < 1) {
        b.removeComponent("BASING");
        this.resetBase(b.def.p);
        b.def.cell = 0;
      }
    },
    waking: function(b) {
      b.def.t--;
      let a = b.alpha;
      b.alpha = a + .01;
      if (b.def.t < 1) {
        b.removeComponent("WAKING").
        addComponent("BASING");
        b.alpha = 1;
        b.def.t = 300;
      }
    },
    dormant: function(b) {
      b.def.t--;
      if (b.def.t < 1) {
        b.removeComponent("DORMANT").
        addComponent("WAKING");
        b.def.t = 100;
      }
    }
  }, true);
});
