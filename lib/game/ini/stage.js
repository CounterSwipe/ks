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
    //C.e("BGRside");
  },
  setTiles: function () {
    let x = 0;
    let y = 0;
    for (let i = 0; i < 30; i++) { //24 //48
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
      if (y === 2 || y === 5) {
        if (x === 3) {
          x = 0;
          y++;
        }
      } else if (x === 4) { //6
        x = 0;
        y++;
      }
    }
  },
  setCells: function () {
    for (let row = 1; row < 9; row++) {
      for (let col = 1; col < 13; col++) { //9
        let cell = (row * 100) + col; //10
        let nuCell = this.nuCell(cell);
        //let colors = ["Blu", "Gry", "dBlk", "Red"];
        //let c = row === 2 ? 1 : row === 5 ? 2 : row === 1 || row === 3 ? 3 : 0;
        if (nuCell) {
          let a = (row % 2 && cell % 2) || (row % 2 === 0 && cell % 2 === 0) ? 0.3 : 0.5;
          if (col < 3 || col > 10) {
            a = 0;
          } else if (row % 2 === 0) {
            a += 0.3;
          }
          C.e("DB, Cell, " + cell + "CELL, VACANT, dBlk").cell({
            a: a,
            cell: cell,
            x: col,
            y: row
          });
        }
      }
    }
  },
  nuCell: function (c) {
    switch (true) {
      case (c > 300 && c < 304):
      case (c > 309 && c < 400):
      case (c > 600 && c < 604):
      case (c > 609 && c < 700):
        return 0;
      default:
        return 1;
    }
  },
}, true);