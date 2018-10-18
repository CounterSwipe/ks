define(function() {
  /*global Crafty*/
  Crafty.c("HP", {
    required: "NuVue, WebGL, Color",
    init: function() {
      this.res = {};
    }
  });
  Crafty.s("Resolve", {
    setHP: function(u) {
      let hp = Crafty.e("HP, UID" + u[0]);
      hp.res = { hp: u.d.h, cID: u.d.uID, uID: u[0] };
      let c = Crafty(hp.res.cID).get(0);
      hp.attr({
        x: c.x + hp.vuW(this.getX(1)),
        y: c.y + hp.vuH(26),
        w: hp.vuW(this.getX(2)),
        h: hp.vuH(4),
        z: c.z - 1
      }).color(0, 255, 0, 1);
      //return this;
    },
    getX: function(x) {
      //let x = v.vuW(100 * 1 / 15 * x);
      let nuX = 1 / .15 * x;
      return nuX;
    },
    onFrame: function() {
      let i, hp, hQ = Crafty("HP").get().length;
      for (i = 0; i < hQ; i++) {
        hp = Crafty("HP").get(i);
        this.moveHP(hp);
        if (hp.__c["DMGD"]) { this.handleDmg(hp); }
      }
    },
    handleDmg: function(hp) {
      console.log(hp.res, Crafty.frame());
      hp.removeComponent("DMGD");
      if (hp.res.hp <= 0) {
        let u = Crafty(hp.res.uID);
        console.log(u);
        let c = Crafty(hp.res.cID);
        console.log("unit exhausted", hp, u, c);
        c.destroy();
        u.destroy();
        hp.destroy();
      }
    },
    moveHP: function(hp) {
      let c = Crafty(hp.res.uID);
      //alpha 100%-20%, red@20% alpha:.5 red@10% alpha:1
      let x = hp.__c["FLIPPED"] ? c.x + hp.vuW(this.getX(1.2)) : c.x + hp.vuW(this.getX(1));
      hp.attr({
        x: x,
        y: c.y + hp.vuH(26),
        w: hp.vuW(this.getX(2)),
        h: hp.vuH(4),
        z: c.z - 1
      });
      this.flipCheck(c._flipX, hp);
    },
    flipCheck: function(flipped, hp) {
      if (flipped) {
        if (hp.__c["FLIPPED"]) { return; }
        else { hp.addComponent("FLIPPED"); }
      }
      else {
        if (hp.__c["FLIPPED"]) {
          hp.removeComponent("FLIPPED");
        }
        else { return; }
      }
    },
  }, true);
});
