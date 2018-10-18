define(function() {
  /*global Crafty*/
  let startData = [
    715, 716, 717, 718, 719, 720, 815, 816, 817, 818, 819, 820, 915, 916, 917, 918, 919, 920
    ];
  let wave1Data = [
    721, 722, 723, 724, 725, 821, 822, 823, 824, 825, 921, 922, 923, 924, 925
    ];
  let wave2Data = [
    421, 422, 423, 424, 425, 521, 522, 523, 524, 525, 621, 622, 623, 624, 625
    ];
  Crafty.c("Cells", {
    required: "Hash",
    init: function() {
      let colX = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
      let rowY = [26, 30, 34, 48, 52, 56, 70, 74, 78];
      let xLen = colX.length; //21 //v:vacant, p:player, c:card?etc||id?etc
      for (let j = 0; j < xLen; j++) {
        for (let i = 0; i < 9; i++) {
          let prefix = i + 1; //1^9 row
          let suffix = j + 10; //10^30 col
          let k = +(prefix + "" + suffix); //110-130^910-930
          this.add(k, { x: colX[j], y: rowY[i], v: true, p: 0, u: 0 });
        }
      }
      //console.log(JSON.stringify(this.reveal()), JSON.stringify(this.unveil()));
    }
  });
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
      this.build(startData);
    },
    build: function(keys) {
      let color, c = Crafty("Cells").get(0);
      for (let i = 0, iLen = keys.length; i < iLen; i++) {
        let cell = c.search(keys[i]);
        let x = this.getX(cell.x);
        if (keys[i] % 2 && (keys[i] < 800 && keys[i] > 600 || keys[i] > 900) || !(keys[i] % 2) && (keys[i] < 900 && keys[i] > 800) || !(keys[i] % 2) && (keys[i] < 600 && keys[i] > 500) || (keys[i] % 2) && (keys[i] < 500)) { color = "rgba(0,255,255,.8)"; }
        else { color = "rgba(0,255,255,1)"; }
        Crafty.e("ACELL").vued({ x: x, y: cell.y, w: this.getX(1), h: 4 }).
        acell({ a: 0, c: color, cell: keys[i] });
      }
      return this;
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
