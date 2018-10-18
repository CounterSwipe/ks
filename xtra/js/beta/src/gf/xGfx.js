define(function() {
  /*global Crafty*/
  Crafty.s("SET_GFX", {
    update: function() {
      let gQ = Crafty("_GFX").get();
      if (gQ.length) {
        for (let i = gQ.length - 1; i >= 0; i--) {
          let u = gQ[i];
          this.setGfx(u);
        }
      }
      else { return; }
    },
    setGfx: function(u) {
      let c = Crafty("_CELLS").get(0);
      let cKeyL = u.keyz.cKeyL;
      let x = c.search(cKeyL + 1000); //vuW(getX(-3^17))
      let y = c.search(cKeyL + 2000); //vuH(#)//26|48|70*h:4
      let uImg = Crafty.e("NuVue, WebGL, IDLE_" + u.keyz.uImg).
      vued({
        x: this.getX(x), // - u.keyz.aX,
        y: y, // - 26,
        w: 0,
        h: 0
      }).
      attr({ z: cKeyL });
      if (u.keyz.dX === -1) { uImg.flip("X").addComponent("FLIPPED"); }
      uImg.uKey = u[0];
      u.keyz.iKey = uImg[0];
      uImg.addComponent("GrowIn").gI({
        target: uImg,
        aX: u.keyz.aX,
        dur: u.keyz.aF
      });
      //TODO moments|orbCheck({cKL, cKR, p, uKey})
      this.dHp(u, uImg);
    },
    dHp: function(u, uImg) {
      let hx;
      if (uImg.__c["FLIPPED"]) { hx = uImg.x + uImg.vuW(this.getX(1.2)); }
      else { hx = uImg.x + uImg.vuW(this.getX(1)); }
      let uHp = Crafty.e("NuVue, WebGL, Color, _FOLLOW, _UHP").
      attr({
        x: hx,
        y: uImg.y + uImg.vuH(26),
        w: uImg.vuW(this.getX(2)),
        h: uImg.vuH(4),
        z: uImg.z - 1
      }).color(0, 255, 0, 1);
      uHp.uKey = u[0];
      uHp.iKey = uImg[0];
      u.keyz.hKey = uHp[0];
      this.dTicker(u);
    },
    dTicker: function(u) {
      u.removeComponent("_GFX").
      addComponent("_TOCK").
      tock({
        dur: u.keyz.aF,
        cb: ["addComponent", "addComponent"],
        args: ["_TARGET", "_MOVABLE"]
      });
    },
    getX: function(x) {
      //let x = v.vuW(100 * 1 / 15 * x);
      let nuX = 1 / .15 * x;
      return nuX;
    }
  }, true);
});
