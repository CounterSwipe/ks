define(function(require) {
    var controls = require("cs/modules/Controls");
    var ticker = require("cs/modules/Ticker");
    var csU = require("cs/modules/CsU");
    var csR = require("cs/modules/CsR");
    var ctL = require("cs/modules/CtL");
    var ctR = require("cs/modules/CtR");
    var csD = require("cs/modules/CsD");
    var csL = require("cs/modules/CsL");
    var req = require("cs/modules/Req");
    var energy = require("cs/modules/Energy");
    var paths = require("cs/modules/Paths");
    var hand = require("cs/modules/Hand");
    var deck = require("cs/modules/Deck");
    var cards = require("cs/modules/Cards");
    var model = require("cs/modules/Model");
    var tier = require("cs/modules/Tier");
    var level = require("cs/modules/Level");
    var cost = require("cs/modules/Cost");
    var deployed = require("cs/modules/Deployed");
    var board = require("cs/modules/Board");
    var transit = require("cs/modules/Transit");
    var units = require("cs/modules/Units");
    var pos = require("cs/modules/Pos");
    var posX = require("cs/modules/PosX");
    var posY = require("cs/modules/PosY");
    var posR = require("cs/modules/PosR");
    var posV = require("cs/modules/PosV");
    var posU = require("cs/modules/PosU");
    var posO = require("cs/modules/PosO");
    var resMax = require("cs/modules/ResMax");
    var resNow = require("cs/modules/ResNow");
    var resPos = require("cs/modules/ResPos");
    var resNeg = require("cs/modules/ResNeg");
    var moments = require("cs/modules/Moments");
    var view = require("cs/modules/View");
    var kind = require("cs/modules/Kind");
    var xid = require("cs/modules/Xid");
    var xone = require("cs/modules/Xone");
    var xtwo = require("cs/modules/Xtwo");
    var boot = require("entities/Boot");
    var entities = {
        init: function(game) {
            game.addModules([controls, ticker, csU, csR, ctL, ctR, csD, csL, req, energy, paths, hand, deck, cards, model, tier, level, cost, deployed, board, transit, units, pos, posX, posY, posR, posV, posU, posO, resMax, resNow, resPos, resNeg, moments, view, kind, xid, xone, xtwo]);
            game.addEids([boot], game);
            //game.addEids([actor], game);//game.addEids(self, boot) //boot: rootEntity per original author
        }
    };
    return entities;
});
