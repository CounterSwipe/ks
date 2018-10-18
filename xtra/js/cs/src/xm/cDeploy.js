define(function() {
  /*global Crafty*/
  Crafty.s("Deployed", {
    onFrame: function() {
      if (Crafty("DEPLOY").get(0)) {
        let d = Crafty("DEPLOY").get(0);
        let h = Crafty(d.inputs.a).dealt;
        d.energy.now = d.energy.now - h.card.c;
        Crafty.s("Egen").onEbar();
        d.addComponent("DEPLOYING").
        deployed(Crafty.frame(), h.card, 50, h.hNum).
        removeComponent("DEPLOY");
        Crafty.e("Spawn").spawn(d[0]);
        //TODO: AI LOGIC HERE
        Crafty(d.inputs.a + 1).destroy();
        Crafty(d.inputs.a).destroy();
      }
      else { return; }
    }
  }, true);
  Crafty.c("DEPLOYING", {
    init: function() {
      //this.removeComponent("VACANT");
      //this.tile.vacant = false;
      //this.color("yellow").attr({ alpha: 1 });
    },
    deployed: function(f, c, d, h) {
      let deployed = { frame: f, card: c, delay: f + d, hNum: h, t: this.tile.t };
      this.deployed = deployed;
      return this;
    },
    remove: function() {
      //this.tile.vacant = true; //console.log("DEPLOYING removed", this.tile);
      this.color(this.tile.c).attr({ alpha: this.tile.a });
    }
  });
  Crafty.c("CellOpen", {
    init: function() {
      let u = Crafty(this.inputs.a).dealt.card.u;
      Crafty("p1u" + u + "m1_pin").get(0).
      attr({ alpha: 1, x: this.x, y: this.y - (this.vuH(8)) });
      //attr({ alpha: 1, x: this.x + (this.vuW(3.25)), y: this.y - (this.vuH(8)) });
      this.color("aqua").attr({ alpha: 1 });
      //TODO:
      if (this.tile.row > 6) {
        Crafty("tile" + (this.tile.tile + 2)).get(0).color("aqua").attr({ alpha: .3 });
      }
      else {
        Crafty("tile" + (this.tile.tile - 3)).get(0).color("aqua").attr({ alpha: .3 });
      }
      Crafty("tile" + (this.tile.tile - 2)).get(0).color("aqua").attr({ alpha: .5 });
      Crafty("tile" + (this.tile.tile - 1)).get(0).color("aqua").attr({ alpha: .8 });
      Crafty("tile" + (this.tile.tile + 1)).get(0).color("aqua").attr({ alpha: .8 });
      //      console.log(this);
    },
    remove: function() {
      let u = Crafty(this.inputs.a).dealt.card.u;
      Crafty("p1u" + u + "m1_pin").get(0).attr({ alpha: 0 });
      //TODO
      let d;
      if (this.tile.row > 6) {
        d = Crafty("tile" + (this.tile.tile + 2)).get(0);
        d.color(d.tile.c).attr({ alpha: d.tile.a });
        //Crafty("tile" + (this.tile.tile + 2)).get(0).color("aqua").attr({ alpha: .8 });
      }
      else {
        d = Crafty("tile" + (this.tile.tile - 3)).get(0);
        d.color(d.tile.c).attr({ alpha: d.tile.a });
        //Crafty("tile" + (this.tile.tile - 3)).get(0).color("aqua").attr({ alpha: .8 });
      }
      let a = Crafty("tile" + (this.tile.tile - 1)).get(0);
      a.color(a.tile.c).attr({ alpha: a.tile.a });
      let b = Crafty("tile" + (this.tile.tile + 1)).get(0);
      b.color(b.tile.c).attr({ alpha: b.tile.a });
      let c = Crafty("tile" + (this.tile.tile - 2)).get(0);
      c.color(c.tile.c).attr({ alpha: c.tile.a });
      //
      this.color(this.tile.c).attr({ alpha: this.tile.a });
      //Crafty.log('TileOpen removed!');
    }
  });
  Crafty.c("CellFull", {
    init: function() {
      this.color("red").attr({ alpha: 1 });
    },
    remove: function() {
      //if (this.__c["DEPLOYED"]) {
      //this.color("yellow").attr({ alpha: 1 });
      //}
      //else {
      this.color(this.tile.c).attr({ alpha: this.tile.a });
      //}
      //Crafty.log('TileFull removed!');
    }
  });
});
