/*global Crafty*/
import bezier from "/lib/game/fx/bezier.js";
let C = Crafty;
C.s("_MOVING", {
  init: function () {},
  update: function () {
    let c = "MOVING";
    let uQ = C(c).get();
    if (uQ.length) {
      for (let i = uQ.length - 1; i >= 0; i--) {
        let u = uQ[i];
        this.moving(u);
      }
    } else {
      return;
    }
  },
  moving: function (u) {
    u.db.move.count--;
    let move = u.db.move;
    let kids = move.kids;
    let t = (move.duration - move.count) / move.duration;
    let progress = this[move.ease](t);
    for (let i = 0, iLen = kids.length; i < iLen; i++) {
      let kid = C(kids[i]);
      let value = move.start[i] + (move.valence * (move.amount * progress));
      kid.x = value >> 0;
    }
    if (u.db.move.count < 1) {
      this.setRange(u);
    }
  },
  setRange: function (u) {
    let range = u.db.range;
    let p = u.db.d.p;
    let r = [];
    let dir = u.db.area.dir;
    let cRemove = dir === 1 ? range[0] : range[1];
    let cNum = u.db.area.cNum;
    let cStart = dir === 1 ? 1 : 0;
    C(cRemove + "CELL").get(0).removeComponent("RESERVED").removeComponent("P" + p);
    r.push(range[cStart]);
    r.push(cNum);
    r.sort((a, b) => a - b);
    u.db.range = r;
    u.db.area.cNum = 0;
    u.removeComponent("MOVING").addComponent("MOVABLE");
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
}, true);