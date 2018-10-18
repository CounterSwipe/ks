define(function() {
  /*global Crafty TweenMax*/
  const nvW = (coef) => window.Axy.w * (coef / 100);
  const nvH = (coef) => window.Axy.h * (coef / 100);
  Crafty.c("sArrow", {
    required: "2D, DOM, Text",
    events: {
      "ReTxt": "nuText"
    },
    init: function() {},
    nuText: function() {
      let fS = this.fSize * (window.Axy.h / 100);
      this.textFont({
        size: fS + "px",
        lineHeight: fS + "px",
      });
      return this;
    },
    txt: function(a, xW, xH, y, w, h, fS, fC) {
      this.attr({
        alpha: a,
        x: (nvW(xW) - nvH(xH)) >> 0,
        y: nvH(y) >> 0,
        w: nvH(w) >> 0,
        h: nvH(h) >> 0
      });
      this.textFont({ family: 'Michroma' });
      this.textAlign('center');
      this.color(fC);
      this.fSize = fS;
      this.unselectable();
      this.nuText();
      return this;
    },
    color: function(fC) {
      let fc = ["rgba(0,0,0,1)", "rgba(255,255,255,1)", //0:blk 1:wht
        "rgba(0,0,255,1)", "rgba(0,153,255,1)", //2:blu
        "rgba(0,255,0,1)", "rgba(153,255,0,1)", //4:grn
        "rgba(153,153,153,1)", "rgba(240,240,240,1)", //6:gry
        "rgba(153,0,255,1)", "rgba(255,0,255,1)", //8:prp
        "rgba(153,0,0,1)", "rgba(255,0,0,1)", //10:red
        "rgba(0,153,153,1)", "rgba(0,255,255,1)", //12:trq
        "rgba(255,153,0,1)", "rgba(255,255,0,1)"]; //14:ylo
      this.css({ '-webkit-text-fill-color': fc[fC], 'color': fc[fC] });
      return this;
    },
    remove: function() {
      //Crafty.log('sArrow removed!');
    },
  });
  Crafty.c("sR", {
    init: function() {
      let sR1 = Crafty.e('sArrow, Ratio, sTween').text(">").txt(0, 50, 7.5, 52, 5, 5, 10, 1);
      let sR2 = Crafty.e('sArrow, Ratio, sTween').text(">").txt(.8, 50, 2.5, 52, 5, 5, 10, 1);
      sR1.sRt(.8, 1, 5, 50, 7.5);
      sR2.sRt(0, 1, 5, 50, 2.5);
    },
    remove: function() {
      //Crafty.log('sR removed!');
    }
  });
  Crafty.c("sU", {
    init: function() {
      let sU1 = Crafty.e('sArrow, Ratio, sTween').text("^").txt(.8, 50, 2.5, 2, 5, 5, 4, 1);
      let sU2 = Crafty.e('sArrow, Ratio, sTween').text("^").txt(0, 50, 2.5, 4, 5, 5, 4, 1);
      sU1.sUt(0, 1, 2, 2);
      sU2.sUt(.8, 1, 2, 4);
    },
    remove: function() {
      //Crafty.log('sU removed!');
    }
  });
  Crafty.c("sTween", {
    init: function() {},
    sUt: function(a, dur, dist, yAxis) {
      let self = this;
      let st = TweenMax.to(self, dur, {
        y: "-=" + nvH(dist) + "",
        alpha: a,
        repeat: -1,
        ease: Linear.easeNone,
        modifiers: {
          y: function(y) {
            let nvY = nvH(yAxis) - (nvH(dist) * st.progress());
            return nvY >> 0;
          }
        }
      });
    },
    sRt: function(a, dur, dist, xW, xH) {
      let self = this;
      let st = TweenMax.to(self, dur, {
        x: "-=" + nvH(dist) + "",
        alpha: a,
        repeat: -1,
        ease: Linear.easeNone,
        modifiers: {
          x: function(x) {
            let nvX = (nvW(xW) - nvH(xH)) + (nvH(dist) * st.progress());
            return nvX >> 0;
          }
        }
      });
    },
    remove: function() {
      if (Crafty("sR").get(0)) {
        Crafty("sR").get(0).destroy();
      }
      if (Crafty("sU").get(0)) {
        Crafty("sU").get(0).destroy();
      }
      //Crafty.log('sTween removed!');
    }
  });
});
