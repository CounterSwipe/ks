define(function(require) {
  /*global Crafty*/
  let db = require("db/dbWaves");
  Crafty.s("SET_CELLS", {
    init: function() {
      Crafty.e("Hash, _CELLS");
      this.setCells();
      //property(1:x|2:y|3:v|4:p|5:u[0]) + cKey(110-130^910-930)
    },
    setCells: function() {
      let c = Crafty("_CELLS").get(0);
      let x = -3;
      let y = [26, 30, 34, 48, 52, 56, 70, 74, 78];
      for (let col = 0; col < 21; col++) {
        for (let row = 0; row < 9; row++) {
          for (let prop = 1; prop < 6; prop++) {
            let cKey = ((row + 1) * 100) + (col + 10);
            let key = (prop * 1000) + cKey;
            let value = prop === 1 ? x : prop === 2 ? y[row] : prop === 3 ? 1 : 0;
            c.add(key, value);
          }
        }
        x++;
      }
    },
    start: function() {
      /*let y = [26, 48, 70];
      for (let i = 0; i < 3; i++) {
        Crafty.e("NuVue, WebGL, bt2").
        vued({ x: 0, y: y[i], w: 100, h: 12 }).
        attr({ alpha: .3 });
      }*/
      this.cRender(1);
    },
    cRender: function(wave) {
      let x = this.getX(db[wave * 10][0]);
      let y = db[wave * 10][1];
      let w = this.getX(db[wave * 10][2]);
      Crafty.e("NuVue, WebGL, Color").
      vued({ x: x, y: y, w: w, h: 12 }).
      color(255, 255, 255, 1).attr({ alpha: .3 });
      this.render(db[wave]);
      if (wave === 2) { this.reRender([720, 820, 920]); }
    },
    reRender: function(cells) {
      let c = Crafty("_CELLS").get(0);
      for (let i = 0; i < 3; i++) {
        let id = c.search(cells[i] + 7000);
        Crafty(id).addComponent("_DEPLOYABLE");
      }
    },
    render: function(keys) {
      let ac, c = Crafty("_CELLS").get(0);
      for (let i = 0, iLen = keys.length; i < iLen; i++) {
        let cKey = keys[i];
        let cX = c.search(1000 + cKey);
        let cY = c.search(2000 + cKey);
        let x = this.getX(cX);
        if (cKey % 2 && (cKey < 800 && cKey > 600 || cKey > 900) || !(cKey % 2) && (cKey < 900 && cKey > 800) || !(cKey % 2) && (cKey < 600 && cKey > 500) || (cKey % 2) && (cKey < 500)) { ac = .8; }
        else { ac = 1; }
        let cell = Crafty.e("NuVue, WebGL, Color, CELL" + cKey).
        vued({ x: x, y: cY, w: this.getX(1), h: 4 }).
        attr({ alpha: 0 }).color("rgba(0,255,255," + ac + ")");
        cell.cKey = cKey;
        if (cKey !== 425 && cKey !== 525 && cKey !== 625 && cKey !== 720 && cKey !== 725 && cKey !== 820 && cKey !== 825 && cKey !== 920 && cKey !== 925) {
          cell.addComponent("_DEPLOYABLE");
        }
        c.add(6000 + cKey, ac);
        c.add(7000 + cKey, cell[0]);
      }
    },
    getX: function(x) {
      //let x = v.vuW(100 * 1 / 15 * x);
      let nuX = 1 / .15 * x;
      return nuX;
    }
  }, true);
});
