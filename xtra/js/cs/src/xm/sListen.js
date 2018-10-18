define(function() {
  /*global Crafty PubNub localStorage playerInfo*/
  Crafty.c("_LISTEN", {
    init: function() {
      this.p = Crafty("SET_PUB").get(0);
    },
    status: function(status) {
      console.log("status:", status);
      if (status.category === "PNConnectedCategory") {
        this.p.pubnub.hereNow({
          channel: [this.p.channel], //status.affectedChannels,
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
      if (m.publisher === this.p.player) {
        m.message.side = 1;
      }
      else {
        m.message.side = 2;
      }
      console.log("message:", m);
      let nuID = this.p.getEID();
      this.p.onMsg(m.message, nuID);
    },
    presence: function(m) {
      console.log("presence: ", m.action);
      if (m.action === "join") {
        for (let i = 0; i < m.occupancy; i++) {
          if (m.uuid !== undefined) {
            let uuidMatchJoin = this.p.pMatch.indexOf(m.uuid);
            console.log(m.action, "Player:", m.uuid, "@pMatchPos:", uuidMatchJoin);
            if (uuidMatchJoin === -1) {
              this.p.pMatch[this.p.pMatch.length] = m.uuid;
              console.log("Player:", m.uuid, "added to pMatch");
            }
            else {
              console.log("Player:", m.uuid, "already in pMatch");
            }
          }
        }
        if (typeof decked === "undefined" && m.occupancy === 2) {
          console.log("@occupancy === 2 => decked:", this.p.decked);
          var msg = (localStorage.getItem("myDeck"));
          this.p.sendMsg(msg);
          this.p.decked = 1;
        }
      }
      if (m.action === "interval") {
        console.log("interval response: ", m);
        if (m.join !== undefined) {
          for (let i = 0; i < m.occupancy; i++) {
            if (m.join[i] !== undefined) {
              let uuidMatchIntervalJoin = this.p.pMatch.indexOf(m.join[i]);
              if (uuidMatchIntervalJoin === -1) {
                console.log("@Interval add Player:", uuidMatchIntervalJoin);
                this.p.pMatch[this.p.pMatch.length] = m.join[i];
              }
            }
          }
        }
        if (m.leave !== undefined) {
          for (let i = 0; i < m.occupancy; i++) {
            let uuidMatchIntervalLeave = this.p.pMatch.indexOf(m.leave[i]);
            if (uuidMatchIntervalLeave > -1) {
              console.log("REMOVE PLAYER FROM pMatch", uuidMatchIntervalLeave);
              this.p.pMatch.splice(uuidMatchIntervalLeave, 1);
            }
          }
        }
      }
      if (m.action === "leave") {
        for (let i = 0; i < m.occupancy; i++) {
          let uuidMatchLeave = this.p.pMatch.indexOf(m.uuid);
          if (uuidMatchLeave > -1) {
            console.log("REMOVE PLAYER:", m.uuid, "FROM pMatch", uuidMatchLeave);
            this.p.pMatch.splice(uuidMatchLeave, 1);
          }
        }
      }
    }
  });
});
