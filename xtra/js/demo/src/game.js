define(function(require) {
  /*global Crafty*/
  let sLoading = require('scenes/sLoading');
  let sDemo = require('scenes/sDemo');
  let iTouch = require('lib/iTouch');
  let iSelect = require('inputs/iSelect');
  let cUtils = require('lib/cUtils');
  let cHash = require('lib/cHash');
  //var cTween = require('beta/src/modules/cTween');
  let sDeck = require('src/systems/sDeck');
  //var sDimmer = require('beta/src/systems/sDimmer');
  let cImgs = require('src/modules/cImgs');
  let sIntro = require('src/systems/sIntro');
  let sTick = require('src/systems/sTick');
  let sMugs = require('src/systems/sMugs');
  let Game = {
    start: function() {
      Crafty.init();
      Crafty.e("bg").setbg(0);
      Crafty.scene("Loading");
    }
  };
  return Game;
});
