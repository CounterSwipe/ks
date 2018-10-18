define(function() {
  /*global Crafty*/
  Crafty.c("_MICE", {
    mice: { max: 24, now: [], size: 0, eid: 0 }
  });
  /*TODO: functions like deployable that check if 
  //cell tile 2+ away = vacant when moving -> valid move
  //else collision check etc ex: _MOVABLE this.movable()
  //iow if moving "e", cell+2:dest, if (cell+3!v) collisionCheck*/
  Crafty.c("_DEPLOYABLE", {
    required: "GetMice",
    deployable: function() {
      let c = Crafty("_CELLS").get(0);
      let cKey = this.cKey;
      if (c.search(cKey + 3000) && c.search(cKey + 3001)) {
        if (c.search(cKey + 2999) || (cKey > 700 && c.search(cKey + 3999) === 2) || (cKey < 700 && c.search(cKey + 3999) === 1)) {
          if (c.search(cKey + 3002) || (cKey > 700 && c.search(cKey + 4002) === 1) || (cKey < 700 && c.search(cKey + 4002) === 2)) {
            return true;
          }
          else { return false; }
        }
        else { return false; }
      }
      else { return false; }
    }
  });
  Crafty.c("GetMice", {
    required: "Mouse",
    events: {
      "MouseDown": "mPress",
      "MouseOver": "mDrag",
      "MouseOut": "mExit",
      "MouseUp": "mTap"
    },
    getMice: function() {
      return Crafty("_MICE").get(0);
    },
    getEid: function() {
      let m = this.getMice();
      if (m.mice.size === m.mice.max) { return false; }
      else {
        m.mice.eid++;
        return m.mice.eid;
      }
    },
    mPress: function() {
      let e = this.getEid();
      if (e) { this.mPush({ e: e, m: "press", d: this[0] }); }
    },
    mDrag: function() {
      let e = this.getEid();
      if (e) { this.mPush({ e: e, m: "drag", d: this[0] }); }
    },
    mExit: function() {
      let e = this.getEid();
      if (e) { this.mPush({ e: e, m: "exit", d: this[0] }); }
    },
    mTap: function() {
      let e = this.getEid();
      if (e) { this.mPush({ e: e, m: "tap", d: this[0] }); }
    },
    mPush: function(e) {
      this.getMice().mice.now.push(e);
      this.getMice().mice.size++;
      return true;
    }
  });
});
