define(function(require) {
  /*global Crafty*/
  let db = require("db/dbUnits");
  let dbGrds = [0, 1, 2, 6, 4, 5, 7, 3];
  Crafty.s("SET_MUGS", {
    init: function() {
      //console.log(db);
      this.setTxt();
      this.setBorders();
      this.setEnergy();
    },
    setTxt: function() {
      Crafty.e("NuVue, WebGL, Color").vued({ x: 0, y: 30, w: 100, h: 40 }).
      color(0, 0, 0, 1).attr({ alpha: .5, z: -100 });
      Crafty.e("TXT").text("SELECT:").
      txt({ a: .5, x: 0, y: 12, w: 100, fF: 0, fS: 5, fA: 1, fC: 1 });
      Crafty.e("TXT, _vSelect").text("0/7").
      txt({ a: .8, x: 0, y: 20, w: 100, fF: 2, fS: 5, fA: 1, fC: 1 });
    },
    setBorders: function() {
      let x = 0;
      let y = 30;
      for (let i = 0; i < 8; i++) {
        if (i === 4) { y += 20; }
        Crafty.e("NuVue, Grd, _BOR" + (i + 1)).vued({ x: x, y: y, w: 25, h: 20 }).
        grd(dbGrds[i]).attr({ alpha: 0, z: -100 });
        x === 75 ? x = 0 : x += 25;
      }
    },
    setEnergy: function() {
      let x = 0;
      let y = 30;
      let ty = 46.25;
      for (let i = 1; i < 9; i++) {
        if (i === 5) {
          y += 20;
          ty += 20;
        }
        Crafty.e("_CARD, NuVue, DOM, _TOUCHE, MUG_u" + i + "m1").
        vued({ x: x, y: y, w: 25, h: 20 }).id = i;
        Crafty.e("TXT").text("" + db[10][i] + "").
        txt({ a: 1, x: x, y: ty, w: 25, fF: 2, fS: 3, fA: 1, fC: 0 });
        x === 75 ? x = 0 : x += 25;
      }
    },
  }, true);
});
