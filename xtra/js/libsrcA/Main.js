define(function(require) {
    /*global localStorage*/
    /*global playerInfo*/
    //localStorage.clear();
    console.log(localStorage, playerInfo);
    if (typeof playerInfo === "undefined") { window.location.replace("/wp-login.php"); }
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
            game.start();
        });
    };
    init();
});
