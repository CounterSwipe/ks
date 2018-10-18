/*jshint -W098*/
define(function (require) {
  let Crafty = require("crafty");
  //let bHash = require("lib/bHash");
  let bTouch = require("lib/bTouch");
  let uUtil = require("util/uUtil");
  //TODO: browser ratios
  let tLoading = require("template/tLoading");
  let tPlayTest = require("template/tPlayTest");
  //flow:loop
  //let fCapture = require("flow/fCapture");
  //let fClock = require("flow/fClock");
  //let fEnergy = require("flow/fEnergy");
  //let fMoments = require("flow/fMoments");
  //let fScore = require("flow/fScore");
  let fTick = require("flow/fTick");
  //let fTock = require("flow/fTock");
  //init
  //let iCells = require("ini/iCells");
  //let iDeck = require("ini/iDeck");
  //let iGui = require("ini/iGui");
  let iImgs = require("ini/iImgs");
  let iLoad = require("ini/iLoad");
  //let iPlayer = require("ini/iPlayer");
  let iReady = require("ini/iReady");
  let iVue = require("ini/iVue");
  //locale:inputs
  //let oCkey = require("locale/oCkey");
  //let oMice = require("locale/oMice");
  //let oMsgs = require("locale/oMsgs");
  //let oNput = require("locale/oNput");
  //let oPub = require("locale/oPub");
  //let oUI = require("locale/oUI");
  //plugin:gfx
  //let pDimmer = require("plugin/pDimmer");
  let pGfx = require("plugin/pGfx");
  //let pTween = require("plugin/pTween");
  //script:logic
  //let sLaunch = require("script/sLaunch");
  //let sMovable = require("script/sMovable");
  //let sMoved = require("script/sMoved");
  //let sMoving = require("script/sMoving");
  //let sRocket = require("script/sRocket");
  //let sTarget = require("script/sTarget");
  Crafty.init(); //Crafty.init(480, 320);
  Crafty.e("bg").setbg(0);
  Crafty.scene("Loading");
});