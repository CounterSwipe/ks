define(function (require) {
  let Crafty = require("crafty");
  Crafty.c("VUE", {
    vue: {
      w: 0,
      h: 0,
      a: 0,
      b: 0,
      c: window.innerWidth, //320,
      d: window.innerHeight, //454
      r: 0
    },
    //448 //480 //568
    //vue: { w: 0, h: 0, a: 0, b: 0, c: 450, d: 770 },
    //vue: { w: 0, h: 0, a: 0, b: 0, c: 450, d: 800 },
    init: function () {
      //TODO if iphoneX|_screenRatio -> vue.d = #
      //TODO @gfx -> d=# ? xSizeImgs : regSizeImgs etc
      //let topBar = 800 * 0.0375// = 30
      //800 - topBar = 770
    }
  });
  Crafty.c("GetVue", {
    init: function () {
      window.addEventListener("resize", Crafty("GetVue").get(0).getVue);
    },
    getVue: function () {
      Crafty("SetVue").trigger("Setvue");
    }
  });
  Crafty.c("SetVue", {
    events: {
      "Setvue": "setVue"
    },
    required: "VUE",
    init: function () {
      this.setVue();
    },
    setVue: function () {
      let v = Crafty("VUE").get(0);
      let maxW = window.innerWidth;
      let maxH = window.innerHeight;
      let ratio = Math.min(maxW / v.vue.c, maxH / v.vue.d);
      v.vue.a = v.vue.w;
      v.vue.b = v.vue.h;
      v.vue.w = v.vue.c * ratio;
      v.vue.h = v.vue.d * ratio;
      v.vue.r = Math.min(maxW / maxH, maxH / maxW);
      Crafty("NuVue").trigger("Nuvue");
    }
  });
  Crafty.c("NuVue", {
    events: {
      "Nuvue": "nuVue"
    },
    required: "VUE, 2D",
    vuW: function (coef) {
      return this.vue.w * (coef / 100);
    },
    vuH: function (coef) {
      return this.vue.h * (coef / 100);
    },
    nuX: function () {
      return this.x / this.vue.b * this.vue.h;
    },
    nuY: function () {
      return this.y / this.vue.b * this.vue.h;
    },
    nuW: function () {
      return this.w / this.vue.b * this.vue.h;
    },
    nuH: function () {
      return this.h / this.vue.b * this.vue.h;
    },
    vued: function (xywh) {
      this.attr({
        x: this.vuW(xywh.x),
        y: this.vuH(xywh.y),
        w: this.vuW(xywh.w),
        h: this.vuH(xywh.h)
      });
      return this;
    },
    nuVue: function () {
      this.attr({
        x: this.nuX(),
        y: this.nuY(),
        w: this.nuW(),
        h: this.nuH()
      });
      if (this.__c["TXT"]) {
        this.nuTxt();
      }
      /*
            if (this.vx) {
              this.torque();
            }
            if (this.vy) {
              this.nuSpdY();
            }
            function nuSpdY() {
              this.vy = this.dirY * nvH(this.spdX);
              return this;
            }*/
      return this;
    }
  });
  Crafty.c("bg", {
    setbg: function (grd) {
      let grds = [
        ["rgba(0,0,0,1)", "rgba(153,153,153,1)"], //0:blk
        ["rgba(0,0,255,1)", "rgba(0,153,255,1)"], //1:blu
        ["rgba(0,255,0,1)", "rgba(153,255,0,1)"], //2:grn
        ["rgba(153,153,153,1)", "rgba(240,240,240,1)"], //3:gry
        ["rgba(153,0,255,1)", "rgba(255,0,255,1)"], //4:prp
        ["rgba(153,0,0,1)", "rgba(255,0,0,1)"], //5:red
        ["rgba(0,153,153,1)", "rgba(0,255,255,1)"], //6:trq
        ["rgba(255,153,0,1)", "rgba(255,255,0,1)"]
      ]; //7:ylo
      let grd1 = grds[grd][0];
      let grd2 = grds[grd][1];
      Crafty.background("linear-gradient(45deg, " + grd1 + " 0, " + grd2 + " 100%)");
      return this;
    },
  });
  Crafty.c("Grd", {
    required: "2D, DOM, Color",
    grd: function (grd) {
      let grds = [
        ["rgba(0,0,0,1)", "rgba(153,153,153,1)"], //0:blk
        ["rgba(0,0,255,1)", "rgba(0,153,255,1)"], //1:blu
        ["rgba(0,255,0,1)", "rgba(153,255,0,1)"], //2:grn
        ["rgba(153,153,153,1)", "rgba(240,240,240,1)"], //3:gry
        ["rgba(153,0,255,1)", "rgba(255,0,255,1)"], //4:prp
        ["rgba(153,0,0,1)", "rgba(255,0,0,1)"], //5:red
        ["rgba(0,153,153,1)", "rgba(0,255,255,1)"], //6:trq
        ["rgba(255,153,0,1)", "rgba(255,255,0,1)"]
      ]; //7:ylo
      let grd1 = grds[grd][0];
      let grd2 = grds[grd][1];
      this.css("background", "" + grd1 + "").css("background", "-webkit-gradient(left bottom, right top, color-stop(0%," + grd1 + "), color-stop(100%," + grd2 + ")").css("background", "-webkit-linear-gradient(45deg, " + grd1 + " 0%, " + grd2 + " 100%)").css("backgroumd", "linear-gradient(45deg, " + grd1 + " 0%," + grd2 + " 100%)");
      return this;
    }
  });
  Crafty.c("TXT", {
    required: "NuVue, DOM, Text",
    nuTxt: function () {
      //let fS = this.fSize * (this.vue.h / 100);
      let fS = this.fW ? this.vuW(this.fSize) : this.vuH(this.fSize);
      this.textFont({
        size: fS + "px",
        lineHeight: fS + "px",
      });
      return this;
    },
    //txt: function(a, x, y, w, fF, fS, fA, fC, fT, fK, fW) {
    txt: function (tx) {
      let ff = ["Michroma", "Orbitron", "Russo One", "sans-serif"];
      let tA = ["left", "center", "right"];
      if (tx.fW) {
        this.fW = tx.fW;
      }
      this.fSize = tx.fS;
      this.textFont({
        family: ff[tx.fF]
      }).textAlign(tA[tx.fA]);
      if (tx.fT) {
        this.textFont({
          type: "italic"
        });
      }
      if (tx.fK) {
        this.css("-webkit-text-stroke", "0.025rem #333");
      }
      this.attr({
        alpha: tx.a
      }).color(tx.fC);
      this.vued({
        x: tx.x,
        y: tx.y,
        w: tx.w
      });
      this.unselectable();
      this.nuTxt();
      return this;
    },
    color: function (fC) {
      let fc = ["rgba(0,0,0,1)", "rgba(255,255,255,1)", //0:blk 1:wht
        "rgba(0,0,255,1)", "rgba(0,153,255,1)", //2:blu
        "rgba(0,255,0,1)", "rgba(153,255,0,1)", //4:grn
        "rgba(153,153,153,1)", "rgba(240,240,240,1)", //6:gry
        "rgba(153,0,255,1)", "rgba(255,0,255,1)", //8:prp
        "rgba(153,0,0,1)", "rgba(255,0,0,1)", //10:red
        "rgba(0,153,153,1)", "rgba(0,255,255,1)", //12:trq
        "rgba(255,153,0,1)", "rgba(255,255,0,1)"
      ]; //14:ylo
      this.css({
        "-webkit-text-fill-color": fc[fC],
        "color": fc[fC]
      });
      return this;
    }
  });
});