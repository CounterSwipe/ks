define(function (require) {
  let Crafty = require("crafty");
  Crafty.s("SET_CAPTURE", {
    update: function () {
      this.handle(1);
      this.handle(2);
    },
    handle: function (p) {
      let m = Crafty("_MOMENTS _P" + p).get(0);
      if (m.__c["CAPTURED"]) {
        this.render(m.search(p), p);
      } else {
        this.getCapture(p);
      }
    },
    getCapture: function (p) {
      let c = Crafty("_CELLS").get(0);
      let m = Crafty("_MOMENTS _P" + p).get(0);
      let mKey = (p * 10) + 1;
      let cu = [];
      for (let i = 0; i < 6; i++) {
        let cKey = m.search(mKey + i);
        let cp = c.search(cKey + 4000);
        if (cp) {
          if (cp === p) {
            cu.push(c.search(cKey + 5000));
          }
        }
      }
      if (cu.length) {
        this.setCapture(cu, p);
      } else {
        return;
      }
    },
    setCapture: function (cu, p) {
      //console.log(cu.length);
      let up, a, b, ab, c;
      switch (true) {
      case cu.length === 1:
        up = cu[0];
        break;
      case cu.length === 2:
        up = this.getCarry(cu[0], cu[1]);
        break;
      case cu.length === 3:
        a = this.getCarry(cu[0], cu[1]);
        up = this.getCarry(a, cu[2]);
        break;
      case cu.length === 4:
        a = this.getCarry(cu[0], cu[1]);
        b = this.getCarry(cu[2], cu[3]);
        up = this.getCarry(a, b);
        break;
      case cu.length === 5:
        a = this.getCarry(cu[0], cu[1]);
        b = this.getCarry(cu[2], cu[3]);
        ab = this.getCarry(a, b);
        up = this.getCarry(ab, cu[4]);
        break;
      default:
        a = this.getCarry(cu[0], cu[1]);
        b = this.getCarry(cu[2], cu[3]);
        c = this.getCarry(cu[4], cu[5]);
        ab = this.getCarry(a, b);
        up = this.getCarry(ab, c);
        break;
          // code
      }
      this.setCarry(up, p);
    },
    getCarry: function (a, b) {
      //console.log(a, b);
      if (a === b || Crafty(a).keyz.f > Crafty(b).keyz.f) {
        return a;
      } else {
        return b;
      }
    },
    setCarry: function (u, p) {
      let m = Crafty("_MOMENTS _P" + p).get(0);
      m.addComponent("CAPTURED");
      m.add(p, u);
      Crafty(u).addComponent("CARRY");
      //TODO: Destination glow dimmer etc
      this.render(u, p);
    },
    render: function (cu, p) {
      let uImg = Crafty(Crafty(cu).keyz.iKey);
      let vm = Crafty("vMoments _P" + p).get(0);
      let x = uImg.__c["FLIPPED"] ? uImg.x + uImg.vuW(this.getX(1)) : uImg.x;
      vm.attr({
        x: x,
        y: uImg.y,
        w: uImg.w - uImg.vuW(this.getX(1)),
        h: uImg.h,
        z: uImg.z - 1
      });
    },
    getX: function (x) {
      //let x = v.vuW(100 * 1 / 15 * x);
      let nuX = 1 / 0.15 * x;
      return nuX;
    }
  }, true);
});