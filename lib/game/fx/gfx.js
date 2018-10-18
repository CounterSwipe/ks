/*global Crafty*/
let C = Crafty;
C.c("FX", {
  init: function () {
    this.gfx = [];
    this.fx = {};
    return this;
  },
  addFX: function (f) {
    let gfx = {
      e: f.e,
      fx: f.fx,
      now: f.now || 0,
      dur: f.dur,
      v: f.v || 0,
      amt: f.amt || 0,
      start: f.start || 0,
      ease: f.ease || 0,
      prop: f.prop || 0,
      cFun: [f.cFun] || [{}],
      cArg: [f.cArg] || 0
    };
    this.gfx.push(gfx);
    this.addComponent("GFX");
    //console.log(this.gfx, this);
    return this;
  },
});
C.s("_GFX", {
  init: function () {
    let ease = ["easeNone", "easeIn", "easeOut"];
    this.ease = ease;
  },
  update: function () {
    let c = "GFX";
    let gQ = C(c).get();
    if (gQ.length) {
      for (let i = gQ.length - 1; i >= 0; i--) {
        let e = gQ[i];
        //C.log(e);
        e.removeComponent(c);//TODO: add timer? etc Gfx to auto add now:0 fx etc
        this.getFX(e);
      }
    } else {
      return;
    }
  },
  getFX: function (e) {
    let gLen = e.gfx.length;
    for (let i = gLen - 1; i >= 0; i--) {
      let f = e.gfx[i];
      this.addFX(f);
    }
    e.gfx = [];
  },
  addFXd: function (f) {
    if (f.now) {
      f.e.addComponent(f.fx + "fx");
    }
    f.e.fx[f.fx] = {
      duration: f.dur,
      count: f.dur,
      valence: f.v || 0,
      amount: f.amt || 0,
      start: f.start || 0,
      ease: this.ease[f.ease] || this.ease[0],
      prop: f.prop || 0,
      _cb: f.cFun || [{}],
      _cba: f.cArg || 0
    };
  },
  addFX: function (f) {
    if (f.now) {
      f.e.addComponent(f.fx + "fx");
    }
    f.e.fx[f.fx] = {
      duration: f.dur,
      count: f.dur,
      valence: f.v, // || 0,
      amount: f.amt, // || 0,
      start: f.start, // || 0,
      ease: this.ease[f.ease], // || this.ease[0],
      prop: f.prop, // || 0,
      _cb: f.cFun, //[f.cFun], // || [{}],
      _cba: f.cArg //[f.cArg], // || 0
    };
  },
}, false);