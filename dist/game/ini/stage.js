/*global Crafty*/
let C = Crafty;
C.s("_STAGE", {
  init: function () {
    if (!C("Colors").get(0)) {
      C.e("Colors");
    }
    C.e("BG1");
    this.setTiles();
    this.setCells();
  },
  setTiles: function () {
    let x = 0;
    let y = 0;
    for (let i = 0; i < 24; i++) {
      let t = 1;
      let tile = C.e("TILE" + t + ", Tile").tile({
        x: x * 4,
        y: y,
      });
      x++;
      /*//@TUT1
       if (y < 3) {
        tile.alpha = 0;
       }*/
      if (x === 4) {
        x = 0;
        y++;
      }
    }
  },
  setCells: function () {
    for (let row = 1; row < 7; row++) {
      for (let col = 1; col < 9; col++) {
        let cell = (row * 10) + col;
        let colors = ["Blu", "Gry", "dBlk", "Red"];
        let c = row === 2 ? 1 : row === 5 ? 2 : row === 1 || row === 3 ? 3 : 0;
        let a = (row % 2 && cell % 2) || (row % 2 === 0 && cell % 2 === 0) ? 0.3 : 0.5;
        /*//@TUT1
          if (row < 4) {
          a = 0;
          }*/
        C.e("DB, Cell, " + cell + "CELL, VACANT, " + colors[c]).cell({
          a: a,
          cell: cell,
          x: col,
          y: row
        });
      }
    }
  },
}, true);