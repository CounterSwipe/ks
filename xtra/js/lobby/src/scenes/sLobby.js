define(function() {
  /*global Crafty*/
  Crafty.scene("Lobby", function() {
      Crafty.viewport.clampToEntities = false;
      Crafty.s("SET_LOB");
      Crafty.e("SET_PUB");
      //Crafty.s("SET_MSGS");
      //Crafty.s("SET_PLAYER");
      //Crafty.s("SET_DECK");
      //Crafty.s("SET_IMGS");
      //Crafty.s("SET_IMGS").setImgs(2);
      //Crafty.s("SET_CELLS");
      //Crafty.s("SET_GUI");
      //Crafty.trigger("GameStart");
      //console.log("loading");
    }
    /*, function() {
        let fQ = Crafty("_FADEUPX").get();
        for (let i = 0, iLen = fQ.length; i < iLen; i++) {
          fQ[i].addComponent("_FADEUP");
        }
        console.log("exited loading intro!");
      }*/
  );
});
