define(function() {
  /*global Crafty*/
  let guiData = {
    "1": { "xywh": { "x": 20, "y": 83, "w": 20, "h": 15 }, },
    "2": { "xywh": { "x": 40, "y": 83, "w": 20, "h": 15 }, },
    "3": { "xywh": { "x": 60, "y": 83, "w": 20, "h": 15 }, },
    "4": { "xywh": { "x": 80, "y": 83, "w": 20, "h": 15 }, }
  };
  Crafty.c("UI", {
    required: "Deck, Hand",
    init: function() {
      let hPos = Crafty("UI").get().length;
      this.xywh = { "x": (20 * hPos), "y": 83, "w": 20, "h": 15 }; //guiData[hPos].xywh;
      this.gui = { hPos: hPos, hID: this[0], cID: 0, tID: 0 };
      this.addComponent("DEAL, UI" + hPos);
    }
  });
  Crafty.s("Gui", {
    init: function() {
      Crafty.e("NuVue, WebGL, hbg").vued({ x: 0, y: 83, w: 100, h: 17 });
      Crafty.e("NuVue, WebGL, cardbg").vued({ x: 0, y: 83, w: 20, h: 15 });
      Crafty.e("UI");
      Crafty.e("UI");
      Crafty.e("UI");
      Crafty.e("UI");
    },
    onFrame: function() {
      //for (let i = Crafty("DEALMEIN").length - 1; i >= 0; i--) {
      for (let i = 0; i < 4; i++) {
        let ui = Crafty("UI").get(i);
        this.handle(ui);
      }
    },
    handle: function(ui) {
      switch (true) {
        case ui.__c["SELECTED"]:
          this.selected(ui);
          break;
        case ui.__c["UNSELECTED"]:
          this.unselected(ui);
          break;
        case ui.__c["DISCARD"]:
          this.discard(ui);
          break;
        case ui.__c["READY"]:
          return;
        case ui.__c["DEAL"]:
          this.deal(ui);
          break;
        case ui.__c["DEALING"]:
          this.dealing(ui);
          break;
        case ui.__c["DEALT"]:
          this.dealt(ui);
          break;
        default:
          this.ticking(ui);
      }
    },
    ticking: function(ui) {
      ui.tock();
    },
    deal: function(ui) {
      let dPos = Crafty.s("HandLoader").dealNext(1);
      ui.hand.p1[ui.gui.hPos] = dPos;
      ui.removeComponent("DEAL").addComponent("TICKING, Ticker").
      ticker({
        dur: 50,
        cb: ["removeComponent", "addComponent"],
        args: ["TICKING", "DEALING"]
      });
    },
    dealing: function(ui) {
      let hPos = ui.hand.p1[ui.gui.hPos];
      //let card = ui.deck.p1[hPos];
      let d = Crafty("_DECK").get(0);
      let cKey = 1 + "" + hPos;
      let uNum = d.search(cKey + "" + 30); //hPos
      //let card = ui.deck.p1[hPos];
      let uImg = "MUG_u" + uNum + "m" + d.search(cKey + "" + 32); // +card.i;
      let c = Crafty.e("CARD, NuVue, WebGL, " + uImg + ", ui" + ui.hPos).
      vued(ui.xywh).attr({ x: 0 });
      ui.gui.cID = c[0];
      //c.card = card;
      let cTxt = Crafty.e("TXT").text("" + d.search(cKey + "" + 35) + ""). //card.e + "").
      txt({ a: 1, x: 0, y: 95.4, w: 20, fF: 2, fS: 2.5, fA: 1, fC: 0 });
      ui.gui.tID = cTxt[0];
      c.gui = ui.gui;
      let target = [c, cTxt];
      c.addComponent("SlideRight").sR({ target: target, x: ui.xywh.x, dur: .5 });
      ui.removeComponent("DEALING").addComponent("TICKING, Ticker").
      ticker({
        dur: 25,
        cb: ["removeComponent", "addComponent"],
        args: ["TICKING", "DEALT"]
      });
    },
    dealt: function(ui) {
      let c = Crafty(ui.gui.cID);
      c.removeComponent("SlideRight", false).addComponent("Deployable");
      ui.removeComponent("DEALT").addComponent("READY");
    },
    selected: function(ui) {
      let c = Crafty(ui.gui.cID);
      c.addComponent("SlideUp").sU({ target: c, dur: .4 });
      ui.removeComponent("SELECTED").addComponent("TICKING, Ticker").
      ticker({
        dur: 20,
        cb: ["removeComponent", "addComponent"],
        args: ["TICKING", "READY"]
      });
    },
    unselected: function(ui) {
      if (ui.__c["TICKING"]) { ui.removeComponent("TICKING", false); }
      let c = Crafty(ui.gui.cID);
      c.removeComponent("SlideUp", false);
      ui.removeComponent("UNSELECTED").addComponent("READY");
    },
    discard: function(ui) {
      let c = Crafty(ui.gui.cID);
      let t = Crafty(ui.gui.tID);
      c.destroy();
      t.destroy();
      ui.removeComponent("DISCARD").removeComponent("READY").addComponent("DEAL");
    }
  }, true);
});
