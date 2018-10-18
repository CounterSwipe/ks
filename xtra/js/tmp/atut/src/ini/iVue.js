define(function (require) {
  let Crafty = require("crafty");
  let Console = console;
  let logit = Console.log;
  Crafty.s("SET_VUE", {
    init: function () {
      Crafty.e("GetVue");
      Crafty.e("SetVue");
      this.setTop();
      this.setTile();
      this.setZone();
      this.setCards();
      this.setUnit();
      this.setEbar();
      this.setCover();
      this.setCorners();
      this.setTxt();
      this.setArrows();
    },
    setTop: function () {
      let z = 100;
      let e = Crafty.e("NuVue, WebGL, _BG" + (z + 1)).vued({
        x: 0,
        y: 0,
        w: 100,
        h: 0
      });
      e.h = e.w;
    },
    setTile: function () {
      let z = 100;
      //let y = [26, 48, 70];
      let y = [40, 55, 70];
      for (let i = 0; i < 3; i++) {
        let e = Crafty.e("NuVue, WebGL, _BG" + (z + 2)).vued({
          x: 0,
          y: y[i],
          w: 100,
          //w: 15 / 17 * 100,
          h: 0
        });
        //e.x = -e.vuW(1 / 17 * 100);
        //e.w = e.vuW(100 + (2 / 17 * 100));
        e.h = e.w;
      }
    },
    setZone: function () {
      let y = [40, 70]; //26
      let tw = Crafty("_BG" + 102).get(0).w;
      for (let i = 0; i < 2; i++) {
        let c = i === 1 ? 1 : 2;
        let e = Crafty.e("NuVue, WebGL, zp" + c).vued({
          x: i === 1 ? 3 / 16 * 100 : 10 / 16 * 100,
          y: y[i],
          w: 0,
          h: 0,
        });
        e.w = tw / 4;
        e.h = tw / 4;
      }
      logit(tw);
    },
    setCards: function () {
      let x = [0, 25, 50, 75];
      let t = [22, 33, 55, 88];
      for (let i = 0; i < 4; i++) {
        let e = Crafty.e("NuVue, WebGL, Color").vued({
          x: x[i] + 1 / 32 * 100,
          y: 85,
          w: 1 / 16 * 100,
          h: 0,
        }).color(255, 255, 255, 0.8);
        e.y = e.y + (e.w / 2);
        e.w = e.w * 3;
        e.h = e.w;
        let ee = Crafty.e("NuVue, WebGL, Color").vued({
          x: x[i],
          y: 85,
          w: 1 / 16 * 100,
          h: 0,
        }).color(0, 255, 255, 1);
        ee.h = ee.w;
        let et = Crafty.e("TXT").text("" + t[i] + "").txt({
          a: 1,
          x: x[i],
          y: 85 + (1 / 128 * 100),
          w: 1 / 16 * 100,
          fF: 2,
          fS: (1 / 24 * 100),
          fA: 1,
          fC: 0,
          fK: 1,
          fW: 1
        });
        et.h = et.w;
        //logit(et.fSize, et.vuW(et.fSize));
        let c = Crafty.e("NuVue, WebGL, CARD_u" + (11 + i) + "m1").vued({
          x: x[i],
          y: 85,
          w: 25,
          h: 0,
        });
        c.h = c.w;
      }
    },
    setUnit: function () {
      //let y = [26, 48, 70];
      let x = [9, 4.5, 2];
      let y = [40, 55, 70];
      for (let i = 0; i < 1; i++) {
        let u = Crafty.e("NuVue, WebGL, _add_FX_N, uPrp").vued({
          //let u = Crafty.e("NuVue, WebGL, uPrp, _add_FX_N, _add_SIZE, _H,").vued({
          x: x[i] / 16 * 100,// - (0.5 / 16 * 100),
          y: 55,//y[i],
          w: 5 / 16 * 100,
          h: 0,
        });
        u.h = u.w * 2;
        //u.h = rowSet.y - u.h + (row# * (w * 1/16 * 100))
        u.y = u.y - u.h + (3 * u.vuW(1 / 16 * 100));
        if (i === 1) {
          u.flip("X");
        }
        //this.setSizeIn(u);
        //this.setSizeOut(u);
      }
    },
    setSizeIn: function (e) {
      let dur = 60;
      e.s = {
        //a: 11 / dur, //fS31 -> 31-11=20/40|2:1swipe:counter
        //e: -1 * (5.5 / dur), //x:-100 -> -100-0=-100/40=2.5
        xDist: 0.1 / 16 * 100,
        yDist: 0.1 / 16 * 100,
        xDir: -1,
        yDir: -1,
        wDist: 0.2 / 16 * 100,
        hDist: 0.2 / 16 * 100,
        wDir: 1,
        hDir: 1,
        c: dur,
        //d: -1 * (5.5 / dur), //w:300 -> 300-100=200/40=5
        dur: dur,
        x: e.x / e.vuW(100),
        y: e.y / e.vuH(100),
        w: e.w / e.vuW(100),
        h: e.h / e.vuH(100),
        _cb: [function (cba) {
          logit("sizeTest", cba);
          cba.removeComponent("_SIZE");
        }],
        _cba: [e]
      };
      logit(e.s.xDist, e.s.yDist, e.s.wDist, e.s.hDist);
    },
    setSizeOut: function (e) {
      let dur = 60;
      e.s = {
        //a: 11 / dur, //fS31 -> 31-11=20/40|2:1swipe:counter
        //e: -1 * (5.5 / dur), //x:-100 -> -100-0=-100/40=2.5
        xDist: 0.1 / 16 * 100,
        yDist: 0.1 / 16 * 100,
        xDir: -1,
        yDir: -1,
        wDist: 0.2 / 16 * 100,
        hDist: 0.2 / 16 * 100,
        wDir: 1,
        hDir: 1,
        c: dur,
        //d: -1 * (5.5 / dur), //w:300 -> 300-100=200/40=5
        dur: dur,
        x: e.x / e.vuW(100),
        y: e.y / e.vuH(100),
        w: e.w / e.vuW(100),
        h: e.h / e.vuH(100),
        _cb: [function (cba) {
          logit("sizeTest", cba);
          cba.removeComponent("_SIZE");
        }],
        _cba: [e]
      };
      logit(e.s.xDist, e.s.yDist, e.s.wDist, e.s.hDist);
    },
    setUnitx: function () {
      let y = [26, 48, 70];
      let u = Crafty.e("NuVue, WebGL, uPrp").vued({
        x: 3 / 16 * 100,
        y: 26,
        w: 8 / 16 * 100,
        h: 0,
      });
      u.h = u.w; // * 2;
      //rowSet - h + (row# * (w*.25))
      u.y = u.y - u.h + (1 * (u.w * 0.125));

    },
    setEbar: function () {
      Crafty.e("NuVue, WebGL, Color").vued({
        x: 0,
        y: 82,
        w: 100,
        h: 2,
      }).color(0, 255, 255, 1);
    },
    setCover: function () {
      let e = Crafty.e("NuVue, WebGL, Color, _add_DIM").vued({
        x: 0,
        y: 0,
        w: 100,
        h: 100
      }).color(0, 0, 255, 0.5);
      this.setAddDim(e);
    },
    setAddDim: function (e) {
      let dur = 50;
      e.o = {
        a: e.alpha / dur,
        b: -1,
        c: dur,
        d: dur,
        o: e.alpha,
        _cb: [function (cba) {
          cba.alpha = 0;
          cba.removeComponent("_DIM");
        }],
        _cba: [e]
      };
    },
    setCorners: function () {
      for (let i = 0; i < 2; i++) {
        let c = i === 1 ? "_add_S, btmR" : "_add_N, topL";
        let e = Crafty.e("NuVue, WebGL, _DIR, " + c).vued({
          x: -1,
          y: -1,
          w: 102,
          h: 102
        });
        this.setAddDir(e);
      }
    },
    setAddDir: function (e) {
      let dur = 50;
      let yPerc = e.y / e.vuH(100); //originalY//e.y
      let c = e.__c["_add_N"] ? "_N" : "_S";
      e.d = {
        y: {
          c: dur, //count
          dir: e.__c["_add_N"] ? -1 : 1,
          dist: 100,
          dur: dur, //duration
          y: yPerc,
          _cb: [function (cba) {
            if (cba.__c["TXT"]) {
              cba.destroy();
            } else {
              cba.alpha = 0;
              cba.removeComponent(c);
            }
          }],
          _cba: [e]
        }
      };
    },
    setTxt: function () {
      let e = Crafty.e("TXT, _DIM, _add_sFm").text("START").txt({
        a: 0.5,
        x: 0,
        y: 38,
        w: 100,
        fF: 2,
        fS: 10,
        fA: 1,
        fC: 1,
        fK: 1
      });
      e.attr({
        h: e.vuH(10)
      });
      this.setPulse(e);
      this.setAddSF(e);
    },
    setPulse: function (e) {
      let dur = 250;
      e.o = {
        a: 0.3 / dur,
        b: 1,
        c: dur,
        d: dur,
        o: e.alpha,
        _cb: [function (cba) {
          cba.o.b = cba.o.b * -1;
          cba.o.c = cba.o.d;
        }],
        _cba: [e]
      };
    },
    setAddSF: function (e) {
      let dur = 25;
      e.f = {
        a: 20 / dur, //fS31 -> 31-11=20/40|2:1swipe:counter
        b: -2.5, //x:-100 -> -100-0=-100/40=2.5
        c: dur,
        d: 5, //w:300 -> 300-100=200/40=5
        _cb: [function (cba) {
          cba.destroy();
        }],
        _cba: [e]
      };
    },
    setArrows: function () {
      for (let i = 0; i < 2; i++) {
        let e = Crafty.e("TXT, _ARROW, _DIR, _N, _DIM, _TXT").text("^").txt({
          a: i === 1 ? 0 : 1,
          x: 0,
          y: i === 1 ? 55 : 50,
          w: 100,
          fF: 3,
          fS: 12,
          fA: 1,
          fC: 1
        });
        e.attr({
          h: e.vuH(10)
        });
        this.setDir(e);
        this.setFader(e);
      }
    },
    setDir: function (e) {
      let dur = 75;
      let yPerc = e.y / e.vuH(100); //originalY//e.y
      e.d = {
        y: {
          c: dur, //count
          dir: -1,
          dist: 5, //e.vuH(5);
          dur: dur, //duration
          y: yPerc,
          _cb: [function (cba) {
            cba.y = cba.vuH(yPerc * 100); //cba.vuH(65);
            cba.d.y.c = cba.d.y.dur;
          }],
          _cba: [e]
        }
      };
    },
    setFader: function (e) {
      let dur = 75;
      e.o = {
        a: 1 / dur,
        b: e.alpha === 1 ? -1 : 1,
        c: dur,
        d: dur,
        o: e.alpha,
        _cb: [function (cba) {
          cba.alpha = cba.o.o;
          cba.o.c = cba.o.d;
        }],
        _cba: [e]
      };
    }
  }, true);
});