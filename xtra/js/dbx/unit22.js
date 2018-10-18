define({
    "unit22": {
        loadUnitScript: function(unitID) {
            require(["unit" + unitID + ".js"], function(dialog) {
                //  log(dialog);
            });
        },
        loadNpcDialog: function(dialogNumber) {
            require(["npc_dialog_level_" + dialogNumber + ".js"], function(dialog) {
                //  log(dialog);
            });
        },
        "3": function(uid, model, level) {
            //console.log(this);
            //console.log(self);
            level = level * 3;
            console.log("u" + uid + "m" + model, "level:", level)
        },
        "cScript": function(self, mGui) {
            var tikz = self.modules[mGui].search(2);
            return tikz;
            //return this;
            //var life = unit.getLife(); /*global unit*/
            //if (life > 10) { unit.move(); }
            //else { unit.stay(); }
        },
        "dsScript": (() => {
            //(kind, jID, var1, var2)
            console.log(this);
            //var eid = this.getEID();
            //var draw = { "1": eid, "2": kind, "3": jID, "4": var1, "5": var2 };
            //this.modules[this.mView].add(eid, draw);
        }),
        "bScript": ((kind, jID, var1, var2) => {
            console.log(this);
            var eid = this.getEID();
            var draw = { "1": eid, "2": kind, "3": jID, "4": var1, "5": var2 };
            this.modules[this.mView].add(eid, draw);
        }),
        aFun: () => console.log(this),
        "testz": {
            bFun: function() { console.log(this); },
            aFun: () => console.log(this)
        },
        //checkThis.normalFunction(); //Object {}
        //checkThis.arrowFunction();
        "1": function(self, kind, jID, var1, var2) {
            //console.log(this);
            console.log(self);
            var eid = self.getEID();
            var draw = { "1": eid, "2": kind, "3": jID, "4": var1, "5": var2 };
            self.modules[self.mView].add(eid, draw);
        }
        /*"npcId": "1",
        "npcImg": "path/to/some/image.png",
        "npcArea": {
            "x": 10,
            "y": 10,
            "w": 5,
            "h": 5
        },
        "actors": {
            "0": [0, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31],
            "1": ["0", "Will Bauer", "Emma Thee", "Abby Thee", "Chance Wristaker", "Yuri Flex", "Takeo Na'Chepp", "Vic Tamtoro-Egho", "Guilden Sha'mei", "Vinny Gents", "Nadia Dez a'Rei", "Bob Zest", "Faye de Carma", "Igor Blitzschaf", "Betsy Mystic", "Zen Spired", "Precious Hope", "Sveltella Daeshun", "Great Phil", "Marjorie Gretz", "Claire Patience", "Cami Kindbud", "Tristan Faith", "Annie Grrr", "Private Fear", "Torrence de Spare", "Mona Ledge", "Maya Joyce", "General Fear", "Rye Zup", "Serena Tae"]
        }*/
    }
});
