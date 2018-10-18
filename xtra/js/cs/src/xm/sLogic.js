define(function() {
  /*global Crafty*/
  Crafty.s("SET_LOGIC", {
    init: function() {
      //d.search(dKey+1700) = splash|sameRow
      //d.search(dKey+1800) = rangeActivation
      //per same|allRows & dirX & rangeArray(+#cells + cKL|R)
      //if (foe){return true}
      if (this.targetInRange()) {
        //d.search(dKey+1900) = tower|tank
        //if (tower){return true}//& pause movement
        if (this.hasSplash()) {
          if (this.row !== 2 || this.row !== 5 || this.row !== 8) {
            this.aquireTarget(this.dualRows());
          }
          else {
            this.aquireTarget(this.allRows());
          }
        }
        else {
          this.aquireTarget(this.singleRow());
        }
      }
      if (this.targetAquired()) {
        //d.search(dKey+1700) = splash|sameRow
        //if(splash){return true}//& aim&launch multiRockets
        //d.search(dKey+2000) = if (chargeUp delay)
        //d.search(dKey+2100) = delay (cooldown)
        //d.search(dKey+2200) = atk animation frames
        //d.search(dKey+2300) = spawn(rocket.range)//cell dist
        //d.search(dKey+2400) = spawn(rocket.dmg)
        //d.search(dKey+2500) = if (explodeOnImpact)
        //else explodeOnRangeEnd //@cell dist
        //collisionCheck @ rocket.onEnterCell
        //& foe.onEnterCell
        if (this.isTower()) {
          this.removeComponent("_CAN_MOVE");
        }
        if (this.hasSplash()) {
          if (this.chargeUp) {
            this.addComponent("TICKING, Ticker").
            ticker({
              dur: this.cooldown,
              cb: ["removeComponent", "addComponent"],
              args: ["TICKING", "DEPLOYED"]
            });
          }
          this.aimRockets();
          this.launchRockets();
        }
        else {
          //else aim&launch singleRocket
          //""launch protocol
          this.aimRockets();
          this.launchRockets();
        }
      }
      //if unit[_CAN_MOVE]
      //if unit[MOVING]
      //unit.move(dir,dist)
      //d.search(dKey+2600) = moveType:1Row|2RowDiag|3RowDiag 
      //if (atEdge)
      // if (d.search(dKey+2700)) switchRows
      //  else stayInSameRow: +|-300 per side & cell
      if (this.canMove() && this.isMoving()) {
        this.move()
      }
      //if unit[_CAN_MOVE]
      else if (this.canMove()) {
        //per dirX & next2CellsVacant|sameSide
        //unit.move(dir,dist)
        //else collisionCheck if (potentialFoeConflict)
        //resolveConflict //spd -> launchFrame -> pubnub.p1
        if (this.nextCellVacant()) { this.move() }
        //else unit.ready
        else { this.idle() }
      }
      else { this.idle() }
      if (this.momentCaptured()) { this.scoreCheck() }
      else {
        if (!this.momentCaptured) { this.captureCheck() }
      }
      if (this.isAlive()) {
        this.updateHP()
        if (this.isExhausted()) {
          if (this.hasExhaustCallBack) { this.exhaustCallBack() }
        }
      }
    }
  }, true);
});
