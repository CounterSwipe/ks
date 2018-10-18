/*global Crafty*/
let C = Crafty;
C.c("MICE", {
  mice: {
    max: 24,
    now: [],
    size: 0,
    eid: 0,
  },
  empty: function () {
    while (this.mice.size !== 0) {
      let i = this.mice.now.shift();
      this.mice.size--;
      C.log("mEmpty", i);
    }
  },
});
C.c("GetMice", {
  required: "Mouse",
  init: function () {},
  getMice: function () {
    return C("MICE").get(0);
  },
  getEid: function () {
    let m = this.getMice();
    if (m.mice.size === m.mice.max) {
      return false;
    } else {
      m.mice.eid++;
      return m.mice.eid;
    }
  },
  mAction: function (m, mType) {
    let n = this.getEid();
    let c = this.__c;
    if (n) {
      this.mPush({
        e: this[0],
        m: mType,
        n: n,
        t: c["1BTN"] ? 1 : c["2BTN"] ? 2 : c["3BTN"] ? 3 : c["4BTN"] ? 4 : c["5BTN"] ? 5 : c["6BTN"] ? 6 : c["7BTN"] ? 7 : c["8BTN"] ? 8 : c["9BTN"] ? 9 : c["10BTN"] ? 10 : 0,
        x: m.clientX,
        y: m.clientY
      });
    }
  },
  mPush: function (e) {
    this.getMice().mice.now.push(e);
    this.getMice().mice.size++;
    return true;
  },
});
C.c("Mdrag", {
  required: "GetMice, Mdown, Mover, Mout, Mup"
});
C.c("Mtap", {
  required: "GetMice, Mdown, Mup"
});
C.c("Mswipe", {
  required: "GetMice, Mdown, Mout, Mup"
});
C.c("Mdown", {
  events: {
    "MouseDown": "mDown", //"mPress",
  },
  mDown: function (m) {
    this.mAction(m, "mDown");
  },
});
C.c("Mover", {
  events: {
    "MouseOver": "mOver", //"mDrag",
  },
  mOver: function (m) {
    this.mAction(m, "mOver");
  },
});
C.c("Mmove", {
  events: {
    "MouseMove": "mMove", //"mDrag",
  },
  mMove: function (m) {
    this.mAction(m, "mMove");
  },
});
C.c("Mout", {
  events: {
    "MouseOut": "mOut", //"mExit",
  },
  mOut: function (m) {
    this.mAction(m, "mOut");
  },
});
C.c("Mup", {
  events: {
    "MouseUp": "mUp", //"mTap",
  },
  mUp: function (m) {
    this.mAction(m, "mUp");
  },
});