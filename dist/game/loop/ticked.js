/*global Crafty*/
let C = Crafty;
C.s("Ticked", {
  init: function () {
    let t = {
      ticker: 0,
      step: 0,
      sec: 0,
      ss: 0,
      ready: false
    };
    this.t = t;
    C.log("@ticked init");
    this.bind("EnterFrame", this.ticked);
  },
  end: function () {
    C.log("GameOver");
    this.t.ready = false;
  },
  start: function () {
    this.t.ready = true;
  },
  ticked: function (eventData) {
    this.t.ticker++;
    if (this.t.ticker > 5) {
      this.t.ticker = 1;
      this.t.step++; //_step.update()
      if (this.t.step === 10) {
        this.t.step = 0;
        this.t.sec++;
        if (this.t.ready) {
          this.t.ss++;
          //C.log("1sec")//1sec.update()
          C.s("_POTENTIAL").update();
          //C.s("_SCORE").update();
          if (this.t.ss === 2) {
            this.t.ss = 0;
            //C.log("@2sec"); //2sec.update()
            C.s("_EGEN").update();
          }
        }
      }
    }
    this.update(eventData);
  },
  update: function () {
    if (this.t.ready) {
      //var start = window.performance.now();
      C.s("_INPUTS").update();
      C.s("_MSGS").update();
      C.s("_UREADY").update();
      C.s("_UMOVE").update();
      C.s("_UEDGE").update();
      //C.s("_HPDMG").update();
      C.s("_SCORE").update();
    }
    C.s("_SDRAW").update();
    C.s("_EDRAW").update();
    C.s("_PDRAW").update();
    C.s("_GFX").update();
    C.s("_VFX").update();
    /*var end = window.performance.now();
    var time = end - start;
    if (time > 1) {
      C.log(time);
    }*/
  },
  remove: function () {
    C.log("Exit");
    this.unbind("EnterFrame", this.ticked);
  }
}, true);