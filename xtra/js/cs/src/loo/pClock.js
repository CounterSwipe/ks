define(function() {
  /*global Crafty*/
  Crafty.c("_CLOCK", {
    clock: { now: 3, max: 180, wave: 3 }
  });
  Crafty.s("SET_CLOCK", {
    init: function() {
      let c = Crafty.e("_CLOCK");
      Crafty.e("NuVue, WebGL, Color").
      vued({ x: 76, y: 0, w: 12, h: 3.5 }).
      color(255, 255, 255, 1).attr({ alpha: .3 });
      Crafty.e("TXT, vClock").
      txt({ a: 1, x: 76, y: .5, w: 12, fF: 2, fS: 3, fA: 1, fT: 0 });
      this.render(c);
    },
    render: function(c) {
      let vc = Crafty("vClock").get(0);
      vc.text(c.now);
    },
    update: function() {
      let c = Crafty("_CLOCK").get(0);
      switch (c.clock.wave) {
        case 3:
          if (c.clock.now) {
            c.clock.now--;
          }
          else {
            c.clock.now = c.clock.max;
            c.clock.wave--;
            //Crafty.s("Bases");TODO
          }
          break;
        case 2:
          c.clock.now--;
          if (c.clock.now === (c.clock.max - (c.clock.max / 3)) >> 0) {
            c.clock.wave--;
            Crafty.s("SET_CELLS").cRender(2);
          }
          break;
        case 1:
          c.clock.now--;
          if (c.clock.now === (c.clock.max - (2 * c.clock.max / 3)) >> 0) {
            c.clock.wave--;
            Crafty.s("SET_ENERGY").eUpdate();
            Crafty.s("SET_CELLS").cRender(3);
            //console.log(Crafty("Cells").get(0));
          }
          break;
        default:
          c.clock.now--;
          if (!c.clock.now) {
            Crafty.s("Ticked").destroy();
          }
      }
      this.render(c.clock);
    }
  }, true);
});
