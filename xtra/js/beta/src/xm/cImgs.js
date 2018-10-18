define(function() {
  /*global Crafty*/
  Crafty.c("Imgs", {
    imgs: { sprites: {} }
  });
  Crafty.s("ImgLoader", {
    init: function() {
      Crafty.e("Imgs");
      this.getBG();
      this.getPin();
      this.getMugs();
      this.getImgs();
      this.onLoad();
    },
    getBG: function() {
      let imgs = Crafty("Imgs").get(0).imgs;
      let z = Crafty("_PLAYER").get(0).p[1].zone;
      imgs.sprites["z" + z + ".png"] = {
        tile: 611,
        tileh: 647,
        map: {
          ["BG_" + z]: [0, 0]
        }
      };
      imgs.sprites["hbg.png"] = {
        tile: 450,
        tileh: 136,
        map: {
          hbg: [0, 0]
        }
      };
      imgs.sprites["bwtile.png"] = {
        tile: 450,
        tileh: 96,
        map: {
          wt1: [0, 0],
          wt2: [0, 1],
          bt1: [0, 2],
          bt2: [0, 3]
        }
      };
      imgs.sprites["etop.png"] = {
        tile: 450,
        tileh: 16,
        map: {
          etop: [0, 0]
        }
      };
      imgs.sprites["cardbg.png"] = {
        tile: 90,
        tileh: 120,
        map: {
          cardbg: [0, 0]
        }
      };
      return this;
    },
    getPin: function() {
      //TODO only load per uNum|model level etc
      let imgs = Crafty("Imgs").get(0).imgs;
      imgs.sprites["pins.png"] = {
        tile: 90,
        tileh: 120,
        map: {
          ["PIN_u" + 1 + "m" + 1]: [0, 0],
          ["PIN_u" + 2 + "m" + 1]: [1, 0],
          ["PIN_u" + 3 + "m" + 1]: [2, 0],
          ["PIN_u" + 4 + "m" + 1]: [3, 0],
          ["PIN_u" + 5 + "m" + 1]: [4, 0],
          ["PIN_u" + 6 + "m" + 1]: [5, 0],
          ["PIN_u" + 7 + "m" + 1]: [6, 0],
          ["PIN_u" + 8 + "m" + 1]: [7, 0],
          ["PIN_wht"]: [8, 0],
          ["PIN_x"]: [9, 0],
          ["PIN_0"]: [10, 0]
        }
      };
      return this;
    },
    getMugs: function() {
      //TODO only load per uNum|model level etc
      let imgs = Crafty("Imgs").get(0).imgs;
      imgs.sprites["um1.png"] = {
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
    getImgs: function() {
      this.setImgs(this.getDeck(1));
      this.setImgs(this.getDeck(2));
    },
    getDeck: function(p) {
      let uDeck = [];
      let mDeck = [];
      let d = Crafty("_DECK _P" + p).get(0);
      for (let i = 1; i < 8; i++) {
        let dKey = d.search(i);
        uDeck.push(dKey);
        mDeck.push(d.search(dKey + 1100));
      }
      return [uDeck, mDeck];
    },
    setImgs: function(d) {
      let imgs = Crafty("Imgs").get(0).imgs;
      for (let j = 0; j < 7; j++) {
        let u = d[j][0];
        let m = d[j][1];
        let um = "u" + u + "m" + m;
        imgs.sprites[um + ".png"] = {
          tile: 252,
          tileh: 480,
          map: {
            ["IDLE_" + um]: [0, 0],
            ["WALK_" + um]: [0, 1],
            ["ATKS_" + um]: [0, 2],
            ["STUN_" + um]: [0, 3]
          }
        };
      }
      return this;
    },
    onLoad: function() {
      let imgs = Crafty("Imgs").get(0).imgs;
      console.log(imgs);
      Crafty.paths({
        images: "/wp-content/themes/blankslate-child/js/assets/"
      });
      Crafty.load(imgs, this.onComplete, this.onProgress, function(e) {
        console.log("error@loading", e);
      });
      return this;
    },
    onComplete: function() {
      Crafty.e("Touches").
      setR(() => Crafty.scene('PlayTest'));
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
