define(function() {
  /*global Crafty*/
  Crafty.scene("PlayTest", function() {
    Crafty.viewport.clampToEntities = false;
    Crafty.s("SET_VUE");
    Crafty("PUB").get(0).sendMsg("ready");
    console.log("@gameStart");
  });
});
