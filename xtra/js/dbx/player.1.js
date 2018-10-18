define({
    "0": function(self) {
        this[1](self); //getName,UUID
        //this[2](self); //getLoa,Xp,XpReq,XpBar
    },
    "1": function(self) {
        /*global playerInfo*/
        if (typeof playerInfo === "undefined") { window.location.href = "/wp-login.php"; }
        let pname = playerInfo.data.display_name;
        let puuid = playerInfo.data.user_email;
        console.log(pname, puuid, playerInfo);
                //this[5](self, 5, 0, 0, pname);
    },
    "2": function(self) {
        /*global localStorage*/
        //localStorage.clear();
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
