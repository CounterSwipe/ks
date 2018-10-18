define(function(require) {
    /*global playerInfo*/
    var Cs = require("cs/Cs");
    var entities = require("Entities");
    var tick = require("cs/systems/Tick");
    var controllerG = require("cs/systems/ControllerG");
    var cameraG = require("cs/systems/CameraG");
    var launchG = require("cs/systems/LaunchG");
    var sortzG = require("cs/systems/SortzG");
    var rosterG = require("cs/systems/RosterG");
    var traitG = require("cs/systems/TraitG");
    var decksG = require("cs/systems/DecksG");
    var expandG = require("cs/systems/ExpandG");
    var drawG = require("cs/outputs/DrawG");
    var round = Math.round;
    Math.round = function(value, decimals) {
        decimals = decimals || 0;
        return Number(round(value + 'e' + decimals) + 'e-' + decimals);
    };
    var init = function() {
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
        var testModule = function() { return game.modules[12].length() === 8; };
        //TODO: [prog:12]
        onModulesReady(testModule).then(() => {
            game.addSystems([tick, controllerG, cameraG, launchG, sortzG, rosterG, traitG, decksG, expandG]);
            game.addOutputs([drawG]);
            touches.init(game);
            window.game = game;
            console.log(game);
        });
    };
    init();
});
