define(function (require) {
  let Crafty = require("crafty");
  Crafty.s("SET_SIZE", {
    update: function () {
      this.setSize();
      this.setSizeFb();
      this.setSizeFt();
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
    setSizeFb: function () {
      let sQ = Crafty("_sFb").get();
      if (sQ.length) {
        for (let i = sQ.length - 1; i >= 0; i--) {
          let f = sQ[i];
          //console.log(f.fSize, f.x, f.w, f.y, f.h);
          f.f.c--;
          f.w = f.w + f.vuW(f.f.d);
          f.x = f.x + f.vuW(f.f.b);
          f.h = f.h + f.vuH(f.f.a);
          f.y = f.y - (f.vuH(f.f.a));
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
    setSizeFt: function () {
      let sQ = Crafty("_sFt").get();
      if (sQ.length) {
        for (let i = sQ.length - 1; i >= 0; i--) {
          let f = sQ[i];
          //console.log(f.fSize, f.x, f.w);
          f.f.c--;
          f.w = f.w + f.vuW(f.f.d);
          f.x = f.x + f.vuW(f.f.b);
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
      let nQ = Crafty(dir).get();
      if (nQ.length) {
        for (let i = nQ.length - 1; i >= 0; i--) {
          let e = nQ[i];
          e.d.y.c--;
          //e.y = e.y + (e.d.y.a * e.d.y.b);
          //let ny = oy + (dist * dir);
          //let prog = e.d.y.c / e.d.y.dur;
          let prog = (e.d.y.dur - e.d.y.c) / e.d.y.dur;
          let dist = e.vuH(e.d.y.dist);
          let amt = e.d.y.dir * (dist * prog);
          //let y = e.d.y.y + dist;
          //let y = e.vuH(e.d.y.y * 100) + amt;
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
});