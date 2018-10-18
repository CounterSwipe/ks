define({
    "0": function(self) {
        this[3](self); //@gui sequence: getName,setUUID
        this[4](self); //getLoa,Xp,XpReq,XpBar -> getLoa
    },
    "1": function(self) {
        this[3](self); //@lob sequence: getName,setUUID
    },
    "2": function(self) {
        this[3](self); //@src sequence: getName,setUUID
        this[5](self); //getLoa
    },
    "3": function(self) {
        /*global playerInfo*/
        /*global localStorage*/
        //console.log(playerInfo.puuid, playerInfo.display_name, playerInfo.subKey, playerInfo.pubKey, localStorage);
        let puuid;
        let pname;
        //check if user is logged in:
        if (typeof playerInfo !== "undefined") {
            puuid = playerInfo.puuid; //getCurrentUserUUID
            pname = playerInfo.display_name; //getCurrentUserName
            //check if the device has a puuid stored:
            if (typeof localStorage.getItem(playerInfo.subKey + "uuid") !== "undefined") {
                //check if the stored puuid matches the current user:
                if (localStorage.getItem(playerInfo.subKey + "uuid") !== puuid) {
                    localStorage.clear(); //different user! -> clear storage
                    console.log("new user -> storage cleared");
                    //todo: add items under puuid (ex: 'puuid'+db = { "0": , "1": , etc} so same device can have multiple user profiles saved
                    localStorage.setItem(playerInfo.subKey + "uuid", puuid);
                }
            }
            else {
                localStorage.setItem(playerInfo.subKey + "uuid", puuid); //no puuid stored -> setItem(puuid)
            }
        }
        else { window.location.replace("/wp-login.php"); }
        this[7](self, [5, 0, 0, pname]);
    },
    "4": function(self) {
        let pLoa = this[5](self)[0]; //->[myCred pts]
        let pXp = this[5](self)[1]; //->[myCred pts]
        let pXpReq = this[6](+pLoa);
        let pXpW = Math.round((Math.round((+pXp / pXpReq), 5) * 100), 5);
        if (pXpW > 100) { pXpW = 100; }
        this[7](self, [5, 4, 0, pXp]);
        this[7](self, [5, 5, 0, pXpReq]);
        this[7](self, [10, 3, pXpW]);
    },
    "5": function(self) {
        /*global localStorage*/
        let pLoa = localStorage.getItem("pLoa"); //->[myCred pts]
        let pXp = localStorage.getItem("pXp"); //->[myCred pts]
        if (!pLoa) {
            pLoa = 1, pXp = 1;
            localStorage.setItem("pLoa", pLoa);
            localStorage.setItem("pXp", pXp);
        }
        this[7](self, [5, 2, 0, pLoa]);
        return [pLoa, pXp];
    },
    "6": function(pLoa) {
        //((5*(LevelNow*LevelNow)) - (10 *levelNow) + 15)
        let pLoaSq = Math.round((pLoa * pLoa), 0);
        let pLoaA = Math.round((5 * pLoaSq), 0);
        let pLoaB = Math.round((10 * pLoa), 0);
        return pLoaA - pLoaB + 15;
    },
    "7": function(self, drawn) {
        let nuID = self.getEID();
        self.modules[self.moduleID("View")].add(nuID, nuID);
        self.modules[self.moduleID("Xfun")].add(nuID, drawn[0]); //xfun = drawn[0];
        self.modules[self.moduleID("Xid")].add(nuID, drawn[1]); //xid = drawn[1];
        self.modules[self.moduleID("Xone")].add(nuID, drawn[2]); //xone = drawn[2];
        if (drawn[3]) { self.modules[self.moduleID("Xtwo")].add(nuID, drawn[3]); } //xtwo = drawn[3];
        if (drawn[4]) { self.modules[self.moduleID("Xnode")].add(nuID, drawn[4]); } //xnode = drawn[4];
    },
});
