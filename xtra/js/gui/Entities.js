define(function(require) {
    var controls = require("cs/modules/Controls");
    var ticker = require("cs/modules/Ticker");
    var chan = require("cs/modules/Chan");
    var cam = require("cs/modules/Cam");
    var deck = require("cs/modules/Deck");
    var cards = require("cs/modules/Cards");
    var kind = require("cs/modules/Kind");
    var model = require("cs/modules/Model");
    var tier = require("cs/modules/Tier");
    var rank = require("cs/modules/Rank");
    var skill = require("cs/modules/Skill");
    var dreq = require("cs/modules/Dreq");
    var prog = require("cs/modules/Prog");
    var cost = require("cs/modules/Cost");
    var scost = require("cs/modules/Scost");
    var sprog = require("cs/modules/Sprog");
    var dcost = require("cs/modules/Dcost");
    var dmodel = require("cs/modules/Dmodel");
    var dtier = require("cs/modules/Dtier");
    var drank = require("cs/modules/Drank");
    var dskill = require("cs/modules/Dskill");
    var view = require("cs/modules/View");
    var xfun = require("cs/modules/Xfun");
    var xid = require("cs/modules/Xid");
    var xone = require("cs/modules/Xone");
    var xtwo = require("cs/modules/Xtwo");
    var xnode = require("cs/modules/Xnode");
    var boot = require("entities/Boot");
    var entities = {
        init: function(game) {
            game.addModules([controls, ticker, chan, cam, deck, cards, kind, model, tier, rank, skill, dreq, prog, cost, scost, sprog, dcost, dmodel, dtier, drank, dskill, view, xfun, xid, xone, xtwo, xnode]);
            game.addEids([boot], game);
        }
    };
    return entities;
});
