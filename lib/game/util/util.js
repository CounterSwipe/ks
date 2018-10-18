/*global Crafty*/
let C = Crafty;
C.c("VUE", {
  vue: {
    w: 0,
    h: 0,
    ow: 0,
    oh: 0,
    iw: window.innerWidth,
    ih: window.innerHeight,
    r: 0, //w/h || h/w
    gpx: 0,
    gap: 0,
    top: 0
  }
});
C.c("ReVue", {
  init: function () {
    window.addEventListener("resize", C("ReVue").get(0).reVue);
  },
  reVue: function () {
    C.s("_VUE").setVue();
  }
});
C.s("_VUE", {
  init: function () {
    C.e("VUE");
    C.e("ReVue");
    this.setVue();
  },
  setVue: function () {
    let v = C("VUE").get(0);
    let maxW = window.innerWidth;
    let maxH = window.innerHeight;
    let min = Math.min(maxW, maxH);
    v.vue.ow = v.vue.w;
    v.vue.oh = v.vue.h;
    v.vue.h = maxH;
    if (maxW / min === 1) {
      v.vue.w = maxW; //C.log("@portrait");
      if (v.vue.h / (v.vue.w * (1 / 16)) < 28) {
        let hp = (v.vue.h / 28) * 16;
        v.vue.w = hp;
        let pX = ((window.innerWidth - v.vue.w) / 2);
        this.setPad(pX);
      } else {
        let wUnit = v.vue.w / 16;
        let hWall = wUnit * 28;
        let gpx = v.vue.h - hWall;
        v.vue.gpx = gpx;
        let gAdj = gpx / wUnit;
        let gap = gAdj >> 0;
        let top = gAdj - gap;
        v.vue.gap = gap;
        v.vue.top = top;
        this.setPad(0);
      }
    } else {
      v.vue.w = maxH; //C.log("@landscape");
      if (v.vue.h / (v.vue.w * (1 / 16)) < 28) {
        let hl = (v.vue.h / 28) * 16;
        v.vue.w = hl;
      }
      let pX = ((window.innerWidth - v.vue.w) / 2);
      this.setPad(pX);
    }
    v.vue.r = Math.min(maxW / maxH, maxH / maxW);
    this.update();
  },
  setPad: function (pX) {
    let stage = document.getElementById("cr-stage");
    let c = stage.firstChild;
    let d = stage.lastChild;
    if (c) {
      c.style.left = (pX >> 0) + "px";
      let ctx = document.getElementsByTagName("canvas");
      if (ctx) {
        for (let i = 0, iLen = ctx.length; i < iLen; i++) {
          ctx[i].style.left = (pX >> 0) + "px";
        }
      }
    }
    if (d) {
      d.style.left = (pX >> 0) + "px";
    }
  },
  update: function () {
    let v = C("VUE").get(0);
    let vQ = C("VUES").get();
    if (vQ.length) {
      for (let i = vQ.length - 1; i >= 0; i--) {
        let e = vQ[i];
        e.getVue();
        e.attr({
          x: e.x / v.vue.ow * v.vue.w,
          y: e.y / v.vue.oh * v.vue.h,
          w: e.w / v.vue.ow * v.vue.w,
          h: e.h / v.vue.oh * v.vue.h
        });
        if (e.__c["TXTS"]) {
          this.nuTxt(e);
        }
      }
    }
  },
  nuTxt: function (e) {
    let fS = e.v.fW ? e.vuW(e.v.fS) : e.vuH(e.v.fS);
    e.textFont({
      size: (fS >> 0) + "px",
      lineHeight: (fS >> 0) + "px",
    });
  }
});
C.c("VUES", {
  required: "2D",
  init: function () {
    this.v = {};
    this.getVue();
  },
  getVue: function () {
    let v = C("VUE").get(0);
    this.v.w = v.vue.w;
    this.v.h = v.vue.h;
    this.v.top = v.vue.top;
    this.v.gap = v.vue.gap;
    return this;
  },
  vuW: function (coef) {
    return this.v.w * (coef / 100);
  },
  vuH: function (coef) {
    return this.v.h * (coef / 100);
  },
  vues: function (xywh) {
    let wy = xywh.wy || 0;
    let wh = xywh.wh || 0;
    this.attr({
      x: (this.vuW(xywh.x) >> 0),
      y: wy ? (this.vuW(xywh.y) >> 0) : (this.vuH(xywh.y) >> 0),
      w: (this.vuW(xywh.w) >> 0),
      h: wh ? (this.vuW(xywh.h) >> 0) : (this.vuH(xywh.h) >> 0),
    });
    return this;
  },
});