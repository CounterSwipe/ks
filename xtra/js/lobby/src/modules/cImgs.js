define(function() {
  /*global Crafty*/
  Crafty.c("Imgs", {
    imgs: { sprites: {} }
  });
  Crafty.s("SET_IMGS", {
    init: function() {
      Crafty.e("Imgs");
      this.loadImgs();
      console.log("@cImgs")
    },
    loadImgs: function(player) {
      this.getMugs();
      this.onLoad();
    },
    getMugs: function() {
      let imgs = Crafty("Imgs").get(0).imgs;
      imgs.sprites["mugs.png"] = {
        tile: 90,
        tileh: 120,
        map: {
          ["MUG_u" + 1 + "m" + 1]: [0, 0],
          ["MUG_u" + 2 + "m" + 1]: [1, 0],
          ["MUG_u" + 3 + "m" + 1]: [2, 0],
          ["MUG_u" + 4 + "m" + 1]: [3, 0],
          ["MUG_u" + 5 + "m" + 1]: [4, 0],
          ["MUG_u" + 6 + "m" + 1]: [5, 0],
          ["MUG_u" + 7 + "m" + 1]: [6, 0],
          ["MUG_u" + 8 + "m" + 1]: [7, 0]
        }
      };
      return this;
    },
    onLoad: function() {
      let imgs = Crafty("Imgs").get(0).imgs;
      Crafty.paths({
        images: "/wp-content/themes/blankslate-child/js/beta/assets/"
      });
      Crafty.load(imgs, this.onComplete, this.onProgress, function(e) {
        console.log("error@loading", e);
      });
      return this;
    },
    onComplete: function() {
      Crafty.e("Touches").
      setU(() => Crafty.scene('Demo'));
      console.log("complete!");
    },
    onProgress: function(e) {
      //console.log(e.percent);
      //Crafty("ProBar").trigger("Progress", e.percent);
    },
    remove: function() {
      //Crafty.log('ImgBuilder removed!');
    }
  }, true);
});
