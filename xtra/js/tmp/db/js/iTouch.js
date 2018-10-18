/* jshint esversion: 6, -W030 */
define(function () {
  let Console = console;
  let logit = Console.log;
  class Touches {
    constructor() {
      this.name = "Touches";
    }
    init() {
      /*document.addEventListener("touchmove", function (e) {
          e.preventDefault(); 
        });*/
      let self = this;
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
    }
    tStart(e) {
      //console.log("@tS", e, window.t);
      let t = window.t;
      t.aX = e.touches[0].screenX;
      t.aY = e.touches[0].screenY;
    }
    tEnd(e) {
      //console.log("@tE", e);
      let t = window.t;
      t.zX = event.changedTouches[0].screenX;
      t.zY = event.changedTouches[0].screenY;
      Math.round((t.zX - t.aX), 3) === Math.round((t.zY - t.aY), 3) || (t.uW > Math.abs(Math.round((t.zX - t.aX), 3)) && t.uH > Math.abs(Math.round((t.zY - t.aY), 3))) ? t.touche.sT(e) : t.touche.sDir(t);
    }
    setD(fun) {
      this.sD = fun || (() => {
        logit("!sD");
      });
      return this;
    }
    setL(fun) {
      this.sL = fun || (() => {
        logit("!sL");
      });
      return this;
    }
    setR(fun) {
      this.sR = fun || (() => {
        logit("!sR");
      });
      return this;
    }
    setU(fun) {
      this.sU = fun || (() => {
        logit("!sU");
      });
      return this;
    }
    setT(fun) {
      this.sT = fun || ((e) => {
        logit("!sT", e, event.target.id);
      });
      return this;
    }
    sDir(t) {
      let x = Math.round((t.zX - t.aX), 3),
        y = Math.round((t.zY - t.aY), 3),
        tick = "tick#"; //this.modules[this.mTicker].search(0);
      if (Math.abs(x) >= Math.abs(y)) {
        return x < 0 ? this.sL(tick, 1) : this.sR(tick, 3);
      }
      return y < 0 ? this.sU(tick, 2) : this.sD(tick, 4);
    }
    remove() {
      document.removeEventListener("touchstart", this.tStart, false);
      document.removeEventListener("touchend", this.tEnd, false);
      delete window.t; //only 1 touch obj = ok to delete
      //Crafty.log('Touches removed!');
    }
  }
  return Touches;
});