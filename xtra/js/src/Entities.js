define(function(require) {
    var pub = require("cs/modules/Pub");
    var controls = require("cs/modules/Controls");
    var ticker = require("cs/modules/Ticker");
    var chan = require("cs/modules/Chan");
    var energy = require("cs/modules/Energy");
    var paths = require("cs/modules/Paths");
    var hand = require("cs/modules/Hand");
    var deck = require("cs/modules/Deck");
    var cards = require("cs/modules/Cards");
    var model = require("cs/modules/Model");
    var tier = require("cs/modules/Tier");
    var rank = require("cs/modules/Rank");
    var cost = require("cs/modules/Cost");
    var deployed = require("cs/modules/Deployed");
    var moments = require("cs/modules/Moments");
    var view = require("cs/modules/View");
    var xfun = require("cs/modules/Xfun");
    var xid = require("cs/modules/Xid");
    var xone = require("cs/modules/Xone");
    var xtwo = require("cs/modules/Xtwo");
    var xnode = require("cs/modules/Xnode");
    var boot = require("entities/Boot");
    //var pubnub = require("Pubnub"); //-> moveTo entities?
    var entities = {
        init: function(game) {
            game.addModules([pub, controls, ticker, chan, energy, paths, hand, deck, cards, model, tier, rank, cost, deployed, moments, view, xfun, xid, xone, xtwo, xnode]);
            game.addEids([boot], game);
        }
    };
    return entities;
});
