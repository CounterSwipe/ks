define(function (require) {
  let Crafty = require("crafty");
  //let Console = console;
  //let logit = Console.log;
  Crafty.s("SET_READY", {
    init: function () {
      this.setComponent("_DIM");
      this.setComponent("_FX_S");
      this.setComponent("_FX_N");
      this.setComponent("_SIZE");
      this.setComponent("_sFt");
      this.setComponent("_sFm");
      this.setComponent("_sFb");
      this.setComponent("_N");
      this.setComponent("_S");
      let aQ = Crafty("_ARROW").get();
      if (aQ.length) {
        for (let i = aQ.length - 1; i >= 0; i--) {
          let e = aQ[i];
          e.destroy();
        }
      }
      Crafty("Touches").get(0).destroy();
    },
    setComponent: function (c) {
      let cQ = Crafty("_add" + c).get();
      if (cQ.length) {
        for (let i = cQ.length - 1; i >= 0; i--) {
          let e = cQ[i];
          e.removeComponent("_add" + c).addComponent(c);
        }
      } else {
        return;
      }
    }
  }, true);
});