define(function(require) {
    var controls = require("cs/modules/Controls");
    var ticker = require("cs/modules/Ticker");
    var view = require("cs/modules/View");
    var xfun = require("cs/modules/Xfun");
    var xid = require("cs/modules/Xid");
    var xone = require("cs/modules/Xone");
    var xtwo = require("cs/modules/Xtwo");
    var xnode = require("cs/modules/Xnode");
    var entities = {
        init: function(game) {
            game.addModules([controls, ticker, view, xfun, xid, xone, xtwo, xnode]);
        }
    };
    return entities;
});
