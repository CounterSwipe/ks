define(function() {
  /*global Crafty PubNub playerInfo*/
  Crafty.c("PUB", {
    pub: {},
    init: function() {
      let pubnub = new PubNub({
        publishKey: playerInfo.pubKey,
        subscribeKey: playerInfo.subKey,
        ssl: true,
        restore: true
      });
      let pub = {
        player: playerInfo.puuid,
        pName: playerInfo.display_name,
        matchReady: 0,
        pMatch: [],
        decked: null,
        channel: this.getGameID(),
        pubnub: pubnub
      };
      this.pub = pub;
      this.setup();
      this.isReady = true;
    },
    getGameID: function() {
      if (window.location.search.substring(1).split('?')[0].split('=')[0] !== 'id') { return null; }
      else { return window.location.search.substring(1).split('?')[0].split('=')[1]; }
    },
    setup: function() {
      let self = this;
      let listener = {
        status: function(status) {
          //console.log("status:", status);
          if (status.category === "PNConnectedCategory") {
            self.pub.pubnub.hereNow({
              channel: [self.pub.channel], //status.affectedChannels,
              includeUUIDs: true //includeState: true
            }).then((response) => {
              //console.log("@hereNow Response: ", response);
            }).catch((error) => {
              console.log(error);
            });
          }
        },
        message: function(m) {
          if (m.publisher === self.pub.player) { m.message.side = 1; }
          else { m.message.side = 2; }
          //console.log("message:", m);
          if (m.message.move !== null) {
            m.message.move.p = m.message.side;
            self.onDeploy(m.message.move);
          }
          else { self.onMsg(m.message); }
        },
        presence: function(m) {
          //console.log("presence: ", m.action);
          if (m.action === "join") {
            for (let i = 0; i < m.occupancy; i++) {
              if (m.uuid !== undefined) {
                let uuidMatchJoin = self.pub.pMatch.indexOf(m.uuid);
                //console.log(m.action, "Player:", m.uuid, "@pMatchPos:", uuidMatchJoin);
                if (uuidMatchJoin === -1) {
                  self.pub.pMatch[self.pub.pMatch.length] = m.uuid;
                  //console.log("Player:", m.uuid, "added to pMatch");
                }
                else {
                  //console.log("Player:", m.uuid, "already in pMatch");
                }
              }
            }
            if (typeof decked === "undefined" && m.occupancy === 2) {
              //console.log("@occupancy === 2 => decked:", self.pub.decked);
              let d = Crafty("_DECK _P1").get(0);
              let uDeck = [];
              let mDeck = [];
              for (let i = 0; i < 7; i++) {
                uDeck.push(d.search(i + 1));
                mDeck.push(d.search(uDeck[i] + 1100));
              }
              var msg = {
                side: 1,
                uDeck: uDeck,
                mDeck: mDeck,
                stat: Crafty.s("SET_PLAYER").getPlayer()
              };
              self.sendMsg(msg);
              self.pub.decked = 1;
            }
          }
          if (m.action === "interval") {
            //console.log("interval response: ", m);
            if (m.join !== undefined) {
              for (let i = 0; i < m.occupancy; i++) {
                if (m.join[i] !== undefined) {
                  let uuidMatchIntervalJoin = self.pub.pMatch.indexOf(m.join[i]);
                  if (uuidMatchIntervalJoin === -1) {
                    //console.log("@Interval add Player:", uuidMatchIntervalJoin);
                    self.pub.pMatch[self.pub.pMatch.length] = m.join[i];
                  }
                }
              }
            }
            if (m.leave !== undefined) {
              for (let i = 0; i < m.occupancy; i++) {
                let uuidMatchIntervalLeave = self.pub.pMatch.indexOf(m.leave[i]);
                if (uuidMatchIntervalLeave > -1) {
                  //console.log("REMOVE PLAYER FROM pMatch", uuidMatchIntervalLeave);
                  self.pub.pMatch.splice(uuidMatchIntervalLeave, 1);
                }
              }
            }
          }
          if (m.action === "leave") {
            for (let i = 0; i < m.occupancy; i++) {
              let uuidMatchLeave = self.pub.pMatch.indexOf(m.uuid);
              if (uuidMatchLeave > -1) {
                //console.log("REMOVE PLAYER:", m.uuid, "FROM pMatch", uuidMatchLeave);
                self.pub.pMatch.splice(uuidMatchLeave, 1);
              }
            }
          }
        }
      };
      this.pub.pubnub.addListener(listener);
      this.pub.pubnub.subscribe({
        channels: [self.pub.channel],
        state: { name: self.pub.pName },
        withPresence: true,
      });
    },
    pubCB: function(status, response) {
      //console.log("@pubCB status: ", status, response);
    },
    pubMsg: function(msg) {
      let self = this;
      this.pub.pubnub.publish({
        channel: [self.pub.channel],
        message: msg
      }, this.pubCB);
    },
    onMsg: function(msg) {
      //console.log(msg);
      //console.log(msg, JSON.parse(msg.deck));
      this.pub.matchReady++;
      if (msg.deck.side !== msg.side && this.pub.matchReady < 3) {
        msg.deck.side = 2;
        Crafty.s("SET_PLAYER").setPlayer({ side: 2, stat: msg.deck.stat });
        Crafty.s("SET_DECK").setDeck(msg.deck);
        Crafty.s("SET_IMGS");
      }
      if (this.pub.matchReady === 4) { Crafty.s("Ticked").start(); }
      else { return; }
    },
    onDeploy: function(msg) {
      //let deploy = new Crafty.e("MSG").
      //msg(
      let deploy = {
        p: msg.p, //side p1|p2
        g: msg.g, //inputs.gKey,
        c: msg.c, //id.cKey,
        f: msg.f //Crafty.frame()
      };
      Crafty("GetMsgs").onMsg(deploy);
      //Crafty("GetMsgs").trigger("OnMsg", deploy);
      return;
    },
    sendMsg: function(msg) {
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
  });
});
