define(function() {
    /*global playerInfo*/
    /*global PubNub*/
    /*global game*/
    let player = playerInfo.puuid;
    console.log("CLIENT BROWSER UUID: ", player);
    let pName = playerInfo.display_name;
    let pMatch = [];
    let decked;
    window.onbeforeunload = function() {
        globalUnsubscribe();
        /*global $*/
        $.ajax({
            async: false,
            method: "GET",
            url: "https://pubsub.pubnub.com/v2/presence/sub-key/" + "" + playerInfo.subKey + "" + "/channel/" + "" + game.pubnub.channel + "" + "/leave?uuid=" + encodeURIComponent(player)
        }).done(function(jqXHR, textStatus) {
            console.log("Request done: " + textStatus);
        }).fail(function(jqXHR, textStatus) {
            console.log("Request failed: " + textStatus);
        });
        return null;
    };
    let globalUnsubscribe = function() {
        try {
            game.pubnub.pubnub.unsubscribe({
                channels: [game.pubnub.channel]
            });
            game.pubnub.pubnub.removeListener(game.pubnub.pubnub._listenerManager._listeners[0]);
        }
        catch (err) {
            console.log("Failed to UnSub", err);
        }
    };
    class Pubnub {
        constructor() {
            this.name = "Pubnub";
            this.modules = null;
            this.pubnub = null;
            this.channel = 0;
            this.isReady = false;
        }
        init(game) {
            this.modules = game.modules;
            let pubnub = new PubNub({
                publishKey: playerInfo.pubKey,
                subscribeKey: playerInfo.subKey,
                ssl: true,
                restore: true
            });
            this.pubnub = pubnub;
            this.channel = this.getGameID();
            document.getElementById("cUUID").textContent = player;
            document.getElementById("chanID").textContent = this.channel;
            this.setup();
            this.isReady = true;
        }
        getGameID() {
            if (window.location.search.substring(1).split('?')[0].split('=')[0] !== 'id') {
                return null;
            }
            else {
                return window.location.search.substring(1).split('?')[0].split('=')[1];
            }
        }
        setup() {
            let self = this;
            let listener = {
                status: function(status) {
                    console.log("status", status);
                    if (status.category === "PNConnectedCategory") {
                        self.ss({ name: pName });
                        self.pubnub.hereNow({
                            channel: [self.channel], //status.affectedChannels,  //channel,
                            includeUUIDs: true,
                            includeState: true
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
                    }
                    else {
                        m.message.side = 2;
                    }
                    console.log("message received: ", m);
                },
                presence: function(m) {
                    console.log("presence received: ", m);
                    if (m.action === "join") {
                        for (let i = 0; i < m.occupancy; i++) {
                            if (m.uuid !== undefined) {
                                let uuidMatchJoin = pMatch.indexOf(m.uuid);
                                console.log(m.action, "UUID ARRAY INDEX: ", uuidMatchJoin, "UUID: ", m.uuid);
                                if (uuidMatchJoin === -1) {
                                    pMatch[pMatch.length] = m.uuid;
                                    console.log("Insert ", m.uuid, "in array");
                                }
                                else {
                                    console.log("UUID: ", m.uuid, "is already in the array");
                                }
                            }
                        }
                        if (typeof decked === "undefined" && m.occupancy === 2) {
                            console.log("@occupancy === 2 => decked:", decked);
                            var msg = self.modules[self.moduleID("Pub")].search(0);
                            self.sendMsg(msg);
                            decked = 1;
                            let foeID = pMatch.indexOf(player) === 0 ? 1 : 0;
                            self.gs(foeID);
                        }
                    }
                    if (m.action === "interval") {
                        console.log("interval response: ", m);
                        if (m.join !== undefined) {
                            for (let i = 0; i < m.occupancy; i++) {
                                if (m.join[i] !== undefined) {
                                    let uuidMatchIntervalJoin = pMatch.indexOf(m.join[i]);
                                    if (uuidMatchIntervalJoin === -1) {
                                        console.log("Interval Add UUID: ", uuidMatchIntervalJoin);
                                        pMatch[pMatch.length] = m.join[i];
                                    }
                                }
                            }
                        }
                        if (m.leave !== undefined) {
                            for (let i = 0; i < m.occupancy; i++) {
                                let uuidMatchIntervalLeave = pMatch.indexOf(m.leave[i]);
                                if (uuidMatchIntervalLeave > -1) {
                                    console.log("REMOVE PLAYER FROM ARRAY", uuidMatchIntervalLeave);
                                    pMatch.splice(uuidMatchIntervalLeave, 1);
                                }
                            }
                        }
                    }
                    if (m.action === "leave") {
                        for (let i = 0; i < m.occupancy; i++) {
                            let uuidMatchLeave = pMatch.indexOf(m.uuid);
                            if (uuidMatchLeave > -1) {
                                console.log("REMOVE PLAYER FROM ARRAY", uuidMatchLeave, "with UUID: ", m.uuid);
                                pMatch.splice(uuidMatchLeave, 1);
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
            this.preDraw();
        }
        preDraw() {}
        ss(state) {
            let self = this;
            this.pubnub.setState({
                state: state,
                channels: [self.channel]
            }).then((response) => {
                console.log("@ss:", response);
            }).catch((error) => {
                console.log("@ss:", error);
            });
        }
        gs(foeID) {
            let self = this;
            this.pubnub.getState({
                uuid: foeID,
                channels: [self.channel]
            }).then((response) => {
                console.log("@gs:", response);
            }).catch((error) => {
                console.log("@gs:", error);
            });
        }
        pubCB(status, response) {
            console.log("@pubCB status: ", status, response);
        }
        pubMsg(msg) {
            let self = this;
            this.pubnub.publish({
                channel: [self.channel],
                message: msg
            }, this.pubCB);
        }
        sendMsg(msg) {
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
        }
        moduleID(mID) {
            for (let id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) { return id; }
            }
        }
        update(sts) {}
    }
    return Pubnub;
});
