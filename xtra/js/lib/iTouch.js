define(function(require) {
  /*global Crafty*/
  Crafty.c("Touches", {
    required: "2D",
    init: function() {
      //document.addEventListener("touchmove", function(e) {
      //e.preventDefault();
      //});
      var self = this;
      this.setD().setL().setR().setU().setT();
      window.t = {
        aX: 0,
        aY: 0,
        zX: 0,
        zY: 0,
        uW: Math.round(((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) / 100), 3),
        uH: Math.round(((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) / 100), 3),
        touche: self
      };
      document.addEventListener("touchstart", this.tStart, false);
      document.addEventListener("touchend", this.tEnd, false);
    },
    tStart: function(e) {
      //console.log("@tS", e, window.t);
      let t = window.t;
      t.aX = e.touches[0].screenX;
      t.aY = e.touches[0].screenY;
    },
    tEnd: function(e) {
      //console.log("@tE", e);
      let t = window.t;
      t.zX = event.changedTouches[0].screenX;
      t.zY = event.changedTouches[0].screenY;
      Math.round((t.zX - t.aX), 3) === Math.round((t.zY - t.aY), 3) || (t.uW > Math.abs(Math.round((t.zX - t.aX), 3)) && t.uH > Math.abs(Math.round((t.zY - t.aY), 3))) ? t.touche.sT(e) : t.touche.sDir(t);
    },
    setD: function(fun) {
      this.sD = fun || function() { console.log("!sD"); };
      return this;
    },
    setL: function(fun) {
      this.sL = fun || function() { console.log("!sL"); };
      return this;
    },
    setR: function(fun) {
      this.sR = fun || function() { console.log("!sR"); };
      return this;
    },
    setU: function(fun) {
      this.sU = fun || function() { console.log("!sU"); };
      return this;
    },
    setT: function(fun) {
      this.sT = fun || function(e) { console.log("!sT", e, event.target.id); };
      return this;
    },
    sDir: function(t) {
      let x = Math.round((t.zX - t.aX), 3),
        y = Math.round((t.zY - t.aY), 3),
        tick = "tick#"; //this.modules[this.mTicker].search(0);
      if (Math.abs(x) >= Math.abs(y)) {
        return x < 0 ? this.sL(tick, 1) : this.sR(tick, 3);
      }
      return y < 0 ? this.sU(tick, 2) : this.sD(tick, 4);
    },
    remove: function() {
      document.removeEventListener("touchstart", this.tStart, false);
      document.removeEventListener("touchend", this.tEnd, false);
      delete window.t; //only 1 touch obj = ok to delete
      //Crafty.log('Touches removed!');
    }
  });
});
