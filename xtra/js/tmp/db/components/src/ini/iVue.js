define(function (require) {
  let Crafty = require("crafty");
  let Console = console;
  let logit = Console.log;
  Crafty.c("Pin", {
    init: function () {
      //TODO only load active pins
      for (let i = 11; i < 19; i++) {
        Crafty.e("NuVue, WebGL, PIN_u" + i + "m1").
          vued({
            x: 0,
            y: 0,
            w: 6,
            h: 8
          }).attr({
            alpha: 0,
            z: 1000 + i
          });
      }
      Crafty.e("NuVue, WebGL, PIN_wht").
        vued({
          x: 0,
          y: 0,
          w: 6,
          h: 8
        }).attr({
          alpha: 0,
          z: 1020
        });
      Crafty.e("NuVue, WebGL, PIN_x").
        vued({
          x: 0,
          y: 0,
          w: 6,
          h: 8
        }).attr({
          alpha: 0,
          z: 1020
        });
      Crafty.e("NuVue, WebGL, PIN_0").
        vued({
          x: 0,
          y: 0,
          w: 6,
          h: 8
        }).attr({
          alpha: 0,
          z: 1021
        });
    }
  });
  Crafty.s("SET_VUE", {
    init: function () {
      this.setVue();
      this.setTxt();
      this.setArrows();
      this.setStats();
    },
    setStats: function () {
      let w = window.innerWidth;
      let h = window.innerHeight;
      //let wh = w / h;
      let hw = h / w;
      let txts = w + " x " + h;
      let txtes = "h:w ratio: " + hw;
      Crafty.e("TXT").text(txts).
        txt({
          a: 0.5,
          x: 0,
          y: 80,
          w: 100,
          fF: 2,
          fS: 2.3,
          fA: 1,
          fC: 0,
          fT: 0
        });
      Crafty.e("TXT").text(txtes).
        txt({
          a: 0.5,
          x: 0,
          y: 83,
          w: 100,
          fF: 2,
          fS: 2.3,
          fA: 1,
          fC: 0,
          fT: 0
        });
    },
    setVue: function () {
      Crafty.e("GetVue");
      Crafty.e("SetVue");
      let z = 100;
      let dur = 30;
      //let ca = e.alpha;
      //let cb = ca === 1 ? -1 : 1;
      //let h = ((1 / 96.25) * 26) - ((1 / 96.25) * 3.75);
      let ratio = 1 / 96.25;
      //console.log(h * 100);
      //let c = Crafty.e("NuVue, WebGL, _add_SIZE, BG_" + z).
      let c = Crafty.e("NuVue, WebGL, _add_SIZE, _H, _BG" + z).
        vued({
          x: 0,
          y: 0,
          w: 113,
          h: ratio * 3600
        });
      //vued({ x: -5.5, y: -5.5, w: 111, h: 111 });
      let d = Crafty.e("NuVue, WebGL, _add_SIZE, _BG" + (z + 1)).
      //let c = Crafty.e("NuVue, WebGL, BG_" + z).
        vued({
          x: 0,
          y: ratio * 2600,
          w: 100,
          h: ratio * 3600
        });
      let e = Crafty.e("NuVue, WebGL, _add_SIZE, _BG" + (z + 1)).
      //let c = Crafty.e("NuVue, WebGL, BG_" + z).
        vued({
          x: 0,
          y: ratio * 4800,
          w: 100,
          h: ratio * 3600
        }); //iosX:6000
      let f = Crafty.e("NuVue, WebGL, _add_SIZE, _BG" + (z + 1)).
      //let c = Crafty.e("NuVue, WebGL, BG_" + z).
        vued({
          x: 0,
          y: ratio * 7000,
          w: 100,
          h: ratio * 3600
        }); //iosX:9400
      let g = Crafty.e("NuVue, WebGL, Color, _add_DIM").
        vued({
          x: 0,
          y: 0,
          w: 100,
          h: 100
        }).
        color(0, 0, 255, 0.5);
      this.setBG(c);
      this.setBG(d);
      this.setBG(e);
      this.setBG(f);
      this.setBG(g);
      g.o = {
        a: 1 / dur,
        b: -1, //1
        c: dur,
        d: dur,
        _cb: [function (h) {
          h.alpha = 0; //1; //0
          //e.o.c = e.o.d;
          h.removeComponent("_DIM");
        }],
        _cba: [g]
      };
      let a = Crafty.e("NuVue, WebGL, _add_N, _DIR, topL").
        vued({
          x: 0,
          y: 0,
          w: 100,
          h: 100
        });
      this.setFx(a);
      let b = Crafty.e("NuVue, WebGL, _add_S, _DIR, btmR").
        vued({
          x: 0,
          y: 0,
          w: 100,
          h: 100
        });
      this.setFx(b);
    },
    setBG: function (b) {
      let dur = 30;
      b.s = {
        //a: 11 / dur, //fS31 -> 31-11=20/40|2:1swipe:counter
        //b: -1 * (5.5 / dur), //x:-100 -> -100-0=-100/40=2.5
        xDist: b.__c["_H"] ? -6.5 : 6.5, //5.5,
        yDist: 3, //5.5,
        xDir: b.__c["_H"] ? 1 : -1,
        yDir: -1,
        wDist: 13, //11,
        hDist: 6, //11,
        wDir: 1,
        hDir: 1,
        c: dur,
        //d: -1 * (5.5 / dur), //w:300 -> 300-100=200/40=5
        dur: dur,
        x: b.x / b.vuW(100),
        y: b.y / b.vuH(100),
        w: b.w / b.vuW(100),
        h: b.h / b.vuH(100),
        _cb: [function (e) {
          logit("sizeTest", e);
          b.removeComponent("_SIZE");
        }],
        _cba: [b]
      };
    },
    setFx: function (e) {
      let dir = e.__c["_add_N"] ? -1 : 1;
      let dist = 100; //e.vuH(5);
      let dur = 50;
      let yPerc = e.y / e.vuH(100); //originalY//e.y
      let cPonet = e.__c["_add_N"] ? "_N" : "_S";
      //let yEnd = (e.y + (dir * dist)) / e.vuH(100);
      logit(yPerc);
      //let ca = e.alpha;
      //let cb = ca === 1 ? -1 : 1;
      e.d = {
        y: {
          //a: dist / dur, //amt/tick
          c: dur, //count
          dir: dir, //direction
          dist: dist, //distance
          dur: dur, //duration
          y: yPerc,
          //yB: yEnd,
          _cb: [function (e) {
            //logit(e);
            if (e.__c["TXT"]) {
              e.destroy();
            } else {
              e.alpha = 0;
              e.removeComponent(cPonet);
            }
          }],
          _cba: [e]
        }
      };
    },
    setTxt: function () {
      let a = Crafty.e("TXT, _add_sFb").text("COUNTER").
        txt({
          a: 1,
          x: 0,
          y: 44,
          w: 100,
          fF: 0,
          fS: 5.5,
          fA: 1,
          fC: 1,
          fT: 1
        }); //fS:5.5 y:44 h:5.5
      a.attr({
        h: a.vuH(5.5)
      });
      let b = Crafty.e("TXT, _add_sFt").text("SWIPE").
        txt({
          a: 1,
          x: 0,
          y: 50,
          w: 100,
          fF: 1,
          fS: 11,
          fA: 1,
          fC: 1,
          fT: 1
        });
      b.attr({
        h: b.vuH(11)
      });
      let c = Crafty.e("TXT, _add_S, _DIR").text("Mateo Navarrete | ©2018 All Rights Reserved.").
        txt({
          a: 0.5,
          x: 0,
          y: 96.5,
          w: 100,
          fF: 2,
          fS: 2.3,
          fA: 1,
          fC: 0,
          fT: 0
        });
      this.setFx(c);
      this.setSF(a);
      this.setSF(b);
    },
    setSF: function (f) {
      let a = f.__c["_add_sFb"] ? 10 : 20;
      f.f = {
        a: a / 40, //fS31 -> 31-11=20/40|2:1swipe:counter
        b: -2.5, //x:-100 -> -100-0=-100/40=2.5
        c: 40,
        d: 5, //w:300 -> 300-100=200/40=5
        _cb: [function (e) {
          //logit("test");
          e.destroy();
        }],
        _cba: [f]
      };
    },
    setArrows: function () {
      let a = Crafty.e("TXT, _ARROW, _DIR, _N, _DIM, _TXT").text("^").
        txt({
          a: 1,
          x: 0,
          y: 65,
          w: 100,
          fF: 1,
          fS: 12,
          fA: 1,
          fC: 1
        });
      a.attr({
        h: a.vuH(10)
      });
      let b = Crafty.e("TXT, _ARROW, _DIR, _N, _DIM").text("^").
      //let b = Crafty.e("TXT, _ARROW, _DIR").text("^").
        txt({
          a: 0,
          x: 0,
          y: 70,
          w: 100,
          fF: 1,
          fS: 12,
          fA: 1,
          fC: 1
        });
      b.attr({
        h: b.vuH(10)
      });
      this.setGfx(a);
      this.setGfx(b);
    },
    setGfx: function (e) {
      let dir = -1;
      let dist = 5; //e.vuH(5);
      let dur = 75;
      let yPerc = e.y / e.vuH(100); //originalY//e.y
      //let yEnd = (e.y + (dir * dist)) / e.vuH(100);
      logit(yPerc);
      let ca = e.alpha;
      let cb = ca === 1 ? -1 : 1;
      e.d = {
        y: {
          a: dist / dur, //amt/tick
          c: dur, //count
          dir: dir, //direction
          dist: dist, //distance
          dur: dur, //duration
          y: yPerc,
          //yB: yEnd,
          _cb: [function (e) {
            e.y = e.vuH(yPerc * 100); //e.vuH(65);
            e.d.y.c = e.d.y.dur;
          }],
          _cba: [e]
        }
      };
      e.o = {
        a: 1 / dur,
        b: cb, //-1, //1
        c: dur,
        d: dur,
        _cb: [function (e) {
          e.alpha = ca; //1; //0
          e.o.c = e.o.d;
        }],
        _cba: [e]
      };
    },
    start: function () {
      this.setDir("_SIZE");
      this.setDir("_DIM");
      this.setDir("_sFb");
      this.setDir("_sFt");
      this.setDir("_N");
      this.setDir("_S");
      let aQ = Crafty("_ARROW").get();
      if (aQ.length) {
        for (let i = aQ.length - 1; i >= 0; i--) {
          let e = aQ[i];
          e.destroy();
        }
      }
      Crafty("Touches").get(0).destroy();
    },
    setDir: function (dir) {
      let dQ = Crafty("_add" + dir).get();
      if (dQ.length) {
        for (let i = dQ.length - 1; i >= 0; i--) {
          let e = dQ[i];
          e.removeComponent("_add" + dir).addComponent(dir);
        }
      } else {
        return;
      }
    },
    initx: function () {
      Crafty.e("GetVue");
      Crafty.e("SetVue");
      Crafty.e("NuVue, WebGL, BG_0").
        attr({
          alpha: 1
        }).
        vued({
          x: 0,
          y: 0,
          w: 100,
          h: 100
        });
      Crafty.e("NuVue, WebGL, Color, GetMice").
        color("rgba(0,0,0,1)").attr({
          alpha: 0
        }).
        vued({
          x: 0,
          y: 0,
          w: 100,
          h: 100
        });
      Crafty.e("NuVue, WebGL, Color, _vNote").
        vued({
          x: 20,
          y: 49,
          w: 60,
          h: 5
        }).
        attr({
          alpha: 0,
          z: 3000
        }).
        color("rgba(0,0,0,.5)");
      let vn = Crafty.e("TXT, _vNote");
      vn.txt({
        a: 0,
        x: 20,
        y: 50,
        w: 60,
        fF: 2,
        fS: 3,
        fA: 1,
        fT: 0,
        fC: 15
      }).attr({
        z: 3001
      });
      //Crafty.e("NuVue, WebGL, Color").
      //vued({ x: 8/15 * 100, y: 52, w: 3/15 * 100, h: 4 }).
      //color(0, 255, 255, 1).attr({ alpha: 1 });
      Crafty.e("Pin");
    },
  }, true);
});