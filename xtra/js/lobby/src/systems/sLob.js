define(function() {
  /*global Crafty localStorage playerInfo*/
  Crafty.s("SET_LOB", {
    init: function() {
      Crafty.e("GetVue");
      Crafty.e("SetVue");
      Crafty.e("NuVue, Grd").vued({ x: 0, y: 10, w: 100, h: 15 }).grd(7).attr({ alpha: .3 });
      Crafty.e("NuVue, DOM, Color").
      vued({ x: 0, y: 44, w: 100, h: 5 }).
      color("rgba(0,0,0,.5)"); //.attr({ alpha: .5, z: 100 });
      Crafty.e("TXT").text("MATCHMAKING").
      txt({ a: .8, x: 0, y: 12, w: 100, fF: 0, fS: 3, fA: 1, fC: 1, fT: 1 });
      //a.attr({ h: a.vuH(5.5) });
      Crafty.e("TXT").text("LOBBY").
      txt({ a: .5, x: 0, y: 15, w: 100, fF: 1, fS: 8, fA: 1, fC: 1, fT: 1 });
      Crafty.e("TXT").text("Your UUID:").
      txt({ a: .5, x: 0, y: 40, w: 100, fF: 0, fS: 3, fA: 1, fC: 1, fT: 1 });
      Crafty.e("TXT, _txUUID").txt({ a: .8, x: 0, y: 45, w: 100, fF: 2, fS: 3, fA: 1, fC: 1, fT: 1 });
      this.buildDeck();
      this.pn();
      //b.attr({ h: b.vuH(11) });
      /*Crafty.e("NuVue, Grd, Persist, _FADEUPX").vued({ x: 0, y: 55, w: 100, h: 45 }).grd(7);
      Crafty.e("NuVue, DOM, Color, Persist, _FADEUPX").vued({ x: 0, y: 75, w: 100, h: 20 }).color("black");
      Crafty.e("NuVue, Grd, Persist, _FADEUPX").vued({ x: 0, y: 75, w: 100, h: 20 }).grd(0).attr({ alpha: .3 });
      
      Crafty.e("TXT, Persist, _FADEUPX").text("Mateo Navarrete | ©2018 All Rights Reserved.").
      txt({ a: .5, x: 0, y: 96.5, w: 100, fF: 2, fS: 2.3, fA: 1, fC: 0, fT: 0 });
      */
    },
    buildDeck: function() {
      let myDeck = JSON.parse(localStorage.getItem("myDeck"));
      console.log(localStorage, myDeck);
    },
    pn: function() {
      let t = Crafty("_txUUID").get(0);
      t.text(playerInfo.puuid);
    }
  }, true);
});
