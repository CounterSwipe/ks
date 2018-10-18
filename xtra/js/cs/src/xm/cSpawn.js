define(function() {
  /*global Crafty TweenMax*/
  Crafty.c("Spawn", {
    required: "NuVue, WebGL", //, Color",
    spawn: function(tNum) {
      let t = Crafty(tNum);
      let u = t.deployed.card.u;
      //let m = d.deployed.card.m;
      let idle = "p1u" + u + "_idle";
      let x = ((t.x * 100 / t.vue.w));
      let y = ((t.y * 100 / t.vue.h));
      //let z = +(1 + "" + t.tile.t);
      let z = +(1 + "" + t.tile.tile);
      //let tile = t.tile.row + "" + t.tile.col;
      this.at = { tL: t.tile.tile, tR: t.tile.tile + 1 };
      //this.tile = { col: t.tile.col, row: t.tile.row, tile: t.tile.tile, tNum: tNum };
      this.card = t.deployed.card;
      this.addComponent("AdjXflip, ShowTiles, " + idle);
      //this.addComponent("AtTile, Dirs, Destiny, ShowTiles, " + idle);
      //this.addComponent("Destiny, AtTile, ShowTiles, " + idle); //.spdX(10);
      //this.addComponent("Destiny, SpdX, OnRedge, OnLedge, " + idle).spdX(10);
      this.vued(x, y, 0, 0).attr({ z: z }); //.color(0, 0, 0, .3);
      //let e = u < 2 ? 3 : u < 4 ? 2 : u < 6 ? 1 : 0;
      this.addComponent("FadeInUnit").fadeIn(this.card.s); //1
    }
  });
  Crafty.c("Destinyx", {
    required: "SIDE",
    init: function() {
      this.destiny();
    },
    destiny: function() {
      let row = this.tile.row;
      if (this.__c["P1"]) {
        //if (this.p.side === 1) {
        if (row < 4 || row > 6) {
          if (this.flip("X")) {
            this.unflip("X");
          }
          this.dirX = 1;
          this.adjX = 6.25; //@deploy: tile.x - adjX
          this.dest = this.vue.w + this.vuW(12.5) - this.vuW(this.adjX); //=+tile.col2
        }
        else {
          this.flip("X");
          this.dirX = -1;
          this.adjX = 9.25; //@deploy: tile.x - adjX
          this.dest = 0 - this.vuW(25) - this.vuW(this.adjX); //=-tile.col2
        }
      }
      else {
        if (row < 4 || row > 6) {
          this.flip("X");
          this.dirX = -1;
          this.adjX = 9.25; //@deploy: tile.x - adjX
          this.dest = 0 - this.vuW(25) - this.vuW(this.adjX); //=-tile.col2
        }
        else {
          if (this.flip("X")) {
            this.unflip("X");
          }
          this.dirX = 1;
          this.adjX = 6.25; //@deploy: tile.x - adjX
          this.dest = this.vue.w + this.vuW(12.5) - this.vuW(this.adjX); //=+tile.col2
        }
      }
      return this;
    }
  });
  Crafty.c("FadeInUnit", {
    fadeIn: function(spd) {
      let dur = spd / 50; //unit.spd/50f/s = deploy duration in seconds
      //let ease = [Bounce.easeOut, Circ.easeInOut, Elastic.easeOut, Linear.easeNone];
      let self = this;
      TweenMax.to(self, dur, {
        x: "-=" + self.vuW(self.adjX),
        y: "-=" + self.vuH(26),
        w: self.vuW(28),
        h: self.vuH(30),
        //ease: ease[e],
        ease: Elastic.easeOut,
        //ease: Bounce.easeOut,
        //ease: Circ.easeInOut,
        //ease: Linear.easeNone,
        onComplete: onDeployComplete
      });
      //TODO: modifiers x y w h 
      function onDeployComplete() {
        //console.log("spawnedUnit:", self, self.tile, Crafty(self.tile.tile));
        Crafty(Crafty("tile" + self.at.tL).get(0).deployed.hNum).addComponent("DealMeIn");
        //Crafty(Crafty(self.tile.tNum).deployed.hNum).addComponent("DealMeIn");
        Crafty("tile" + self.at.tL).removeComponent("DEPLOYING", false);
        //Crafty(self.tile.tNum).removeComponent("DEPLOYING", false);
        self.addComponent("READY");
        self.removeComponent("FadeInUnit", false);
        //TODO: AI LOGIC HERE
      }
    },
    remove: function() {
      TweenMax.killTweensOf(this);
      //Crafty.log('FadeInUnit removed!');
    }
  });
});
