define(function(require) {
  /*global Crafty*/
  var sLobby = require('src/scenes/sLobby');
  var sLob = require('src/systems/sLob');
  var sPub = require('src/systems/sPub');
  var cUtils = require('lib/cUtils');
  var Game = {
    start: function() {
      Crafty.init();
      Crafty.e("bg").setbg(0);
      Crafty.scene("Lobby");
    }
  };
  return Game;
});
