define(function() {
  /*global Crafty*/
  Crafty.s("SET_INTRO", {
    init: function() {
      Crafty.e("GetVue");
      Crafty.e("SetVue");
      Crafty.e("NuVue, Grd").vued({ x: 0, y: 0, w: 100, h: 55 }).grd(0).attr({ alpha: 1 });
      Crafty.e("NuVue, Grd, Persist, _FADEUPX").vued({ x: 0, y: 55, w: 100, h: 45 }).grd(7);
      Crafty.e("NuVue, DOM, Color, Persist, _FADEUPX").vued({ x: 0, y: 75, w: 100, h: 20 }).color("black");
      Crafty.e("NuVue, Grd, Persist, _FADEUPX").vued({ x: 0, y: 75, w: 100, h: 20 }).grd(0).attr({ alpha: .3 });
      let a = Crafty.e("TXT, Persist, _FADEUPX").text("COUNTER").
      txt({ a: .8, x: 0, y: 57.5, w: 100, fF: 0, fS: 5.5, fA: 1, fC: 1, fT: 1 })
      a.attr({ h: a.vuH(5.5) });
      let b = Crafty.e("TXT, Persist, _FADEUPX").text("SWIPE").
      txt({ a: .5, x: 0, y: 62.5, w: 100, fF: 1, fS: 11, fA: 1, fC: 1, fT: 1 });
      b.attr({ h: b.vuH(11) });
      Crafty.e("TXT, Persist, _FADEUPX").text("Mateo Navarrete | ©2018 All Rights Reserved.").
      txt({ a: .5, x: 0, y: 96.5, w: 100, fF: 2, fS: 2.3, fA: 1, fC: 0, fT: 0 });
    }
  }, true);
});
