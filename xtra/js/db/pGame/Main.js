define(function(require) {
    /*global playerInfo*/
    if (typeof playerInfo === "undefined") { window.location.replace("/wp-login.php"); }
    var Cs = require("cs/Cs");
    //var Pubnub = require("Pubnub");
    var entities = require("Entities");
    var tickM = require("cs/systems/TickM");
    var timer = require("cs/systems/Timer");
    var victory = require("cs/systems/Victory");
    var msg = require("cs/systems/Msg");
    var controllerM = require("cs/systems/ControllerM");
    var fog = require("cs/systems/Fog");
    var deal = require("cs/systems/Deal");
    var nuFocus = require("cs/systems/NuFocus");
    var nuPath = require("cs/systems/NuPath");
    var egenM = require("cs/systems/EgenM");
    var reqmet = require("cs/systems/Reqmet");
    var captured = require("cs/systems/Captured");
    var anime = require("cs/systems/Anime");
    var drawM = require("cs/outputs/DrawM");
    var round = Math.round;
    Math.round = function(value, decimals) {
        decimals = decimals || 0;
        return Number(round(value + 'e' + decimals) + 'e-' + decimals);
    };
    var init = function() {
        var game = new Cs.Game();
        var touches = new Cs.Touches();
        //var pubnub = new Pubnub();
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
        var testModule = () => game.modules[11].length() === 5; //TODO:change from 5 -> 10 per foeDeck
        //m[12]:mCost => 10 uNumScripts loaded TODO: update if [12] != cost
        onModulesReady(testModule).then(() => {
            game.addSystems([tickM, timer, controllerM, anime]);
            //game.addSystems([tickM, timer, victory, msg, controllerM, fog, deal, nuFocus, nuPath, egenM, reqmet, captured, anime]);
            game.addOutputs([drawM]);
            //  pubnub.init(game);
            //game.pubnub = pubnub;
            window.game = game;
            console.log(game);
            var onDeckReady = function(testDeck) {
                return new Promise((resolves) => {
                    var waitForDeck = function() {
                        if (testDeck()) { resolves(testDeck); }
                        else { window.requestAnimationFrame(waitForDeck); }
                    };
                    waitForDeck();
                });
            };
            var testDeck = () => game.modules[11].length() === 5; //TODO:change from 5 -> 10 per foeDeck
            //m[12]:mCost => 10 uNumScripts loaded TODO: update if [12] != cost
            onDeckReady(testDeck).then(() => {
                console.log(game, "gameStart!", game.modules[11].length(), game.modules[11].length() === 5);
                window.onload = touches.init(game);
                game.start();
            });
        });
    };
    init();
});
