define({
    "0": function(self) {
        this[1](self); //getName,setUUID
        this[2](self); //getLoa,Xp,XpReq,XpBar
    },
    "1": function(self) {
        /*global playerInfo*/
        /*global localStorage*/
        console.log(playerInfo.puuid, playerInfo.display_name, playerInfo.subKey, playerInfo.pubKey, localStorage);
        let puuid;
        let pname;
        //check if user is logged in:
        if (typeof playerInfo !== "undefined") {
            puuid = playerInfo[0]; //getCurrentUserUUID
            pname = playerInfo[1]; //getCurrentUserName
            //check if the device has a puuid stored:
            if (typeof localStorage.getItem("sub-c-4d557e6a-c0a3-11e6-b38f-02ee2ddab7feuuid") !== "undefined") {
                //check if the stored puuid matches the current user:
                if (localStorage.getItem("sub-c-4d557e6a-c0a3-11e6-b38f-02ee2ddab7feuuid") !== puuid) {
                    localStorage.clear(); //different user! -> clear storage
                    console.log("new user -> storage cleared");
                    //todo: add items under puuid (ex: 'puuid'+db = { "0": , "1": , etc} so same device can have multiple user profiles saved
                    localStorage.setItem("sub-c-4d557e6a-c0a3-11e6-b38f-02ee2ddab7feuuid", puuid);
                }
            }
            else {
                localStorage.setItem("sub-c-4d557e6a-c0a3-11e6-b38f-02ee2ddab7feuuid", puuid); //no puuid stored -> setItem(puuid)
            }
        }
        else { pname = "New Player"; }
        console.log(playerInfo, localStorage);
        this[5](self, 5, 0, 0, pname);
    },
    "2": function(self) {
        /*global localStorage*/
        let pLoa = localStorage.getItem("pLoa"); //->[myCred pts]
        let pXp = localStorage.getItem("pXp"); //->[myCred pts]
        if (!pLoa) {
            pLoa = 1, pXp = 1;
            localStorage.setItem("pLoa", pLoa);
            localStorage.setItem("pXp", pXp);
        }
        this[3](self, pLoa, pXp);
    },
    "3": function(self, pLoa, pXp) {
        let pXpReq = this[4](+pLoa);
        let pXpW = Math.round((Math.round((+pXp / pXpReq), 5) * 100), 5);
        if (pXpW > 100) { pXpW = 100; }
        this[5](self, 5, 2, 0, pLoa);
        this[5](self, 5, 4, 0, pXp);
        this[5](self, 5, 5, 0, pXpReq);
        this[5](self, 10, 3, pXpW);
    },
    "4": function(pLoa) {
        //((5*(LevelNow*LevelNow)) - (10 *levelNow) + 15)
        let pLoaSq = Math.round((pLoa * pLoa), 0);
        let pLoaA = Math.round((5 * pLoaSq), 0);
        let pLoaB = Math.round((10 * pLoa), 0);
        return pLoaA - pLoaB + 15;
    },
    "5": function(self, xfun, xid, xone, xtwo) {
        let nuID = self.getEID();
        self.modules[self.moduleID("View")].add(nuID, nuID);
        self.modules[self.moduleID("Xfun")].add(nuID, xfun);
        self.modules[self.moduleID("Xid")].add(nuID, xid);
        self.modules[self.moduleID("Xone")].add(nuID, xone);
        if (xtwo) { self.modules[self.moduleID("Xtwo")].add(nuID, xtwo); }
    },
});
