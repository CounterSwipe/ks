/*global Crafty*/
import bezier from "/lib/game/fx/bezier.js";
let C = Crafty;
C.s("_EDGE", {
  init: function () {},
  update: function () {
    let c = "EDGE";
    let uQ = C(c).get();
    if (uQ.length) {
      for (let i = uQ.length - 1; i >= 0; i--) {
        let u = uQ[i];
        this.edge(u);
      }
    } else {
      return;
    }
  },
  edge: function (u) {
    if (u.__c["EnterPort"] || u.__c["ExitPort"]) {
      this.handle(u);
    } else if (u.__c["EventPort"]) {
      this.onEvent(u);
    } else {
      this.onEdge(u);
    }
  },
  onEdge: function (u) {
    u.addComponent("EnterPort");
    this.handle(u);
  },
  handle: function (u) {
    u.db.port.count--;
    let port = u.db.port;
    let kids = port.kids;
    let t = (port.duration - port.count) / port.duration;
    let progress = this[port.ease](t);
    for (let i = 0, iLen = kids.length; i < iLen; i++) {
      let kid = C(kids[i]);
      let value = port.start[i] + (port.valence * (port.amount * progress));
      kid.alpha = value;
    }
    if (u.db.port.count < 1) {
      if (u.__c["EnterPort"]) {
        this.onEnter(u);
      } else {
        this.onExit(u);
      }
    }
  },
  onEnter: function (u) {
    let range = u.db.range;
    let p = u.db.d.p;
    for (let j = 0; j < 2; j++) {
      let cell = C(range[j] + "CELL").get(0);
      cell.removeComponent("RESERVED").removeComponent("P" + p);
    }
    u.removeComponent("EnterPort").addComponent("EventPort");
  },
  onEvent: function (u) {
    let seq = this.seq(u.db);
    let cell = this.rangeCheck(seq);
    if (cell) {
      let oRow = u.db.area.row;
      let nuRow = this.getArea(cell);
      u.removeComponent(oRow + "Row").addComponent(nuRow.row + "Row");
      u.db.area = nuRow;
      this.flipped(u);
      this.rangeSet(u, cell);
    }
  },
  seq: function (db) {
    let c = db.range[0];
    let p = db.d.p;
    switch (true) {
      case (p === 1 && c === 811):
        return 411;
      case (p === 1 && c === 401):
        return 201;
      case (p === 1 && c === 211):
        return 801;
      case (p === 2 && c === 101):
        return 501;
      case (p === 2 && c === 511):
        return 711;
      case (p === 2 && c === 701):
        return 111;
      default:
        C.log("err@edgeSeq");
    }
  },
  getArea: function (c) {
    let row = (c / 100) >> 0;
    let tile = c - (row * 100);
    let dir = tile > 6 ? -1 : 1; //4
    return {
      dir: dir,
      row: row,
      tile: tile,
      cNum: 0
    };
  },
  onExit: function (u) {
    u.removeComponent("ExitPort").removeComponent("EDGE");
    if (u.db.orbs) {
      u.addComponent("ORBSCORE");
    } else {
      u.addComponent("MOVABLE");
    }
  },
  rangeCheck: function (s) {
    if (this.rangeOpen(s)) {
      return s;
    } else {
      return false;
    }
  },
  rangeOpen: function (s) {
    for (let i = 0; i < 2; i++) {
      if (C((s + i) + "CELL").get(0).__c["RESERVED"]) {
        return false;
      }
    }
    return true;
  },
  rangeSet: function (u, r) {
    let p = u.db.d.p;
    let range = [r, r + 1];
    let cells = range.sort((a, b) => a - b);
    for (let i = 0, iLen = cells.length; i < iLen; i++) {
      let cell = C(cells[i] + "CELL").get(0);
      cell.addComponent("RESERVED").addComponent("P" + p);
    }
    u.db.range = range;
    this.setMar(u);
  },
  flipped: function (u) {
    let i = C(u.db.key.i);
    let v = C(u.db.key.v);
    if (u.db.area.tile < 7) {
      i.unflip("X");
      v.unflip("X");
    } else {
      i.flip("X");
      v.flip("X");
    }
  },
  easeNone: function (t) {
    return t;
  },
  easeIn: function (t) {
    var easing = bezier(0.55, 0.085, 0.68, 0.53);
    return easing(t);
  },
  easeOut: function (t) {
    var easing = bezier(0.25, 0.46, 0.45, 0.94);
    return easing(t);
  },
  setMar: function (u) {
    let cell = u.db.range[0];
    let cc = C(cell + "CELL").get(0);
    let wx = (1 / 16 * 100);
    let kids = u.db.port.kids;
    for (let i = 0, iLen = kids.length; i < iLen; i++) {
      let kid = C(kids[i]);
      kid.removeComponent("HOVER");
      let v = kid.v;
      let c = u.__c;
      let gh = (v.gap + 14) / 8;
      let y = c["1Row"] ? 0 : c["2Row"] ? 1 : c["3Row"] ? 2 : c["4Row"] ? 3 : c["5Row"] ? 4 : c["6Row"] ? 5 : c["7Row"] ? 6 : 7;
      let adj = kid.__c["Hpbar"] ? 8 : kid.__c["Via"] ? 6.75 : kid.__c["ORB"] ? 7 : -0.25;
      //let adj = kid.__c["Hpbar"] ? 8.75 : kid.__c["Via"] ? 7.5 : kid.__c["ORB"] ? 7.75 : 0.5;
      let x = cc.x;
      if (kid.__c["ORB"]) {
        if (kid.__c["FLIP"]) {
          kid.removeComponent("FLIP");
          x += cc.vuW(wx * 0.2);
        } else {
          kid.addComponent("FLIP");
          x += cc.vuW(wx * 3);
        }
      }
      kid.attr({
        x: x >> 0,
        y: kid.vuW(wx * (v.top + 2 + (gh * y) + adj)) >> 0,
        z: 1000 + cell
      });
      kid.addComponent("HOVER");
    }
    u.removeComponent("EventPort").addComponent("ExitPort");
  },
}, true);

C.c("EnterPort", {
  init: function () {
    let ease = ["None", "In", "Out"];
    let db = this.db;
    let kids = [db.key.g, db.key.h, db.key.i, db.key.v];
    if (db.key.o) {
      kids.push(db.key.o);
    }
    let start = [];
    for (let j = 0, jLen = kids.length; j < jLen; j++) {
      start.push(C(kids[j]).alpha);
    }
    let port = {
      kids: kids,
      count: 50, //db[1][0].spd,
      duration: 50,
      valence: -1,
      amount: 1,
      start: start,
      ease: "ease" + ease[0],
    };
    this.db.port = port;
  }
});
C.c("ExitPort", {
  init: function () {
    let ease = ["None", "In", "Out"];
    let db = this.db;
    let kids = [db.key.g, db.key.h, db.key.i, db.key.v];
    if (db.key.o) {
      kids.push(db.key.o);
    }
    let start = [];
    for (let j = 0, jLen = kids.length; j < jLen; j++) {
      start.push(C(kids[j]).alpha);
    }
    let port = {
      kids: kids,
      count: 50, //db[1][0].spd,
      duration: 50,
      valence: 1,
      amount: 1,
      start: start,
      ease: "ease" + ease[0],
    };
    this.db.port = port;
  },
});