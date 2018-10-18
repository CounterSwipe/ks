define(function() {
  /*global Crafty*/
  Crafty.scene("Loading", function() {
    Crafty.viewport.clampToEntities = false;
    Crafty.s("SET_PLAYER");
    Crafty.s("SET_DECK");
    Crafty.s("SET_CELLS");
    Crafty.s("SET_GUI");
    Crafty.s("SET_MSGS");
    Crafty.e("PUB");
    console.log("loading");
  });
});
