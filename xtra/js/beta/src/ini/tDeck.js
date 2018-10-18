define(function(require) {
  /*global Crafty localStorage*/
  let db = require("db/dbUnits");
  Crafty.s("SET_DECK", {
    init: function() {
      Crafty.e("Hash, _DECK, _P1");
      Crafty.e("Hash, _DECK, _P2");
      let deck = this.getDeck({
        seq: this.shuffle([0, 1, 2, 3, 4, 5, 6]),
        uDeck: JSON.parse(localStorage.getItem("uDeck")),
        mDeck: JSON.parse(localStorage.getItem("mDeck"))
      });
      this.setDeck({ side: 1, uDeck: deck[0], mDeck: deck[1] });
      //property(10^27) + dKey(deckPos|gKey)
    },
    getDeck: function(d) {
      let uDeck = [];
      let mDeck = [];
      for (let i = 0; i < 7; i++) {
        uDeck.push(d.uDeck[d.seq[i]]);
        mDeck.push(d.mDeck[d.seq[i]]);
      }
      return [uDeck, mDeck];
    },
    setDeck: function(p) {
      let d = Crafty("_DECK _P" + p.side).get(0);
      for (let s = 0; s < 7; s++) {
        for (let prop = 10; prop < 27; prop++) {
          let dKey = p.uDeck[s];
          let key = prop !== 10 ? (prop * 100) + dKey : s + 1; //key|gKey
          let value;
          if (prop === 10) { value = dKey; } //gKey:dKey
          else if (prop === 11) { value = p.mDeck[s]; }
          else { value = db[prop][dKey]; }
          d.add(key, value);
        }
      }
    },
    shuffle: function(deck) {
      for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      return deck;
    }
  }, true);
});
