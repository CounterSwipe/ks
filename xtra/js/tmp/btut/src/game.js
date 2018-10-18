/*jshint esversion: 6*/ /*global Crafty*/
define(function (require) {
  //let testes = require('db/js/iTouch');  
  let cUtil = require('lib/cUtil'); //TODO browser ratios
  let cHash = require('lib/cHash');
  let iTouch = require('lib/iTouch');
  let eLoading = require('scen/eLoading');
  let ePlayTest = require('scen/ePlayTest');
  //init
  let tCells = require('ini/tCells');
  let tDeck = require('ini/tDeck');
  let tGui = require('ini/tGui');
  let tImgs = require('ini/tImgs');
  let tPlayer = require('ini/tPlayer');
  let tVue = require('ini/tVue');
  //inputs
  let sCkey = require('input/sCkey');
  let sMice = require('input/sMice');
  let sMsgs = require('input/sMsgs');
  let sNput = require('input/sNput');
  let sPub = require('input/sPub');
  let sUI = require('input/sUI');
  //logic
  let cLaunch = require('logi/cLaunch');
  let cMovable = require('logi/cMovable');
  let cMoved = require('logi/cMoved');
  let cMoving = require('logi/cMoving');
  let cRocket = require('logi/cRocket');
  let cTarget = require('logi/cTarget');
  //loop
  let pCapture = require('loo/pCapture');
  let pClock = require('loo/pClock');
  let pEnergy = require('loo/pEnergy');
  let pMoments = require('loo/pMoments');
  let pScore = require('loo/pScore');
  let pTick = require('loo/pTick');
  let pTock = require('loo/pTock');
  //gfx
  let xDimmer = require('gf/xDimmer');
  let xGfx = require('gf/xGfx');
  let xTween = require('gf/xTween');
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