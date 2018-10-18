define(function(require) {
    /*global playerInfo*/
    //localStorage.removeItem("sub-c-4d557e6a-c0a3-11e6-b38f-02ee2ddab7feuuid");
    //localStorage.setItem("uuid", "tester");
    //var customUUID = localStorage.getItem("uuid");
    //console.log(customUUID);
    //customUUID;
    //  function doThis() {
    //      localStorage.setItem("uuid", "tester");
    //    return localStorage.getItem("uuid");
    //    }
    /*global localStorage*/
    //localStorage.clear();
    //console.log(localStorage);
    var playerUUID = loadUUID();
    //console.log(playerInfo);
    function loadUUID() {
        /*global playerInfo*/
        let puuid = localStorage.getItem("sub-c-4d557e6a-c0a3-11e6-b38f-02ee2ddab7feuuid");
        if (typeof playerInfo === "undefined" || typeof puuid === "undefined") { window.location.href = "/wp-login.php"; }
        //let puuid = playerInfo[0];
        //let puuid = +playerInfo.data.ID;
        //let pname = playerInfo[1];
        //sub-c-4d557e6a-c0a3-11e6-b38f-02ee2ddab7feuuid
        //let pname = playerInfo.data.display_name;
        console.log(playerInfo, puuid);
        return puuid;
    }
    var gameid = '';
    var rand = (Math.random() * 99999).toFixed(0);
    gameid = (getGameId()) ? getGameId() : rand;
    var mychannel = gameid;
    //var uuid = PubNub.generateUUID();
    /*global PubNub*/
    /*var pubnub = new PubNub({
        subscribeKey: "sub-c-4d557e6a-c0a3-11e6-b38f-02ee2ddab7fe",
        publishKey: "pub-c-9e04b0e5-e150-4c73-8d9e-d2766d5ab796",
        ssl: true,
        uuid: playerUUID, // || uuid,
        restore: true
    });*/
    console.log(pubnub);
    console.log(pubnub.getUUID());
    document.getElementById("thischan").textContent = mychannel;
    //document.getElementById("thischan").innerHTML = mychannel;
    //https://mytestgame-counterswipe.c9users.io/xbattle/?id=28587 etc
    console.log(mychannel);
    var Cs = require("cs/Cs");
    var entities = require("Entities");
    var tick = require("cs/systems/Tick");
    var controller = require("cs/systems/Controller");
    var timer = require("cs/systems/Timer");
    var fog = require("cs/systems/Fog");
    var preLaunch = require("cs/systems/PreLaunch");
    var launch = require("cs/systems/Launch");
    var hub = require("cs/systems/Hub");
    var unit = require("cs/systems/Unit");
    var spawn = require("cs/systems/Spawn");
    var deal = require("cs/systems/Deal");
    var gui = require("cs/systems/Gui");
    var route = require("cs/systems/Route");
    var egen = require("cs/systems/Egen");
    var reqmet = require("cs/systems/Reqmet");
    var launched = require("cs/systems/Launched");
    var behavior = require("cs/systems/Behavior");
    var movement = require("cs/systems/Movement");
    var combat = require("cs/systems/Combat");
    var resolve = require("cs/systems/Resolve");
    var scoring = require("cs/systems/Scoring");
    var draw = require("cs/outputs/Draw");
    var round = Math.round;
    Math.round = function(value, decimals) {
        decimals = decimals || 0;
        return Number(round(value + 'e' + decimals) + 'e-' + decimals);
    };
    var init = function() {
        var game = new Cs.Game();
        var touches = new Cs.Touches();
        entities.init(game);
        console.log(localStorage); /*global localStorage*/
        console.log(playerInfo);
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
    init();
    /*global localStorage*/
    pubnub.addListener({
        status: function(status) {},
        message: function(m) {
            console.log(m);
        },
        presence: function(m) {
            if (m.action === "join" && m.occupancy < 2) {
                console.log(m);
                let player = 1;
                var nueState = {};
                let uNum;
                let deck = +localStorage.getItem("d0"); //saved deck -> 1|2|3
                for (let d = 0; d < 6; d++) {
                    if (d < 1) { nueState[d] = player; }
                    else {
                        uNum = +localStorage.getItem("d" + deck + "" + d);
                        nueState[d] = uNum;
                    }
                }
                pubnub.setState({
                    state: nueState,
                    channels: [mychannel],
                }, function(m, response) {
                    console.log("player: ", nueState);
                    console.log("player: ", nueState[1], nueState[5]);
                    console.log("m: ", m);
                });
                pubnub.getState({
                    channels: [mychannel]
                }, function(status, response) {
                    console.log("player: ", nueState);
                });
                pubnub.hereNow({
                    channels: [mychannel],
                    includeUUIDs: true,
                    includeState: true
                }, function(status, response) {
                    console.log("player: ", nueState);
                    console.log(m);
                    console.log(m.state);
                    //game.start(); /*global game*/
                });
            }
            else if (m.action === "join" && m.occupancy === 2) {
                console.log(m);
                var newState = {
                    test: "it's alive!",
                    nice: "sweet!",
                    cool: 69
                };
                pubnub.setState({
                    state: newState,
                    channels: [mychannel],
                }, function(m, response) {
                    console.log("player: ", newState);
                    console.log("player: ", newState.test, newState.nice, newState.cool);
                    console.log("m: ", m);
                });
                pubnub.getState({
                    channels: [mychannel]
                }, function(status, response) {
                    console.log("player: ", newState);
                });
                pubnub.hereNow({
                    channels: [mychannel],
                    includeUUIDs: true,
                    includeState: true
                }, function(status, response) {
                    console.log("player: ", newState);
                    console.log(m);
                    console.log(m.state);
                    game.start(); /*global game*/
                });
            }
            else if (m.action === "state-change" && m.occupancy === 2) {
                console.log(m);
                var juno = "yess",
                    juyes = 22;
                var nowState = {
                    juno: juno,
                    juyes: juyes
                };
                pubnub.setState({
                    state: nowState,
                    channels: [mychannel],
                }, function(m, response) {
                    console.log(nowState);
                    console.log("player: ", nowState);
                });
            }
            pubnub.getState({
                channels: [mychannel]
            }, function(status, response) {
                console.log("player: ", nowState);
            });
            pubnub.hereNow({
                channels: [mychannel],
                includeState: true
            }, function(status, response) {
                console.log("player: ", nowState, status, response);
            });
        }
    });
    console.log("subscribing");
    pubnub.subscribe({
        channels: [mychannel],
        withPresence: true
    });

    function getGameId() {
        if (window.location.search.substring(1).split('?')[0].split('=')[0] !== 'id') {
            return null;
        }
        else {
            return window.location.search.substring(1).split('?')[0].split('=')[1];
        }
    }
});
