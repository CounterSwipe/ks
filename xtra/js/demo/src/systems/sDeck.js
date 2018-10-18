define(function(require) {
  /*global Crafty localStorage*/
  let db = require("db/dbUnits");
  Crafty.s("SET_DECK", {
    init: function() {
      Crafty.e("Hash, _DECK");
      this.setDeck({ player: 1 });
      this.setDeck({ player: 2 }); //TODO pubnub
      //property(10^27) + dKey(player+deckPos)
    },
    setDeck: function(deck) {
      if (deck.player === 1) { this.loadDeck(); }
      else { this.loadDeck(); } //TODO
      //else { this.buildDeck(deck); }
    },
    buildDeck: function(deck) {
      let d = Crafty("_DECK").get(0);
      for (let deckPos = 0; deckPos < 7; deckPos++) {
        for (let prop = 10; prop < 27; prop++) {
          let dKey = (deck.player * 10) + (deckPos + 1);
          let key = (prop * 100) + dKey;
          d.add(key, db[prop][deck[deckPos]]);
        }
      }
    },
    loadDeck: function() {
      let deck = localStorage.deck || this.rdmDeck();
      this.shuffle(deck);
      deck.player = 1;
      this.buildDeck(deck);
    },
    rdmDeck: function() {
      let d = [1, 2, 3, 4, 5, 6, 7, 8];
      this.shuffle(d);
      let sd = [];
      for (let i = 0; i < 7; i++) {
        sd.push(d[i]);
      }
      return sd;
    },
    shuffle: function(deck) {
      for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
    }
  }, true);
});
