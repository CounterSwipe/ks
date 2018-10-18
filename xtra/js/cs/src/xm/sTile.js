define(function() {
  /*global Crafty*/
  // Crafty.s("Ticker").remove(); 
  Crafty.c("AdjXflip", {
    required: "Dirs, SIDE",
    init: function() {
      this.adjXflip();
    },
    adjXflip: function() {
      if (this.__c["P1"]) {
        if (this.dirX() < 1) {
          this.flip("X");
          this.adjX = 9.25; //@deploy: tile.x - adjX
        }
        else {
          if (this.flip("X")) { this.unflip("X"); }
          this.adjX = 6.25; //@deploy: tile.x - adjX
        }
      } //TODO:"P2"
      return this;
    }
  });
  Crafty.c("Dirs", {
    required: "SIDE",
    dirX: function() {
      let dir;
      if (this.__c["P1"]) {
        switch (true) {
          case (this.at.cR === 126):
          case (this.at.cR === 226):
          case (this.at.cR === 326):
            //
          case (this.at.cR === 416):
          case (this.at.cR === 516):
          case (this.at.cR === 616):
            //
          case (this.at.cR === 726):
          case (this.at.cR === 826):
          case (this.at.cR === 926):
            dir = 0;
            break;
          case (this.at.cR < 400):
          case (this.at.cR > 700):
            dir = 1;
            break;
          default:
            dir = -1;
        }
        return dir;
      } //TODO "P2"
    },
    dirY: function() {
      let dir;
      if (this.__c["P1"]) {
        switch (true) {
          case (this.at.cR === 126):
          case (this.at.cR === 226):
          case (this.at.cR === 326):
            dir = -1;
            break;
          case (this.at.cR === 416):
          case (this.at.cR === 516):
          case (this.at.cR === 616):
            //
          case (this.at.cR === 726):
          case (this.at.cR === 826):
          case (this.at.cR === 926):
            dir = 1;
            break;
          default:
            dir = 0;
        }
        return dir;
      } //TODO "P2"
    }
  });
  Crafty.c("NextTile", {
    required: "SIDE, Dirs",
    nextTile: function() {
      if (this.__c["P1"]) {
        if (this.dirX() === 1) {
          return this.at.tR + 1;
        }
        else if (this.dirX() < 0) {
          return this.at.tL - 1;
        }
        else {
          let tile;
          switch (true) {
            case (this.at.tR === 416):
            case (this.at.tR === 516):
            case (this.at.tR === 616):
              //
            case (this.at.tR === 726):
            case (this.at.tR === 826):
            case (this.at.tR === 926):
              tile = this.at.tR - 300;
              break;
            case (this.at.tR === 126):
            case (this.at.tR === 226):
            case (this.at.tR === 326):
              tile = this.at.tR + 300;
              break;
            case (this.at.tR === 426):
            case (this.at.tR === 526):
            case (this.at.tR === 626):
              tile = this.at.tR - 1;
              break;
            default:
              //TODO:default?
              console.log("error@nextTile");
          }
          //console.log(tile);
          return tile;
        }
      } //TODO "P2"
    }
  });
  Crafty.c("PrevTile", {
    required: "SIDE, Dirs",
    prevTile: function() {
      if (this.__c["P1"]) {
        let tile;
        switch (true) {
          case (this.at.tR === 116):
          case (this.at.tR === 216):
          case (this.at.tR === 316):
            tile = this.at.tR + 300; //300;
            break;
          case (this.at.tR === 426):
          case (this.at.tR === 526):
          case (this.at.tR === 626):
            tile = this.at.tR - 300; //if scored etc
            break;
          case (this.at.tR === 126):
          case (this.at.tR === 226):
          case (this.at.tR === 326):
          case (this.dirX() === 1):
            tile = this.at.tL - 1;
            break;
          default:
            tile = this.at.tR + 1;
        }
        return tile;
      } //TODO "P2"
    }
  });
  Crafty.c("ReTile", {
    required: "SIDE, Dirs",
    reTile: function() {
      if (this.dirX() === 1) {
        this.at.tL = this.at.tR;
        this.at.tR = this.nextTile();
      }
      else if (this.dirX() < 0) {
        this.at.tR = this.at.tL;
        this.at.tL = this.nextTile();
      }
      else {
        //switch (true) {
        //case (this.at.tR === 426):
        //case (this.at.tR === 526):
        //case (this.at.tR === 626):
        console.log(this.at);
        this.at.tR = this.nextTile();
        this.at.tL = this.at.tR - 1; //TODO: 
        console.log(this.at);
        this.adjXflip();
        //  break;
        //default:
        //TODO:default?
        //console.log("error@reTile"); //change dirX|dirY|adjX here?
        //}
        //TODO: update tiles here when jumping +/- 300 etc
        //TODO:update z
      }
      let z = +(1 + "" + this.at.tL);
      this.attr({ z: z });
      return this;
    }
  });
  Crafty.c("ShowTiles", {
    required: "NextTile, PrevTile",
    init: function() {
      Crafty("tile" + this.at.tL).get(0).
      color("yellow").attr({ alpha: .3 });
      Crafty("tile" + this.at.tR).get(0).
      color("yellow").attr({ alpha: .3 });
      Crafty("tile" + this.nextTile()).get(0).
      color("yellow").attr({ alpha: .5 });
    },
    showTiles: function() {
      let pt = Crafty("tile" + this.prevTile()).get(0);
      pt.color(pt.tile.c).attr({ alpha: pt.tile.a });
      Crafty("tile" + this.at.tL).get(0).
      color("yellow").attr({ alpha: .3 });
      Crafty("tile" + this.at.tR).get(0).
      color("yellow").attr({ alpha: .3 });
      Crafty("tile" + this.nextTile()).get(0).
      color("yellow").attr({ alpha: .5 });
    }
  });
  Crafty.c("MOVING", {
    required: "AtTile",
    init: function() {
      this._mTick = this.card.s;
      Crafty("tile" + this.nextTile()).get(0).removeComponent("VACANT");
    },
    mDirX: function() {
      return this.dirX() === 1 ? "e" : this.dirX() < 0 ? "w" : false;
    },
    mDirY: function() {
      return this.dirY() === 1 ? "n" : this.dirY() < 0 ? "s" : false;
    },
    mTick: function() {
      //TODO if nextTile vacant etc | edging etc
      let dir;
      let dist;
      if (this.mDirX() && !this.mDirY()) {
        dir = this.mDirX();
        dist = this.vuW(6.25 / this.card.s);
      }
      else if (!this.mDirX() && this.mDirY()) {
        dir = this.mDirY();
        dist = this.vuH(22 / this.card.s);
      }
      else {
        dir = this.mDirX() + this.mDirY();
        dist = this.vuW(6.25 / this.card.s);
      }
      //let dist = this.mDir() === "n" ? this.vuH(22 / this.card.s) : this.vuW(6.25 / this.card.s);
      //if (dist === "n") {
      //console.log("NORTH");
      //}
      this.move(dir, dist);
      //this.move(this.mDir(), dist);
      this._mTick--;
      //console.log(this._mTick);
      if (this._mTick < 1) {
        console.log(this._mTick);
        this.reTile();
        if (this.__c["ShowTiles"]) {
          this.showTiles();
          //if (this.at.tR === 526) {
          //console.log(this);
          //Crafty.s("Ticker").remove();
          //}
        }
        this.removeComponent("MOVING");
        //this.removeComponent("MOVING", false);
        //this.removeComponent("mTick", false);
      }
      return this;
    },
    remove: function() {
      //console.log("Mtick removed");
      Crafty("tile" + this.prevTile()).get(0).addComponent("VACANT");
      this.addComponent("READY");
    }
  });
  Crafty.s("ReadyQ", {
    onFrame: function() {
      if (Crafty("READY").length > 0) {
        for (let i = Crafty("READY").length - 1; i >= 0; i--) {
          let r = Crafty("READY").get(i);
          let t = Crafty("tile" + r.nextTile()).get(0)
          if (t.__c["VACANT"]) {
            r.removeComponent("READY");
            if (r.nextTile())
              //r.removeComponent("READY", false);
              //TODO: AI Logic Here ex: nextTile()===VACANT?mTick:""=Foe?atk:wait;
              //Crafty.s("Ticker").remove();
              r.addComponent("MOVING");
          }
          //else {
          //return;
          //TODO waiting AI LOGIC HERE etc
          //}
          //console.log(r);
          //r.move("e", r.vuW(.5));
          //r.move("e", r.vuW(.125));
          //console.log(r, r.tile.col);
          //Crafty.s("Ticker").remove();
          /*if (r.dirX < 1) {
            if (r.tile.col !== 1) {
              let t = Crafty("tile" + (+(r.tile.tile) - 1)).get(0);
              if (t.__c["VACANT"]) {
                //if (t.tile.vacant) {
                //t.tile.vacant = false;
                t.removeComponent("VACANT");
                r.addComponent("Torque, MOVING").removeComponent("READY");
              }
              else { return; }
            }
            else {
              console.log("@Ledge", +r.tile.tile);
              //r.removeComponent("READY", false);
              r.addComponent("Torque, EDGING").removeComponent("READY");
            }
          }
          else {
            if (r.tile.col !== 8) {
              let t = Crafty("tile" + (+(r.tile.tile) + 1)).get(0);
              if (t.__c["VACANT"]) {
                //if (t.tile.vacant) {
                //t.tile.vacant = false;
                t.removeComponent("VACANT");
                r.addComponent("Torque, MOVING").removeComponent("READY");
              }
              else { return; }
            }
            else {
              console.log("@Redge", +r.tile.tile);
              //r.removeComponent("READY", false);
              r.addComponent("Torque, EDGING").removeComponent("READY");
            }
          }*/
        }
      }
      else { return; }
    }
  }, true);
  Crafty.s("MovingQ", {
    onFrame: function() {
      if (Crafty("MOVING").length > 0) {
        for (let i = Crafty("MOVING").length - 1; i >= 0; i--) {
          let m = Crafty("MOVING").get(i);
          m.mTick();
          //Crafty.s("Ticker").remove();
        }
      }
      else { return; }
    }
  }, true);
  Crafty.s("ReadyQx", {
    onFrame: function() {
      if (Crafty("READY").length > 0) {
        for (let i = Crafty("READY").length - 1; i >= 0; i--) {
          let r = Crafty("READY").get(i);
          if (r.dirX < 1) {
            if (r.tile.col !== 1) {
              let t = Crafty("tile" + (+(r.tile.tile) - 1)).get(0);
              if (t.__c["VACANT"]) {
                //if (t.tile.vacant) {
                //t.tile.vacant = false;
                t.removeComponent("VACANT");
                r.addComponent("Torque, MOVING").removeComponent("READY");
              }
              else { return; }
            }
            else {
              console.log("@Ledge", +r.tile.tile);
              //r.removeComponent("READY", false);
              r.addComponent("Torque, EDGING").removeComponent("READY");
            }
          }
          else {
            if (r.tile.col !== 8) {
              let t = Crafty("tile" + (+(r.tile.tile) + 1)).get(0);
              if (t.__c["VACANT"]) {
                //if (t.tile.vacant) {
                //t.tile.vacant = false;
                t.removeComponent("VACANT");
                r.addComponent("Torque, MOVING").removeComponent("READY");
              }
              else { return; }
            }
            else {
              console.log("@Redge", +r.tile.tile);
              //r.removeComponent("READY", false);
              r.addComponent("Torque, EDGING").removeComponent("READY");
            }
          }
        }
      }
      else { return; }
    }
  }, true);
  Crafty.c("EDGING", {
    init: function() {},
    edging: function() {
      if (this.dirX < 1) {
        if (this.x <= this.dest) {
          Crafty("tile" + (+this.tile.tile)).get(0).addComponent("VACANT");
          //Crafty("tile" + (+this.tile.tile)).get(0).tile.vacant = true;
          this.resetMotion();
          this.onLedge();
        }
        else { return this; }
      }
      else {
        if (this.x >= this.dest) {
          Crafty("tile" + (+this.tile.tile)).get(0).addComponent("VACANT");
          //Crafty("tile" + (+this.tile.tile)).get(0).tile.vacant = true;
          this.resetMotion();
          this.onRedge();
        }
        else { return this; }
      }
      return this;
    },
    remove: function() {
      this.tile.tile = +(this.tile.row + "" + this.tile.col);
      this.addComponent("READY");
      console.log("edging removed");
    }
  });
  Crafty.s("MovingQx", {
    onFrame: function() {
      if (Crafty("MOVING").length > 0) {
        for (let i = Crafty("MOVING").length - 1; i >= 0; i--) {
          Crafty("MOVING").get(i).moving();
        }
      }
      else { return; }
    }
  }, true);
  Crafty.s("EdgingQ", {
    onFrame: function() {
      if (Crafty("EDGING").length > 0) {
        for (let i = Crafty("EDGING").length - 1; i >= 0; i--) {
          Crafty("EDGING").get(i).edging();
        }
      }
      else { return; }
    }
  }, true);
  Crafty.c("SpdX", {
    spdX: function(spdX) {
      if (spdX) {
        this._spdX = spdX; //TODO auto init instead of spdX function etc
        return this;
      }
      else { return this._spdX; }
    }
  });
  Crafty.c("MOVINGx", {
    init: function() {
      //this.nextTile().tile.vacant = false;
    },
    moving: function() {
      let n;
      if (this.dirX < 1) {
        n = Crafty("tile" + (+(this.tile.tile) - 1)).get(0);
        if (this.x + this.vuW(this.adjX) <= n.x) { this.moved(n); }
        else { return; }
      }
      else {
        n = Crafty("tile" + (+(this.tile.tile) + 1)).get(0);
        if (this.x + this.vuW(this.adjX) >= n.x) { this.moved(n); }
        else { return; }
      }
    },
    moved: function(n) {
      let t = Crafty("tile" + this.tile.tile).get(0);
      this.resetMotion();
      this.tile.col = n.tile.col;
      this.tile.tile = n.tile.tile;
      this.removeComponent("Torque", false).removeComponent("MOVING", false);
      this.addComponent("READY");
      t.addComponent("VACANT");
      //t.tile.vacant = true;
    }
  });
  Crafty.c("Torque", {
    //required: "Motion",
    init: function() {
      this.torque();
    },
    torque: function() {
      this.vx = this.dirX * this.vuW(this.spdX());
      return this;
    },
    remove: function() {
      //console.log("Torque removed");
    }
  });
  Crafty.c("OnLedge", {
    init: function() {},
    onLedge: function() {
      //console.log("atLedge");
      this.x = this.x + this.vuW(3); //adjX pos
      if (this.p.side === 1) {
        this.tile.row = this.tile.row - 3;
        this.y = this.y - this.vuH(22);
        //console.log(this.tile.row);
      }
      else {
        if (this.tile.row > 6) {
          this.y = this.y - this.vuH(22);
          this.tile.row = this.tile.row - 3;
        }
        else {
          this.y = this.y + this.vuH(22);
          this.tile.row = this.tile.row + 3;
        }
      }
      let z = +(1 + "" + this.tile.row + "" + this.tile.col);
      this.z = z;
      console.log(this.z);
      this.removeComponent("EDGING");
      this.destiny();
      this.torque();
      return this;
    },
    remove: function() {}
  });
  Crafty.c("OnRedge", {
    init: function() {},
    onRedge: function() {
      //console.log("atRedge");
      this.x = this.x - this.vuW(3); //adjX pos
      if (this.p.side === 1) {
        if (this.tile.row < 4) {
          this.y = this.y + this.vuH(22);
          this.tile.row = this.tile.row + 3;
        }
        else {
          this.y = this.y - this.vuH(22);
          this.tile.row = this.tile.row - 3;
        }
        //console.log(this.tile.row);
      }
      else {
        this.y = this.y + this.vuH(22);
        this.tile.row = this.tile.row + 3;
      }
      let z = +(1 + "" + this.tile.row + "" + this.tile.col);
      this.z = z;
      console.log(this.z);
      this.removeComponent("EDGING");
      this.destiny();
      this.torque();
      /*if (this.tile.row < 4) {
        if (this.p.side === 1) {
          //console.log("almost there");
          //let y = ((this.y * 100 / window.Axy.h));
          this.y = this.y - nvH(26);
          this.h = nvH(28);
          this.tile.row = this.tile.row - 3;
          this.z = +(1 + "" + this.tile.row + "" + this.tile.col);
          this.setDest();
          this.onWalk();
          console.log(this);
        }
        //unit.cBox(1, x - 18.25, y - 26, 37.5, 28).attr({ z: z });
        //unit.cBox(1, x - 18.25, y - 26, 37.5, 28).flip("X").attr({ z: z }).walk(1, 10).tile = tile;
      }
      else if (this.tile.row > 6) {
        //console.log("here");
        if (this.p.side === 1) {
          //console.log("almost there");
          //let y = ((this.y * 100 / window.Axy.h));
          this.y = this.y - nvH(27);
          this.h = nvH(29);
          this.tile.row = this.tile.row - 3;
          this.z = +(1 + "" + this.tile.row + "" + this.tile.col);
          this.setDest();
          this.onWalk();
          console.log(this);
        }
        //TODO p.side2 & resize w & h sprites! & clear launch tile so can launch again etc
        //unit.cBox(1, x - 18.25, y - 28, 37.5, 30).attr({ z: z });
      }
      else {
        //unit.cBox(1, x - 6.25, y - 27, 37.5, 29).attr({ z: z });
      }
      //per side && per row = dirX 
      //nuDest = 0 - this.w || window.Axy.w*/
      return this;
    },
    remove: function() {}
  });
});
