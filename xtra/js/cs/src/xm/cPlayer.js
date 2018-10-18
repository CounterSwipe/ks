define(function() {
  /*global Crafty localStorage*/
  Crafty.c("Deal", {
    deal: { p1: { next: 0 }, p2: { next: 0 } }
  });
  Crafty.c("Hand", {
    hand: { p1: {}, p2: {} }
  });
  /*Crafty.c("Deck", {
    deck: { p1: {}, p2: {} }
  });
  Crafty.c("Player", {
    player: { p1: {}, p2: {} }
  });*/
  Crafty.s("HandLoader", {
    init: function() {
      Crafty.e("Deal");
      Crafty.e("Hand");
    },
    loadHand: function(player) {
      for (let i = 1; i < 5; i++) {
        this.buildHand(player, i);
      }
      return this;
    },
    buildHand: function(player, hPos) {
      let h = Crafty("Hand").get(0);
      let dPos = this.dealNext(player);
      h.hand["p" + player][hPos] = dPos;
    },
    dealNext: function(player) {
      let next = Crafty("Deal").get(0).deal["p" + player].next;
      let nuNext = next === 7 ? 1 : next + 1;
      Crafty("Deal").get(0).deal["p" + player].next = nuNext;
      return Crafty("Deal").get(0).deal["p" + player].next;
    }
  }, true);
  /*Crafty.s("DeckLoader", {
    init: function() {
      Crafty.e("Deck");
    },
    loadDeck: function(player) {
      let deck = this.getDeck(player);
      this.shuffle(deck);
      for (let i = 0; i < 7; i++) {
        this.buildDeck(player, i + 1, deck[i]);
      }
      return this;
    },
    buildDeck: function(player, dPos, uNum) {
      let d = Crafty("Deck").get(0);
      d.deck["p" + player][dPos] = {
        p: player,
        u: uNum,
        m: this.getModel(uNum),
        t: this.getTier(uNum),
        r: this.getRank(uNum),
        e: this.getEng(uNum),
        s: this.getSpd(uNum),
        d: this.getDir(uNum),
        h: this.getHP(uNum),
        i: "u" + uNum + "m" + this.getModel(uNum)
      };
    },
    getDeck: function(player) {
      return player === 1 ? this.nuDeck() : this.nuDeck();
    },
    nuDeck: function() {
      let d = [1, 2, 3, 4, 5, 6, 7, 8];
      this.shuffle(d);
      let sd = [];
      for (let i = 0; i < 7; i++) {
        sd.push(d[i]);
      }
      return sd;
    },
    getModel: function(uNum) {
      return 1;
    },
    getTier: function(uNum) {
      return 1;
    },
    getRank: function(uNum) {
      return 1;
    },
    getEng: function(uNum) {
      let cost = [0, 2, 2, 2, 3, 3, 3, 3, 3];
      //let cost = [0, 27, 28, 29, 30, 31, 32, 33, 34];
      return cost[uNum];
    },
    getSpd: function(uNum) {
      let spd = [0, 25, 25, 26, 27, 28, 29, 30, 30];
      return spd[uNum];
    },
    getHP: function(uNum) {
      let res = [0, 80, 85, 87, 90, 93, 95, 98, 100];
      return res[uNum];
    },
    getDir: function(uNum) {
      return 1;
    },
    shuffle: function(deck) {
      for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
    }
  }, true);
  
    Crafty.s("PlayerLoader", {
      init: function() {
        Crafty.e("Player");
      },
      loadPlayer: function(player) {
        this.buildPlayer(player);
        return this;
      },
      buildPlayer: function(player) {
        let p = Crafty("Player, P" + player).get(0);
        p.player["p" + player] = {
          n: this.getName(player),
          u: this.getUUID(player),
          l: this.getLoa(player),
          z: this.getZone(player),
          d: this.getDef(player)
        };
      },
      getName: function(player) {
        return "Dr SheaStar";
      },
      getUUID: function(player) {
        return "pUUID";
      },
      getLoa: function(player) {
        return 1;
      },
      getZone: function(player) {
        return 0;
      },
      getDef: function(player) {
        return [0, 0, 0];
      },
    }, true);*/
});
