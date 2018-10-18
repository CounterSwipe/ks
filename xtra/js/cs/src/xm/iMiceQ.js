define(function() {
  /*global Crafty*/
  /*Crafty.c("_INPUTS", {
    inputs: { valid: 1, active: 0, a: 0, b: 0, hPos: 0, hID: 0, u: 0, e: 99, p: 1 }
  });
  Crafty.c("GetInputs", {
    getInputs: function() {
      return Crafty("_INPUTS").get(0).inputs;
    }
  });
  Crafty.c("Deployable", {
    required: "GetEnergy, GetInputs, Mice"
  });
  Crafty.c("Mice", {
    required: "Mouse",
    events: {
      "MouseDown": "mPress",
      "MouseOver": "mDrag",
      "MouseOut": "mExit",
      "MouseUp": "mTap"
    },
    q: { capacity: 24, container: [], size: 0, eid: 0 },
    getEid: function() {
      this.q.eid++;
      return this.q.eid;
    },
    mPress: function() {
      let e = this.getEid();
      this.push({ e: e, m: "press", c: this[0] });
    },
    mDrag: function() {
      let e = this.getEid();
      this.push({ e: e, m: "drag", c: this[0] });
    },
    mExit: function() {
      let e = this.getEid();
      this.push({ e: e, m: "exit", c: this[0] });
    },
    mTap: function() {
      let e = this.getEid();
      this.push({ e: e, m: "tap", c: this[0] });
    },
    push: function(e) {
      if (this.isFull()) {
        return false;
      }
      this.q.container.push(e);
      this.q.size++;
      return true;
    },
    pop: function() {
      if (this.isEmpty()) {
        return null;
      }
      let element = this.q.container.shift();
      this.q.size--;
      return element;
    },
    isEmpty: function() {
      return this.q.size === 0;
    },
    isFull: function() {
      return this.q.size === this.q.capacity;
    }
  });*/
  Crafty.s("MiceQ", {
    onFrame: function() {
      let mQ = Crafty("Mice").get(0);
      while (!mQ.isEmpty()) {
        let q = mQ.pop();
        this[q.m](q);
      }
    },
    press: function(q) {
      let a = Crafty(q.c);
      if (a.inputs.valid) {
        if (a.__c["CARD"]) {
          a.inputs.valid--;
          a.inputs.active++;
          a.inputs.a = q.c;
          a.inputs.hPos = a.gui.hPos;
          a.inputs.hID = a.gui.hID;
          a.inputs.u = a.card.u;
          a.inputs.e = a.card.e;
          Crafty(a.gui.hID).addComponent("SELECTED");
        }
        else { return; }
      }
      else { return; }
    },
    cLopen: function(bCell) {
      let cCell = bCell - 1;
      let cL = Crafty("CELL" + cCell).get(0);
      if (cL && cL.__c["VACANT"]) { return true; }
      else if (Crafty("Cells").search(cCell).v) { return true; }
      else if (bCell < 700) {
        if (Crafty("Cells").search(cCell).p === 1) { return true; }
        else { return false; }
      }
      else {
        if (Crafty("Cells").search(cCell).p === 2) { return true; }
        else { return false; }
      }
    },
    cRopen: function(bCell) {
      let cCell = bCell + 2;
      let cR = Crafty("CELL" + cCell).get(0);
      if (cR && cR.__c["VACANT"]) { return true; }
      else if (Crafty("Cells").search(cCell).v) { return true; }
      else if (bCell < 700) {
        if (Crafty("Cells").search(cCell).p === 2) { return true; }
        else { return false; }
      }
      else {
        if (Crafty("Cells").search(cCell).p === 1) { return true; }
        else { return false; }
      }
    },
    vacant: function(b) {
      if (b.__c["VACANT"] && Crafty("CELL" + (b.at.cell + 1)).get(0).__c["VACANT"]) {
        if (this.cLopen(b.at.cell) && this.cRopen(b.at.cell)) { return true; }
        else { return false; }
      }
      else { return false; }
    },
    drag: function(q) {
      let b = Crafty(q.c).get(0);
      if (b.inputs.active) {
        if (b.__c["ACELL"] && Crafty("CELL" + (b.at.cell + 1)).get(0)) {
          b.attr({ alpha: 1 });
          Crafty("CELL" + (b.at.cell + 1)).get(0).attr({ alpha: 1 });
          Crafty("PIN_u" + b.inputs.u + "m1").get(0).
          attr({ alpha: 1, x: b.x + (b.w * .5), y: b.y - (b.vuH(8)) });
          if (this.vacant(b)) { return; }
          else {
            Crafty("PIN_x").get(0).
            attr({ alpha: 1, x: b.x + (b.w * .5), y: b.y - (b.vuH(8)) });
          }
        }
        else { return; }
      }
      else { return; }
    },
    exit: function(q) {
      let b = Crafty(q.c).get(0);
      if (b.inputs.active) {
        if (b.__c["ACELL"] && Crafty("CELL" + (b.at.cell + 1)).get(0)) {
          b.attr({ alpha: 0 });
          Crafty("CELL" + (b.at.cell + 1)).get(0).attr({ alpha: 0 });
          Crafty("PIN_u" + b.inputs.u + "m1").get(0).attr({ alpha: 0 });
          Crafty("PIN_x").get(0).attr({ alpha: 0 }); //todo
          //if (this.vacant(b)) { return; }
          //else { Crafty("PIN_x").get(0).attr({ alpha: 0 }); }
        }
        else { return; }
      }
      else { return; }
    },
    tap: function(q) {
      let b = Crafty(q.c);
      if (b.inputs.active) {
        b.inputs.valid++;
        b.inputs.active--;
        Crafty(b.inputs.hID).addComponent("UNSELECTED");
        if (b.__c["ACELL"] && Crafty("CELL" + (b.at.cell + 1)).get(0)) {
          //Crafty(b.inputs.hID).addComponent("UNSELECTED");
          b.attr({ alpha: 0 });
          Crafty("CELL" + (b.at.cell + 1)).get(0).attr({ alpha: 0 });
          Crafty("PIN_u" + b.inputs.u + "m1").get(0).attr({ alpha: 0 });
          Crafty("PIN_x").get(0).attr({ alpha: 0 }); //todo
          if (this.vacant(b)) {
            //if (b.energy.p1 >= b.inputs.e) {
            if (b.eng().p1 >= b.inputs.e) {
              let deploy = new Crafty.e("MSG").
              msg({
                p: b.inputs.p, //player
                h: b.inputs.hPos, //hand#
                c: b.at.cell, //cell#
                f: Crafty.frame() //frame#
              });
              Crafty("MsgQ").trigger("OnMsg", deploy);
              //console.log("msgDeployed");
            }
            else {
              console.log("Insufficient Energy!");
            }
          }
          else {
            Crafty("PIN_x").get(0).attr({ alpha: 0 });
            console.log("Area Occupied!");
          }
        }
        else {
          //Crafty(b.inputs.hID).addComponent("UNSELECTED");
          console.log("Card Cancelled");
        }
      }
      else { return; }
    }
  }, true);
});
