define(function (require) {
  let Crafty = require("crafty");
  Crafty.c("_MSGS", {
    msgs: {
      max: 24,
      now: [],
      size: 0,
      eid: 0
    }
  });
  Crafty.c("GetMsgs", {
    //events: { "OnMsg": "onMsg" },
    getMsgs: function () {
      return Crafty("_MSGS").get(0);
    },
    getEid: function () {
      let m = this.getMsgs();
      if (m.msgs.size === m.msgs.max) {
        return false;
      } else {
        m.msgs.eid++;
        return m.msgs.eid;
      }
    },
    onMsg: function (msg) {
      let e = this.getEid();
      if (e) {
        this.mPush({
          e: e,
          m: "deploy",
          d: msg
        });
      }
    },
    mPush: function (e) {
      this.getMsgs().msgs.now.push(e);
      this.getMsgs().msgs.size++;
      return true;
    }
  });
  Crafty.s("SET_MSGS", {
    init: function () {
      Crafty.e("_MSGS");
      Crafty.e("GetMsgs");
      //TODO:push|save _MSG to saveQ|debugQ for game viewing|pubnub.chan[debug]
    },
    update: function () {
      let m = Crafty("_MSGS").get(0);
      while (m.msgs.size !== 0) {
        let i = m.msgs.now.shift();
        m.msgs.size--;
        this[i.m](i);
      }
    },
    deploy: function (i) {
      //console.log(i);
      let msg = i.d; //.msg(); //console.log(msg);
      let gKey = msg.g;
      let p = msg.p;
      let dKey = Crafty("_GUI _P" + p).search(gKey + 10);
      let d = Crafty("_DECK _P" + p).get(0);
      let uNum = d.search(dKey);
      let model = d.search(uNum + 1100);
      let energy = d.search(uNum + 1400);
      let spd = d.search(uNum + 1500);
      let hp = d.search(uNum + 1600);
      let cKey = msg.c;
      let elasped = Crafty.frame() - msg.f;
      let aF = spd + 25 - elasped;
      let dF = Crafty.frame() + aF; // + 1;?
      let cK = p === 1 ? cKey : Crafty.s("GET_CKEY").getCkey(cKey);
      Crafty.s("SET_ENERGY").eMsg({
        p: p,
        e: energy
      });
      if (p === 1) {
        Crafty("_UI" + gKey).get(0).addComponent("DISCARD");
      } else if (p === 2) {
        Crafty.s("SET_UI").p2dKeyNext(p, gKey);
      }
      let u = Crafty.e("_GFX, _UNIT, _P" + p);
      u.keyz = {
        dKey: dKey,
        cKeyL: cK,
        cKeyR: cK + 1,
        nuKeyL: cK,
        nuKeyR: cK + 1,
        f: msg.f,
        p: p,
        spd: spd,
        aF: aF,
        dF: dF,
        uImg: "u" + uNum + "m" + model,
        hp: {
          now: hp,
          max: hp
        }
      };
      if (d.search(uNum + 1700)) {
        u.addComponent("_SPLASH");
      }
      if (d.search(uNum + 1800)) {
        u.addComponent("_TOWER");
      }
      if (d.search(uNum + 1900)) {
        u.addComponent("_URGENCY");
      }
      this.dAdj(u);
    },
    dAdj: function (u) {
      u.keyz.aX = 6.25;
      u.keyz.dX = 1;
      u.keyz.dY = 0;
      if ((u.keyz.cKeyL < 700 && u.keyz.p === 1) || (u.keyz.cKeyL < 400 && u.keyz.p === 2)) {
        u.keyz.dX = -1;
        u.keyz.aX = 8.25;
      }
      this.dCells(u);
    },
    dCells: function (u) {
      let c = Crafty("_CELLS").get(0);
      let cKeyL = u.keyz.cKeyL;
      let cKeyR = u.keyz.cKeyR;
      c.add(cKeyL + 3000, 0); //vacant:F
      c.add(cKeyR + 3000, 0); //vacant:F
      c.add(cKeyL + 4000, u.keyz.p); //player
      c.add(cKeyR + 4000, u.keyz.p); //player
      c.add(cKeyL + 5000, u[0]); //uKey
      c.add(cKeyR + 5000, u[0]); //uKey
    },
  }, true);
});