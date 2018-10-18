define(function() {
  /*global Crafty*/
  let dbm = {
    1: [715, 815, 915, 716, 816, 916],
    2: [124, 224, 324, 125, 225, 325]
  };
  Crafty.s("SET_MOMENTS", {
    init: function() {
      Crafty.e("Hash, _MOMENTS, _P1");
      Crafty.e("Hash, _MOMENTS, _P2");
      Crafty.e("NuVue, WebGL, Color, vMoments, _P1");
      Crafty.e("NuVue, WebGL, Color, vMoments, _P2");
      this.setMoments(1); //10*p + 1^6 = mKey
      this.setMoments(2); //1|2 + 1^6
      //console.log(JSON.stringify(m.reveal()), JSON.stringify(m.unveil()));
    },
    setMoments: function(p) {
      let m = Crafty("_MOMENTS _P" + p).get(0);
      let iLen = dbm[p].length;
      for (let i = 0; i < iLen; i++) {
        let mKey = (10 * p) + (i + 1);
        m.add(mKey, dbm[p][i]);
      }
      this.render(p);
    },
    render: function(p) {
      let vm = Crafty("vMoments _P" + p).get(0);
      let m = Crafty("_MOMENTS _P" + p).get(0);
      let c = Crafty("_CELLS").get(0);
      let cKey = m.search((p * 10) + 1);
      let x = c.search(cKey + 1000);
      let y = c.search(cKey + 2000);
      let color = p === 1 ? "rgba(0,255,255,.5)" : "rgba(255,0,0,.5)";
      vm.attr({
        x: vm.vuW(this.getX(x)),
        y: vm.vuH(y),
        w: vm.vuW(this.getX(2)),
        h: vm.vuH(12),
        z: cKey
      }).color(color).
      addComponent("DIMMER");
    },
    getX: function(x) {
      //let x = v.vuW(100 * 1 / 15 * x);
      let nuX = 1 / .15 * x;
      return nuX;
    }
  }, true);
});
