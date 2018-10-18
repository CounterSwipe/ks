define(function() {
  /*global Crafty localStorage playerInfo*/
  Crafty.c("_PLAYER", {
    p: {}
  });
  Crafty.c("GetPlayer", {
    getPlayer: function(p) {
      if (p) { return Crafty("_PLAYER").get(0).p[p]; }
      else { return Crafty("_PLAYER").get(0).p; }
    }
  });
  Crafty.s("SET_PLAYER", {
    init: function() {
      Crafty.e("_PLAYER");
      this.setPlayer({ side: 1, stat: this.getPlayer() });
    },
    getPlayer: function() {
      let player = {
        name: this.getName(),
        loa: this.getLoa(),
        zone: this.getZone(),
        def: this.getDef()
      };
      return player;
    },
    setPlayer: function(p) {
      let player = Crafty("_PLAYER").get(0);
      player.p[p.side] = p.stat;
    },
    getName: function() {
      return typeof playerInfo !== "undefined" ? playerInfo.display_name : "New Player";
    },
    getLoa: function() {
      return localStorage.getItem("loa") || 1;
    },
    getZone: function() {
      return localStorage.getItem("zone") || 0;
    },
    getDef: function() {
      return localStorage.getItem("def") || [0, 0, 0];
    },
  }, true);
});
