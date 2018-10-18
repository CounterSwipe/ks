define(function (require) {
  let Crafty = require("crafty");
  let Console = console;
  let logit = Console.log;
  Crafty.c("_FX_S", {
    init: function () {
      let dur = 45;
      let yPerc = this.y / this.vuH(100); //originalY//e.y
      let self = this;
      this.d = {
        y: {
          c: dur, //count
          dir: 1,
          dist: 0.25 / 16 * 100 * this.vue.r,
          dur: dur, //duration
          y: yPerc,
          _cb: [function (cba) {
            cba.removeComponent("_S").removeComponent("_FX_S");
          }],
          _cba: [self]
        }
      };
      this.addComponent("_S");
      //logit("@_FX_S");
      return this;
    },
    remove: function () {
      this.addComponent("_FX_N");
    }
  });
  Crafty.c("_FX_N", {
    init: function () {
      let dur = 60;
      let yPerc = this.y / this.vuH(100); //originalY//e.y
      let self = this;
      this.d = {
        y: {
          c: dur, //count
          dir: -1,
          dist: 0.25 / 16 * 100 * this.vue.r,
          dur: dur, //duration
          y: yPerc,
          _cb: [function (cba) {
            cba.removeComponent("_N").removeComponent("_FX_N");
          }],
          _cba: [self]
        }
      };
      this.addComponent("_N");
      //logit("@_FX_N", this.vuW(100) * 1 / 16, this.vuH(this.d.y.dist));
    },
    remove: function () {
      this.addComponent("_FX_S");
    }
  });
  Crafty.s("SET_DIM", {
    update: function () {
      let dQ = Crafty("_DIM").get();
      if (dQ.length) {
        for (let i = dQ.length - 1; i >= 0; i--) {
          let e = dQ[i];
          e.o.c--;
          e.alpha = e.alpha + (e.o.a * e.o.b);
          if (e.o.c < 1 && e.o._cb) {
            for (let i = 0, iLen = e.o._cb.length; i < iLen; i++) {
              e.o._cb[i](e.o._cba[i]);
            }
          }
        }
      } else {
        return;
      }
    },
  }, true);
  Crafty.s("SET_DIR", {
    update: function () {
      this.setDir("_N");
      this.setDir("_S");
    },
    setDir: function (dir) {
      let dQ = Crafty(dir).get();
      if (dQ.length) {
        for (let i = dQ.length - 1; i >= 0; i--) {
          let e = dQ[i];
          e.d.y.c--;
          let prog = (e.d.y.dur - e.d.y.c) / e.d.y.dur;
          let dist = e.vuH(e.d.y.dist);
          let amt = e.d.y.dir * (dist * prog);
          let y = e.vuH(e.d.y.y * 100) + amt;
          e.y = y;
          if (e.d.y.c < 1 && e.d.y._cb) {
            for (let i = 0, iLen = e.d.y._cb.length; i < iLen; i++) {
              e.d.y._cb[i](e.d.y._cba[i]);
            }
          }
        }
      } else {
        return;
      }
    }
  }, true);
  Crafty.s("SET_SIZE", {
    update: function () {
      this.setSize();
      this.setSF("_sFt");
      this.setSF("_sFm");
      this.setSF("_sFb");
    },
    setSize: function () {
      let sQ = Crafty("_SIZE").get();
      if (sQ.length) {
        for (let i = sQ.length - 1; i >= 0; i--) {
          let s = sQ[i];
          //console.log(f.fSize, f.x, f.w, f.y, f.h);
          s.s.c--;
          /*
          s.w = s.w + s.vuW(s.s.a);
          s.x = s.x + s.vuW(s.s.b);
          s.h = s.h + s.vuH(s.s.a);
          s.y = s.y + (s.vuH(s.s.b));
          */
          let prog = (s.s.dur - s.s.c) / s.s.dur;
          let xDist = s.vuW(s.s.xDist);
          let xAmt = s.s.xDir * (xDist * prog);
          let x = s.vuW(s.s.x * 100) + xAmt;
          let yDist = s.vuH(s.s.yDist);
          let yAmt = s.s.yDir * (yDist * prog);
          let y = s.vuH(s.s.y * 100) + yAmt;
          let wDist = s.vuW(s.s.wDist);
          let wAmt = s.s.wDir * (wDist * prog);
          let w = s.vuW(s.s.w * 100) + wAmt;
          let hDist = s.vuH(s.s.hDist);
          let hAmt = s.s.hDir * (hDist * prog);
          let h = s.vuH(s.s.h * 100) + hAmt;
          //
          s.x = x;
          s.w = w;
          if (s.__c["_H"]) {
            s.y = y;
            s.h = h;
          }
          //
          if (s.s.c < 1 && s.s._cb) {
            for (let i = 0, iLen = s.s._cb.length; i < iLen; i++) {
              s.s._cb[i](s.s._cba[i]);
            }
          }
        }
      } else {
        return;
      }
    },
    setSF: function (sF) {
      let sQ = Crafty(sF).get();
      if (sQ.length) {
        for (let i = sQ.length - 1; i >= 0; i--) {
          let f = sQ[i];
          //console.log(f.fSize, f.x, f.w);
          f.f.c--;
          f.w = f.w + f.vuW(f.f.d);
          f.x = f.x + f.vuW(f.f.b);
          if (f.__c["_sFm"]) {
            f.h = f.h + (f.vuH(f.f.a) / 2);
            f.y = f.y - (f.vuH(f.f.a) / 2);
          }
          if (f.__c["_sFb"]) {
            f.h = f.h + f.vuH(f.f.a);
            f.y = f.y - (f.vuH(f.f.a));
          }
          f.fSize = f.fSize + (f.f.a);
          f.nuTxt();
          if (f.f.c < 1 && f.f._cb) {
            for (let i = 0, iLen = f.f._cb.length; i < iLen; i++) {
              f.f._cb[i](f.f._cba[i]);
            }
          }
        }
      } else {
        return;
      }
    },
  }, true);
});