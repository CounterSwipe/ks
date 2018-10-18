define(function() {
  /*global Crafty*/
  Crafty.s("SET_UI", {
    init: function() {
      //TODO p1|p2 versions->watch replay etc
      Crafty.e("NuVue, WebGL, hbg").vued({ x: 0, y: 83, w: 100, h: 17 });
      Crafty.e("NuVue, WebGL, cardbg").vued({ x: 0, y: 83, w: 20, h: 15 });
      this.setUI(1);
      this.setUI(2);
    },
    setUI: function(p) {
      for (let gKey = 1; gKey < 5; gKey++) {
        let ui = Crafty.e("_UI, DEAL, _P" + p);
        ui.gKey = gKey;
        ui.addComponent("_UI" + ui.gKey);
        if (p === 2) {
          this.p2dKeyNext(p, ui.gKey);
          //let g = Crafty("_GUI _P" + p).get(0);
          //let dKey = this.dKeyNext(p);
          //g.add(ui.gKey + 10, dKey);
        }
      }
    },
    dKeyNext: function(p) {
      let g = Crafty("_GUI _P" + p).get(0);
      let dKey = g.search(p) === 7 ? 1 : g.search(p) + 1;
      g.add(p, dKey);
      return dKey;
    },
    p2dKeyNext: function(p, gKey) {
      let g = Crafty("_GUI _P" + p).get(0);
      let dKey = g.search(p) === 7 ? 1 : g.search(p) + 1;
      g.add(p, dKey);
      g.add(gKey + 10, dKey);
    },
    render: function() {},
    update: function() {
      for (let i = 0; i < 4; i++) {
        let ui = Crafty("_UI _P1").get(i);
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
          return; //_TOCK
      }
    },
    deal: function(ui) {
      let g = Crafty("_GUI _P1").get(0);
      let dKey = this.dKeyNext(1);
      g.add(ui.gKey + 10, dKey);
      ui.removeComponent("DEAL").
      addComponent("_TOCK").
      tock({
        dur: 50,
        cb: ["addComponent"],
        args: ["DEALING"]
      });
    },
    dealing: function(ui) {
      let g = Crafty("_GUI _P1").get(0);
      let d = Crafty("_DECK _P1").get(0);
      let gKey = ui.gKey;
      let dKey = g.search(gKey + 10); //1^7
      let uNum = d.search(dKey); //11+
      let model = d.search(uNum + 1100);
      let energy = d.search(uNum + 1400);
      let uImg = "MUG_u" + uNum + "m" + model;
      let x = g.search(gKey + 40);
      let y = g.search(gKey + 50);
      let w = g.search(gKey + 60);
      let h = g.search(gKey + 70);
      let cMug = Crafty.e("_CARD, NuVue, WebGL, " + uImg).
      vued({ x: 0, y: y, w: w, h: h });
      let cTxt = Crafty.e("TXT").text("" + energy + "").
      txt({ a: 1, x: 0, y: 95.4, w: 20, fF: 2, fS: 2.5, fA: 1, fC: 0 });
      cMug.gKey = gKey;
      cTxt.gKey = gKey;
      g.add(gKey + 20, cMug[0]);
      g.add(gKey + 30, cTxt[0]);
      cMug.addComponent("SlideRight").
      sR({ target: [cMug, cTxt], x: x, dur: .5 });
      ui.removeComponent("DEALING").
      addComponent("_TOCK").
      tock({
        dur: 25,
        cb: ["addComponent"],
        args: ["DEALT"]
      });
    },
    dealt: function(ui) {
      let g = Crafty("_GUI _P1").get(0);
      let cNum = g.search(ui.gKey + 20);
      let cMug = Crafty(cNum);
      cMug.removeComponent("SlideRight", false).
      addComponent("GetMice");
      ui.removeComponent("DEALT").
      addComponent("READY");
    },
    selected: function(ui) {
      let g = Crafty("_GUI _P1").get(0);
      let cNum = g.search(ui.gKey + 20);
      let cMug = Crafty(cNum);
      cMug.addComponent("SlideUp").
      sU({ target: cMug, dur: .4 });
      ui.removeComponent("SELECTED");
    },
    unselected: function(ui) {
      if (ui.__c["_TOCK"]) {
        ui.removeComponent("_TOCK", false);
      }
      let g = Crafty("_GUI _P1").get(0);
      let cNum = g.search(ui.gKey + 20);
      let cMug = Crafty(cNum);
      cMug.removeComponent("SlideUp", false);
      ui.removeComponent("UNSELECTED");
    },
    discard: function(ui) {
      let g = Crafty("_GUI _P1").get(0);
      let cNum = g.search(ui.gKey + 20);
      let cN = g.search(ui.gKey + 30);
      let cMug = Crafty(cNum);
      let cTxt = Crafty(cN);
      cMug.destroy();
      cTxt.destroy();
      ui.removeComponent("DISCARD").
      removeComponent("READY").
      addComponent("DEAL");
    }
  }, true);
});
