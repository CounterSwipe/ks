define(function() {
  /*global Crafty*/
  Crafty.s("Ticked", {
    events: { "GameStart": "start" },
    start: function() {
      this.ticker = 0;
      this.step = 0;
      this.sec = 0;
      /*Crafty.s("SET_CLOCK");
      //Crafty.s("SET_CELLS").start();
      //Crafty.s("SET_MICE");
      //Crafty.s("SET_UI"); //req BEFORE energy!
      //Crafty.s("SET_ENERGY");
      //Crafty.s("SET_MOMENTS");
      //Crafty.s("SET_SCORE");
      //set base moments
      //set hp*/
      this.unbind("GameStart", this.start);
      this.bind("EnterFrame", this.ticked);
      console.log("StartGame");
    },
    ticked: function(eventData) {
      this.ticker++;
      if (this.ticker > 5) {
        this.ticker = 1;
        this.step++; //onStep.updates
        if (this.step === 10) {
          this.step = 0;
          this.sec++;
          //Crafty.s("SET_CLOCK").update();
          //Crafty.s("SET_ENERGY").update();
        }
      }
      //Crafty.s("SET_MINPUTS").update();
      //TODO Crafty.s("SET_FADEUP").update();
      /*
            Crafty.s("SET_TOCK").update();
            Crafty.s("SET_SCORE").update();
            Crafty.s("SET_MINPUTS").update();
            Crafty.s("SET_MSGS").update();
            Crafty.s("SET_UI").update();
            Crafty.s("SET_DEPLOY").update();
            Crafty.s("SET_LAUNCH").update();
            //TODO canExplode if Rocket if target@sameCell
            //TODO rockets setAim NOT setMove//per dkey|rKey//iow different rows etc
            //setDmg//perhaps as move cb|args |AIM etc
            Crafty.s("SET_MOVED").update();
            Crafty.s("SET_TARGET").update(); //note: after Move!
            Crafty.s("SET_MOVABLE").update();
            Crafty.s("SET_MOVING").update();
            Crafty.s("SET_LAUNCHED").update();
            //Crafty.s("SET_UNITS").update(); //TODO
            //TODO setHp
            //_onEnterCell -> targetInRange() //@ticking|moving cb etc
            //_onEnterCell -> captureMoment?
            //_targetAcquired -> aim&launchRocket|s()
            //_CAN_MOVE -> nextCellVacant()
            //_HP -> updateHp()
            //(exhaust callbacks)
            Crafty.s("SET_CAPTURE").update();
            Crafty.s("SET_FOLLOW").update();
            Crafty.s("SET_DIMMER").update();
            Crafty.s("SET_ROTATION").update();
            Crafty.s("SET_EXPLODE").update();*/
    },
    remove: function() {
      console.log("GameOver");
      this.unbind("EnterFrame", this.ticked);
      //TODO Crafty.scene("GameOver");
    }
  }, false);
});
