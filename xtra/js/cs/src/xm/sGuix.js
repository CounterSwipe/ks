define(function(require) {
  /*global Crafty*/
  Crafty.s("SET_GUI", {
    init: function() {
      Crafty.e("Hash, _GUI");
      this.setGui(); //gKey(player+gPos):nextDeckPos
      //property(1:dKey|2:cMug|3:cTxt|4:x|5:y|6:w|7:h)+gKey
    },
    setGui: function() {
      this.buildGui();
    },
    buildGui: function() {
      let g = Crafty("_GUI").get(0);
      let props = [0, 0, 0, 0, 20, 83, 20, 15]; //index:1:1?
      for (let player = 1; player < 3; player++) {
        for (let gPos = 0; gPos < 5; gPos++) {
          let gKey = (player * 10) + gPos;
          if (gPos > 0) {
            for (let prop = 1; prop < 8; prop++) {
              let key = (prop * 100) + gKey;
              let value = props[prop];
              //if (prop === 1) { value = (player * 10) + (gPos * props[prop]); }
              if (prop === 4) { value = gPos * props[prop]; }
              g.add(key, value);
            }
          }
          else {
            g.add(player, 10); //1|2:dKeyNext
          }
        }
      }
    },
  }, true);
});
