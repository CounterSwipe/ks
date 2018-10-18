define(function() {
    /*global PubNub*/
    /*global playerInfo*/
    //var lobbychan = playerInfo.puuid;
    /*global localStorage*/
    //localStorage.clear();
    var UniqueID = playerInfo.puuid;
    var pChan = 'playerLobby';
    console.log("CLIENT BROWSER UUID: ", UniqueID);
    //document.write("Your Client's UUID is: ", UniqueID);
    document.getElementById("cUUID").textContent = UniqueID;
    var playerList = [];
    var pubnub = new PubNub({
        publishKey: playerInfo.pubKey,
        subscribeKey: playerInfo.subKey,
        ssl: true,
        restore: true
    });
    // Subscribe to the two PubNub Channels
    pubnub.subscribe({
        channels: [pChan],
        //channels: ['playerlobby-1'],
        withPresence: true,
    });
    var listener = {
        status(response) {
            if (response.category === "PNConnectedCategory") {
                hereNow(response.affectedChannels);
            }
        },
        message(response) {},
        presence(response) {
            if (response.action === "join") {
                for (i = 0; i < response.occupancy; i++) {
                    if (response.uuid !== undefined) {
                        var uuidMatchJoin = playerList.indexOf(response.uuid);
                        console.log("UUID ARRAY INDEX: ", uuidMatchJoin, "UUID: ", response.uuid);
                        if (uuidMatchJoin === -1) {
                            playerList[playerList.length] = response.uuid;
                            console.log("Insert ", response.uuid, "in array");
                        }
                        else {
                            console.log("UUID: ", response.uuid, "is already in the array");
                        }
                    }
                }
            }
            if (response.action === "interval") {
                console.log("interval response: ", response);
                if (response.join !== undefined) {
                    for (i = 0; i < response.occupancy; i++) {
                        if (response.join[i] !== undefined) {
                            var uuidMatchIntervalJoin = playerList.indexOf(response.join[i]);
                            if (uuidMatchIntervalJoin === -1) {
                                console.log("Interval Add UUID: ", uuidMatchIntervalJoin);
                                playerList[playerList.length] = response.join[i];
                            }
                        }
                    }
                }
                if (response.leave !== undefined) {
                    for (i = 0; i < response.occupancy; i++) {
                        var uuidMatchIntervalLeave = playerList.indexOf(response.leave[i]);
                        if (uuidMatchIntervalLeave > -1) {
                            console.log("REMOVE PLAYER FROM ARRAY", uuidMatchIntervalLeave);
                            playerList.splice(uuidMatchIntervalLeave, 1);
                        }
                    }
                }
            }
            if (response.action === "leave") {
                for (i = 0; i < response.occupancy; i++) {
                    var uuidMatchLeave = playerList.indexOf(response.uuid);
                    if (uuidMatchLeave > -1) {
                        console.log("REMOVE PLAYER FROM ARRAY", uuidMatchLeave, "with UUID: ", response.uuid);
                        playerList.splice(uuidMatchLeave, 1);
                    }
                }
            }
            if (playerList.length === 2) {
                console.log(playerList);
                var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
                playerList.sort(collator.compare);
                var pMatchChan = playerList[0] + playerList[1];
                console.log("@presence pMatchChan:", pMatchChan);
                window.location.replace("/match/?id=" + pMatchChan); //history.backBtn(false)
            }
            console.log("Presence UUIDs:", playerList);
        },
    };
    pubnub.addListener(listener);

    function hereNow(channels) {
        console.log(channels);
        for (i in channels) {
            var channel = channels[i];
            pubnub.hereNow({
                channel: channel,
                includeUUIDs: true,
                includeState: true
            }, function(status, response) {
                console.log("hereNow Response: ", response);
                for (i = 0; i < response.totalOccupancy; i++) {
                    playerList[i] = response.channels[pChan].occupants[i].uuid;
                    //console.log("@herenow!", response.channels[pChan]);
                    //playerList[i] = response.channels.playerlobby.occupants[i].uuid;
                }
                console.log("hereNow UUIDs: ", playerList);
                if (playerList.length === 2) {
                    var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
                    playerList.sort(collator.compare);
                    var pMatchChan = playerList[0] + playerList[1];
                    console.log("@hereNow pMatchChan:", pMatchChan);
                    window.location.replace("/match/?id=" + pMatchChan); //history.backBtn(false)
                }
            });
        }
    }
    // If person leaves or refreshes the window, run the unsubscribe function
    /*onbeforeunload = function() {
        globalUnsubscribe();
        $.ajax({
            // Query to server to unsub sync
            async: false,
            method: "GET",
            url: "https://pubsub.pubnub.com/v2/presence/sub-key/" + "" + playerInfo.subKey + "" + "/channel/" + "" + pChan + "" + "/leave?uuid=" + encodeURIComponent(UniqueID) // leave?uuid=" + UniqueID
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
            pubnub.unsubscribeAll(); //TODO: unsub from all channels!
            //pubnub.unsubscribe({
            //  channels: [pChan]
            //});
            pubnub.removeListener(listener);
        }
        catch (err) {
            console.log("Failed to UnSub");
        }
    };*/
    window.onbeforeunload = function() {
        pubnub.unsubscribeAll();
    };

    function unSubAll() {
        globalUnsubscribeAll();
        $.ajax({
            // Query to server to unsub sync
            async: false,
            method: "GET",
            url: "https://pubsub.pubnub.com/v2/presence/sub-key/" + "" + playerInfo.subKey + "" + "/channel/" + "" + pChan + "" + "/leave?uuid=" + encodeURIComponent(UniqueID) // leave?uuid=" + UniqueID
        }).done(function(jqXHR, textStatus) {
            console.log("Request done: " + textStatus);
        }).fail(function(jqXHR, textStatus) {
            console.log("Request failed: " + textStatus);
        });
        return null;
    }
    globalUnsubscribeAll = function() {
        try {
            pubnub.unsubscribeAll //TODO: unsub from all channels!
            //pubnub.unsubscribe({
            //  channels: [pChan]
            //});
            pubnub.removeListener(listener);
        }
        catch (err) {
            console.log("Failed to UnSub");
        }
    };
    return pubnub;
});
