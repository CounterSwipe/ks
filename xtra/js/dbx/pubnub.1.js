define(function() {
    /*global PubNub*/
    /*global playerInfo*/
    /*global localStorage*/
    //localStorage.clear();
    function getGameId() {
        if (window.location.search.substring(1).split('?')[0].split('=')[0] !== 'id') {
            return null;
        }
        else {
            return window.location.search.substring(1).split('?')[0].split('=')[1];
        }
    }
    let UniqueID = playerInfo.puuid;
    let gameid = getGameId();
    let mChan = gameid;
    let player;
    let iam;
    let p1Count;
    let p2Count;
    let p1deck;
    let p2deck;
    let p1State;
    let p2State;
    //var mychannel = gameid;
    console.log("CLIENT BROWSER UUID: ", UniqueID);
    document.getElementById("cUUID").textContent = UniqueID;
    document.getElementById("chanID").textContent = mChan;
    let playerMatch = [];
    let pubnub = new PubNub({
        publishKey: playerInfo.pubKey,
        subscribeKey: playerInfo.subKey,
        ssl: true,
        restore: true
    });
    //TODO: subscribe before|after listener!!
    let listener = {
        status(response) {
            if (response.category === "PNConnectedCategory") {
                hereNow(response.affectedChannels);
            }
        },
        message(response) {
            message: obj => receive_chat(obj)
        },
        presence(response) {
            console.log("@presence -> view channel here?", response);
            //if(response.occupancy === 1 && response.uuid === playerInfo.puuid) player = 1
            //else if ( response.occupancy === 2 && response.uuid === playerInfo.puuid) player = 2
            //else { false } -> player set -> do nothing|continue
            //
            //@join setState, if oc < 2, p=1, else p=2, setDeck, hereNow
            if (response.action === "join") {
                for (let i = 0; i < response.occupancy; i++) {
                    if (response.uuid !== undefined) {
                        var uuidMatchJoin = playerMatch.indexOf(response.uuid);
                        console.log(response.action, "UUID ARRAY INDEX: ", uuidMatchJoin, "UUID: ", response.uuid);
                        if (uuidMatchJoin === -1) {
                            playerMatch[playerMatch.length] = response.uuid;
                            console.log("Insert ", response.uuid, "in array");
                            if (!player) {
                                console.log("set playerDeck");
                                if (response.occupancy < 2) {
                                    player = 1;
                                    p1deck = {
                                        "deck": "p1"
                                    };
                                    setState(p1deck);
                                }
                                else {
                                    player = 2;
                                    p2deck = {
                                        "deck": "p2"
                                    };
                                    setState(p2deck);
                                }
                            }
                            console.log("Iam P:", player);
                        }
                        else {
                            console.log("P:", player, "UUID: ", response.uuid, "is already in the array");
                        }
                    }
                }
            }
            if (response.action === "interval") {
                console.log("interval response: ", response);
                if (response.join !== undefined) {
                    for (i = 0; i < response.occupancy; i++) {
                        if (response.join[i] !== undefined) {
                            var uuidMatchIntervalJoin = playerMatch.indexOf(response.join[i]);
                            if (uuidMatchIntervalJoin === -1) {
                                console.log("Interval Add UUID: ", uuidMatchIntervalJoin);
                                playerMatch[playerMatch.length] = response.join[i];
                            }
                        }
                    }
                }
                if (response.leave !== undefined) {
                    for (i = 0; i < response.occupancy; i++) {
                        var uuidMatchIntervalLeave = playerMatch.indexOf(response.leave[i]);
                        if (uuidMatchIntervalLeave > -1) {
                            console.log("REMOVE PLAYER FROM ARRAY", uuidMatchIntervalLeave);
                            playerMatch.splice(uuidMatchIntervalLeave, 1);
                        }
                    }
                }
            }
            if (response.action === "leave") {
                for (i = 0; i < response.occupancy; i++) {
                    var uuidMatchLeave = playerMatch.indexOf(response.uuid);
                    if (uuidMatchLeave > -1) {
                        console.log("REMOVE PLAYER FROM ARRAY", uuidMatchLeave, "with UUID: ", response.uuid);
                        playerMatch.splice(uuidMatchLeave, 1);
                    }
                }
            }
            if (playerMatch.length === 2) {
                hereNow(response.affectedChannels);
                //setState(response.affectedChannels);
                //getState(response.affectedChannels);
            }
            console.log("Presence UUIDs:", playerMatch);
        },
    };
    /*var listener = {
        status: function(response) {
            if (response.category === "PNConnectedCategory") {
                hereNow(response.affectedChannels);
            }
        },
        message: function(m) {
            console.log("@m", m);
            if (playerMatch.length >= 2) {
                console.log("launch unit here");
                //setUpad(m);
                //checkGameStatus(m);
            }
        },
        presence: function(p) {
            if (p.action === "join" && p.occupancy < 2) {
                player = 1;
                //setAunits(1);
                //setAunits(2);
                //setAunits(3);
            }
            else if (p.action === "join" && p.occupancy == 2) {
                if (player) {
                    iam = 1;
                    //var bunit1 = document.getElementById("aunit1").innerHTML;
                    deck = "p1";
                    newState = {
                        deck: deck
                    };
                    pubnub.setState({
                        state: newState,
                        channels: [mChan],
                    }, function(m, p, response) {
                        console.log("player: ", iam, newState);
                        console.log("player: ", iam, newState.deck);
                        console.log("m: ", iam, m, p);
                    });
                    pubnub.getState({
                        channels: [mChan]
                    }, function(status, response) {
                        console.log("player: ", iam, newState);
                    });
                    pubnub.hereNow({
                        channels: [mChan],
                        includeState: true
                    }, function(status, response) {
                        console.log("player: ", iam, newState);
                    });
                }
                else if (typeof player === "undefined") {
                    player = 2;
                    iam = 2;
                    deck = "p20";
                    newState = {
                        deck: deck
                    };
                    pubnub.setState({
                        state: newState,
                        channels: [mChan],
                    }, function(m, p, response) {
                        console.log("player: ", iam, newState);
                        console.log("player: ", iam, newState.deck);
                        console.log("m: ", iam, m, p);
                    });
                    pubnub.getState({
                        channels: [mChan]
                    }, function(status, response) {
                        console.log("player: ", iam, newState);
                    });
                    pubnub.hereNow({
                        channels: [mChan],
                        includeState: true
                    }, function(status, response) {
                        console.log("player: ", iam, newState);
                        console.log(p);
                        console.log(p.state);
                    });
                    //setAunits(1);
                    //setAunits(2);
                    //setAunits(3);
                    return;
                }
            }
            else if (p.action === "state-change" && p.occupancy == 2) {
                //var iamnow = document.getElementById("me").innerHTML;
                if (iam === 1) {
                    if (p1Count === 0) {
                        //var scAnow = Math.floor(scA + 1);
                        //document.getElementById("scA").innerHTML = scAnow;
                        p1Count++;
                        console.log(p);
                    }
                    else if (p1Count === 1) {
                        //var scAnow = Math.floor(scA + 1);
                        //document.getElementById("scA").innerHTML = scAnow;
                        p1Count++;
                        console.log(p);
                        console.log("testes state: ", p.state);
                        //setBunits(p);
                        //elSet.set("player", 1);
                        return startNewGame();
                    }
                    else {
                        p1Count++;
                        //var scAnow = Math.floor(scA + 1);
                        //document.getElementById("scA").innerHTML = scAnow;
                        console.log(p);
                    }
                }
                else if (iam !== 1) {
                    //var scB = +document.getElementById("scB").innerHTML;
                    if (p2Count === 0) {
                        p2Count++;
                        //var scBnow = Math.floor(scB + 1);
                        //document.getElementById("scB").innerHTML = scBnow;
                        console.log(p);
                        console.log(p.state);
                        //setBunits(p);
                        deck = "p2";
                        nowState = {
                            deck: deck
                        };
                        pubnub.setState({
                            state: nowState,
                            channels: [mChan],
                        }, function(m, response) {
                            console.log(nowState);
                            console.log("player: ", iam, nowState);
                        });
                    }
                    else if (p2Count === 1) {
                        p2Count++;
                        //var scBnow = Math.floor(scB + 1);
                        //document.getElementById("scB").innerHTML = scBnow;
                        console.log(p);
                        pubnub.getState({
                            channels: [mChan]
                        }, function(status, response) {
                            console.log("player: ", iam, nowState);
                        });
                        pubnub.hereNow({
                            channels: [mChan],
                            includeState: true
                        }, function(status, response) {
                            console.log("player: ", iam, nowState);
                        });
                        //elSet.set("player", 2);
                        return startNewGame();
                    }
                    else {
                        p2Count++;
                        //var scBnow = Math.floor(scB + 1);
                        //document.getElementById("scB").innerHTML = scBnow;
                        console.log(p);
                    }
                }
            }
        }
    };*/
    pubnub.addListener(listener);
    pubnub.subscribe({
        channels: [mChan],
        withPresence: true,
    });

    function startNewGame() {
        console.log("@Start Game!");
    }

    function hereNow(channels) {
        //for (i in channels) {
        //var channel = channels[i];
        pubnub.hereNow({
            channel: [mChan], //channel,
            includeUUIDs: true,
            includeState: true
        }).then((response) => {
            //console.log("hereNow Response: ", response);
            for (let i = 0; i < response.totalOccupancy; i++) {
                playerMatch[i] = response.channels[mChan].occupants[i].uuid;
            }
            //console.log("hereNow UUIDs in playerMatch array: ", playerMatch);
            if (playerMatch.length === 2) {
                console.log("@hereNow playerMatch === 2 P:", player, playerMatch);
                getState(response.affectedChannels);
            }
            console.log("@hereNow Response: ", response);
        }).catch((error) => {
            console.log(error);
        });
        /*}, function(status, response) {
            console.log("hereNow Response: ", response);
            for (i = 0; i < response.totalOccupancy; i++) {
                playerMatch[i] = response.channels[mChan].occupants[i].uuid;
                //console.log("@herenow!", response.channels[pChan]);
                //playerList[i] = response.channels.playerlobby.occupants[i].uuid;
            }
            console.log("hereNow UUIDs: ", playerMatch);
            if (playerMatch.length === 2) {
                console.log("@gameStart:", playerMatch);
                console.log("@hereNow, response.affectedChannels", response.affectedChannels);
                getState(response.affectedChannels);
                //setState(response.affectedChannels);
                //getState(response.affectedChannels);
            }
        });*/
        //}
    }

    function setState(newState) {
        pubnub.setState({
            state: newState,
            channels: [mChan], //['ch1'],
            //channelGroups: ['cg1']
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        });
    }

    function getState(channels) {
        pubnub.getState({
            uuid: "uuid", //playerInfo.puuid
            channels: channels //[mChan] //['ch1'],
            //channelGroups: ['cg1']
        }).then((response) => {
            console.log("@getState", response)
        }).catch((error) => {
            console.log("@getState", error)
        });
    }
    //publish = function(newMessage) {
    //var newMessage = {
    //  text: 'Hi There!'
    //}
    //  console.log(newMessage);
    function send_msg(message) {
        pubnub.publish({
            message: message,
            channel: mChan //'my_channel'
        }).then((response) => {
            console.log("@publish", response)
        }).catch((error) => {
            console.log("@publish", error)
        });
    }

    function receive_chat(obj) {
        console.log("P:", player, "got newMsg:", obj);
        //box.html((''+obj.message).replace( /[<>]/g, '' )+'<br>'+box.html());
    }
    //}
    // If person leaves or refreshes the window, run the unsubscribe function
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
    return pubnub;
});
