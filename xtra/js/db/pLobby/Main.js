define(function(require) {
    /*global playerInfo*/
    if (typeof playerInfo === "undefined") { window.location.replace("/wp-login.php"); }
    var Cs = require("cs/Cs");
    var Pubnub = require("Pubnub");
    var entities = require("Entities");
    var tick = require("cs/systems/Tick");
    var controllerL = require("cs/systems/ControllerL");
    var drawL = require("cs/outputs/DrawL");
    var round = Math.round;
    Math.round = function(value, decimals) {
        decimals = decimals || 0;
        return Number(round(value + 'e' + decimals) + 'e-' + decimals);
    };
    var init = function() {
        var game = new Cs.Game();
        var touches = new Cs.Touches();
        var pubnub = new Pubnub();
        entities.init(game);
        game.addSystems([tick, controllerL]);
        game.addOutputs([drawL]);
        pubnub.init(game);
        game.pubnub = pubnub;
        window.onload = touches.init(game);
        window.game = game;
        console.log(game);
    };
    init();
});
