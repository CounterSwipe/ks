define(function() {
  /*global Crafty PubNub localStorage playerInfo*/
  let player = playerInfo.puuid;
  console.log("CLIENT BROWSER UUID: ", player);
  let pName = playerInfo.display_name;
  let pList = [];
  let handshakes = [];
  let matchReady;
  //let ua = "https://pubsub.pubnub.com/v2/presence/sub-key/";
  //let ub = playerInfo.subKey + "" + "/channel/";
  //let uc = game.pubnub.channel + "" + "/leave?uuid=";
  //let ud = encodeURIComponent(player);
  //window.onbeforeunload = function() {
  //globalUnsubscribe();
  /*global $*/
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
  Crafty.c("SET_PUB", {
    init: function() {
      this.pubnub = null;
      localStorage.setItem(playerInfo.subKey + "uuid", playerInfo.puuid);
      console.log(playerInfo.puuid);
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
      console.log(this.pubnub);
    },
    getGameID: function() {
      return "pLobby";
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
    pn: function() {
      let t = Crafty("_txUUID").get(0);
      t.text(playerInfo.puuid);
      console.log(playerInfo);
    }
  });
});
