define(function() {
  /*global Crafty PubNub localStorage playerInfo*/
  /*let player = playerInfo.puuid;
  console.log("CLIENT BROWSER UUID: ", player);
  let pName = playerInfo.display_name;
  let pList = [];
  let handshakes = [];
  let matchReady;
  let pMatch = [];
  let decked;*/
  /*let ua = "https://pubsub.pubnub.com/v2/presence/sub-key/";
  //let ub = playerInfo.subKey + "" + "/channel/";
  //let uc = game.pubnub.channel + "" + "/leave?uuid=";
  //let ud = encodeURIComponent(player);
  //window.onbeforeunload = function() {
  //globalUnsubscribe();
  global $*/
  /*$.ajax({
      async: false,
      method: "GET",
      url: ua + "" + ub + "" + uc + "" + ud
    }).done(function(jqXHR, textStatus) {
      console.log("Request done: " + textStatus);
    }).fail(function(jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    });
    return null;
  };
  let globalUnsubscribe = function() {
    try {
      Crafty.s("SET_PUB").pubnub.pubnub.unsubscribeAll();
      //game.pubnub.pubnub.
      //unsubscribe({ channels: [game.pubnub.channel] });
      Crafty.s("SET_PUB").pubnub.pubnub.
      removeListener(Crafty.s("SET_PUB").pubnub.pubnub._listenerManager._listeners); //[0]
    }
    catch (err) {
      console.log("Failed to UnSub", err);
    }
  };*/
  Crafty.c("SET_GPUB", {
    init: function() {
      console.log("set_gpub", this);
      this.player = playerInfo.puuid;
      this.pName = playerInfo.display_name;
      this.pList = [];
      this.handshakes = [];
      this.matchReady;
      this.pMatch = [];
      this.decked;
      this.eid = 0;
      this.pubnub = null;
      let pubnub = new PubNub({
        publishKey: playerInfo.pubKey,
        subscribeKey: playerInfo.subKey,
        ssl: true,
        restore: true
      });
      this.pubnub = pubnub;
      this.channel = this.getGameID();
      //this.preDraw();
      this.setup();
      this.isReady = true;
    },
    xgetGameID: function() {
      return "pLobby";
    },
    getGameID: function() {
      if (window.location.search.substring(1).split('?')[0].split('=')[0] !== 'id') { return null; }
      else { return window.location.search.substring(1).split('?')[0].split('=')[1]; }
    },
    getEID: function() {
      this.eid++;
      //let eid = new Eid();
      return this.eid; //.id;
    },
    setup: function() {
      let self = this;
      let listener = {
        status: function(status) {
          console.log("status:", status);
          if (status.category === "PNConnectedCategory") {
            self.pubnub.hereNow({
              channel: [self.channel], //status.affectedChannels,
              includeUUIDs: true
              //includeState: true
            }).then((response) => {
              console.log("@hereNow Response: ", response);
            }).catch((error) => {
              console.log(error);
            });
          }
        },
        message: function(m) {
          if (m.publisher === self.player) {
            m.message.side = 1;
          }
          else {
            m.message.side = 2;
          }
          console.log("message:", m);
          let nuID = self.getEID();
          //TODO
          self.onMsg(m.message, nuID);
          //
          //self.modules[self.moduleID("Pub")].add(nuID, m.message);
          //
          //if (m.message.deck) {
          //
          //game.systems[3].onMsg(m.message); //msg.onMsg
          //
          //}
          //else {
          //  game.msg.onMsg(m.message); //TODO
          //}
        },
        presence: function(m) {
          console.log("presence: ", m.action);
          if (m.action === "join") {
            for (let i = 0; i < m.occupancy; i++) {
              if (m.uuid !== undefined) {
                let uuidMatchJoin = self.pMatch.indexOf(m.uuid);
                console.log(m.action, "Player:", m.uuid, "@pMatchPos:", uuidMatchJoin);
                if (uuidMatchJoin === -1) {
                  self.pMatch[self.pMatch.length] = m.uuid;
                  console.log("Player:", m.uuid, "added to pMatch");
                }
                else {
                  console.log("Player:", m.uuid, "already in pMatch");
                }
              }
            }
            if (typeof decked === "undefined" && m.occupancy === 2) {
              console.log("@occupancy === 2 => decked:", self.decked);
              //TODO
              //var msg = self.modules[self.moduleID("Pub")].search(0);
              //var msg = (localStorage.getItem("myDeck"));
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
              self.decked = 1;
            }
          }
          if (m.action === "interval") {
            console.log("interval response: ", m);
            if (m.join !== undefined) {
              for (let i = 0; i < m.occupancy; i++) {
                if (m.join[i] !== undefined) {
                  let uuidMatchIntervalJoin = self.pMatch.indexOf(m.join[i]);
                  if (uuidMatchIntervalJoin === -1) {
                    console.log("@Interval add Player:", uuidMatchIntervalJoin);
                    self.pMatch[self.pMatch.length] = m.join[i];
                  }
                }
              }
            }
            if (m.leave !== undefined) {
              for (let i = 0; i < m.occupancy; i++) {
                let uuidMatchIntervalLeave = self.pMatch.indexOf(m.leave[i]);
                if (uuidMatchIntervalLeave > -1) {
                  console.log("REMOVE PLAYER FROM pMatch", uuidMatchIntervalLeave);
                  self.pMatch.splice(uuidMatchIntervalLeave, 1);
                }
              }
            }
          }
          if (m.action === "leave") {
            for (let i = 0; i < m.occupancy; i++) {
              let uuidMatchLeave = self.pMatch.indexOf(m.uuid);
              if (uuidMatchLeave > -1) {
                console.log("REMOVE PLAYER:", m.uuid, "FROM pMatch", uuidMatchLeave);
                self.pMatch.splice(uuidMatchLeave, 1);
              }
            }
          }
        }
      };
      this.pubnub.addListener(listener);
      this.pubnub.subscribe({
        channels: [self.channel],
        state: { name: self.pName },
        withPresence: true,
      });
      //this.preDraw();
    },
    xsetup: function() {
      let self = this;
      let listener = {
        status: function(status) {
          console.log("status:", status);
          if (status.category === "PNConnectedCategory") {
            self.pubnub.hereNow({
              channel: [self.channel], //status.affectedChannels,
              includeUUIDs: true
              //includeState: true
            }).then((response) => {
              console.log("@hereNow Response: ", response);
            }).catch((error) => {
              console.log(error);
            });
          }
        },
        message: function(m) {
          if (m.publisher === player) {
            m.message.side = 1;
            handshakes.push(m.publisher);
          }
          else {
            m.message.side = 2;
            handshakes.push(m.publisher);
          }
          console.log("message:", m.message);
          if (handshakes.length === 2) {
            let collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
            handshakes.sort(collator.compare);
            let pMatch = handshakes[0] + handshakes[1];
            window.location.replace("/beta/?id=" + pMatch); //history.backBtn(false)
          }
        },
        presence: function(m) {
          console.log("presence: ", m.action);
          if (m.action === "join") {
            for (let i = 0; i < m.occupancy; i++) {
              if (m.uuid !== undefined) {
                let uuidMatchJoin = pList.indexOf(m.uuid);
                console.log(m.action, "UUID ARRAY INDEX: ", uuidMatchJoin, "UUID: ", m.uuid);
                if (uuidMatchJoin === -1) {
                  pList[pList.length] = m.uuid;
                  console.log("Insert ", m.uuid, "in array");
                }
                else {
                  console.log("UUID: ", m.uuid, "is already in the array");
                }
              }
              if (typeof matchReady === "undefined" && m.occupancy === 2) {
                console.log("@join matchReady => send handshakes");
                var msg = player;
                self.sendMsg(msg); //send msg"handshake"
                matchReady = 1;
              }
            }
          }
          if (m.action === "interval") {
            console.log("interval response: ", m);
            if (m.join !== undefined) {
              for (let i = 0; i < m.occupancy; i++) {
                if (m.join[i] !== undefined) {
                  let uuidMatchIntervalJoin = pList.indexOf(m.join[i]);
                  if (uuidMatchIntervalJoin === -1) {
                    console.log("Interval Add UUID: ", uuidMatchIntervalJoin);
                    pList[pList.length] = m.join[i];
                  }
                }
              }
            }
            if (m.leave !== undefined) {
              for (let i = 0; i < m.occupancy; i++) {
                let uuidMatchIntervalLeave = pList.indexOf(m.leave[i]);
                if (uuidMatchIntervalLeave > -1) {
                  console.log("REMOVE PLAYER FROM ARRAY", uuidMatchIntervalLeave);
                  pList.splice(uuidMatchIntervalLeave, 1);
                }
              }
            }
          }
          if (m.action === "leave") {
            for (let i = 0; i < m.occupancy; i++) {
              let uuidMatchLeave = pList.indexOf(m.uuid);
              if (uuidMatchLeave > -1) {
                console.log("REMOVE PLAYER FROM ARRAY", uuidMatchLeave, "with UUID: ", m.uuid);
                pList.splice(uuidMatchLeave, 1);
              }
            }
          }
        }
      };
      this.pubnub.addListener(listener);
      this.pubnub.subscribe({
        channels: [self.channel],
        state: {
          name: pName
        },
        withPresence: true,
      });
      //this.preDraw();
    },
    pubCB: function(status, response) {
      console.log("@pubCB status: ", status, response);
    },
    pubMsg: function(msg) {
      let self = this;
      this.pubnub.publish({
        channel: [self.channel],
        message: msg
      }, this.pubCB);
    },
    onMsg: function(msg, eid) {
      console.log(msg);
      //console.log(msg, JSON.parse(msg.deck));
      if (msg.move !== null) { this.onTap(msg.move); }
      else {
        if (msg.deck.side !== msg.side) {
          msg.deck.side = 2;
          Crafty.s("SET_PLAYER").setPlayer({ side: 2, stat: msg.deck.stat });
          Crafty.s("SET_DECK").setDeck(msg.deck);
          //TODO loadscene Crafty.s("SET_IMGS");
        }
        else { return; }
      }
    },
    onTap: function(msg) {
      let deploy = new Crafty.e("MSG").
      msg({
        g: msg.g, //inputs.gKey,
        c: msg.c, //id.cKey,
        f: msg.f //Crafty.frame()
      });
      Crafty("GetMsgs").trigger("OnMsg", deploy);
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
    /*
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
    */
    pn: function() {
      let t = Crafty("_txUUID").get(0);
      t.text(playerInfo.puuid);
      console.log(playerInfo);
    }
  });
});
