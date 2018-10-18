define(function() {
  /*global Crafty TweenMax*/
  Crafty.c("Pin", {
    init: function() {
      //TODO only load active pins
      for (let i = 11; i < 19; i++) {
        Crafty.e("NuVue, WebGL, PIN_u" + i + "m1").
        vued({ x: 0, y: 0, w: 6, h: 8 }).attr({ alpha: 0, z: 1000 + i });
      }
      Crafty.e("NuVue, WebGL, PIN_wht").
      vued({ x: 0, y: 0, w: 6, h: 8 }).attr({ alpha: 0, z: 1020 });
      Crafty.e("NuVue, WebGL, PIN_x").
      vued({ x: 0, y: 0, w: 6, h: 8 }).attr({ alpha: 0, z: 1020 });
      Crafty.e("NuVue, WebGL, PIN_0").
      vued({ x: 0, y: 0, w: 6, h: 8 }).attr({ alpha: 0, z: 1021 });
    }
  });
  Crafty.s("SET_VUE", {
    init: function() {
      Crafty.e("GetVue");
      Crafty.e("SetVue");
      Crafty.e("NuVue, WebGL, BG_0").
      attr({ alpha: 1 }).
      vued({ x: 0, y: 0, w: 100, h: 100 });
      Crafty.e("NuVue, WebGL, Color, GetMice").
      color("rgba(0,0,0,1)").attr({ alpha: 0 }).
      vued({ x: 0, y: 0, w: 100, h: 100 });
      Crafty.e("NuVue, WebGL, Color, _vNote").
      vued({ x: 20, y: 49, w: 60, h: 5 }).
      attr({ alpha: 0, z: 3000 }).
      color("rgba(0,0,0,.5)");
      let vn = Crafty.e("TXT, _vNote");
      vn.txt({ a: 0, x: 20, y: 50, w: 60, fF: 2, fS: 3, fA: 1, fT: 0, fC: 15 }).attr({ z: 3001 });
      //Crafty.e("NuVue, WebGL, Color").
      //vued({ x: 8/15 * 100, y: 52, w: 3/15 * 100, h: 4 }).
      //color(0, 255, 255, 1).attr({ alpha: 1 });
      Crafty.e("Pin");
    },
  }, true);
});
