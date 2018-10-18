define(function (require) {
  let Crafty = require("crafty");
  let Console = console;
  let logit = Console.log;
  //var aTick = 0;  //var zTick = 0;
  Crafty.s("Ticked", {
    init: function () {
      this.ticker = 0;
      this.step = 0;
      this.sec = 0;
      //Crafty.s("SET_FX");
      this.bind("EnterFrame", this.ticked);
      logit("StartGame");
    },
    ticked: function (eventData) {
      this.ticker++;
      if (this.ticker > 5) {
        this.ticker = 1;
        this.step++; //onStep.updates
        if (this.step === 10) {
          this.step = 0;
          this.sec++;
        }
      }
      Crafty.s("SET_DIR").update();
      Crafty.s("SET_SIZE").update();
      Crafty.s("SET_DIM").update();
    },
    remove: function () {
      logit("GameOver");
      this.unbind("EnterFrame", this.ticked);
      //TODO Crafty.scene("GameOver");
    }
  }, true);
  Crafty.s("Tickedx", {
    start: function () {
      //this.agi = [];      //this.ticks = 0;
      this.ticker = 0;
      this.step = 0;
      this.sec = 0;
      Crafty.s("SET_CLOCK");
      Crafty.s("SET_CELLS").start();
      Crafty.s("SET_MICE");
      Crafty.s("SET_UI"); //req BEFORE energy per hbg!
      Crafty.s("SET_ENERGY");
      Crafty.s("SET_MOMENTS");
      Crafty.s("SET_SCORE");
      //set goals|endZones
      this.bind("EnterFrame", this.ticked);
      logit("StartGame");
    },
    ticked: function (eventData) {
      //var self = this; //var aT = Date.now();
      this.ticker++;
      if (this.ticker > 5) {
        this.ticker = 1;
        this.step++; //onStep.updates
        if (this.step === 10) {
          this.step = 0;
          this.sec++;
          Crafty.s("SET_CLOCK").update();
          Crafty.s("SET_ENERGY").update();
        }
      }
      Crafty.s("SET_TOCK").update();
      Crafty.s("SET_SCORE").update();
      Crafty.s("SET_NPUTS").update();
      Crafty.s("SET_MSGS").update();
      Crafty.s("SET_UI").update();
      Crafty.s("SET_GFX").update();
      Crafty.s("SET_MOVED").update();
      Crafty.s("SET_TARGET").update(); //note: after Move!
      Crafty.s("SET_TARGETING").update();
      Crafty.s("SET_MOVABLE").update();
      Crafty.s("SET_MOVING").update();
      Crafty.s("SET_CAPTURE").update();
      Crafty.s("SET_FOLLOW").update();
      Crafty.s("SET_LAUNCH").update();
      Crafty.s("SET_LAUNCHED").update();
      Crafty.s("SET_HP").update();
      Crafty.s("SET_ROTATION").update();
      Crafty.s("SET_EXPLODE").update();
      Crafty.s("SET_DIMMER").update();
      /*
      //TODO canExplode if Rocket if target@sameCell
      //TODO rockets setAim NOT setMove//per dkey|rKey
      //iow different rows etc
      //setDmg//perhaps as move cb|args |AIM etc
      //Crafty.s("SET_UNITS").update();
      //_onEnterCell -> targetInRange() //@ticking|moving cb etc
      //_onEnterCell -> captureMoment?
      //_targetAcquired -> aim&launchRocket|s()
      //_CAN_MOVE -> nextCellVacant()
      //TODO setHp
      //_HP -> updateHp()
      //(exhaust callbacks)
      */
      //this.ticks++; //this.pushSpd(aT);
    },
    /*pushSpd: function(aT) {
      var tikz = 2000;
      var self = this;
      var zT = Date.now();
      var spd = Math.round((zT - aT), 5);
      if (self.agi.length === 0) { aTick = Date.now(); }
      if (self.agi.length === tikz) { zTick = Date.now(); }
      if (self.agi.length < tikz) { self.agi.push(spd); }
      else { self.spdLog(self, tikz, Math.round((zTick - aTick), 5)); }
    },
    spdLog: function(self, tikz, tTotal) {
      var avgSpd = Math.round((self.agi.reduce((prev, curr) => prev + curr) / tikz), 7);
      //logit("fps", fps);
      logit("@spdLog:", tTotal, "ms", tikz, "ticks", "avgSpd:", avgSpd);
    },*/
    remove: function () {
      logit("GameOver");
      this.unbind("EnterFrame", this.ticked);
      //TODO Crafty.scene("GameOver");
    }
  }, false);
});