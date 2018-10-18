/*global Crafty*/
let C = Crafty;
C.s("_UI", {
  init: function () {
    this.setScore();
    this.setEnergy();
    this.setPotential(1);
    this.setPotential(2);
    this.setNotes();
  },
  setScore: function () {
    let s = C.e("Score");
    C.e("BlkBar, Sbar").attr({
      alpha: 0.5
    });
    C.e("BluBar, Sbar, FX");
    C.e("RedBar, Sbar, FX");
    this.setBars(1);
    this.setBars();
    let p1 = Crafty("1P Player").get(0).db.name;
    let p2 = Crafty("2P Player").get(0).db.name;
    let max = s.db._max;
    C.e("1P, pName, Tx, Op8, Op").tx({
      fA: 1,
      fS: 0.7,
      tx: p1 //"MATEO NAVARRETE"
    }).textColor("white");
    C.e("2P, pName, Tx, Op8, Op").tx({
      fA: 1,
      fS: 0.7,
      tx: p2 //"CHANCE WRISTAKER" //"GENERAL FEAR"
    }).textColor("white");
    C.e("1P, sNow, pScore, Tx, Op8, Op").tx({
      fS: 0.7,
      tx: "0"
    }).textColor("white");
    C.e("1P, sMax, pScore, Tx, Op3, Op").tx({
      fA: 2,
      fS: 0.7,
      tx: "/" + max
    }).textColor("white");
    C.e("2P, sNow, pScore, Tx, Op8, Op").tx({
      fS: 0.7,
      tx: "0"
    }).textColor("white");
    C.e("2P, sMax, pScore, Tx, Op3, Op").tx({
      fA: 2,
      fS: 0.7,
      tx: "/" + max
    }).textColor("white");
    C.e("TimeBox, WebGL, Gry, Op8, Op");
    C.e("1tIco, WebGL, Tbox, Blk, Op5, Op").mar({
      x: 0.05,
      y: 0.05,
      w: 0.1,
      h: 0.1
    });
    C.e("2tIco, WebGL, Tbox, Blk, Op5, Op").mar({
      x: 0.05,
      y: 0.05,
      w: 0.1,
      h: 0.1
    });
    C.e("1tIco, TimeIco").mar({
      x: 0.1,
      y: 0.1,
      w: 0.2,
      h: 0.2
    });
    C.e("2tIco, TimeIco").mar({
      x: 0.1,
      y: 0.1,
      w: 0.2,
      h: 0.2
    });
    C.e("Time, TimeBox, Mar, Tx").mar({
      y: 0.05
    }).tx({
      fS: 1,
      tx: 60
    });
  },
  setBars: function (y) {
    let wx = 1 / 16 * 100;
    let w = wx * 14 / 10;
    for (let i = 1; i < 10; i++) {
      let c = "dBlk"; //i === 5 || i === 8 ? "Blk" : "dBlk";
      C.e("VUES, WebGL, " + c).vues({
        x: w * i, //wx * i,
        y: y ? wx : 0,
        wy: 1,
        w: w * (i === 5 || i === 8 ? 0.1 : 0.05),
        h: wx,
        wh: 1
      }).attr({
        alpha: 0.5
      });
    }
  },
  setEnergy: function () {
    let e = C.e("1P, Energy");
    //this.e = e[0];
    C.e("2P, Energy");
    C.e("Ebar, Mar, dBlk").mar({
      w: -7.2
    }); //Red 
    let b = C.e("1P, Ebar, Mar, Trq, FX, EDRAW").mar({
      w: 8 //10
    });
    this.setEbars(b);
    C.e("Ebox, Gry, Mar, Rnd10, Rnd").mar({
      w: 0.2
    }); //Red
    C.e("1P, Ebox, Mar, Tx, EDRAW").mar({
      y: 0.1,
      w: 0.2
    }).tx({
      fS: 0.75,
      tx: e.db._energy.toFixed(1),
    });
  },
  setEbars: function (b) {
    let wx = 1 / 16 * 100;
    let w = wx * 8 / 10;
    let top = b.v.top;
    let gap = b.v.gap;
    for (let i = 1; i < 10; i++) {
      let c = "dBlk"; //i === 5 || i === 8 ? "Blk" : "dBlk";
      C.e("VUES, WebGL, " + c).vues({
        x: w * i, //wx * i,
        y: wx * (top + gap + 27.25),
        wy: 1,
        w: w * 0.1,
        h: wx * 0.5,
        wh: 1
      }).attr({
        alpha: 0.5
      });
    }
  },
  setPotential: function (p) {
    let db1 = C(p + "P 1T").get(0).db;
    let db2 = C(p + "P 2T").get(0).db;
    let db3 = C(p + "P 3T").get(0).db;
    let db4 = C(p + "P 4T").get(0).db;
    let altReq = db1[2].vals[1] + db2[2].vals[1] + db3[2].vals[1] + db4[2].vals[1];
    let ultReq = db1[3].vals[1] + db2[3].vals[1] + db3[3].vals[1] + db4[3].vals[1];
    let pau = C.e(p + "P, PAU, Potential, _PRI");
    pau.db.alt = {
      req: altReq,
      count: altReq
    };
    pau.db.ult = {
      req: ultReq,
      count: ultReq
    };
    if (p === 1) {
      this.setPobar();
    }
  },
  setPobar: function () {
    C.e("WebGL, Ibox, dBlk, Mar, Op8, Op").mar({
      x: 2.5,
      w: -5
    });
    C.e("WebGL, Ibox, dBlk, Mar").mar({
      x: 3.35,
      y: 0.375,
      w: -1,
      h: 0.75
    });
    C.e("WebGL, Ibox, dBlk, Mar").mar({
      x: 5.85,
      y: 0.375,
      w: -1,
      h: 0.75
    });
    C.e("1P, FX, WebGL, Ibox, Mar, Blk, ALTBAR").mar({
      x: 3.35,
      y: 0.375,
      w: 1,
      h: 0.75
    });
    C.e("1P, FX, WebGL, Ibox, Mar, Blk, ULTBAR").mar({
      x: 5.85,
      y: 0.375,
      w: 1,
      h: 0.75
    });
    for (let i = 0; i < 3; i++) {
      let ibox = C.e("WebGL, Ibox, dBlk, Mar").mar({
        x: i < 1 ? 2.6 : i > 1 ? 7.6 : 5.1
      });
      ibox.mar({
        x: 0.25,
        y: 0.25,
        w: 0.5,
        h: 0.5
      });
    }
    for (let j = 0; j < 6; j++) {
      let c = ["_PRI, Blk", "PRI, Ylo, STATE", "_ALT, Op0, Op, Blk", "ALT, OpOff, Ylo, STATE", "_ULT, Op0, Op, Blk", "ULT, OpOff, Ylo, STATE"];
      let s = j < 2 ? "rhombus" : j < 4 ? "bursty" : "bolt";
      C.e("Ibox, SHAPE, Mar, " + c[j]).shape(s).mar({
        x: j < 2 ? 2.6 : j < 4 ? 5.1 : 7.6
      });
    }
  },
  setNotes: function () {
    C.e("Note, WebGL, Color, Op0, Op")
      .color(0, 0, 0, 0.5).attr({
        z: 1000
      });
    C.e("NoteTx").tx({
      fS: 0.8,
      //tx: "ENERGY LOW! <br> NEED: + 2.555"
      //tx: "AREA OCCUPIED!"
      tx: "CARD CANCELLED!"
    });
  },
}, true);
C.c("pName", {
  required: "VUES",
  init: function () {
    let c = this.__c;
    let wx = 1 / 16 * 100;
    this.vues({
      x: wx * 0.1,
      y: wx * (c["1P"] ? 0.1 : 1.1),
      wy: 1,
      w: wx * 14,
      h: wx * 0.9,
      wh: 1
    });
  }
});
C.c("TimeBox", {
  required: "VUES",
  init: function () {
    let wx = 1 / 16 * 100;
    this.vues({
      x: wx * 14,
      y: 0,
      wy: 1,
      w: wx * 2,
      h: wx * 2,
      wh: 1
    });
  }
});
C.c("TimeIco", {
  required: "Tbox, SHAPE, Ylo",
  init: function () {
    this.shape("star").attr({
      alpha: 0
    });
  }
});
C.c("Tbox", {
  required: "VUES, Mar",
  init: function () {
    let c = this.__c;
    let wx = 1 / 16 * 100;
    this.vues({
      x: wx * (c["1tIco"] ? 14 : 15),
      y: wx,
      wy: 1,
      w: wx,
      h: wx,
      wh: 1
    });
  }
});
C.c("pScore", {
  required: "VUES",
  init: function () {
    let c = this.__c;
    let wx = 1 / 16 * 100;
    this.vues({
      x: wx * (c["sNow"] ? 11 : 12),
      y: wx * (c["1P"] ? 0.1 : 1.1),
      wy: 1,
      w: wx * 1.8,
      h: wx * 0.9,
      wh: 1
    });
  }
});
C.c("Sbar", {
  required: "VUES, WebGL",
  init: function () {
    let c = this.__c;
    let grd = c["RedBar"] ? "dRed" : c["BluBar"] ? "dBlu" : "dBlk";
    let wx = 1 / 16 * 100;
    this.vues({
      x: 0,
      y: c["RedBar"] ? wx : 0,
      wy: 1,
      w: c["BlkBar"] ? wx * 14 : 0,
      //w: c["BlkBar"] ? wx * 14 : c["RedBar"] ? wx : wx * 7.5,
      h: wx * (c["BlkBar"] ? 2 : 0.9),
      wh: 1
    });
    this.addComponent(grd);
  }
});
C.c("Sbars", {
  required: "VUES", //DOM
  init: function () {
    //let v = this.v;
    let i = this.__c["RedBar"] ? 8 : 0;
    let wx = 1 / 16 * 100;
    this.vues({
      x: wx * i, //10
      y: wx, //wx * (v.top + v.gap + 21.25),
      wy: 1,
      w: wx * 8,
      h: wx * 0.4,
      wh: 1
    });
  },
});
C.c("Sbox", {
  required: "VUES", //DOM
  init: function () {
    //let v = this.v;
    let wx = 1 / 16 * 100;
    this.vues({
      x: wx * 7, //10
      y: 0, //wx * (v.top + v.gap + 21.25),
      wy: 1,
      w: wx * 2,
      h: wx,
      wh: 1
    });
  },
});