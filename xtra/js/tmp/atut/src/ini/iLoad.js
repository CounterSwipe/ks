define(function (require) {
  let Crafty = require("crafty");
  let Console = console;
  let logit = Console.log;
  Crafty.s("SET_LOAD", {
    init: function () {
      Crafty.e("GetVue");
      Crafty.e("SetVue");
      let a = Crafty.e("TXT").text("LOADING...").txt({
        a: 0.8,
        x: 0,
        y: 25,
        w: 100,
        fF: 0,
        fS: 5,
        fA: 1,
        fC: 1,
        fK: 1
      }); //fS:5.5 y:44 h:5.5
      a.attr({
        h: a.vuH(5)
      });
      logit("loading");
    },
    remove: function () {
      Crafty("GetVue").get(0).destroy();
      Crafty("SetVue").get(0).destroy();
    }
  }, true);

});