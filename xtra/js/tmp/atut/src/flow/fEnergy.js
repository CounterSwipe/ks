define(function (require) {
  let Crafty = require("crafty");
  Crafty.c("_ENERGY", {
    energy: {
      p1: 50,
      p2: 50,
      xe: 1
    }
    //energy: { 1: { now: 0, max: 0 }, 2: { now: 0, max: 0 } }
    //energy: { 1: 0, 2: 0, 3: 1 }//p1|p2|xe
  });
  Crafty.s("SET_ENERGY", {
    init: function () {
      let e = Crafty.e("_ENERGY");
      Crafty.e("NuVue, WebGL, Color, vEnergy").
        vued({
          x: 20,
          y: 98,
          w: 0,
          h: 1.5
        }).color(0, 255, 255, 1);
      Crafty.e("NuVue, WebGL, etop").vued({
        x: 0,
        y: 97.5,
        w: 100,
        h: 2.5
      });
      this.render(e.energy);
    },
    eMsg: function (eMsg) {
      let eng = Crafty("_ENERGY").get(0);
      eng.energy["p" + eMsg.p] -= eMsg.e;
      if (eMsg.p === 1) {
        this.render(eng.energy);
      }
    },
    eUpdate: function () {
      let eng = Crafty("_ENERGY").get(0);
      eng.energy.xe = 2;
    },
    render: function (e) {
      let eBar = Crafty("vEnergy").get(0);
      let ePerc = 80 * e.p1 * 0.01;
      eBar.w = eBar.vuW(ePerc) >> 0;
    },
    update: function () {
      let e = Crafty("_ENERGY").get(0);
      for (let p = 1; p < 3; p++) {
        if (e.energy["p" + p] !== 100) {
          let nue = e.energy["p" + p] + (e.energy.xe * 3.5); //TODO dt
          if (nue >= 100) {
            nue = 100;
          }
          e.energy["p" + p] = nue;
          if (p === 1) {
            this.render(e.energy);
          }
        }
      }
    },
  }, true);
});