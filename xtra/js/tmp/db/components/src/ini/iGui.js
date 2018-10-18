define(function (require) {
  let Crafty = require("crafty");
  Crafty.s("SET_GUI", {
    init: function () {
      Crafty.e("Hash, _GUI, _P1");
      Crafty.e("Hash, _GUI, _P2");
      this.setGui(1);
      this.setGui(2);
      //gKey(deckPos):nextDeckPos(1^7)
      //property(1:dKey|2:cMug|3:cTxt|4:x|5:y|6:w|7:h * 10)+gKey(1^4)
    },
    setGui: function (p) {
      let g = Crafty("_GUI _P" + p).get(0);
      let props = [0, 0, 0, 0, 20, 83, 20, 15]; //index:1:1?
      for (let gKey = 0; gKey < 5; gKey++) {
        if (gKey > 0) {
          for (let prop = 1; prop < 8; prop++) {
            let key = (prop * 10) + gKey;
            let value = props[prop];
            //if (prop === 1) { value = (player * 10) + (gPos * props[prop]); }
            if (prop === 4) {
              value = gKey * props[prop];
            }
            g.add(key, value);
          }
        } else {
          g.add(p, 0); //1|2:dKeyNext->1
        }
      }
    },
    buildGui: function () {
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
              if (prop === 4) {
                value = gPos * props[prop];
              }
              g.add(key, value);
            }
          } else {
            g.add(player, 10); //1|2:dKeyNext
          }
        }
      }
    },
  }, true);
});