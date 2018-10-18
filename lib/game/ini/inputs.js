/*global Crafty*/
import round from "/lib/game/util/round.js";
let C = Crafty;
C.c("INPUTS", {
  inputs: {}
});
C.s("_INPUTS", {
  init: function () {
    this.setIcons();
    this.setInputs();
  },
  setIcons: function () {
    let nb = C("Note WebGL").get(0);
    let nt = C("NoteTx").get(0);
    let d5 = C(5 + "DRAG Dragon").get(0);
    let d6 = C(6 + "DRAG Dragon").get(0);
    let d7 = C(7 + "DRAG Dragon").get(0);
    let d8 = C(8 + "DRAG Dragon").get(0);
    let d9 = C(9 + "DRAG Dragon").get(0);
    let d10 = C(10 + "DRAG Dragon").get(0);
    let d11 = C(11 + "DRAG Dragon").get(0);
    let p5 = C(5 + "PIN").get(0);
    let p6 = C(6 + "PIN").get(0);
    let p7 = C(7 + "PIN").get(0);
    let p8 = C(8 + "PIN").get(0);
    let p9 = C(9 + "PIN").get(0);
    let p10 = C(10 + "PIN").get(0);
    let p11 = C(11 + "PIN").get(0);
    this.icon = {
      d5: d5[0],
      d6: d6[0],
      d7: d7[0],
      d8: d8[0],
      d9: d9[0],
      d10: d10[0],
      d11: d11[0],
      p5: p5[0],
      p6: p6[0],
      p7: p7[0],
      p8: p8[0],
      p9: p9[0],
      p10: p10[0],
      p11: p11[0],
      nb: nb[0],
      nt: nt[0],
    };
  },
  setInputs: function () {
    let m = C.e("MICE");
    let n = C.e("1P, INPUTS, VALID, _PRI");
    //let pau = C("1P PAU").get(0);
    let e = C("1P Energy").get(0);
    this.e = e[0];
    this.m = m[0];
    this.n = n[0];
    //this.pau = pau[0];
    this.mobility = 0;
    this.cost = 0;
    for (let i = 5; i < 12; i++) {
      C(i + "BTN").get(0).addComponent("Mdrag");
    }
    C("0BTN").get(0).addComponent("Mswipe");
    for (let j = 1; j < 5; j++) {
      C(j + "BTN").get(0).addComponent("Mtap");
    }
  },
  update: function () {
    let m = C(this.m);
    while (m.mice.size !== 0) {
      let i = m.mice.now.shift();
      m.mice.size--;
      //C.log(i);
      this[i.m](i);
    }
  },
  mDown: function (i) {
    if (C(this.n).__c["VALID"]) {
      if (i.t && i.t < 5) {
        C("1P " + i.t + "Box PRI").get(0).addComponent("SELECTED");
        let n = C(this.n);
        n.removeComponent("VALID").addComponent("ACTIVE");
        n.inputs = i;
        //this.enterTap(i);
      } else {
        this.enterSwipe(i);
      }
    } else {
      return;
    }
  },
  enterSwipe: function (i) {
    let n = C(this.n);
    n.removeComponent("VALID").addComponent("ONSWIPE");
    n.inputs = i;
  },
  enterTap: function (i) {
    let btn = C("1P " + i.t + "Box Cover").get(0);
    if (btn.__c["BtnReady"]) {
      this.tapStart(i);
    } else {
      this.tapFail(btn);
    }
  },
  tapStart: function (i) {
    let n = C(this.n);
    let pau = this.getPau(n);
    let trait = C("1P " + i.t + "T").get(0);
    let vals = trait.db[pau.a].vals;
    n.removeComponent("VALID").addComponent("ACTIVE");
    n.inputs = i;
    this.cost = vals[2];
    this.toggleIcons(1);
    this.selection(i.t, pau.c, 1);
  },
  tapFail: function (btn) {
    let fx = btn.fx[7];
    let s = (fx.count / fx.duration * 6) >> 0;
    if (s) {
      this.vNote("TRAITS READY IN: <br> " + s + "secs");
    } else {
      this.vNote("TRAITS READY IN: <br> <1sec");
    }
  },
  getPau: function (n) {
    let a = n.__c["_ULT"] ? 3 : n.__c["_ALT"] ? 2 : 1;
    let b = ["PRI", "ALT", "ULT"];
    let c = b[a - 1];
    let pau = {
      a: a,
      b: b,
      c: c
    };
    return pau;
  },
  selection: function (t, pau, s) {
    let c = s === 1 ? "addComponent" : "removeComponent";
    let sQ = C("1P " + t + "Box " + pau).get();
    for (let i = sQ.length - 1; i >= 0; i--) {
      let e = sQ[i];
      e[c]("SELECTED");
    }
  },

  mOver: function (i) {
    if (C(this.n).__c["ACTIVE"]) {
      if (i.t) {
        this.toggleDrag(i, 0.5);
      } else {
        C.log(0, "TODO:CancelDrag!");
      }
    } else {
      return;
    }
  },
  toggleIcons: function (a) {
    for (let i = 5; i < 12; i++) {
      C(this.icon["p" + i]).alpha = a || 0;
    }
  },
  toggleDrag: function (i, a) {
    C(this.icon["d" + i.t]).alpha = a || 0;
  },
  mOut: function (i) {
    if (C(this.n).__c["ACTIVE"]) {
      this.toggleDrag(i);
    } else {
      return;
    }
  },
  exitSwipe: function (i) {
    let pau = C(this.pau);
    if (pau.__c["_PRI"]) {
      let s = pau.db.alt.count;
      let n = C(this.n);
      n.addComponent("VALID").removeComponent("ONSWIPE");
      if (s) {
        this.vNote("ALTERNATE TRAITS <br> READY IN: " + s + "secs");
      } else {
        this.vNote("ALTERNATE TRAITS <br> READY IN: <1sec");
      }
    } else {
      this.swiped(C(this.n), i);
    }
  },
  mUp: function (i) {
    if (C(this.n).__c["ONSWIPE"]) {
      this.exitSwipe(i);
    } else if (C(this.n).__c["ACTIVE"]) {
      let n = C(this.n);
      n.addComponent("VALID").removeComponent("ACTIVE");
      let me = C("1P " + n.inputs.t + "Box PRI").get(0).removeComponent("SELECTED");
      C.log(me);
      //this.toggleDrag(i);
      //this.toggleIcons();
      //let pau = this.getPau(n);
      //this.selection(n.inputs.t, pau.c);
      let tNum = i.t;
      if (tNum > 4000) {
        //if (tNum > 4) {
        let tile = [801, 411, 604, 606, 608, 605, 607];
        //let tile = [801, 411, 603, 605, 607, 609];
        //let tile = [61, 47, 21, 23, 25, 27];
        let c = tile[(tNum - 5)];
        let c1 = C(c + "CELL").get(0);
        let c2 = C((c + 1) + "CELL").get(0);
        let t = n.inputs.t;
        if ((!c1.__c["RESERVED"]) && (!c2.__c["RESERVED"])) {
          let e = C(this.e);
          let energy = e.db._energy;
          let cost = this.cost;
          if (cost <= energy) {
            this.pub(c, t, pau.a);
          } else {
            let req = round((cost - energy), 3);
            return this.vNote("ENERGY LOW! <br> REQ: +" + req);
          }
        } else {
          return this.vNote("AREA OCCUPIED!"); //VICINITY 
        }
      } else {
        return this.vNote("TRAIT CANCELLED!");
      }
    } else {
      return;
    }
  },
  swiped: function (n, i) {
    n.addComponent("VALID").removeComponent("ONSWIPE");
    let tapStart = C(n.inputs.e);
    let m = {
      aX: n.inputs.x,
      aY: n.inputs.y,
      zX: i.x,
      zY: i.y
    };
    let uW = tapStart.w / 25 >> 0;
    let uH = tapStart.h / 25 >> 0;
    let dir = ((m.zX - m.aX) >> 0) === ((m.zY - m.aY) >> 0) || (uW > Math.abs(((m.zX - m.aX) >> 0)) && uH > Math.abs(((m.zY - m.aY) >> 0))) ? 0 : this.dir(m);
    if (dir) {
      this.onSwipe(n, dir);
    } else {
      return this.vNote("TRAIT SWITCH <br> CANCELLED");
    }

  },
  dir: function (m) {
    let x = Math.round((m.zX - m.aX), 3),
      y = Math.round((m.zY - m.aY), 3);
    if (Math.abs(x) >= Math.abs(y)) {
      return x < 0 ? 4 : 3; //4:sR, 3:sL
    } else {
      return y < 0 ? 1 : 2; //1:sU, 2:sD
    }
  },
  onSwipe: function (n, dir) {
    let pau = C(this.pau).__c;
    let max = pau["_ULT"] ? 2 : 1;
    let state = n.__c["_ULT"] ? 2 : n.__c["_ALT"] ? 1 : 0;
    let v = dir === 1 || dir === 3 ? 1 : -1;
    let nDir = state + v;
    if (nDir === -1) {
      nDir = max;
    }
    if (nDir > max) {
      nDir = 0;
    }
    let c = ["PRI", "ALT", "ULT"];
    n.removeComponent("_" + c[state]).addComponent("_" + c[nDir]);
    this.setState(c[state], 0);
    this.setState(c[nDir], 1);
  },
  setState: function (c, state) {
    let s = ["addComponent", "removeComponent"];
    let status = s[state];
    let sQ = C("STATE " + c).get();
    for (let i = sQ.length - 1; i >= 0; i--) {
      let e = sQ[i];
      e[status]("OpOff");
    }
  },
  vNote: function (t) {
    let icon = this.icon;
    let nb = C(icon.nb);
    let nt = C(icon.nt);
    nb.alpha = 1;
    nt.alpha = 1;
    nt.text(t);
    this.addFX(nb);
    this.addFX(nt);
  },
  pub: function (cell, trait, aNum) {
    let newMsg = {
      move: {
        c: cell,
        t: trait,
        a: aNum, //pau
        f: C.frame(),
        p: 1
      }
    };
    //Crafty("MSGS").onMsg(newMsg);    
    C("GetMsgs").onMsg(newMsg);
    C("GetMsgs").onMsg({
      move: {
        c: cell,
        t: trait,
        a: aNum, //pau
        //g: gui,
        f: C.frame(),
        p: 2
      }
    });
    C("1P " + trait + "Box Cover").get(0).addComponent("BtnBusy");
  },
  addFX: function (e) {
    let fx = 1;
    let prop = "alpha";
    let cFun = function (cArg) {
      cArg.cba.removeComponent(cArg.fx + "fx");
      cArg.cba.fx[cArg.fx] = {};
    };
    let f = {
      e: e,
      fx: fx,
      now: 1,
      dur: 75, //65
      v: -1,
      amt: 1,
      start: e[prop],
      ease: 1,
      prop: prop,
      cFun: cFun,
      cArg: {
        cba: e,
        fx: fx
      }
    };
    e.addFX(f);
  },
}, true);