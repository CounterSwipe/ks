/*jshint esversion: 6*/
define(function() {
  /*global Crafty*/
  Crafty.scene("PlayTest", function() {
    Crafty.viewport.clampToEntities = false;
    Crafty.s("SET_VUE");
    //Crafty.s("Ticked");
    //Crafty.e("Touches").
    //setU(() => Crafty.s("SET_VUE").start());
    //Crafty("PUB").get(0).sendMsg("ready");
    console.log("@gameStart");
  });
});
