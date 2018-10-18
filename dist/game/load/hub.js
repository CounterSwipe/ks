/*global Crafty*/
let C = Crafty;
C.c("HUB", {
  pub: {},
  init: function () {
    let pub = {
      player: 1,
      pName: C("_PLAYER").get(0).p[1].name,
      matchReady: 0,
      pMatch: [],
      decked: null
    };
    this.pub = pub;
  },
});
C.s("SET_HUB", {
  init: function () {
    C.e("HUB");
    this.sendMsg({
      side: 1
    });
  },
  message: function (m) {
    //logit(m);
    let h = C("HUB").get(0);
    m.message.side = m.publisher === h.pub.player ? 1 : 2;
    if (m.message.move !== null) {
      m.message.move.p = m.message.side;
      this.onDeploy(m.message.move);
    } else {
      this.onMsg(m.message);
    }
  },
  pubMsg: function (msg, p) {
    let m = {
      message: msg,
      publisher: p,
    };
    this.message(m);
  },
  onMsg: function (msg) {
    //console.log(msg, JSON.parse(msg.deck));
    let h = C("HUB").get(0);
    h.pub.matchReady++;
    //logit(msg, h.pub.matchReady);
    if (msg.deck.side !== msg.side && h.pub.matchReady < 3) {
      msg.deck.side = 2;
      C.s("SET_PLAYER").setPlayer({
        side: 2,
        stat: msg.deck.stat
      });
      C.s("SET_DECK").setDeck(msg.deck);
      C.s("SET_IMGS");
    }
    if (h.pub.matchReady === 4) {
      C.s("Ticked");
      C.e("Touches").setU(() => C.s("SET_READY"));
      //C.s("Ticked").start();
    } else {
      return;
    }
  },
  onDeploy: function (msg) {
    //logit(msg);
    let deploy = {
      p: msg.p, //side p1|p2
      g: msg.g, //inputs.gKey,
      c: msg.c, //id.cKey,
      f: msg.f //C.frame()
    };
    C("GetMsgs").onMsg(deploy);
    return;
  },
  sendMsg: function (msg, p) {
    console.log("@hub", msg, p);
    let deck;
    let move;
    if (p === undefined) {
      p = 1;
    }
    if (msg.move) {
      deck = null;
      move = msg.move;
    } else {
      deck = msg;
      move = null;
    }
    this.pubMsg({
      "deck": deck,
      "move": move
    }, p);
  },
}, true);