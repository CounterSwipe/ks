/*global Crafty*/
import player1 from "/dist/game/storage/player1.js";
import player2 from "/dist/game/storage/player2.js";
let C = Crafty;
C.s("_TRAITS", {
  init: function () {
    this.setPlayer(1);
    this.setPlayer(2);
  },
  setPlayer: function (p) {
    let characters = p === 1 ? player1 : player2;
    let player = C.e(p + "P, Player");
    player.db = characters[0];
    let pngs = [];
    let maps = [];
    for (let traitSet = 1; traitSet < 5; traitSet++) {
      let db = characters[traitSet];
      let c = "c" + db.c;
      let cw = c + "w" + db.w;
      let base = cw + "base";
      let t1 = db[1].trait;
      let t2 = db[2].trait;
      let t3 = db[3].trait;
      let t = C.e(p + "P, " + traitSet + "T, Trait");
      let ss = {
        1: c + "card" + t1,
        2: c + "card" + t2,
        3: c + "card" + t3,
        _0: base + 0, // enter
        _1: base + 1, // idle
        _2: base + 2, //sp|event 
        _3: base + 3, // exit                
        __1: this.getPngMapY(db, 1), //pri
        __2: this.getPngMapY(db, 2), //alt
        __3: this.getPngMapY(db, 3), //ult
        __4: this.getPngMapY(db, 4), //aoe
      };
      let cardMap = this.mapCard(db);
      let baseMap = this.mapBase(db);
      maps.push(cardMap, baseMap);
      pngs.push(c + ".png", base + ".png");
      this.mapTraits(db, pngs, maps, ss);
      t.db = db;
      t.db.ss = ss;
      t.db.stats = [0, 0, 0]; //xL|scores|exhausts
    }
    player.db.pngs = pngs;
    player.db.maps = maps;
  },
  getPngMapY: function (db, t) {
    let png = this.getPng(db, t);
    let trait = db[t].trait;
    let mapY = trait > 12 ? this.getTint(db) : this.getMapY(trait);
    let pngMapY = trait > 12 ? png + mapY.mapY : png + mapY;
    return pngMapY;
  },
  getPng: function (db, t) {
    let c = "c" + db.c;
    let cw = c + "w" + db.w;
    let ss = [cw + "abcd", cw + "ef"];
    let trait = db[t].trait;
    let tint = this.getTint(db);
    let png = trait > 12 ? c + "w" + tint.w + "t" + tint.ss + "move" + trait : ss[this.getSS(trait)];
    return png;
  },
  getTint: function (db) {
    let tint = +db.w.toString().substr(-1);
    let w = (db.w / 10) >> 0;
    let ss = tint < 4 ? 0 : 1;
    let mapY = tint === 0 || tint === 4 ? 0 : tint === 1 || tint === 5 ? 1 : tint === 6 || tint === 7 ? 2 : 3;
    return {
      w: w,
      ss: ss,
      mapY: mapY
    };
  },
  getSS: function (t) {
    switch (true) {
      case (t === 5):
      case (t === 11):
      case (t === 6):
      case (t === 12):
        return 1;
      default:
        return 0;
    }
  },
  getMapY: function (y) {
    switch (true) {
      case (y === 2):
      case (y === 6):
      case (y === 8):
      case (y === 12):
        return 1;
      case (y === 3):
      case (y === 9):
        return 2;
      case (y === 4):
      case (y === 10):
        return 3;
      default:
        return 0;
    }
  },
  mapCard: function (db) {
    let c = "c" + db.c;
    let t1 = db[1].trait;
    let t2 = db[2].trait;
    let t3 = db[3].trait;
    let cardMap = []; //{}
    cardMap.push([c + "card" + t1, [this.getX(t1), this.getY(t1)]], [c + "card" + t2, [this.getX(t2), this.getY(t2)]], [c + "card" + t3, [this.getX(t3), this.getY(t3)]]);
    /*
    cardMap[c + "card" + t1] = [this.getX(t1), this.getY(t1)];
    cardMap[c + "card" + t2] = [this.getX(t2), this.getY(t2)];
    cardMap[c + "card" + t3] = [this.getX(t3), this.getY(t3)];*/
    return cardMap;
  },
  mapBase: function (db) {
    let c = "c" + db.c;
    let cw = c + "w" + db.w;
    let base = cw + "base";
    let baseMap = []; //{};
    baseMap.push([base + 0, [0, 0]], [base + 1, [0, 1]], [base + 2, [0, 2]], [base + 3, [0, 3]]);
    /*    
    baseMap[base + 0] = [0, 0];
    baseMap[base + 1] = [0, 1];
    baseMap[base + 2] = [0, 2];
    baseMap[base + 3] = [0, 3];*/
    return baseMap;
  },
  mapTraits: function (db, pngs, maps, ss) {
    let s1 = this.getPng(db, 1);
    let s2 = this.getPng(db, 2);
    let s3 = this.getPng(db, 3);
    let s4 = this.getPng(db, 4);
    let t1 = db[1].trait;
    let t2 = db[2].trait;
    let t3 = db[3].trait;
    let map1 = []; //{};
    let map2 = []; //{};
    let map3 = []; //{};
    let map4 = [];
    let tint = this.getTint(db);
    map4.push([ss.__4, [0, tint.mapY]]);
    //if (s1 === s2 || s1 === s3 || s2 === s3) {
    if (s1 === s2 && s1 === s3) {
      map1.push([ss.__1, [0, this.getMapY(t1)]]);
      map1.push([ss.__2, [0, this.getMapY(t2)]]);
      map1.push([ss.__3, [0, this.getMapY(t3)]]);
      maps.push(map1, map4);
      pngs.push(s1 + ".png", s4 + ".png");
    } else if (s1 === s2) {
      map1.push([ss.__1, [0, this.getMapY(t1)]]);
      map1.push([ss.__2, [0, this.getMapY(t2)]]);
      map3.push([ss.__3, [0, this.getMapY(t3)]]);
      maps.push(map1, map3, map4);
      pngs.push(s1 + ".png", s3 + ".png", s4 + ".png");
    } else if (s1 === s3) {
      map1.push([ss.__1, [0, this.getMapY(t1)]]);
      map1.push([ss.__3, [0, this.getMapY(t3)]]);
      map2.push([ss.__2, [0, this.getMapY(t2)]]);
      maps.push(map1, map2, map4);
      pngs.push(s1 + ".png", s2 + ".png", s4 + ".png");
    } else {
      map1.push([ss.__1, [0, this.getMapY(t1)]]);
      map2.push([ss.__2, [0, this.getMapY(t2)]]);
      map2.push([ss.__3, [0, this.getMapY(t3)]]);
      maps.push(map1, map2, map4);
      pngs.push(s1 + ".png", s2 + ".png", s4 + ".png");
    }
  },
  getX: function (x) {
    switch (true) {
      case (x === 1):
      case (x === 4):
      case (x === 7):
        return 1;
      case (x === 2):
      case (x === 5):
      case (x === 6):
        return 2;
      default:
        return 3;
    }
  },
  getY: function (y) {
    return y < 4 ? 0 : y < 7 ? 1 : y < 10 ? 2 : 3;
  },
}, true);