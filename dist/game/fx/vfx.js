/*global Crafty*/
import bezier from "/dist/game/fx/bezier.js";
import round from "/dist/game/util/round.js";
let C = Crafty;
C.s("_VFX", {
  update: function () {
    for (let fx = 1; fx < 10; fx++) {
      //C.log(fx);
      this.setFX(fx);
    }
  },
  //var easing = bezier(0, 0, 1, 0.5);
  //var easing = bezier(0.75, -0.5, 0, 1.75);
  //var easing = bezier(0.87,-0.41,0.19,1.44)
  //var easing = bezier(0.90, -0.5, 0.5, 0.9);
  //var easing = bezier(0.37,-0.73,0,1.45);
  easeNone: function (t) {
    return t;
  },
  easeIn: function (t) {
    var easing = bezier(0.55, 0.085, 0.68, 0.53);
    return easing(t);
  },
  easeOut: function (t) {
    var easing = bezier(0.25, 0.46, 0.45, 0.94);
    return easing(t);
  },
  setFX: function (fx) {
    //let progress = (tickDuration - ticksRemaining) / tickDuration
    //let value = valence * amount * progress
    //let prop = prop + value
    let fQ = C(fx + "fx").get(); //"_fx" + fx
    if (fQ.length) {
      for (let i = fQ.length - 1; i >= 0; i--) {
        let e = fQ[i];

        e.fx[fx].count--;
        let efx = e.fx[fx];
        if (efx.prop) {
          //let progress = (efx.duration - efx.count) / efx.duration;
          let t = (efx.duration - efx.count) / efx.duration;
          let progress = this[efx.ease](t);
          let value = efx.start + (efx.valence * (efx.amount * progress));
          let prop = efx.prop;
          //console.log(progress, value);
          //e[prop] = value;
          if (prop === "x" || prop === "y" || prop === "w" || prop === "h") {
            e[prop] = value >> 0;
            //C.log(value >> 0);
          } else {
            //e[prop] = value;
            e[prop] = round(value, 3);
          }
        }
        if (efx.count < 1 && efx._cb) {
          for (let i = 0, iLen = efx._cb.length; i < iLen; i++) {
            efx._cb[i](efx._cba[i]);
          }
        }
      }
    } else {
      return;
    }
  },
}, true);