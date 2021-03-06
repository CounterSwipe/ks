/*jshint -W098*//*global Crafty*/
define(function (require) {
  let bHash = require("lib/bHash");
  let bTouch = require("lib/bTouch");
  let bUtil = require("lib/bUtil");
  //TODO: browser ratios
  let tLoading = require("template/tLoading");
  let tPlayTest = require("template/tPlayTest");
  //flow:loop
  let fCapture = require("flow/fCapture");
  let fClock = require("flow/fClock");
  let fEnergy = require("flow/fEnergy");
  let fMoments = require("flow/fMoments");
  let fScore = require("flow/fScore");
  let fTick = require("flow/fTick");
  let fTock = require("flow/fTock");
  //init
  let iCells = require("ini/iCells");
  let iDeck = require("ini/iDeck");
  let iGui = require("ini/iGui");
  let iImgs = require("ini/iImgs");
  let iPlayer = require("ini/iPlayer");
  let iVue = require("ini/iVue");
  //locale:inputs
  let oCkey = require("locale/oCkey");
  let oMice = require("locale/oMice");
  let oMsgs = require("locale/oMsgs");
  let oNput = require("locale/oNput");
  let oPub = require("locale/oPub");
  let oUI = require("locale/oUI");
  //plugin:gfx
  let pDimmer = require("plugin/pDimmer");
  let pGfx = require("plugin/pGfx");
  let pTween = require("plugin/pTween");
  //script:logic
  let sLaunch = require("script/sLaunch");
  let sMovable = require("script/sMovable");
  let sMoved = require("script/sMoved");
  let sMoving = require("script/sMoving");
  let sRocket = require("script/sRocket");
  let sTarget = require("script/sTarget");
  //
  //var cUnits = require('src/modules/cUnits');
  //var cArrows = require('src/modules/cArrows');TODO  
  var Game = {
    start: function () {
      Crafty.init();
      Crafty.e("bg").setbg(0);
      Crafty.scene("Loading");
    }
  };
  return Game;
});