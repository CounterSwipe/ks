/*global Crafty*/
let C = Crafty;
C.c("1P", {
  required: "DB",
  init: function () {
    this.db.p = 1;
  },
});
C.c("2P", {
  required: "DB",
  init: function () {
    this.db.p = 2;
  },
});
C.c("DB", {
  init: function () {
    this.db = {};
  },
});
C.c("SETTINGS", {
  required: "DB",
  settings: function (s) {
    this.db.tMax = s.tm;
    return this;
  },
});

C.c("BG1", {
  required: "BG, Image",
  init: function () {
    this.image("/assets/noise.png", "repeat");
  },
});
C.c("BG", {
  required: "VUES, WebGL",
  init: function () {
    this.vues({
      x: 0,
      y: 0,
      w: 100,
      h: 100,
    });
  },
});
C.c("BGRside", {
  required: "VUES, DOM, Color",
  init: function () {
    this.vues({
      x: 100,
      y: 0,
      w: 1 / 8 * 100 * 2,
      h: 100,
    }).color(0, 0, 0, 1);
  },
});
C.c("Tile", {
  required: "VUES, WebGL", //Color
  tile: function (t) {
    let v = this.v;
    let wx = 1 / 16 * 100;
    let gh = (v.gap + 14) / 8; //6
    let x = t.y === 2 || t.y === 5 ? t.x + 2 : t.x;
    this.vues({
      x: (wx * x), //(wx * -4) + 
      y: wx * (v.top + 9 + (gh * t.y)),
      wy: 1,
      w: wx * 4,
      h: wx * 4,
      wh: 1
    }).attr({
      z: t.cell
    });
    return this;
  }
});
C.c("Cell", {
  required: "VUES, WebGL", //Color
  cell: function (c) {
    this.db.cell = c.cell;
    //this.db.cpos = c.cpos;
    //this.db.seq = c.seq;
    let v = this.v;
    let wx = 1 / 16 * 100;
    let gh = (v.gap + 14) / 8; //6
    this.vues({
      x: (wx * -4) + (wx * 2 * (c.x - 1)), //-1
      y: wx * (v.top + 9 + (gh * (c.y - 1))),
      wy: 1,
      w: wx * 2,
      h: wx * 1.25, //2
      wh: 1
    }).attr({
      alpha: c.a,
      z: c.cell
      //z: 3000 - c.cell
    });
    return this;
  }
});

C.c("Op", {
  init: function () {
    let c = this.__c;
    let i = c["Op0"] ? 0 : c["Op1"] ? 0.1 : c["Op3"] ? 0.3 : c["Op5"] ? 0.5 : c["Op8"] ? 0.8 : c["Op10"] ? 1 : C.log("opErr");
    this.attr({
      alpha: i
    });
  },
});
C.c("OpOff", {
  init: function () {
    this.alpha = this.alpha - 1;
  },
  remove: function () {
    this.alpha = this.alpha + 1;
  }
});
C.c("Mar", {
  mar: function (amt) {
    let wx = 1 / 16 * 100;
    let marX = this.vuW(wx * amt.x) || 0;
    let marY = this.vuW(wx * amt.y) || 0;
    let marW = this.vuW(wx * amt.w) || 0;
    let marH = this.vuW(wx * amt.h) || 0;
    this.attr({
      x: (this.x + marX) >> 0,
      y: (this.y + marY) >> 0,
      w: (this.w - marW) >> 0,
      h: (this.h - marH) >> 0,
    });
    return this;
  },
});
C.c("Mar51", {
  required: "Mar",
  init: function () {
    this.mar({
      x: 0.5,
      y: 0.5,
      w: 1,
      h: 1
    });
  },
});
C.c("Mar48", {
  required: "Mar",
  init: function () {
    this.mar({
      x: 0.4,
      y: 0.4,
      w: 0.8,
      h: 0.8
    });
  },
});
C.c("Mar255", {
  required: "Mar",
  init: function () {
    this.mar({
      x: 0.25,
      y: 0.25,
      w: 0.5,
      h: 0.5
    });
  },
});
C.c("Rnd", {
  init: function () {
    let c = this.__c;
    let i = c["Rnd3"] ? 3 : c["Rnd5"] ? 5 : c["Rnd10"] ? 10 : c["Rnd50"] ? 50 : C.log("rndErr");
    this.css({
      "border-radius": i + "%"
    });
  },
});

C.c("Energy", {
  init: function () {
    this.db._energy = 5;
  },
});
C.c("eRate", {
  required: "FX",
  init: function () {
    let fx = 3;
    let self = this;
    let cFun = function (cArg) {
      cArg.cba.removeComponent(cArg.fx + "fx");
      cArg.cba.fx[cArg.fx] = {};
      C.s("_INPUTS").vNote("FASTER ENERGY!"); //TODO: own comp?
      if (cArg.cba.__c["eRate1"]) {
        cArg.cba.removeComponent("eRate1").removeComponent("eRate").addComponent("eRate2");
      } else {
        cArg.cba.removeComponent("eRate2").addComponent("eRate3");
      }
    };
    let f = {
      e: self,
      fx: fx,
      now: 1,
      dur: 300,
      v: 0,
      amt: 0,
      start: 0,
      ease: 0,
      prop: 0,
      cFun: cFun,
      cArg: {
        cba: self,
        fx: fx
      }
    };
    self.addFX(f);
  },
});
C.c("eRate1", {
  required: "eRate",
});
C.c("eRate2", {
  required: "eRate",
});
C.c("Ebar", {
  required: "VUES, WebGL",
  init: function () {
    let v = this.v;
    let wx = 1 / 16 * 100;
    this.vues({
      x: 0,
      y: wx * (v.top + v.gap + 27.25), //21.5 //22.75
      wy: 1,
      w: wx * 0.8,
      h: wx * 0.5,
      wh: 1
    });
  },
});
C.c("Ebox", {
  required: "VUES, DOM",
  init: function () {
    let v = this.v;
    let wx = 1 / 16 * 100;
    this.vues({
      x: wx * 8, //10
      y: wx * (v.top + v.gap + 27), //21.25 //22.5
      wy: 1,
      w: wx * 2,
      h: wx,
      wh: 1
    });
  },
});

C.c("Ibox", {
  required: "VUES",
  init: function () {
    let v = this.v;
    let wx = 1 / 16 * 100;
    this.vues({
      x: wx * 7.5, //12
      y: wx * (v.top + v.gap + 27), //22.5
      wy: 1,
      w: wx,
      h: wx,
      wh: 1
    });
  },
});
C.c("NoteTx", {
  required: "Note, Tx, Mar, Op0, Op",
  init: function () {
    this.mar({
      y: 3
    }).textColor("rgba(192, 192, 0, 1)");
  },
});
C.c("Note", {
  required: "VUES, FX",
  init: function () {
    let v = this.v;
    let wx = 1 / 16 * 100;
    this.vues({
      x: wx * 2,
      y: wx * 2,
      wy: 1,
      w: wx * 12,
      h: wx * (v.top + 7),
      wh: 1
    });
  }
});

C.c("Dragon", {
  required: "Trq",
  init: function () {
    this.alpha = 0;
  }
});
C.c("DragBox", {
  required: "VUES", //WebGL
  init: function () {
    let v = this.v;
    let wx = 1 / 16 * 100;
    let gh = (v.gap + 14) / 8;
    let c = this.__c;
    let x = c["11DRAG"] || c["6DRAG"] ? 50 : c["8DRAG"] ? 32 : c["9DRAG"] ? 68 : 0;
    //let x = c["10DRAG"] ? 75 : c["6DRAG"] || c["9DRAG"] ? 50 : c["8DRAG"] ? 25 : 0;
    let y = c["5DRAG"] || c["6DRAG"] ? 5 : c["10DRAG"] || c["11DRAG"] ? 0 : 2.5;
    let w = c["5DRAG"] || c["6DRAG"] || c["10DRAG"] || c["11DRAG"] ? 50 : c["8DRAG"] ? 36 : 32;
    let h = c["5DRAG"] || c["6DRAG"] ? 3 : 2.5;
    this.vues({
      x: x,
      y: wx * (v.top + 9 + (gh * y)),
      wy: 1,
      w: w,
      h: wx * (h * gh),
      wh: 1
    });
  },
});
C.c("PIN", {
  required: "VUES, DOM, Wht, SHAPE, Mar",
  init: function () {
    let v = this.v;
    let wx = 1 / 16 * 100;
    let gh = (v.gap + 14) / 8;
    let c = this.__c;
    let x = c["11PIN"] || c["6PIN"] ? 10.5 : c["7PIN"] ? 1 : c["8PIN"] ? 6.5 : c["9PIN"] ? 12 : 2.5;
    let y = c["5PIN"] || c["6PIN"] ? 5.5 : c["10PIN"] || c["11PIN"] ? 0.25 : 2.5;
    //let x = c["5PIN"] ? 2.5 : c["6PIN"] ? 10.5 : c["7PIN"] ? 0.5 : c["8PIN"] ? 4.5 : c["9PIN"] ? 8.5 : 12.5;
    //let y = c["5PIN"] || c["6PIN"] ? 3.5 : 0.5;
    this.vues({
      x: wx * x,
      y: wx * (v.top + 9 + (gh * y)),
      wy: 1,
      w: wx * 3,
      h: wx * 3,
      wh: 1
    }).attr({
      alpha: 0,
      z: 100
    });
    let shape = c["5PIN"] ? "pinR" : c["6PIN"] ? "pinL" : "pinV";
    this.shape(shape);
    this.mar({
      x: 0.5,
      y: 0.5,
      w: 1,
      h: 1
    });
  },
});

C.c("0BTN", {
  required: "VUES, WebGL",
  init: function () {
    this.vues({
      x: 0,
      y: 0,
      w: 100,
      h: 100,
    });
  }
});
C.c("BTN", {
  required: "Mar255", //Gry
  init: function () {},
});

C.c("Box", {
  required: "VUES, DOM",
  init: function () {
    let c = this.__c;
    let i = c["1Box"] ? 0 : c["2Box"] ? 1 : c["3Box"] ? 2 : c["4Box"] ? 3 : C.log("@BoxErr");
    let v = this.v;
    let wx = 1 / 16 * 100;
    this.vues({
      x: wx * (i * 4),
      y: wx * (v.top + v.gap + 23), //24
      wy: 1,
      w: wx * 4,
      h: wx * 4,
      wh: 1
    });
  },
});
C.c("OrbBg", {
  required: "Mar",
  //required: "Mar, Rnd50, Rnd, Op3, Op",
  init: function () {
    let i = this.__c["1Orb"] ? 0.75 : this.__c["2Orb"] ? 1.75 : 2.75;
    this.mar({
      //x: -0.1, //-0.35,
      y: i,
      w: 2.2,
      h: 2.2
    });
  },
});
C.c("OrbIco", {
  required: "Mar",
  //required: "Wht, Mar, SHAPE",
  init: function () {
    let i = this.__c["Orb1"] ? 1 : this.__c["Orb2"] ? 2 : 3;
    this.mar({
      x: 0.35, //.275//.425
      y: i + 0.35,
      w: 3.625, //3.5//3.75
      h: 3.625
    });
    //this.shape("circle");
    /*this.mar({
      x: 0.125,
      y: i + 0.15,
      w: 3.25,
      h: 3.25
    });
    this.shape("star");*/
  },
});
C.c("CostBg", {
  required: "Gry, Mar, Rnd10, Rnd",
  //Gry -> Blk @ cooldown
  init: function () {
    this.mar({
      w: 2.8,
      h: 3
    });
  },
});
C.c("CostTx", {
  required: "Mar, Tx",
  init: function () {
    this.mar({
      y: 0.1,
      w: 2.8
    });
  },
});

C.c("Cover", {
  required: "Mar255, Grd, Op8, Op",
  init: function () {
    this.grd({
      a: 0,
      b: 1,
      g: 1
    });
  }
});
C.c("BtnReady", {
  init: function () {
    this.alpha = this.alpha - 1;
  },
  remove: function () {
    this.alpha = this.alpha + 1;
  }
});
C.c("BtnBusy", {
  init: function () {
    let fx = 7;
    let self = this;
    self.removeComponent("BtnReady");
    let prop = "h";
    let cFun = function (cArg) {
      cArg.cba[prop] = cArg.cba.fx[cArg.fx].start;
      cArg.cba.removeComponent("BtnBusy").addComponent("BtnReady");
      cArg.cba.removeComponent(cArg.fx + "fx");
      cArg.cba.fx[cArg.fx] = {};
    };
    let f = {
      e: self,
      fx: fx,
      now: 1,
      dur: 300,
      v: -1,
      amt: self[prop],
      start: self[prop],
      ease: 0,
      prop: prop,
      cFun: cFun,
      cArg: {
        cba: self,
        fx: fx
      }
    };
    self.addFX(f);
  },
});
C.c("SELECTED", {
  required: "Mar",
  init: function () {
    // Move to the right by 10 pixels per second
    //this.x = this.x + 10 * (eventData.dt / 1000);
    let wx = 1 / 16 * 100;
    let yMax = this.db.y - this.vuW(wx * 0.5);
    let yAmt = this.y - yMax;
    let spd = yAmt; // 50;
    this.db.yAmt = yAmt;
    this.db.yMax = yMax;
    this.db.spd = spd;
    this.addComponent("SLIDEUP");
    //this.y = this.y - spd * (eventData.dt / 1000);
    //let y = this.db.y;
    //this.db.y = y;
    //this.mar({
    //y: -0.5
    //});
    //C.log("selected", y, this.y);
  },
  remove: function () {
    //this.mar({
    this.y = this.db.y;
    //});
  }
});