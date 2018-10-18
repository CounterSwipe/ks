define(function(require) {
  /*global Crafty localStorage*/
  let db = require("db/dbUnits");
  let dbGrds = [0, 1, 2, 6, 4, 5, 7, 3];
  Crafty.c("_MyDeck", {
    d: { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false },
    max: 7,
    now: 0
  });
  Crafty.s("SET_SELECT", {
    init: function() {
      Crafty.e("_MyDeck, _VALID");
      let myDeck = localStorage.getItem("myDeck");
      if (myDeck) {
        console.log("myDeck found!", localStorage);
      }
      else {
        console.log("noDeck found!", localStorage);
        //myDeck = [];
        //localStorage.setItem("myDeck", myDeck);
      }
    },
    update: function() {
      let id = +(event.target.id.slice(-2));
      if (Crafty(id).__c["_TOUCHE"]) {
        this.handle(Crafty(id));
      }
      if (Crafty(id).__c["_PLAY"]) {
        this.play();
      }
    },
    handle: function(c) {
      let d = Crafty("_MyDeck").get(0);
      if (d.__c["_VALID"]) { this.setSelect(c, d); }
      else { this.setSelected(c, d); }
    },
    setSelect: function(c, d) {
      let card = c.id
      let border = Crafty("_BOR" + card).get(0);
      let vTxt = Crafty("_vSelect").get(0);
      if (!border.__c["_Visible"]) {
        d.d[card] = true;
        d.now++;
        vTxt.text(d.now + "" + "/7");
        border.addComponent("_Visible");
        if (d.now === d.max) {
          d.removeComponent("_VALID").addComponent("_MAXED");
          this.setPlayBtn();
        }
      }
      else {
        d.d[card] = false;
        d.now--;
        vTxt.text(d.now + "" + "/7");
        border.removeComponent("_Visible");
      }
    },
    setSelected: function(c, d) {
      let card = c.id
      let border = Crafty("_BOR" + card).get(0);
      let vTxt = Crafty("_vSelect").get(0);
      if (border.__c["_Visible"]) {
        d.d[card] = false;
        d.now--;
        vTxt.text(d.now + "" + "/7");
        border.removeComponent("_Visible");
        d.removeComponent("_MAXED").addComponent("_VALID");
        this.removePlayBtn();
      }
      else { return; }
    },
    setPlayBtn: function() {
      Crafty.e("NuVue, Grd, _PLAY").vued({ x: 25, y: 80, w: 50, h: 10 }).
      grd(2); //.attr({ alpha: 1, z: -100 });
      Crafty.e("TXT, _PLAY").text("JOIN LOBBY").
      txt({ a: 1, x: 0, y: 83, w: 100, fF: 2, fS: 4, fA: 1, fC: 1 });
    },
    removePlayBtn: function() {
      let pQ = Crafty("_PLAY").get();
      for (let i = pQ.length - 1; i >= 0; i--) {
        let p = pQ[i];
        p.destroy();
      }
    },
    play: function() {
      let d = Crafty("_MyDeck").get(0).d;
      let myDeck = [];
      for (let i = 1; i < 9; i++) {
        if (d[i]) { myDeck.push(i); }
      }
      localStorage.setItem("myDeck", myDeck);
      console.log("Join Lobby!", localStorage);
      //window.location.href = "/gui/"; //history.backBtn(true) 
      //window.location.replace("/gui/"); //history.backBtn(false)
    }
  }, true);
});
