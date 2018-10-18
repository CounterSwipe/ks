define(function (require) {
  let Crafty = require("crafty");
  //let Console = console;
  //let logit = Console.log;
  Crafty.scene("Loading", function () {
    Crafty.viewport.clampToEntities = false;
    Crafty.s("SET_LOAD");
    Crafty.s("SET_IMGS");
    /*  Crafty.s("SET_PLAYER");
        Crafty.s("SET_DECK");
        Crafty.s("SET_CELLS");
        Crafty.s("SET_GUI");
        Crafty.s("SET_MSGS");
        Crafty.e("PUB");*/
  }, function () {
    Crafty.s("SET_LOAD").destroy();
  });
});