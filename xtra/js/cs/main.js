define(function(require) {
    var Game = require('src/game');
    let init = function() {
        window.Game = Game;
        Game.start();
    };
    init();
});
