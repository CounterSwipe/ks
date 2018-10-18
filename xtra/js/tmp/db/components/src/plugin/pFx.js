define(function (require) {
  let Crafty = require("crafty");
  Crafty.s("SET_FX", {
    init: function () {
      let xQ = Crafty("_FX").get();
      if (xQ.length) {
        for (let i = xQ.length - 1; i >= 0; i--) {
          let f = xQ[i];
          this.setFx(f);
        }
      }
    },
    setFx: function (f) {
      f.removeComponent("_FX").
        addComponent("_GFX");
      switch (true) {
      case f.__c["topL"]:
        f.addComponent("_NW");
        break;
      case f.__c["btmR"]:
        f.addComponent("_SE");
        break;
      default:
          // code
      }
    },
  }, true);
  Crafty.c("_DIM", {
    init: function () {
      this.o = {};
    },
    setDim: function (o) {
      this.o.a = o.a; //amount
      this.o.b = o.b; //bearing
      this.o.c = o.c; //count
      this.o.d = o.d; //count
      this.o._cb = o.cb; //callback
      this.o._cba = o.cba; //callbackargs
      return this;
    }
  });
  Crafty.s("SET_DIM", {
    update: function () {
      let dQ = Crafty("_DIM").get();
      if (dQ.length) {
        for (let i = dQ.length - 1; i >= 0; i--) {
          let e = dQ[i];
          this.setDim(e);
        }
      } else {
        return;
      }
    },
    setDim: function (e) {
      e.o.c--;
      e.alpha = e.alpha + (e.o.a * e.o.b);
      if (e.o.c < 1) {
        this.cbO(e);
        //this.removeComponent("_N");
      }
    },
    cbO: function (e) {
      if (e.cb === 1) {
        e.o._cb = null;
        e.o._cba = null;
        return;
      } else {
        if (e.o._cb) {
          for (let i = 0, iLen = e.o._cb.length; i < iLen; i++) {
            e.o._cb[i](e.o._cba[i]);
          }
        } else {
          return;
        }
      }
    },
  }, true);
  Crafty.c("_DIR", {
    init: function () {
      this.d = {
        x: {},
        y: {}
      };
    },
    setDX: function (d) {
      this.d.x.a = d.a; //amount
      this.d.x.b = d.b; //bearing
      this.d.x.c = d.c; //count
      this.d.x.d = d.d; //duration
      this.d.x._cb = d.cb; //callback
      this.d.x._cba = d.cba; //callbackargs
      return this;
    },
    cbX: function (cb) {
      if (cb === 1) {
        this.d.x._cb = null;
        this.d.x._cba = null;
        return this;
      } else {
        if (this.d.x._cb) {
          for (let i = 0, iLen = this.d.x._cb.length; i < iLen; i++) {
            this[this.d.x._cb[i]](this.d.x._cba[i]);
          }
        } else {
          return;
        }
      }
    },
    setDY: function (d) {
      this.d.y.a = d.a; //amount
      this.d.y.b = d.b; //bearing
      this.d.y.c = d.c; //count
      this.d.y.d = d.d; //duration
      this.d.y._cb = d.cb; //callback
      this.d.y._cba = d.cba; //callbackargs
      return this;
    },
    cbY: function (cb) {
      if (cb === 1) {
        this.d.y._cb = null;
        this.d.y._cba = null;
        return this;
      } else {
        if (this.d.y._cb) {
          for (let i = 0, iLen = this.d.y._cb.length; i < iLen; i++) {
            //console.log(this.d.y._cb[i]);
            //console.log(this.d.y._cba[i]);
            this.d.y._cb[i](this.d.y._cba[i]);
            //this[this.d.y._cb[i]](this.d.y._cba[i]);
          }
        } else {
          return;
        }
      }
    },
  });
  /*Crafty.c("_N", {
    updateN: function() {
      this.d.y.c--;
      this.y -= this.d.y.a;
      if (this.d.y.c < 1) {
        this.cbY();
        //this.removeComponent("_N");
      }
      else { return this; }
    },
    remove: function() {
      //this.cbY();
      //this.cbY(1);
    }
  });
  Crafty.c("_S", {
    updateS: function() {
      this.d.y.c--;
      this.y += this.d.y.a;
      if (this.d.y.c < 1) {
        this.cbY();
        //this.removeComponent("_S");
      }
      else { return this; }
    },
    remove: function() {
      //this.cbY();
      //this.cbY(1);
    }
  });*/
  Crafty.c("_NW", {
    init: function () {
      this.fT = 50;
      //this.f = (this.y + this.h) / 50;
      //this.f = (this.vuH(100) + this.h) / 50;
      this.fX = this.vuW(100) / 50;
      this.fY = this.vuH(100) / 50;
    },
    update: function () {
      this.fxT--;
      //this.x -= this.fX;
      this.y -= this.fY;
      if (this.fxT < 1) {
        this.removeComponent("_GFX").
          removeComponent("_NW");
      } else {
        return this;
      }
    },
  });
  Crafty.c("_SE", {
    init: function () {
      this.fT = 50;
      //this.f = (this.y + this.h) / 50;
      //this.f = (this.vuH(100) + this.h) / 50;
      this.fX = this.vuW(100) / 50;
      this.fY = this.vuH(100) / 50;
    },
    update: function () {
      this.fxT--;
      //this.x += this.fX;
      this.y += this.fY;
      if (this.fxT < 1) {
        this.removeComponent("_GFX").
          removeComponent("_SE");
      } else {
        return this;
      }
    },
  });
  Crafty.s("SET_FADEUP", {
    update: function () {
      let fQ = Crafty("_FADEUP").get();
      if (fQ.length) {
        for (let i = fQ.length - 1; i >= 0; i--) {
          let f = fQ[i];
          this.setFadeUp(f);
        }
      } else {
        return;
      }
    },
    setFadeUp: function (f) {
      f.fadeUp();
      if (f.o < 1) {
        f.destroy(); //removeComponent("_FADEUP");
      }
    },
  }, true);
  Crafty.s("SET_DIR", {
    update: function () {
      this.setN();
      this.setS();
    },
    setN: function () {
      let nQ = Crafty("_N").get();
      if (nQ.length) {
        for (let i = nQ.length - 1; i >= 0; i--) {
          let e = nQ[i];
          e.d.y.c--;
          e.y -= e.d.y.a;
          if (e.d.y.c < 1 && e.d.y._cb) {
            for (let i = 0, iLen = e.d.y._cb.length; i < iLen; i++) {
              e.d.y._cb[i](e.d.y._cba[i]);
            }
          }
        }
      } else {
        return;
      }
    },
    setS: function () {
      let sQ = Crafty("_S").get();
      if (sQ.length) {
        for (let i = sQ.length - 1; i >= 0; i--) {
          let e = sQ[i];
          //e.updateS();
          e.d.y.c--;
          e.y += e.d.y.a;
          if (e.d.y.c < 1) {
            //e.cbY();
            //this.removeComponent("_N");
          }
        }
      } else {
        return;
      }
    }
  }, true);
  Crafty.s("SET_X", {
    update: function () {
      let gQ = Crafty("_GFX").get();
      if (gQ.length) {
        for (let i = gQ.length - 1; i >= 0; i--) {
          let u = gQ[i];
          this.setGfx(u);
        }
      } else {
        return;
      }
    },
    setGfx: function (u) {
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
        attr({
          z: cKeyL
        });
      if (u.keyz.dX === -1) {
        uImg.flip("X").addComponent("FLIPPED");
      }
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
    dHp: function (u, uImg) {
      let hx;
      if (uImg.__c["FLIPPED"]) {
        hx = uImg.x + uImg.vuW(this.getX(1.2));
      } else {
        hx = uImg.x + uImg.vuW(this.getX(1));
      }
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
    dTicker: function (u) {
      u.removeComponent("_GFX").
        addComponent("_TOCK").
        tock({
          dur: u.keyz.aF,
          cb: ["addComponent", "addComponent"],
          args: ["_TARGET", "_MOVABLE"]
        });
    },
    getX: function (x) {
      //let x = v.vuW(100 * 1 / 15 * x);
      let nuX = 1 / 0.15 * x;
      return nuX;
    }
  }, true);
});