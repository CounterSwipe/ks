/*global Crafty*/
let C = Crafty;
C.s("_Checkers", {
  init: function () {    
    this.checkers();
    //this.testes();
  },
  checkers: function () {
    let v = C("VUE").get(0).vue;
    let c = "VUES, WebGL, Color";
    for (let i = 0; i < 28; i++) {
      for (let j = 0; j < 16; j++) {
        let color = 255;
        let alpha = (j % 2 === 0 && i % 2 === 0) || (j % 2 !== 0 && i % 2 !== 0) ? 0 : 0.1;
        let wx = (1 / 16 * 100);
        if (alpha > 0) {
          C.e(c).vues({
            x: wx * j,
            y: wx * (v.top + v.gap + i),
            wy: 1,
            w: wx,
            h: wx,
            wh: 1
          }).color(color, 255, 255, alpha);
        }
      }
    }
  },
  testes: function () {
    let g = C("VUE").get(0).vue; //this.vuG();
    let gw = g.gap + g.top;
    let wx = (1 / 16 * 100);
    C.e("VUES, WebGL, Grn").vues({
      x: wx * 0,
      y: wx * 10.25 + (wx * gw),
      wy: 1,
      w: wx * 3,
      h: wx * 0.25, //playtest.25|.3|.35|.5
      wh: 1
    });
    C.e("VUES, WebGL, Blk").vues({
      x: wx * 0,
      y: wx * 9.25 + (wx * gw),
      wy: 1,
      w: wx * 3,
      h: wx * 1,
      wh: 1
    });
    C.e("VUES, WebGL, m1w0A0").vues({
      x: wx * -1, //0,
      y: wx * 0.25 + (wx * gw),
      wy: 1,
      w: wx * 5,
      h: wx * 10,
      wh: 1
    });
    C.e("VUES, WebGL, Grn").vues({
      x: wx * 3,
      y: wx * 11.75 + (wx * gw),
      wy: 1,
      w: wx * 3,
      h: wx * 0.25,
      wh: 1
    });
    C.e("VUES, WebGL, Blk").vues({
      x: wx * 3,
      y: wx * 10.75 + (wx * gw),
      wy: 1,
      w: wx * 3,
      h: wx * 1,
      wh: 1
    });
    C.e("VUES, WebGL, m2w0A0").vues({
      x: wx * 2, //3,
      y: wx * 1.75 + (wx * gw),
      wy: 1,
      w: wx * 5,
      h: wx * 10,
      wh: 1
    });
    C.e("VUES, WebGL, Grn").vues({
      x: wx * 6,
      y: wx * 13.25 + (wx * gw),
      wy: 1,
      w: wx * 3,
      h: wx * 0.25,
      wh: 1
    });
    C.e("VUES, WebGL, Blk").vues({
      x: wx * 6,
      y: wx * 12.25 + (wx * gw),
      wy: 1,
      w: wx * 3,
      h: wx * 1,
      wh: 1
    });
    C.e("VUES, WebGL, m3w0A0").vues({
      x: wx * 5, //6,
      y: wx * 3.25 + (wx * gw),
      wy: 1,
      w: wx * 5,
      h: wx * 10,
      wh: 1
    });

    C.e("VUES, WebGL, Grn").vues({
      x: wx * 0,
      y: wx * 21.75 + (wx * gw),
      wy: 1,
      w: wx * 3,
      h: wx * 0.25, //playtest.25|.3|.35|.5
      wh: 1
    });
    C.e("VUES, WebGL, Blk").vues({
      x: wx * 0,
      y: wx * 20.75 + (wx * gw),
      wy: 1,
      w: wx * 3,
      h: wx * 1,
      wh: 1
    });
    C.e("VUES, WebGL, m4w0A0").vues({
      x: wx * -1, //0,
      y: wx * 11.75 + (wx * gw),
      wy: 1,
      w: wx * 5,
      h: wx * 10,
      wh: 1
    });
    C.e("VUES, WebGL, Grn").vues({
      x: wx * 3,
      y: wx * 20.25 + (wx * gw),
      wy: 1,
      w: wx * 3,
      h: wx * 0.25,
      wh: 1
    });
    C.e("VUES, WebGL, Blk").vues({
      x: wx * 3,
      y: wx * 19.25 + (wx * gw),
      wy: 1,
      w: wx * 3,
      h: wx * 1,
      wh: 1
    });
    C.e("VUES, WebGL, m1w0A0").vues({
      x: wx * 2, //3,
      y: wx * 10.25 + (wx * gw),
      wy: 1,
      w: wx * 5,
      h: wx * 10,
      wh: 1
    });
    C.e("VUES, WebGL, Grn").vues({
      x: wx * 6,
      y: wx * 18.75 + (wx * gw),
      wy: 1,
      w: wx * 3,
      h: wx * 0.25,
      wh: 1
    });
    C.e("VUES, WebGL, Blk").vues({
      x: wx * 6,
      y: wx * 17.75 + (wx * gw),
      wy: 1,
      w: wx * 3,
      h: wx * 1,
      wh: 1
    });
    C.e("VUES, WebGL, m2w0A0").vues({
      x: wx * 5, //6,
      y: wx * 8.75 + (wx * gw),
      wy: 1,
      w: wx * 5,
      h: wx * 10,
      wh: 1
    });
  },
}, true);