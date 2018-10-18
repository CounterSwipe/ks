/*global Crafty*/
let C = Crafty;
C.s("_READY", {
  init: function () {},
  update: function () {
    let c = "READY";
    let uQ = C(c).get();
    if (uQ.length) {
      for (let i = uQ.length - 1; i >= 0; i--) {
        let u = uQ[i];
        this.ready(u);
      }
    } else {
      return;
    }
  },
  ready: function (u) {
    if (u.__c["TANK"]) {
      if (u.__c["MOVING"] || u.__c["MOVABLE"]) {
        this.seekTarget(u);
      } else {
        return;
      }
    } else {
      this.seekTarget(u);
    }
  },
  seekTarget: function (u) {
    if (u.__c["TANK"]) {
      this.target(u);
      u.removeComponent("READY").addComponent("COOLDOWN");
      //C.log(u.db, "Ready(seekTarget, onTarget, launchRocket) -> Cooldown");
    } else {
      //if TOWER:
      //this.towerTarget(u);
      this.target(u);
      u.removeComponent("READY").addComponent("COOLDOWN");
      //C.log(u.db, "Ready(seekTarget, onTarget, launchRocket) -> Cooldown");
    }
  },
  towerTarget: function (u) {
    let db = u.db;
    let p = db.d.p;
    let row = db.area.row;
    let tile = db.area.tile;
    let cell = (row * 10) + (tile + 1);
    let c = u.db.range[0];
    let activation = 3;
    let possibleTargets = this.getTarget(row, cell, activation);
    let pt = possibleTargets ? possibleTargets : 0;
    /*var enemyHero = this.findEnemies().filter(function (e) {
      return e.id === 'Hero Placeholder' || e.id === 'Hero Placeholder 1';
    })[0];
    var enemyHeros = this.findByType(this.type)[0] || this.findByType('knight')[0];
    let thrower = hero.findByType("thrower", hero.findEnemies());
    let enemy = hero.findNearestEnemy();
    if (thrower) {
      hero.attack(thrower);
    } else if (enemy) {
      hero.attack(enemy);
    }
    let farthest = 0;
    let maxDistance = 0;
    let enemies = hero.findEnemies();
    for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {
      let target = enemies[enemyIndex];
      let distance = hero.distanceTo(target);
      if (distance > maxDistance) {
        maxDistance = distance;
        farthest = target;
      }
    }*/
    //let targetRow|s = row +|-1;
    //let closestThreat = foes[0];
    //C.log(p, row, activation, u.db.area, cell, c, pt);

  },
  target: function (u) {
    //perhaps: tanks atk only: oCarry, noCarry, towers, oC|towers, nC|towers
    //perhaps: towers atk all: (via priority & type bonuses etc)
    //let target = ["OCARRY", "OCARRY TOWER", "TOWER", "NOCARRY", "NOCARRY TOWER"];
    let targetable = u.__c["TOWER"] ? "TANK" : "TOWER"; //u.db[1]vals[#]
    let targets = targetable; //target[targetable];
    let p = u.db.d.p;
    let foe = p === 1 ? 2 : 1;
    let row = u.db.area.row;
    let range = u.db.range;
    let cL = range[0];
    let cR = range[1];
    let top = cL < 200 ? 0 : 1;
    let btm = cL > 800 ? 0 : 1;
    let foes = [];

    if (top) {
      if (C((row - 1) + "Row " + targets)) {
        let topQ = C((row - 1) + "Row " + targets);
        let iLen = topQ.length;
        if (iLen) {
          for (let i = 0; i < iLen; i++) {
            foes.push(topQ[i]);

          }
        }
      }
    }
    if (btm) {
      let btmQ = C((row + 1) + "Row " + targets).get();
      let jLen = btmQ.length;
      if (jLen) {
        for (let j = 0; j < jLen; j++) {
          foes.push(btmQ[j]);
        }
      }
    }
    let fLen = foes.length;
    if (fLen) {
      C.log(p, row, u.__c["TOWER"], "atk", foes);
      //TODO: choose per priority etc
      //TODO L|R cell
      let foe = foes[0];
      let cell = foe.db.area.dir === 1 ? foe.db.range[1] : foe.db.range[0];
      this.fireBullet(u, cell, foe);
    } else {
      return;
    }
    /*
    units have "memories"
    influenced by their "emotions"
    that strenghen|weaken their "beliefs"
    that guides|directs|determines their actions|behavior(abilities|stats)


    is unit offCoolDown? = unit.ready
    //unit ready per unit.cooldown:0|(@deploy)unit.urgency:T
    is targetable foe|s within unit.activationRange?
    //targetable per unit.typesCanTarget && foe.isTargetable
    //types=[oCarry, noCarry, towers]//-> tanks|towers|all
    //thus: targets[all, oCarry, noCarry, tanks, towers]
    //perhaps: tanks atk only: oCarry, noCarry, towers, oC|towers, nC|towers
    //perhaps: towers atk all: (via priority & type bonuses etc)
    //priortization(targets,vendetta(past),retaliation(present),spd,hp,frame)
    //activationRange per unit.cell
    if targetableFoeType found, unit.atk(targetedFoe) ELSE
    if targetableFoeTypes found, is unit solo|multi attacker?
    if unit.solo:T, per unit.targetPriority choose target 
    if unit.multi, unit.atk(targetedFoesPerPriority)
    */
  },
  fireBullet: function (u, cell, foe) {
    let i = C(u.db.key.i);
    let m = C.e("Missile");
    let x = m.x += i.x;
    let y = m.y += i.y;
    m.attr({
      x: x,
      y: y,
      z: i.z
    });
    m.missile(cell, u.db.range, foe);
    m.addComponent("LAUNCH");
  },
  getTarget: function (r, c, a) {
    let topUnits = C((r - 1) + "Row U").get();
    let btmUnits = C((r + 1) + "Row U").get();
    if (topUnits) {
      for (let i = 0, iLen = topUnits.length; i < iLen; i++) {
        if (topUnits[i].get(0).__c[(c + a) + "CELL"]) {
          //C.log((c + a) + "CELL");
        }
      }
    }
  },
  readyx: function (u) {
    if (u.__c["TARGETABLE"]) {
      //this.handle(u);
    } else {
      //TODO: check if not targetable      
      if (u.db.target) {
        //this.handle(u);
      } else {
        u.addComponent("TARGETABLE");
        //this.handle(u);
      }
    }
  },
  movable: function (u) {
    let range = u.db.range;
    let p = u.db.d.p;
    let dir = u.db.area.dir;
    //let row = u.db.area.row;
    let cNum = dir === 1 ? range[1] + 1 : range[0] - 1;
    if (C(cNum + "CELL").get(0)) {
      let cell = C(cNum + "CELL").get(0);
      if (!cell.__c["RESERVED"]) {
        cell.addComponent("RESERVED").addComponent("P" + p);
        u.db.area.cNum = cNum;
        //
        u.db.u._hpDmg += 5;
        u.addComponent("HPDMG");
        //
        u.removeComponent("MOVABLE").addComponent("MOVING");
      } else {
        //
      }
    } else {
      u.removeComponent("MOVABLE").addComponent("EDGE");
    }
  },
  flipped: function (u) {
    let i = C(u.db.key.i);
    if (u.db.area.dir === 1) {
      i.unflip("X");
    } else {
      i.flip("X");
    }
  },
}, true);
C.c("Missile", {
  required: "VUES, WebGL, Bullet, DB",
  init: function () {
    let wx = 1 / 16 * 100;
    this.vues({
      x: wx,
      y: wx * 2,
      wy: 1,
      w: wx,
      h: wx,
      wh: 1
    });
  },
  missile: function (c, r, f) {
    //TODO spd:dur, dmg, etc
    let cell = C(c + "CELL").get(0);
    let wx = (1 / 16 * 100);
    let gh = (cell.v.gap + 14) / 8;
    let cX = cell.x;
    let x = this.x;

    this.db.cell = c;
    //this.db.range = r;
    this.db.utarget = f[0];
    this.db.itarget = f.db.key.i;
    this.db.amtX = cX > x ? cX - x : x - cX;
    this.db.dirX = cX > x ? 1 : -1;
    this.db.amtY = cell.vuW(wx + gh);
    this.db.dirY = c > r[0] ? 1 : -1;
    return this;
  },
});
C.c("LAUNCH", {
  required: "FX",
  init: function () {
    this.launchX(this.db.amtX, this.db.dirX);
    this.launchY(this.db.amtY, this.db.dirY);
  },
  launchX: function (a, v) {
    let e = this;
    let fx = 2;
    let prop = "x";
    let cFun = function (cArg) {
      //cArg.cba.destroy();
      cArg.cba.removeComponent(cArg.fx + "fx");
      cArg.cba.fx[cArg.fx] = {};
    };
    //let side = this.__c["1P"] ? 1 : 2;
    //let amt = side === 1 ? (this.x + this.w) : this.vuW(100) - this.x;
    let f = {
      e: e,
      fx: fx,
      now: 1,
      dur: 100,
      v: v, //side === 1 ? -1 : 1,
      amt: a,
      start: e[prop],
      ease: 0,
      prop: prop,
      cFun: cFun,
      cArg: {
        cba: e,
        fx: fx
      }
    };
    e.addFX(f);
  },
  launchY: function (a, v) {
    let e = this;
    let fx = 3;
    let prop = "y";
    let cFun = function (cArg) {
      //cArg.cba.destroy();
      cArg.cba.removeComponent(cArg.fx + "fx");
      cArg.cba.fx[cArg.fx] = {};
    };
    //let amt = (this.y + this.h);
    let f = {
      e: e,
      fx: fx,
      now: 1,
      dur: 100,
      v: a,
      amt: v,
      start: e[prop],
      ease: 0,
      prop: prop,
      cFun: cFun,
      cArg: {
        cba: e,
        fx: fx
      }
    };
    e.addFX(f);
  },
  remove: function () {
    this.fx[2] = {};
    this.fx[3] = {};
    this.removeComponent("2fx");
    this.removeComponent("3fx");
  },
});

C.c("COOLDOWN", {
  required: "FX",
  init: function () {
    let fx = 8;
    let self = this;
    let dur = self.db[1].vals[7];
    let cFun = function (cArg) {
      cArg.cba.removeComponent(cArg.fx + "fx");
      cArg.cba.fx[cArg.fx] = {};
      cArg.cba.addComponent("READY").removeComponent("COOLDOWN");
    };
    let f = {
      e: self,
      fx: fx,
      now: 1,
      dur: 100 + dur, //TODO cooldownDur val|stat
      v: 0,
      amt: 0,
      start: 0,
      ease: 0,
      prop: 0,
      cFun: cFun,
      cArg: {
        cba: self,
        fx: fx
      }
    };
    this.addFX(f);
  },
});
C.c("TARGETABLE", {
  init: function () {
    this.zone1 = {
      row1: [0],
      row2: [0],
      row3: [0]
    };
    this.zone2 = {
      row1: [0],
      row2: [0],
      row3: [0]
    };
    for (let zone = 1; zone < 3; zone++) {
      for (let row = 1; row < 4; row++) {
        for (let cell = 1; cell < 65; cell++) {
          this["zone" + zone]["row" + row].push(0); //cell
        }
      }
    }
  },
});
C.c("SetTargetable", {
  init: function () {
    let t = C("TARGETABLE").get(0);
    this.db.t = t[0];
  },
  setTargetable: function (n) {
    let t = C(this.db.t);
    let range = this.db.range;
    let start = range[0];
    let zone = start < 2000 ? 1 : 2;
    let row = start < 200 ? 1 : start < 300 ? 2 : 3;
    for (let i = 0, iLen = range.length; i < iLen; i++) {
      t["zone" + zone]["row" + row][range[i]] = n; //this[0]
    }
  },
  remove: function () {
    this.setTargetable(0);
  },
});