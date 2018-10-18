define(function() {
  /*global Crafty*/
  Crafty.c("_INPUTS", {
    inputs: {}
  });
  Crafty.s("SET_NPUTS", {
    init: function() {
      Crafty.e("_MICE");
      Crafty.e("_INPUTS, VALID");
    },
    update: function() {
      let m = Crafty("_MICE").get(0);
      while (m.mice.size !== 0) {
        let i = m.mice.now.shift();
        m.mice.size--;
        this[i.m](i);
      }
    },
    press: function(i) {
      if (Crafty("_INPUTS").get(0).__c["VALID"]) {
        if (Crafty(i.d).__c["_CARD"]) { this.onPress(Crafty(i.d)); }
        else { return; }
      }
      else { return; }
    },
    onPress: function(id) {
      let gKey = id.gKey;
      let dKey = Crafty("_GUI _P1").search(gKey + 10);
      let deck = Crafty("_DECK _P1");
      let uNum = deck.search(dKey);
      let model = deck.search(uNum + 1100);
      let energy = deck.search(uNum + 1400);
      Crafty("_INPUTS").get(0).addComponent("ACTIVE").
      removeComponent("VALID").inputs = {
        gKey: gKey,
        dKey: dKey,
        uNum: uNum,
        model: model,
        energy: energy
      };
      Crafty("_UI" + gKey).get(0).addComponent("SELECTED");
    },
    drag: function(i) {
      if (Crafty("_INPUTS").get(0).__c["ACTIVE"]) {
        let id = Crafty(i.d);
        if (id.__c["_DEPLOYABLE"]) { this.onDrag(id); }
        else { return; }
      }
      else { return; }
    },
    onDrag: function(id) {
      id.attr({ alpha: 1 });
      Crafty("CELL" + (id.cKey + 1)).attr({ alpha: 1 });
      let inputs = Crafty("_INPUTS").get(0).inputs;
      Crafty("PIN_u" + inputs.uNum + "m" + inputs.model).get(0).
      attr({ alpha: 1, x: id.x + (id.w * .5), y: id.y - (id.vuH(8)) });
      if (id.deployable()) { return; }
      else {
        Crafty("PIN_x").get(0).
        attr({ alpha: 1, x: id.x + (id.w * .5), y: id.y - (id.vuH(8)) });
        return;
      }
    },
    exit: function(i) {
      if (Crafty("_INPUTS").get(0).__c["ACTIVE"]) {
        let id = Crafty(i.d);
        if (id.__c["_DEPLOYABLE"]) { this.onExit(id); }
        else { return; }
      }
      else { return; }
    },
    onExit: function(id) {
      id.attr({ alpha: 0 });
      Crafty("CELL" + (id.cKey + 1)).attr({ alpha: 0 });
      let inputs = Crafty("_INPUTS").get(0).inputs;
      Crafty("PIN_u" + inputs.uNum + "m" + inputs.model).
      get(0).attr({ alpha: 0 });
      Crafty("PIN_x").get(0).
      attr({ alpha: 0 });
      return;
    },
    tap: function(i) {
      if (Crafty("_INPUTS").get(0).__c["ACTIVE"]) {
        let inputs = Crafty("_INPUTS").get(0);
        inputs.addComponent("VALID").removeComponent("ACTIVE");
        Crafty("_UI" + inputs.inputs.gKey).get(0).
        addComponent("UNSELECTED"); //TODO@msgQ.addComponent("DISCARD");
        let id = Crafty(i.d);
        if (id.__c["_DEPLOYABLE"]) {
          this.onExit(id);
          if (id.deployable()) {
            if (Crafty("_ENERGY").get(0).energy.p1 >= inputs.inputs.energy) {
              this.pub(id, inputs.inputs);
              //this.onTap(id, inputs.inputs);
            }
            else { return this.vNote("NOT ENOUGH ENERGY!"); }
          }
          else {
            return this.vNote("AREA OCCUPIED!");
          }
        }
        else { return this.vNote("CARD CANCELLED!"); }
      }
      else { return; }
    },
    vNote: function(txt) {
      let wvn = Crafty("WebGL _vNote").get(0);
      wvn.addComponent("_Visible");
      wvn.addComponent("_TOCK").
      tock({
        dur: 50,
        cb: ["removeComponent"],
        args: ["_Visible"]
      });
      let tvn = Crafty("TXT _vNote").get(0);
      tvn.text(txt);
      tvn.addComponent("_Visible");
      tvn.addComponent("_TOCK").
      tock({
        dur: 50,
        cb: ["removeComponent"],
        args: ["_Visible"]
      });
    },
    xonTap: function(id, inputs) {
      let deploy = new Crafty.e("MSG").
      msg({
        g: inputs.gKey,
        c: id.cKey,
        f: Crafty.frame()
      });
      Crafty("GetMsgs").trigger("OnMsg", deploy);
      return;
    },
    xsendMsg: function(msg) {
      let deck;
      let move;
      if (msg.move) {
        deck = null;
        move = msg.move;
      }
      else {
        deck = msg;
        move = null;
      }
      this.pubMsg({
        "deck": deck,
        "move": move
      });
    },
    pub: function(id, inputs) {
      var newMsg = {
        move: {
          g: inputs.gKey,
          c: id.cKey,
          f: Crafty.frame()
        }
      };
      Crafty("PUB").sendMsg(newMsg);
    }
  }, true);
});
