define({
    "0": function(self, uNum) {
        let that = this;
        this[1](self, that, uNum); //getUnits|dups
    },
    "1": function(self, that, uNum) {
        /*global localStorage*/
        let dups = +localStorage.getItem("u" + uNum); //getDups->[myCred pts]
        if (!dups) {
            if (uNum < 7) { dups = 1; } //6 cards @ start!
            else { dups = 0; }
            localStorage.setItem("u" + uNum, dups);
        }
        self.modules[self.moduleID("Cards")].add(uNum, dups);
        this[2](self, that, uNum, dups); //getKind|Cost
    },
    "2": function(self, that, uNum, dups) {
        require(["/wp-content/themes/blankslate-child/js/adb/unit" + uNum + ".js"], function(uScript) {
            let kind = uScript[0];
            let cost = uScript[1];
            self.modules[self.moduleID("Kind")].add(uNum, kind);
            self.modules[self.moduleID("Cost")].add(uNum, cost);
            that[3](self, that, uNum, dups, kind); //getModel
        });
    },
    "3": function(self, that, uNum, dups, kind) {
        let model = +localStorage.getItem("u" + uNum + "m"); //getModel->[myCred pts]
        if (!model) {
            model = 1;
            localStorage.setItem("u" + uNum + "m", model);
        }
        self.modules[self.moduleID("Model")].add(uNum, model);
        that[4](self, that, uNum, dups, kind, model); //getTier
    },
    "4": function(self, that, uNum, dups, kind, model) {
        let tier = +localStorage.getItem("u" + uNum + "t"); //getModel->[myCred pts]
        if (!tier) {
            tier = 0;
            localStorage.setItem("u" + uNum + "t", tier);
        }
        self.modules[self.moduleID("Tier")].add(uNum, tier);
        that[5](self, that, uNum, dups, kind, model, tier); //getRank|Dreq|Prog
    },
    "5": function(self, that, uNum, dups, kind, model, tier) {
        require(["/wp-content/themes/blankslate-child/js/db/kind" + kind + ".js"], function(rScript) {
            let rank = rScript[model + "" + tier](dups); //[rank, dReq]
            //let kType = k[tier]; k=["core","rare","alpha","omega"];
            self.modules[self.moduleID("Rank")].add(uNum, rank[0]);
            let skill = Math.round(((model + tier + rank[0]) / 3), 1);
            self.modules[self.moduleID("Skill")].add(uNum, skill);
            self.modules[self.moduleID("Dreq")].add(uNum, rank[1]);
            let prog = Math.round((Math.round((dups / rank[1]), 5) * 100), 5);
            if (prog > 100) { prog = 100; }
            self.modules[self.moduleID("Prog")].add(uNum, prog);
        });
    },
    "9": function(self, xfun, xid, xone, xtwo) {
        let nuID = self.getEID();
        self.modules[self.moduleID("View")].add(nuID, nuID);
        self.modules[self.moduleID("Xfun")].add(nuID, xfun);
        self.modules[self.moduleID("Xid")].add(nuID, xid);
        self.modules[self.moduleID("Xone")].add(nuID, xone);
    },
});
