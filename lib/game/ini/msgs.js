/*global Crafty*/
let C = Crafty;
C.s("_MSGS", {
  init: function () {
    C.e("MSGS, GetMsgs");
    //TODO:push|save _MSG to saveQ|debugQ for game viewing|pubnub.chan[debug]
    //TODO spawn each unit of both players
    ////(then destroy() all) to cut deploy|spawn time from ~70ms -> ~10ms
  },
  update: function () {
    let m = C("MSGS").get(0);
    if (m.msgs.size) {
      while (m.msgs.size !== 0) {
        let i = m.msgs.now.shift();
        m.msgs.size--;
        this[i.m](i.e);
      }
    } else {
      return;
    }
  },
  deploy: function (e) {
    let d = e.move;
    let trait = C(d.p + "P " + d.t + "T").get(0).db;
    let unit = this.setUnit(d, trait);
    this.setEnergy(unit);
    this.setCells(unit);
    this.setHpbar(unit);
    this.setVia(unit);
    this.setOrbs(unit);
    this.setGfx(unit);
    if (unit.db.tower) {
      unit.addComponent("TOWER");
    } else {
      //TODO: dont need [c] tank ?
      unit.addComponent("TANK");
    }
    if (unit.db[1].vals[7]) {
      unit.addComponent("URGENCY");
    }
    let row = unit.db.area.row + "Row";
    unit.addComponent(row);

    //C.log(unit);
    //this.setEnterSticker(d, trait, unit);
  },
  setUnit: function (d, u) {
    //xL comps per card|character|kind etc // cues handled within comp etc
    let unit = C.e(d.p + "P, U, DEPLOYING, uAlive");
    if (d.p === 2) {
      d.c = this.getp2(d.c);
    }
    let cell = d.c;
    let area = this.getArea(cell);
    let ss = u.ss;
    let tower = this.isTower(cell);
    let db = {
      0: u[0], //passive stats
      1: u[d.a], //active stats
      2: u[4], //perhaps ongoing stats? -> add to #T stats @ exhaust? etc
      area: area,
      d: d,
      key: {
        g: 0, //bgHpbar        
        h: 0, //engHpbar
        i: 0, //img        
        o: 0, //orb|s
        v: 0 //via               
      },
      move: 0,
      orbs: 0, //TODO: add[c] @Edge: regen_Orbs etc
      port: 0,
      range: 0,
      ss: {
        _0: ss._0, //enter
        _1: ss._1, //idle
        _2: ss._3, //exit
        0: ss._2, //passive
        1: ss["__" + d.a], //active
        2: ss.__4, //dance
        3: u.v
      },
      //tower: cell === 17 || cell === 31 || cell === 47 || cell === 61 ? 0 : 1,
      tower: tower,
      u: {
        _hpDmg: 0,
        _hpMax: 0,
        _hpNow: 0
      },
    };
    unit.db = db;
    return unit;
  },
  isTower: function (c) {
    switch (true) {
      case (c > 300 && c < 400):
      case (c > 600 && c < 700):
        return 1;
      default:
        return 0;
    }
  },
  getp2: function (c) {
    switch (true) {
      case c === 801:
        return 111;
      case c === 411:
        return 501;
        //case c === 603:
        //return 309;
      case c === 604:
        return 308;
      case c === 605:
        return 307;
      case c === 606:
        return 306;
      case c === 607:
        return 305;
      case c === 608:
        return 304;
        //case c === 609:
        //return 303;
      default:
        C.log("err@p2cell", c);
    }
  },
  getArea: function (c) {
    let row = (c / 100) >> 0; //10
    let tile = c - (row * 100);
    //let tile = c - (row * 10) - 1;
    return {
      dir: tile < 7 ? 1 : -1,
      //dir: tile < 4 ? 1 : -1,
      row: row,
      tile: tile,
      cNum: 0
    };
  },
  setEnergy: function (u) {
    let cost = u.db[1].vals[2];
    let p = u.db.d.p;
    let e = Crafty(p + "P Energy").get(0);
    e.db._energy -= cost;
    if (p === 1) {
      C("1P Ebox Tx").get(0).addComponent("EDRAW");
      C("1P Ebar").get(0).addComponent("EDRAW");
    }
  },
  setCells: function (u) {
    let c = u.db.d.c;
    let p = u.db.d.p;
    let range = [c, c + 1];
    let cells = range.sort((a, b) => a - b);
    for (let i = 0, iLen = cells.length; i < iLen; i++) {
      let cell = C(cells[i] + "CELL").get(0);
      cell.addComponent("RESERVED").addComponent("P" + p);
    }
    u.db.range = range;
  },
  setHpbar: function (u) {
    let hp = u.db[1].vals[5];
    u.db.u._hpMax = hp;
    u.db.u._hpNow = hp;
    let color = u.db.d.p === 1 ? "dBlu" : "dRed";
    let cell = u.db.d.c;
    let area = u.db.area;
    let g = C.e(area.row + "Row, Hpbar, dBlk, DEPLOY").attr({
      z: 1000 + cell
    }).mar({
      x: (area.tile - 3) * 2
    });
    let h = C.e(area.row + "Row, Hpbar, " + color + ", DEPLOY").attr({
      //z: 4000 - cell
      z: 1000 + cell
    }).mar({
      x: (area.tile - 3) * 2
    });
    u.db.key.g = g[0];
    u.db.key.h = h[0];
  },
  setVia: function (u) {
    let cell = u.db.d.c;
    let area = u.db.area;
    let via = "VIA_m1t" + u.db.ss[3];
    let v = C.e(area.row + "Row, " + via + ", Via, DEPLOY").attr({
      //let v = C.e(area.row + "Row, Via, DEPLOY").attr({
      z: 1000 + cell
    }).mar({
      x: (area.tile - 3) * 2
    });
    if (area.dir < 1) {
      v.flip("X"); //unFlip
    }
    u.db.key.v = v[0];
  },
  setOrbs: function (u) {
    let orbs = u.db[1].vals[9];
    if (orbs) {
      let dir = u.db.area.dir;
      let p = u.db.d.p;
      let orb = dir === 1 ? "p" + p + "Orb" + orbs : "p" + p + "Orb" + orbs + ", FLIP";
      u.db.orbs = orbs;
      let cell = u.db.d.c;
      let area = u.db.area;
      let o = C.e(area.row + "Row, " + orb + ", ORB, DEPLOY").attr({
        z: 1000 + cell
      }).mar({
        x: (area.tile - 3) * 2,
        w: 0.2,
        h: 0.2
      });
      u.db.key.o = o[0];
    }
  },
  setGfx: function (u) {
    let cell = u.db.d.c;
    let area = u.db.area;
    let ss = u.db.ss._0;
    //TODO add onEnter @ deployed cFun -> add Idle
    let i = C.e(area.row + "Row, " + ss + ", Unit, DEPLOY").attr({
      z: 1000 + cell
    }).mar({
      x: (area.tile - 3) * 2
      //x: area.tile * 2
    });
    if (area.dir < 1) {
      i.flip("X"); //unFlip
    }
    u.db.key.i = i[0];
  },
}, true);