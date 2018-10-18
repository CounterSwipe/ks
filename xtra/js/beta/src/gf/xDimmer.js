define(function() {
  /*global Crafty*/
  Crafty.c("_FADEUP", {
    init: function() {
      this.o = 50;
      //this.f = (this.y + this.h) / 50;
      //this.f = (this.vuH(100) + this.h) / 50;
      this.f = this.vuH(100) / 50;
    },
    fadeUp: function() {
      this.o--;
      this.y -= this.f;
      return this;
    }
  });
  Crafty.s("SET_FADEUP", {
    update: function() {
      let fQ = Crafty("_FADEUP").get();
      if (fQ.length) {
        for (let i = fQ.length - 1; i >= 0; i--) {
          let f = fQ[i];
          this.setFadeUp(f);
        }
      }
      else { return; }
    },
    setFadeUp: function(f) {
      f.fadeUp();
      if (f.o < 1) {
        f.destroy(); //removeComponent("_FADEUP");
      }
    },
  }, true);
  Crafty.c("EXPLODE", {
    init: function() {
      this.ex = 25;
    },
    explode: function() {
      this.ex--;
      this.attr({
        x: this.x -= this.vuW(.4),
        y: this.y -= this.vuH(.225),
        w: this.w += this.vuW(.8),
        h: this.h += this.vuH(.45)
      });
      return this;
    }
  });
  Crafty.s("SET_EXPLODE", {
    update: function() {
      let eQ = Crafty("EXPLODE").get();
      if (eQ.length) {
        for (let i = eQ.length - 1; i >= 0; i--) {
          let e = eQ[i];
          this.setExplode(e);
        }
      }
      else { return; }
    },
    setExplode: function(e) {
      e.origin("center");
      e.explode();
      //console.log(e[0], e.ex);
      if (!e.ex || e.ex <= 0) { e.destroy(); }
    }
  }, true);
  Crafty.s("SET_ROTATION", {
    update: function() {
      let rQ = Crafty("ROTATE").get();
      for (let i = 0, iLen = rQ.length; i < iLen; i++) {
        let r = rQ[i]; //TODO rQ[#] vs C("R").get(#)
        this.setRotation(r);
      }
    },
    setRotation: function(r) {
      r.origin("center");
      let dX = r.r.dX; //-|1
      let rDeg = r._rotation;
      let nuDeg = rDeg + (1.44 * dX);
      r.rotation = nuDeg;
      if (nuDeg >= 360) { r._rotation = 0; }
    }
  }, true);
  Crafty.c("DIMMER", {
    init: function() {
      this.o = 100;
      this.addComponent("DIM");
    },
  });
  Crafty.c("DIM", {
    dim: function() {
      this.o--;
      this.alpha -= .008;
      return this;
    }
  });
  Crafty.c("UNDIM", {
    undim: function() {
      this.o--;
      this.alpha += .008;
      return this;
    }
  });
  Crafty.s("SET_DIMMER", {
    update: function() {
      let dQ = Crafty("DIMMER").get();
      if (dQ.length) {
        for (let i = dQ.length - 1; i >= 0; i--) {
          let d = dQ[i];
          this.setDimmer(d);
        }
      }
      else { return; }
    },
    setDimmer: function(d) {
      if (d.__c["DIM"]) { this.dim(d); }
      else { this.undim(d); }
    },
    dim: function(d) {
      d.dim();
      if (d.o < 1) {
        d.removeComponent("DIM").
        addComponent("UNDIM");
        d.o = 100;
      }
    },
    undim: function(d) {
      d.undim();
      if (d.o < 1) {
        d.removeComponent("UNDIM").
        addComponent("DIM");
        d.o = 100;
      }
    },
  }, true);
  Crafty.s("SET_FOLLOW", {
    update: function() {
      let fQ = Crafty("_FOLLOW").get();
      if (fQ.length) {
        for (let i = fQ.length - 1; i >= 0; i--) {
          let f = fQ[i];
          this.setFollow(f);
        }
      }
      else { return; }
    },
    setFollow: function(f) {
      let id = Crafty(f.iKey);
      //alpha 100%-20%, red@20% alpha:.5 red@10% alpha:1
      let x = id.__c["FLIPPED"] ? id.x + f.vuW(this.getX(1.2)) : id.x + f.vuW(this.getX(1));
      f.attr({
        x: x,
        y: id.y + f.vuH(26),
        w: f.vuW(this.getX(2)),
        h: f.vuH(4),
        z: id.z - 1
      });
    },
    getX: function(x) {
      //let x = v.vuW(100 * 1 / 15 * x);
      let nuX = 1 / .15 * x;
      return nuX;
    },
  }, true);
});
