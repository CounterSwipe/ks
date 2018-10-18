define({
    "0": 0, //kind
    "1": 32, //cost
    "2": 10, //spd
    "3": "Emma Thee",
    "4": function() {
        let resolve = 10000;
        let push = 5000;
        let pull = 1000;
        let values = [resolve, push, pull];
        return values;
    },
    "5": function(self, cNum, uNum, cell) {
        if (typeof self.modules[self.mBoard].search(cell + 1) === "undefined") {
            var nextCell = cell + 1;
            var cellPos = +nextCell.toString().substr(-1, 1);
            if (cellPos === 1 || cellPos === 2) {
                self.modules[self.mTransit].add(cNum, cNum);
                self.modules[self.mPosU].remove(cNum);
            }
            else {
                //trigger combat|push|pull functions
                this[5](self, cNum, uNum, cell);
                //self.modules[self.mInRange].add(cNum, cNum);
            }
        }
        else {
            return; // console.log("nextPos full, check if inRange"); //this[5](uNum, 1, 23) etc
        }
        //console.log(this, this[5](uNum, 1, 23));
    },
    "6": function(self, cNum, uNum, cell) {
        //trigger inRangeActivation, seekTarget, push|pull here etc
        //trigger|create|remove cooldown|chargeup timers here OR @ combat system etc? 
        //console.log(cNum, uNum, "ready for battle! @", cell);
    },
    "7": function(uid, model, level) {
        //console.log(this);
        //console.log(self);
        level = level * 3;
        console.log("u" + uid + "m" + model, "level:", level, "yes!");
    },
    "8": "Come get a peace of me.",
});
