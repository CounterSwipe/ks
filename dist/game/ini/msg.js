/*global Crafty*/
let C = Crafty;
C.c("MSGS", {
  msgs: {
    max: 24,
    now: [],
    size: 0,
    eid: 0
  }
});
C.c("GetMsgs", {
  getMsgs: function () {
    return C("MSGS").get(0);
  },
  getEid: function () {
    let m = this.getMsgs();
    if (m.msgs.size === m.msgs.max) {
      return false;
    } else {
      m.msgs.eid++;
      return m.msgs.eid;
    }
  },
  onMsg: function (msg) {
    let n = this.getEid();
    if (n) {
      this.mPush({
        n: n,
        m: "deploy",
        e: msg
      });
    }
  },
  mPush: function (e) {
    this.getMsgs().msgs.now.push(e);
    this.getMsgs().msgs.size++;
    return true;
  }
});