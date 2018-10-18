define(function (require) {
  let Crafty = require("crafty");
  Crafty.c("_ROCKET", {
    required: "NuVue, WebGL, Color, ROTATE",
    init: function () {
      this.attr({
        alpha: 0,
        z: 2000
      });
    },
    rocket: function (r) {
      let color;
      if (r.p === 1) {
        color = "rgba(0,255,255,.5)";
      } else {
        color = "rgba(255,0,0,.5)";
      }
      this.r = r;
      let c = Crafty("_CELLS").get(0);
      let x = c.search(r.cKey + 1000);
      let y = c.search(r.cKey + 2000);
      this.vued({
        x: this.getX(x),
        y: y - 14,
        w: 4,
        h: 2.25
      }).color(color);
      //console.log(this.r);
      return this;
    },
    launch: function () {},
    remove: function () {},
    getX: function (x) {
      //let x = v.vuW(100 * 1 / 15 * x);
      let nuX = 1 / 0.15 * x;
      return nuX;
    }
  });
});