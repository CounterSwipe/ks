define(function (require) {
  let Crafty = require("crafty");
  Crafty.c("_IMGS", {
    imgs: {
      sprites: {}
    }
  });
  let Console = console;
  let logit = Console.log;
  Crafty.s("SET_IMGS", {
    init: function () {
      Crafty.e("_IMGS");
      this.getLB();
      /*
      this.getBG();
      this.getPin();
      this.getMugs();
      this.getImgs();
      */
      this.onLoad();
    },
    getLBx: function () {
      let imgs = Crafty("_IMGS").get(0).imgs;
      let z = 10;
      for (let i = 0; i < 6; i++) {
        imgs.sprites["z" + z + "" + i + ".png"] = {
          tile: 600, //500//450,
          tileh: 375, //221//856, //770,
          map: {
            ["BG_" + z + "" + i]: [0, 0]
          }
        };
      }
      imgs.sprites["zt" + 0 + ".png"] = {
        tile: 450, //450,
        tileh: 288, //856, //770,
        map: {
          ["BGt_" + 0]: [0, 0]
        }
      };
      imgs.sprites["bgBlu.png"] = {
        tile: 450,
        tileh: 770,
        map: {
          topL: [0, 0],
          btmR: [1, 0]
        }
      };
    },
    getLB: function () {
      let imgs = Crafty("_IMGS").get(0).imgs;
      let z = 100;
      imgs.sprites["z" + z + ".png"] = {
        tile: 510, //500//450,
        tileh: 288, //221//856, //770,
        map: {
          ["_BG" + z]: [0, 0],
          ["_BG" + (z + 1)]: [0, 1]
        }
      };
      imgs.sprites["bgBlu.png"] = {
        tile: 450,
        tileh: 770,
        map: {
          topL: [0, 0],
          btmR: [1, 0]
        }
      };
    },
    getBG: function () {
      let imgs = Crafty("_IMGS").get(0).imgs;
      let z = Crafty("_PLAYER").get(0).p[1].zone;
      imgs.sprites["z" + z + ".png"] = {
        tile: 450,
        tileh: 800,
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
    },
    getPin: function () {
      //TODO only load per uNum|model level etc
      let imgs = Crafty("_IMGS").get(0).imgs;
      imgs.sprites["pins.png"] = {
        tile: 90,
        tileh: 120,
        map: {
          ["PIN_u" + 11 + "m" + 1]: [0, 0],
          ["PIN_u" + 12 + "m" + 1]: [1, 0],
          ["PIN_u" + 13 + "m" + 1]: [2, 0],
          ["PIN_u" + 14 + "m" + 1]: [3, 0],
          ["PIN_u" + 15 + "m" + 1]: [4, 0],
          ["PIN_u" + 16 + "m" + 1]: [5, 0],
          ["PIN_u" + 17 + "m" + 1]: [6, 0],
          ["PIN_u" + 18 + "m" + 1]: [7, 0],
          ["PIN_wht"]: [8, 0],
          ["PIN_x"]: [9, 0],
          ["PIN_0"]: [10, 0]
        }
      };
    },
    getMugs: function () {
      //TODO only load per uNum|model level etc
      let imgs = Crafty("_IMGS").get(0).imgs;
      imgs.sprites["mugs.png"] = {
        tile: 90,
        tileh: 120,
        map: {
          ["MUG_u" + 11 + "m" + 1]: [0, 0],
          ["MUG_u" + 12 + "m" + 1]: [1, 0],
          ["MUG_u" + 13 + "m" + 1]: [2, 0],
          ["MUG_u" + 14 + "m" + 1]: [3, 0],
          ["MUG_u" + 15 + "m" + 1]: [4, 0],
          ["MUG_u" + 16 + "m" + 1]: [5, 0],
          ["MUG_u" + 17 + "m" + 1]: [6, 0],
          ["MUG_u" + 18 + "m" + 1]: [7, 0]
        }
      };
      return this;
    },
    getImgs: function () {
      this.setImgs(this.getDeck(1));
      this.setImgs(this.getDeck(2));
    },
    getDeck: function (p) {
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
    setImgs: function (d) {
      let imgs = Crafty("_IMGS").get(0).imgs;
      for (let j = 0; j < 7; j++) {
        let u = d[0][j];
        let m = d[1][j];
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
    onLoad: function () {
      let imgs = Crafty("_IMGS").get(0).imgs;
      logit(imgs);
      Crafty.paths({
        images: "..\\assets\\"
      });
      Crafty.load(imgs, this.onComplete, this.onProgress, function (e) {
        logit("error@loading", e);
      });
      return this;
    },
    onComplete: function () {
      //Crafty.e("Touches").
      //setR(() => Crafty.scene('PlayTest'));
      Crafty.scene("PlayTest");
      logit("complete!");
    },
    onProgress: function (e) {
      logit(e.percent);
      //Crafty("ProBar").trigger("Progress", e.percent);
    },
    remove: function () {
      //Crafty.log('SET_IMGS removed!');
    }
  }, true);
});