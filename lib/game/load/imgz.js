/*global Crafty*/
let C = Crafty;
C.c("IMGZ", {
  imgs: {
    sprites: {}
  }
});
C.s("_IMGZ", {
  init: function () {
    C.e("IMGZ");
    this.getTraits();
    this.getOrbs();
    this.getVias();
    this.getTiles();
    this.atLoad();
  },
  getTraits: function () {
    let p1 = C("1P Player").get(0);
    let p2 = C("2P Player").get(0);
    let p1p = p1.db.pngs;
    let p1m = p1.db.maps;
    let p2p = p2.db.pngs;
    let p2m = p2.db.maps;
    for (let i = 0, iLen = p1p.length; i < iLen; i++) {
      let ss = p1p[i];
      let unMatched = this.unMatched(ss, p2p);
      if (unMatched) {
        p2p.push(ss);
        p2m.push(p1m[i]);
      }
    }
    this.setImgs(p2p, p2m);
  },
  unMatched: function (ss, p2p) {
    for (let i = 0, iLen = p2p.length; i < iLen; i++) {
      if (ss === p2p[i]) {
        return false;
      }
    }
    return true;
  },
  setImgs: function (pngs, maps) {
    let imgs = C("IMGZ").get(0).imgs;
    for (let i = 0, iLen = pngs.length; i < iLen; i++) {
      let png = pngs[i];
      let map = maps[i];
      imgs.sprites[png] = {
        tile: 128,
        tileh: png.length < 10 ? 128 : 256,
        map: map
      };
    }
  },
  getOrbs: function () {
    let imgs = C("IMGZ").get(0).imgs;
    let map = {};
    let n = 0;
    let png = "porbs.png";
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        let p = y < 2 ? 1 : 2;
        map["p" + p + "Orb" + (n + 1)] = [x, y];
        n++;
        if (n === 8) {
          n = 0;
        }
      }
    }
    imgs.sprites[png] = {
      tile: 64,
      tileh: 64,
      map: map
    };
    imgs.sprites["orb.png"] = {
      tile: 64,
      tileh: 64,
      map: {
        ["Bullet"]: [0, 0]
      }
    };
  },
  getVias: function () {
    let imgs = C("IMGZ").get(0).imgs;
    imgs.sprites["viam1.png"] = {
      tile: 128,
      tileh: 128,
      map: {
        ["VIA_m1t" + 0]: [0, 0],
        ["VIA_m1t" + 1]: [1, 0],
        ["VIA_m1t" + 2]: [2, 0],
        ["VIA_m1t" + 3]: [3, 0],
        ["VIA_m1t" + 4]: [4, 0],
        ["VIA_m1t" + 5]: [5, 0]
      }
    };
  },
  getTiles: function () {
    let imgs = C("IMGZ").get(0).imgs;
    imgs.sprites["q128x40.png"] = {
      tile: 128,
      tileh: 128,
      map: {
        ["TILE" + 1]: [0, 0]
      }
    };
    /*
      imgs.sprites["test.png"] = {
      tile: 600,
      tileh: 300,
      map: {
        ["TEST" + 1]: [0, 0]
      }
      };
    */
  },
  atLoad: function () {
    let imgs = C("IMGZ").get(0).imgs;
    C.log(imgs);
    C.paths({
      //images: "..\\assets\\"
      images: "../assets/"
    });
    C.load(imgs, this.onComplete, this.onProgress, function (e) {
      C.log("error@loading", e);
    });
    return this;
  },
  onComplete: function () {
    //C.log("complete!");
    //C.s("SET_HUB").sendMsg({
    //side: 1
    //}); 
    for (let i = 1; i < 3; i++) {
      let p = C(i + "P Player").get(0);
      p.db.maps = 0;
      p.db.pngs = 0;
    }
    C.scene("Game");
  },
  onProgress: function (e) {
    //C.log(e.percent);
    //let p = C("_PERC").get(0);
    //p.text((e.percent >> 0) + "%");
  },
  remove: function () {
    //C.log('_IMGZ removed!');
  }
}, true);