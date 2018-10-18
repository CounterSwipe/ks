define(function() {
  /*global Crafty*/
  Crafty.c("_SCORE", {
    score: { p1: 0, p2: 0, max: 3 }
    //  score: { 1: { now: 0, max: 0 }, 2: { now: 0, max: 0 } }
  });
  Crafty.s("SET_SCORE", {
    init: function() {
      let s = Crafty.e("_SCORE, SCORED");
      this.setBoards();
      Crafty.e("TXT, vScore, _P1"). //fC 1
      txt({ a: 1, x: 64, y: .5, w: 12, fF: 2, fS: 3, fA: 1, fT: 0, fC: 2 }).
      text(s.score.p1);
      Crafty.e("TXT, vScore, _P2"). //fC 1
      txt({ a: 1, x: 88, y: .5, w: 12, fF: 2, fS: 3, fA: 1, fT: 0, fC: 10 }).
      text(s.score.p2);
      this.update()
    },
    setBoards: function() {
      Crafty.e("NuVue, WebGL, Color").
      vued({ x: 64, y: 0, w: 12, h: 3.5 }).
      color(255, 255, 255, .5).attr({ alpha: 1 });
      //grd(1).attr({ alpha: 1 }); //grd 1|2
      Crafty.e("NuVue, WebGL, Color"). //Grd 5
      vued({ x: 88, y: 0, w: 12, h: 3.5 }).
      color(255, 255, 255, .5).attr({ alpha: 1 });
      //grd(5).attr({ alpha: 1 });
    },
    render: function(s) {
      Crafty("vScore _P1").get(0).text(s.score.p1);
      Crafty("vScore _P2").get(0).text(s.score.p2);
    },
    update: function() {
      //TODO s.score.scored = true @ player.score
      let s = Crafty("_SCORE").get(0);
      if (s.__c["SCORED"]) {
        s.removeComponent("SCORED");
        this.render(s);
        if (s.score.p1 === s.score.max || s.score.p2 === s.score.max) {
          Crafty.s("Ticked").destroy();
        }
      }
      else { return; }
    }
  }, true);
});
/*Crafty.c("ORB", {
    required: "Moment, NuVue, WebGL, Color",
  });
  Crafty.s("Orbs", {
    init: function() {
      //Crafty.e("ORB, P1");
      //Crafty.e("ORB, P2");
      this.resetOrb(1);
      this.resetOrb(2);
    },
    resetOrb: function(player) {
      if (player === 1) { this.p1orb(); }
      else { this.p2orb(); }
    },
    p1orb: function() {
      //let o = Crafty("ORB P1").get(0);
      let o = Crafty.e("ORB, P1");
      o.moment = { captured: false, uID: 0, 1: 715, 2: 716, 3: 815, 4: 816, 5: 915, 6: 916, 7: 126, 8: 226, 9: 326 };
      o.attr({
        x: o.vuW(this.getX(2)),
        y: o.vuH(70),
        w: o.vuW(this.getX(2)),
        h: o.vuH(12),
        z: o.moment[1]
      }).color(0, 255, 255, .5).
      addComponent("DIM");
      o.o = 100;
      //return this;
    },
    zone: function(player) {
      if (player === 1) { this.p1zone(); }
      else { this.p2zone(); }
    },
    p1zone: function() {
      //let o = Crafty("ORB P1").get(0);
      let o = Crafty.e("ORB, Z1");
      o.attr({
        x: o.vuW(this.getX(13)),
        y: o.vuH(26),
        w: o.vuW(this.getX(2)),
        h: o.vuH(12),
        z: 126
      }).color(0, 255, 255, .5).
      addComponent("DIM");
      o.o = 100;
      //return this;
    },
    p2zone: function() {
      //let o = Crafty("ORB P1").get(0);
      let o = Crafty.e("ORB, Z2");
      o.attr({
        x: 0,
        y: o.vuH(70),
        w: o.vuW(this.getX(2)),
        h: o.vuH(12),
        z: 713
      }).color(255, 0, 0, .5).
      addComponent("DIM");
      o.o = 100;
      //return this;
    },
    p2orb: function() {
      //let o = Crafty("ORB P2").get(0);
      let o = Crafty.e("ORB, P2");
      o.moment = { captured: false, uID: 0, 1: 124, 2: 125, 3: 224, 4: 225, 5: 324, 6: 325, 7: 714, 8: 814, 9: 914 };
      o.attr({
        x: o.vuW(this.getX(11)),
        y: o.vuH(26),
        w: o.vuW(this.getX(2)),
        h: o.vuH(12),
        z: o.moment[1]
      }).color(255, 0, 0, .5).
      addComponent("DIM");
      o.o = 100;
      //return this;
    },
    getX: function(x) {
      //let x = v.vuW(100 * 1 / 15 * x);
      let nuX = 1 / .15 * x;
      return nuX;
    },
    onFrame: function() {
      //TODO for player 2 as well!
      let i, o, oQ = Crafty("ORB").get().length;
      for (i = 0; i < oQ; i++) {
        o = Crafty("ORB").get(i);
        if (o.__c["CAPTURED"]) { this.captured(o); }
        this.handle(o);
      }
    },
    capture: function(cell, player) {
      let o = Crafty("ORB P" + player).get(0);
      if (!o.moment.captured) {
        switch (true) {
          case cell === o.moment[1]:
          case cell === o.moment[2]:
          case cell === o.moment[3]:
          case cell === o.moment[4]:
          case cell === o.moment[5]:
          case cell === o.moment[6]:
            return true;
          default:
            return false;
        }
      }
      else { return false; }
    },
    onCapture: function(uID, player) {
      let u = Crafty(uID);
      let o = Crafty("ORB P" + player).get(0);
      o.attr({
        x: u.x,
        y: u.y,
        w: u.w,
        h: u.h,
        z: u.z
      });
      u.addComponent("CARRYING");
      o.addComponent("CAPTURED");
      o.moment.captured = true;
      o.moment.uID = uID;
      this.zone(player);
    },
    captured: function(o) {
      let u = Crafty(o.moment.uID);
      let x = o.__c["FLIPPED"] ? u.x + o.vuW(this.getX(1)) : u.x;
      o.attr({
        x: x,
        y: u.y,
        w: u.w - o.vuW(this.getX(1)),
        h: u.h,
        z: u.z
      });
      this.flipCheck(u._flipX, o);
    },
    flipCheck: function(flipped, o) {
      if (flipped) {
        if (o.__c["FLIPPED"]) { return; }
        else { o.addComponent("FLIPPED"); }
      }
      else {
        if (o.__c["FLIPPED"]) {
          o.removeComponent("FLIPPED");
        }
        else { return; }
      }
    },
    scoreCheck: function(u) {
      let o = Crafty("ORB P" + u.d.p).get(0);
      let cell = [0, u.d.b, u.d.a];
      switch (true) {
        case cell[u.d.p] === o.moment[7]:
        case cell[u.d.p] === o.moment[8]:
        case cell[u.d.p] === o.moment[9]:
          this.score(u, o);
          break;
        default:
          return;
      }
    },
    score: function(u, o) {
      Crafty(u.d.uID).removeComponent("CARRYING");
      let z = Crafty("ORB Z" + u.d.p).get(0);
      z.destroy();
      o.destroy();
      this.resetOrb(u.d.p);
      Crafty.s("ScoreBoard").onScore(u.d.p);
      console.log("P" + u.d.p, " SCORED!", u);
    },
    //TODO ondrop jump
    handle: function(o) {
      switch (true) {
        case o.__c["DIM"]:
          this.dim(o);
          break;
        default:
          this.unDim(o);
      }
    },
    dim: function(o) {
      o.o--;
      let a = o.alpha;
      o.alpha = a - .008; //let y = o.y;
      //o.y = y - (o.vuH(.025)); //.05
      if (o.o < 1) {
        o.removeComponent("DIM").
        addComponent("UNDIM");
        o.o = 100;
      }
    },
    unDim: function(o) {
      o.o--;
      let a = o.alpha;
      o.alpha = a + .008; //let y = o.y;
      //o.y = y + (o.vuH(.025)); //.05
      if (o.o < 1) {
        o.removeComponent("UNDIM").
        addComponent("DIM");
        o.o = 100;
      }
    }
  }, true);*/
