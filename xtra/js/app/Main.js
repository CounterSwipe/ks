define(function(require) {
    /*global playerInfo*/
    if (typeof playerInfo !== "undefined") { window.location.href = "/gui/"; }
    var Cs = require("cs/Cs");
    var entities = require("Entities");
    var tick = require("cs/systems/Tick");
    var controllerA = require("cs/systems/ControllerA");
    var drawA = require("cs/outputs/DrawA");
    var round = Math.round;
    Math.round = function(value, decimals) {
        decimals = decimals || 0;
        return Number(round(value + 'e' + decimals) + 'e-' + decimals);
    };
    var init = function() {
        var game = new Cs.Game();
        var touches = new Cs.Touches();
        entities.init(game);
        game.addSystems([tick, controllerA]);
        game.addOutputs([drawA]);
        window.onload = touches.init(game);
        window.game = game;
        console.log(game);
    };
    init();
});
