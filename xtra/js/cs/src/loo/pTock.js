define(function() {
  /*global Crafty TweenMax*/
  Crafty.c("_TOCK", {
    init: function() {
      this.reTock();
    },
    reTock: function() {
      this.t = { dur: null, cb: null, args: null, running: false };
      return this;
    },
    tock: function(t) {
      this.t.dur = t.dur;
      this.t.cb = t.cb;
      this.t.args = t.args;
      this.t.running = true;
      return this;
    },
    remove: function() {
      //console.log(this[0], this.t.args);
      if (this.t.cb) {
        for (let i = 0, iLen = this.t.cb.length; i < iLen; i++) {
          this[this.t.cb[i]](this.t.args[i]);
        }
      }
      this.reTock();
      //console.log("Ticker removed");
    }
  });
  Crafty.s("SET_TOCK", {
    update: function() {
      let tQ = Crafty("_TOCK").get();
      if (tQ.length) {
        for (let i = tQ.length - 1; i >= 0; i--) {
          let t = tQ[i]; //Crafty("_TOCK").get(i);
          this.setTock(t);
        }
      }
      else { return; }
    },
    setTock: function(t) {
      //console.log(t[0], t.t);
      t.t.dur--;
      if (t.t.dur < 1) { t.t.running = false; }
      if (t.t.running) { return t; }
      else {
        t.removeComponent("_TOCK", false);
      }
    }
  }, true);
});
