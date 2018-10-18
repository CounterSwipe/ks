define(function(require) {
    /*global playerInfo*/
    /*global PubNub*/
    if (typeof playerInfo === "undefined") { window.location.replace("/wp-login.php"); }

    function getGameId() {
        if (window.location.search.substring(1).split('?')[0].split('=')[0] !== 'id') {
            return null;
        }
        else {
            return window.location.search.substring(1).split('?')[0].split('=')[1];
        }
    }
    //initTouchers("player", pubnub);
    var Cs = require("cs/Cs");
    var entities = require("Entities");
    var tick = require("cs/systems/Tick");
    var controllerM = require("cs/systems/ControllerM");
    var drawM = require("cs/outputs/DrawM");
    var round = Math.round;
    Math.round = function(value, decimals) {
        decimals = decimals || 0;
        return Number(round(value + 'e' + decimals) + 'e-' + decimals);
    };
    var init = function() {
        let UniqueID = playerInfo.puuid;
        var name = playerInfo.display_name;
        var mChan = getGameId();
        let playerMatch = [];
        let player;
        let iam;
        console.log("CLIENT BROWSER UUID: ", UniqueID);
        document.getElementById("cUUID").textContent = UniqueID;
        document.getElementById("chanID").textContent = mChan;
        var pubnub = new PubNub({
            publishKey: playerInfo.pubKey,
            subscribeKey: playerInfo.subKey,
            ssl: true,
            restore: true
        });
        var listener = {
            status: function(status) {
                console.log("status", status);
                if (status.category === "PNConnectedCategory") {
                    pubnub.hereNow({
                        channel: status.affectedChannels, //[mChan], //channel,
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
                console.log("message received: ", m);
            },
            presence: function(m) {
                console.log("presence received: ", m);
                if (m.action === "join") {
                    for (let i = 0; i < m.occupancy; i++) {
                        if (m.uuid !== undefined) {
                            var uuidMatchJoin = playerMatch.indexOf(m.uuid);
                            console.log(m.action, "UUID ARRAY INDEX: ", uuidMatchJoin, "UUID: ", m.uuid);
                            if (uuidMatchJoin === -1) {
                                playerMatch[playerMatch.length] = m.uuid;
                                console.log("Insert ", m.uuid, "in array");
                                if (!player) {
                                    console.log("set playerDeck");
                                    if (m.occupancy < 2) {
                                        player = 1;
                                        //p1deck = {
                                        //  "deck": "p1"
                                        //};
                                        //setState(p1deck);
                                    }
                                    else {
                                        player = 2;
                                        //p2deck = {
                                        //  "deck": "p2"
                                        //};
                                        //setState(p2deck);
                                    }
                                }
                                console.log("Iam P:", player);
                            }
                            else {
                                console.log("P:", player, "UUID: ", m.uuid, "is already in the array");
                            }
                        }
                    }
                }
                if (m.action === "interval") {
                    console.log("interval response: ", m);
                    if (m.join !== undefined) {
                        for (i = 0; i < m.occupancy; i++) {
                            if (m.join[i] !== undefined) {
                                var uuidMatchIntervalJoin = playerMatch.indexOf(m.join[i]);
                                if (uuidMatchIntervalJoin === -1) {
                                    console.log("Interval Add UUID: ", uuidMatchIntervalJoin);
                                    playerMatch[playerMatch.length] = m.join[i];
                                }
                            }
                        }
                    }
                    if (m.leave !== undefined) {
                        for (i = 0; i < m.occupancy; i++) {
                            var uuidMatchIntervalLeave = playerMatch.indexOf(m.leave[i]);
                            if (uuidMatchIntervalLeave > -1) {
                                console.log("REMOVE PLAYER FROM ARRAY", uuidMatchIntervalLeave);
                                playerMatch.splice(uuidMatchIntervalLeave, 1);
                            }
                        }
                    }
                }
                if (m.action === "leave") {
                    for (i = 0; i < m.occupancy; i++) {
                        var uuidMatchLeave = playerMatch.indexOf(m.uuid);
                        if (uuidMatchLeave > -1) {
                            console.log("REMOVE PLAYER FROM ARRAY", uuidMatchLeave, "with UUID: ", m.uuid);
                            playerMatch.splice(uuidMatchLeave, 1);
                        }
                    }
                }
            }
        };
        //var publishCallback = function(status, response) {
        //  console.log("@pubCallBack status: ", status, response);
        //};
        //TODO: pcallback here or later in script
        pubnub.addListener(listener);
        pubnub.subscribe({
            channels: [mChan],
            state: {
                name: name,
                side: player
            },
            withPresence: true,
        });
        var game = new Cs.Game();
        var touches = new Cs.Touches();
        entities.init(game);
        game.addSystems([tick, controllerM]);
        game.addOutputs([drawM]);
        game.publishCallback = function(status, response) {
            console.log(game);
            console.log("@pubCallBack status: ", status, response);
        };
        game.publishMsg = function(msg) {
            pubnub.publish({
                channel: [mChan],
                message: msg
            }, game.publishCallback);
        };
        game.sendMsg = function(msg) {
            //console.log("@msgHandler", msg);
            var target = msg.target;
            var text = msg.text;
            //var player = msg.player;
            this.publishMsg({
                "target": target,
                "text": text,
                side: player
            });
        };
        //game["pubnub"] = pubnub;
        window.onload = touches.init(game);
        window.game = game;
        console.log(game);
        game.sendMsg({ target: "you", text: "whatsup" });
        onbeforeunload = function() {
            globalUnsubscribe();
            $.ajax({
                // Query to server to unsub sync
                async: false,
                method: "GET",
                url: "https://pubsub.pubnub.com/v2/presence/sub-key/" + "" + playerInfo.subKey + "" + "/channel/" + "" + mChan + "" + "/leave?uuid=" + encodeURIComponent(UniqueID) // leave?uuid=" + UniqueID
            }).done(function(jqXHR, textStatus) {
                console.log("Request done: " + textStatus);
            }).fail(function(jqXHR, textStatus) {
                console.log("Request failed: " + textStatus);
            });
            return null;
        };
        // Unsubscribe people from PubNub network
        globalUnsubscribe = function() {
            try {
                pubnub.unsubscribe({
                    channels: [mChan]
                });
                pubnub.removeListener(listener);
            }
            catch (err) {
                console.log("Failed to UnSub");
            }
        };
        /*window.addEventListener("beforeunload", function(e) {
            //globalUnsubscribe();
            try {
                pubnub.unsubscribe({
                    channels: [mChan]
                });
                pubnub.removeListener(listener);
            }
            catch (err) {
                console.log("Failed to UnSub", err);
            }
            $.ajax({
                async: false,
                method: "GET",
                url: "https://pubsub.pubnub.com/v2/presence/sub-key/" + "" + playerInfo.subKey + "" + "/channel/" + "" + mChan + "" + "/leave?uuid=" + encodeURIComponent(UniqueID) // leave?uuid=" + UniqueID
            }).done(function(jqXHR, textStatus) {
                console.log("Request done: " + textStatus);
            }).fail(function(jqXHR, textStatus) {
                console.log("Request failed: " + textStatus, e);
            });
            return null;
        });
        var globalUnsubscribe = function() {
            try {
                pubnub.unsubscribe({
                    channels: [mChan]
                });
                pubnub.removeListener(listener);
            }
            catch (err) {
                console.log("Failed to UnSub", err);
            }
        };*/
    };
    init();
});
