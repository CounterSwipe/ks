define(function (require) {
  let Crafty = require("crafty");
  let Console = console;
  let logit = Console.log;
  Crafty.scene("PlayTest", function () {
    Crafty.viewport.clampToEntities = false;
    Crafty.s("SET_VUE");
    //Crafty.s("Ticked");
    //Crafty.e("Touches").
    //setU(() => Crafty.s("SET_VUE").start());
    //Crafty("PUB").get(0).sendMsg("ready");
    logit("@gameStart");
  });
});