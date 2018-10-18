define({
    "0": 33,
    "1": 15,
    "2": "Unit Name",
    "3": function(self, cNum, uNum, cell) {
        //console.log(this, this[5](uNum, 1, 23));
        return cell === 110 || cell === 210 ? 500 : 100;
    },
    "4": function(self, cNum, uNum, cell) {
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
    "5": function(self, cNum, uNum, cell) {
        //trigger inRangeActivation, seekTarget, push|pull here etc
        //trigger|create|remove cooldown|chargeup timers here OR @ combat system etc? 
        //console.log(cNum, uNum, "ready for battle! @", cell);
    },
    "6": function(uid, model, level) {
        //console.log(this);
        //console.log(self);
        level = level * 3;
        console.log("u" + uid + "m" + model, "level:", level, "yes!");
    },
});
