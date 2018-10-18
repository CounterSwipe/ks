define(function (require) {
  let Crafty = require("crafty");
  /*global TweenMax*/
  Crafty.c("_Visible", {
    init: function () {
      this.attr({
        alpha: 1
      });
    },
    remove: function () {
      this.attr({
        alpha: 0
      });
    }
  });
  Crafty.c("GrowIn", {
    gI: function (s) {
      let dur = s.dur / 50; //u.spd/50f/s = deploy duration in seconds
      //let ease = [Bounce.easeOut, Circ.easeInOut, Elastic.easeOut, Linear.easeNone];
      let self = this;
      TweenMax.to(s.target, dur, {
        x: "-=" + self.vuW(s.aX),
        y: "-=" + self.vuH(26),
        w: self.vuW(28),
        h: self.vuH(30), //ease: ease[e],
        ease: Elastic.easeOut,
        onComplete: gIcb
      });
      //TODO: modifiers x y w h 
      function gIcb() {}
      return this;
    },
    remove: function () {
      //console.log('GrowIn removed!');
      TweenMax.killTweensOf(this);
    }
  });
  Crafty.c("SlideRight", {
    sR: function (s) {
      let self = this;
      let tm = TweenMax.to(s.target, s.dur, {
        x: s.x,
        ease: Circ.easeInOut,
        modifiers: {
          x: function (x) {
            let nX = self.vue.w * (x / 100);
            let nvX = (nX * tm.progress());
            return nvX >> 0;
          }
        },
        onComplete: sRcb
      });

      function sRcb() {}
      return this;
    },
    remove: function () {
      //TweenMax.killTweensOf(this);
      //Crafty.log('SlideRight removed!');
    }
  });
  Crafty.c("SlideUp", {
    sU: function (s) {
      let self = this;
      let tm = TweenMax.to(s.target, s.dur, {
        y: self.vuH(81),
        ease: Circ.easeOut,
        modifiers: {
          y: function () {
            let nvY = self.vuH(83) - (self.vuH(2) * tm.progress());
            return nvY >> 0;
          }
        },
        onComplete: sUcb
      });

      function sUcb() {}
      return this;
    },
    remove: function () {
      TweenMax.killTweensOf(this);
      this.attr({
        y: this.vuH(83)
      });
      //Crafty.log('SlideUp removed!');
    }
  });
});