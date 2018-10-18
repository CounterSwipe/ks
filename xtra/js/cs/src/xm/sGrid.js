define(function(require) {
  /*global Crafty*/
  let db = require("db/dbWaves");
  Crafty.s("Grid", {
    init: function() {
      let y = [26, 48, 70];
      for (let i = 0; i < 3; i++) {
        Crafty.e("NuVue, WebGL, bt2").
        vued({ x: 0, y: y[i], w: 100, h: 12 }).attr({ alpha: .3 });
      }
      Crafty.e("NuVue, WebGL, Color").
      vued({ x: this.getX(2), y: 70, w: this.getX(6), h: 12 }).
      color(255, 255, 255, 1).attr({ alpha: .3 });
      this.render(db[0]);
    },
    build: function(keys) {
      let color, cell, x, c = Crafty("_CELLS").get(0);
      for (let i = 0, iLen = keys.length; i < iLen; i++) {
        cell = c.search(keys[i]);
        x = this.getX(cell.x);
        if (keys[i] % 2 && (keys[i] < 800 && keys[i] > 600 || keys[i] > 900) || !(keys[i] % 2) && (keys[i] < 900 && keys[i] > 800) || !(keys[i] % 2) && (keys[i] < 600 && keys[i] > 500) || (keys[i] % 2) && (keys[i] < 500)) { color = "rgba(0,255,255,.8)"; }
        else { color = "rgba(0,255,255,1)"; }
        Crafty.e("ACELL").vued({ x: x, y: cell.y, w: this.getX(1), h: 4 }).
        acell({ a: 0, c: color, cell: keys[i] });
      }
    },
    onWave1: function() {
      Crafty.e("NuVue, WebGL, Color").
      vued({ x: this.getX(8), y: 70, w: this.getX(5), h: 12 }).
      color(255, 255, 255, 1).attr({ alpha: .3 });
      this.build(wave1Data);
    },
    onWave2: function() {
      Crafty.e("NuVue, WebGL, Color").
      vued({ x: this.getX(8), y: 48, w: this.getX(5), h: 12 }).
      color(255, 255, 255, 1).attr({ alpha: .3 });
      this.build(wave2Data);
    },
    claim: function(cell) {
      if (Crafty("CELL" + cell.c).get(0)) {
        Crafty("CELL" + cell.c).get(0).
        removeComponent("VACANT");
      }
      let c = Crafty("Cells").get(0);
      c.search(cell.c).v = false;
      c.search(cell.c).p = cell.p;
      c.search(cell.c).u = cell.u;
    },
    unClaim: function(cell) {
      if (Crafty("CELL" + cell.c).get(0)) {
        Crafty("CELL" + cell.c).get(0).
        addComponent("VACANT");
      }
      let c = Crafty("Cells").get(0);
      c.search(cell.c).v = true;
      c.search(cell.c).p = cell.p;
      c.search(cell.c).u = cell.u;
    },
    getX: function(x) {
      //let x = v.vuW(100 * 1 / 15 * x);
      let nuX = 1 / .15 * x;
      return nuX;
    }
  }, true);
  Crafty.c("ACELL", {
    required: "NuVue, WebGL, Color, VACANT",
    init: function() {
      this.at = {};
    },
    acell: function(cr) {
      this.attr({ alpha: cr.a });
      this.color(cr.c);
      this.at.cell = cr.cell;
      this.addComponent("CELL" + cr.cell);
      this.addComponent("Deployable");
      return this;
    }
  });
});
