/*global Crafty*/
let C = Crafty;
C.c("SHAPES", {
  shapes: {
    angle: "polygon(0 0, 0 100%, 100% 0)",
    badge: "polygon(100% 0, 100% 65%, 50% 100%, 0 65%, 0 0)",
    bars: "polygon(20% 100%, 20% 66%, 0 66%, 0 100%, 60% 100%, 60% 33%, 40% 33%, 40% 100%, 100% 100%, 100% 0, 80% 0, 80% 100%)",
    bolt: "polygon(33% 5%, 66% 5%, 50% 35%, 70% 35%, 33% 95%, 40% 55%, 25% 55%)",
    burst: "polygon(50% 0%, 65% 15%, 85% 15%, 85% 35%, 100% 50%, 85% 65%, 85% 85%, 65% 85%, 50% 100%, 35% 85%, 15% 85%, 15% 65%, 0% 50%, 15% 35%, 15% 15%, 35% 15%)",
    bursty: "polygon(10% 10%, 40% 20%, 50% 0%, 60% 20%, 90% 10%, 80% 40%, 100% 50%, 80% 60%, 90% 90%, 60% 80%, 50% 100%, 40% 80%, 10% 90%, 20% 60%, 0% 50%, 20% 40%)",
    cards: "polygon(0 0, 0 100%, 100% 100%, 100% 0, 40% 0, 40% 15%, 45% 10%, 55% 10%, 60% 15%, 58% 30%, 50% 35%, 42% 30%, 40% 35%, 50% 57%, 60% 35%, 65% 38%, 75% 40%, 84% 69%,83% 90%, 75% 91%,75% 70%, 70% 53%, 67% 65%, 70% 90%,57% 100%,50% 90%,43% 100%, 30% 90%, 33% 65%, 30% 53%, 25% 70%, 25% 91%, 17% 90%, 16% 69%, 25% 40%, 35% 38%, 40% 35%, 42% 30%, 40% 15%, 40% 0%)",
    carded: "polygon(0% 0%, 0% 100%, 10% 100%, 10% 10%, 90% 10%, 90% 90%, 50% 90%, 50% 80%, 25% 80%, 25% 50%, 50% 50%, 50% 40%, 40% 40%, 40% 20%, 60% 20%, 60% 40%, 50% 40%, 50% 50%, 75% 50%, 75% 80%, 50% 80%, 50% 90%, 10% 90%, 10% 100%, 100% 100%, 100% 0%)",
    card: "polygon(0% 0%, 0% 100%, 25% 100%, 25% 50%, 50% 50%, 50% 35%, 40% 35%, 40% 15%, 60% 15%, 60% 35%, 50% 35%, 50% 50%, 75% 50%, 75% 80%, 20% 80%, 20% 100%, 100% 100%, 100% 0%)",
    circle: "circle(50% at 50% 50%)",
    close: "polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)",
    disc: "ellipse(50% 25% at 50% 50%)",
    home: "polygon(50% 0, 100% 35%, 100% 100%, 60% 100%, 60% 60%,40% 60%,40% 100%,0 100%, 0 35%)",
    hex: "polygon(95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%, 50% 0)",
    locked: "polygon(100% 100%, 100% 30%, 80% 30%, 80% 10%, 60% 0%, 40% 0%, 20% 10%, 20% 30%, 0 30%, 0% 100%, 10% 100%, 10% 90%, 10% 40%, 90% 40%, 90% 90%, 10% 90%, 10% 40%, 30% 35%, 30% 17%, 45% 10%, 55% 10%, 70% 17%, 70% 30%, 0% 30%, 10% 100%)",
    marker: "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)",
    pinL: "polygon(70% 60%, 70% 75%, 50% 100%, 30% 75%, 30% 50%, 50% 50%, 20% 25%, 50% 0, 50% 5%, 27% 25%, 50% 45%, 50% 50%, 80% 50%, 50% 25%, 80% 0, 80% 5%, 57% 25%, 80% 45%, 80% 50%, 30% 50%, 30% 60%)",
    pinR: "polygon(70% 60%, 70% 75%, 50% 100%, 30% 75%, 30% 50%, 20% 50%, 20% 45%, 43% 25%, 20% 5%, 20% 0, 50% 25%, 20% 50%, 50% 50%, 50% 45%, 73% 25%, 50% 5%, 50% 0, 80% 25%, 50% 50%, 30% 50%, 30% 60%)",
    pinU: "polygon(50% 50%, 30% 60%, 70% 60%, 70% 75%, 50% 100%, 30% 75%, 30% 60%, 50% 50%, 50% 0, 25% 47%, 30% 47%, 50% 7.5%, 70% 47%, 75% 47%, 50% 0)",
    pinV: "polygon(50% 50%, 30% 60%, 70% 60%, 70% 75%, 50% 100%, 30% 75%, 30% 60%, 50% 50%, 50% 45%, 25% 7%, 30% 7%, 50% 37.5%, 70% 7%, 75% 7%, 50% 45%)",
    pinX: "polygon(70% 60%, 70% 75%, 50% 100%, 30% 75%, 30% 50%,20% 50%, 20% 45%, 43% 25%, 20% 5%, 20% 0, 50% 25%, 20% 50%, 50% 50%, 80% 50%, 50% 25%, 80% 0, 80% 5%, 57% 25%, 80% 45%, 80% 50%, 30% 50%, 30% 60%)",
    pinsL: "polygon(100% 55%, 100% 75%, 50% 100%, 0 75%, 0 50%, 100% 50%, 50% 25%, 100% 0, 100% 5%, 61.5% 25%, 100% 45%, 100% 50%, 50% 50%, 0% 25%, 50% 0, 50% 5%, 11.5% 25%, 50% 45%, 50% 50%, 0 50%, 0 55%)",
    pinsR: "polygon(100% 55%, 100% 75%, 50% 100%, 0 75%, 0 50%, 0 45%, 38.5% 25%, 0 5%, 0 0, 50% 25%, 0 50%, 50% 50%, 50% 45%, 88.5% 25%, 50% 5%, 50% 0, 100% 25%, 50% 50%, 0 50%, 0 55%)",
    play: "polygon(0 0, 0% 100%, 100% 50%)",
    plus: "polygon(0 40%, 40% 40%, 40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%)",
    rhombus: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    shop: "polygon(50% 30%, 65% 0%, 87% 7%, 90% 10%, 100% 90%, 90% 92%, 80% 40%, 75% 65%, 80% 90%,57% 100%,50% 90%,43% 100%, 20% 90%, 25% 65%, 20% 40%, 10% 92%, 0% 90%, 10% 10%, 12% 7%, 35% 0%)",
    squares: "polygon(35% 35%, 50% 20%, 65% 35%, 65% 15%, 85% 15%, 85% 35%, 65% 35%, 80% 50%, 65% 65%, 85% 65%, 85% 85%, 65% 85%, 65% 65%, 50% 80%, 35% 65%, 35% 85%, 15% 85%, 15% 65%, 35% 65%, 20% 50%, 35% 35%, 15% 35%, 15% 15%, 35% 15%)",
    star: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
    stop: "polygon(30% 10%, 70% 10%, 90% 30%, 90% 70%, 70% 90%, 30% 90%, 10% 70%, 10% 30%)",
    store: "polygon(20% 0, 80% 0, 80% 10%, 20% 10%, 20% 15%, 80% 15%, 100% 40%, 100% 50%, 95% 50%, 95% 100%, 85% 100%, 85% 50%,60% 50%,60% 100%, 50% 100%, 50% 50%, 15% 50%, 15% 80%, 50% 80%, 50% 100%, 5% 100%, 5% 50%, 0 50%, 0 40%, 20% 15%)",
    //tap: "polygon(20% 0%, 45% 0%, 45% 33%, 100% 33%, 100% 80%, 80% 100%, 20% 100%, 0% 70%, 0% 50%, 20% 50%)"
    tapit: "polygon(20% 5%, 25% 0%, 40% 0%,45% 5%, 47% 33%, 90% 35%,100% 45%, 100% 75%, 85% 100%, 20% 100%, 15% 90%, 0% 70%, 0% 57%, 10% 50%, 17% 50%)"
  }
});
C.c("SHAPE", {
  required: "VUES, DOM, Color",
  init: function () {
    if (!C("SHAPES").get(0)) {
      C.e("SHAPES");
    }
  },
  shape: function (shape) {
    let shapes = C("SHAPES").get(0).shapes;
    this.css({
      "-webkit-clip-path": shapes[shape],
      "clip-path": shapes[shape]
    }).addComponent(shape);
    return this;
  }
});
C.c("Colors", {
  colors: [
    "rgba(33,33,33,1)", "rgba(0,0,0,1)", //1:blk
    "rgba(66,66,66,1)", "rgba(48,48,48,1)", //2:dark 
    "rgba(255,255,255,1)", "rgba(153,153,153,1)", //4:wht    
    "rgba(237,85,101,1)", "rgba(214,39,57,1)", //6red
    "rgba(252,110,81,1)", "rgba(219,57,30,1)", //8dk org
    "rgba(255,218,124,1)", "rgba(246,167,66,1)", //10org ylo
    "rgba(160,212,104,1)", "rgba(110,175,38,1)", //12grn
    "rgba(72,207,173,1)", "rgba(25,167,132,1)", //14aqu
    "rgba(79,193,233,1)", "rgba(11,155,208,1)", //16trq
    "rgba(93,156,236,1)", "rgba(13,101,216,1)", //18blu
    "rgba(172,146,236,1)", "rgba(116,85,195,1)", //20prp
    "rgba(236,135,192,1)", "rgba(191,76,144,1)", //22mag
    "rgba(237,241,247,1)", "rgba(201,215,233,1)", //24ltgry|wht
    "rgba(204,209,217,1)", "rgba(143,154,168,1)", //26gry
    "rgba(101,109,120,1)", "rgba(47,54,64,1)", //28dk gry
    "transparent"
  ]
});
C.c("Grd", {
  required: "VUES, Color",
  init: function () {
    if (!C("Colors").get(0)) {
      C.e("Colors");
    }
  },
  grd: function (g) {
    let gA = this.grds(g.a);
    if (this.__c["DOM"]) {
      let gB = this.grds(g.b) || 0;
      let grd = g.g || 0;
      let css = "";
      switch (grd) {
        case 1:
          css = "linear-gradient(to bottom, " + gA + " 0%," + gB + " 100%)";
          break;
        case 2:
          css = "linear-gradient(45deg, " + gA + " 0%," + gB + " 100%)";
          break;
        case 3:
          css = "radial-gradient(ellipse at center, " + gA + " 0%," + gA + " 20%, " + gB + " 100%)";
          break;
        default:
          css = gA;
          break;
      }
      this.css({
        "background": css
      });
    } else {
      this.color(gA);
    }
    return this;
  },
  grds: function (g) {
    let grds = C("Colors").get(0).colors;
    return grds[g];
  }
});

C.c("Red", {
  required: "Grd",
  init: function () {
    this.grd({
      a: 6,
      b: 7,
      g: this.__c["DOM"] ? 3 : 0
    });
  },
});
C.c("dRed", {
  required: "Grd",
  init: function () {
    this.grd({
      a: 7,
      //b: 7,
      g: 0
    });
  },
});
C.c("Org", {
  required: "Grd",
  init: function () {
    this.grd({
      a: 8,
      b: 9,
      g: this.__c["DOM"] ? 3 : 0
    });
  },
});
C.c("Ylo", {
  required: "Grd",
  init: function () {
    this.grd({
      a: 10,
      b: 11,
      g: this.__c["DOM"] ? 3 : 0
    });
  },
});
C.c("Grn", {
  required: "Grd",
  init: function () {
    this.grd({
      a: 12,
      b: 13,
      g: this.__c["DOM"] ? 3 : 0
    });
  },
});
C.c("Aqu", {
  required: "Grd",
  init: function () {
    this.grd({
      a: 14,
      b: 15,
      g: this.__c["DOM"] ? 3 : 0
    });
  },
});
C.c("Trq", {
  required: "Grd",
  init: function () {
    this.grd({
      a: 16,
      b: 17,
      g: this.__c["DOM"] ? 3 : 0
    });
  },
});
C.c("Blu", {
  required: "Grd",
  init: function () {
    this.grd({
      a: 18,
      b: 19,
      g: this.__c["DOM"] ? 3 : 0
    });
  },
});
C.c("dBlu", {
  required: "Grd",
  init: function () {
    this.grd({
      a: 19,
      //b: 19,
      g: 0
    });
  },
});
C.c("Prp", {
  required: "Grd",
  init: function () {
    this.grd({
      a: 20,
      b: 21,
      g: this.__c["DOM"] ? 3 : 0
    });
  },
});
C.c("Mag", {
  required: "Grd",
  init: function () {
    this.grd({
      a: 22,
      b: 23,
      g: this.__c["DOM"] ? 3 : 0
    });
  },
});
C.c("Wht", {
  required: "Grd",
  init: function () {
    this.grd({
      a: 24,
      b: 25,
      g: this.__c["DOM"] ? 3 : 0
    });
  },
});
C.c("Gry", {
  required: "Grd",
  init: function () {
    this.grd({
      a: 26,
      b: 27,
      g: this.__c["DOM"] ? 3 : 0
    });
  },
});
C.c("Blk", {
  required: "Grd",
  init: function () {
    this.grd({
      a: 28,
      b: 29,
      g: this.__c["DOM"] ? 3 : 0
    });
  },
});
C.c("dBlk", {
  required: "Grd",
  init: function () {
    this.grd({
      a: 0,
      b: 1,
      g: this.__c["DOM"] ? 3 : 0
    });
  },
});

C.c("Tx", {
  required: "DOM, Text",
  tx: function (t) {
    let wx = 1 / 16 * 100;
    let fA = ["center", "left", "right"];
    let fS = (this.vuW(wx * t.fS) >> 0) + "px";
    let f = {
      size: fS,
      lineHeight: fS
    };
    this.textAlign(fA[t.fA || 0]);
    this.textFont(f);
    if (t.tx) {
      this.text("" + t.tx + "");
    }
    this.unselectable();
    return this;
  },
});