define(function(require) {
    /*global playerInfo*/
    /*global localStorage*/
    //localStorage.clear();
    console.log(playerInfo, localStorage);
    var playerUUID = loadUUID();

    function loadUUID() {
        let puuid = localStorage.getItem(playerInfo.subKey + "uuid");
        //let puuid = localStorage.getItem("sub-c-4d557e6a-c0a3-11e6-b38f-02ee2ddab7feuuid");
        if (typeof playerInfo === "undefined" || typeof puuid === "undefined") { window.location.href = "/wp-login.php"; }
        return puuid;
    }
    //var gameid = '';
    //var rand = (Math.random() * 99999).toFixed(0);
    //gameid = (getGameId()) ? getGameId() : rand;
    //var mychannel = gameid;
    var lobbychan = "lobby-d";
    //var uuid = PubNub.generateUUID();
    /*global PubNub*/
    var pubnub = new PubNub({
        subscribeKey: playerInfo.subKey,
        publishKey: playerInfo.pubKey,
        //subscribe_key: '<?php echo $pubnub_subs_key; ?>',
        //publish_key: '<?php echo $pubnub_pub_key; ?>',
        //subscribeKey: "sub-c-4d557e6a-c0a3-11e6-b38f-02ee2ddab7fe",
        //publishKey: "pub-c-9e04b0e5-e150-4c73-8d9e-d2766d5ab796",
        ssl: true,
        uuid: playerUUID,
        restore: true
    });
    console.log(pubnub);
    console.log(pubnub.getUUID());
    //document.getElementById("thischan").textContent = mychannel;
    //document.getElementById("thischan").innerHTML = mychannel;
    //https://mytestgame-counterswipe.c9users.io/xbattle/?id=28587 etc
    //console.log(mychannel);
    /*var Cs = require("cs/Cs");
    var entities = require("Entities");
    var tick = require("cs/systems/Tick");
    var controller = require("cs/systems/Controller");
    var draw = require("cs/outputs/Draw");*/
    var round = Math.round;
    Math.round = function(value, decimals) {
        decimals = decimals || 0;
        return Number(round(value + 'e' + decimals) + 'e-' + decimals);
    };
    /*var init = function() {
        var game = new Cs.Game();
        var touches = new Cs.Touches();
        entities.init(game);
        var onModulesReady = function(testModule) {
            return new Promise((resolve) => {
                var waitForModules = function() {
                    if (testModule()) { resolve(testModule); }
                    else { window.requestAnimationFrame(waitForModules); }
                };
                waitForModules();
            });
        };
        var testModule = function() { return game.modules[17].length() === 10; }; //10
        //m[10]:mCost => 10 uNumScripts loaded TODO: update if [10] != cost
        onModulesReady(testModule).then(() => {
            game.addSystems([tick, controller, timer, fog, preLaunch, launch, hub, deal, gui, route, egen, reqmet]);
            //game.addSystems([hub, unit, spawn, deal, gui, reqmet, launched, behavior, movement, combat, resolve, scoring]);
            game.addOutputs([draw]);
            touches.init(game);
            window.game = game;
            console.log(game);
            //game.start();
        });
    };
    init();*/
    pubnub.addListener({
        status: function(status) {
            console.log("status", status);
        },
        message: function(m) {
            console.log("message", m);
        },
        presence: function(m) {
            //if (m.action === "join" && m.occupancy < 2) {
            if (m.action === "join") {
                console.log("@join", m);
                let player = 1;
                var nState = {};
                let uNum;
                let deck = +localStorage.getItem("d0"); //saved deck -> 1|2|3
                for (let d = 0; d < 6; d++) {
                    if (d < 1) { nState[d] = "testes"; } //state["0"] = player
                    else {
                        uNum = +localStorage.getItem("d" + deck + "" + d);
                        nState[d] = uNum;
                    }
                }
                pubnub.setState({
                    state: nState,
                    channels: [lobbychan],
                }, function(m, response) {
                    console.log("@join setState m response", nState, nState[0], nState[5], m, response);
                });
                pubnub.getState({
                    channels: [lobbychan]
                }, function(status, response) {
                    console.log("@join getState m response", nState, nState[0], nState[5], m, response);
                });
                pubnub.hereNow({
                    channels: [lobbychan],
                    includeUUIDs: true,
                    includeState: true
                }, function(status, response) {
                    console.log("@join hereNow status response", nState, nState[0], nState[5], status, response, "m", m, "m.state", m.state);
                });
            }
            pubnub.getState({
                channels: [lobbychan]
            }, function(status, response) {
                console.log("p getState: status, response", status, response);
            });
            pubnub.hereNow({
                channels: [lobbychan],
                includeState: true
            }, function(status, response) {
                console.log("p hereNow: status, response", status, response);
            });
        }
    });
    console.log("subscribing");
    pubnub.subscribe({
        channels: [lobbychan],
        withPresence: true
    });
    pubnub.hereNow({
        channels: [lobbychan],
        includeUUIDs: true,
        includeState: true
    }, function(status, response) {
        console.log("hereNow: status, response", status, response);
    });
    pubnub.getState({
        channels: [lobbychan]
    }, function(status, response) {
        console.log("getState: status, response", status, response);
    });
    /*function getGameId() {
        if (window.location.search.substring(1).split('?')[0].split('=')[0] !== 'id') {
            return null;
        }
        else {
            return window.location.search.substring(1).split('?')[0].split('=')[1];
        }
    }*/
});
