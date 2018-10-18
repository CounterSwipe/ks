define(function(require) {
    class Boot {
        constructor() {
            this.modules = null;
            this.mView = 0;
        }
        init(game) {
            this.modules = game.modules;
            this.mView = this.moduleID("View");
            this.setup();
        }
        setup() {
            console.log("@boot");
            /*this.initPlayer();
            this.initView();
            this.initRoster();
            this.initDeck();
            this.initPins();*/
        }
        initPlayer() {
            var xp = 11; //mycred xp pts
            var premo = Math.round((xp * 1.5), 0); //mycred premo pts
            var level = this.getLoa(xp)[0]; //[level, xpReqtoL^]//mycred loa pts
            var xpReq = this.getLoa(xp)[1]; //[level, xpReqtoL^]
            var xpPerc = this.getPerc(xp, xpReq); //console.log(xpReq + "% to next LoA");
            var nfl = 22; //mycred influence pts
            var zoneHi = 2; //mycred highest zone reached : for which traits to display on page4
            var maxUnits = zoneHi === 0 ? maxUnits = 10 : zoneHi === 1 ? maxUnits = 20 : maxUnits = 30;
            var zone = this.getZone(nfl)[0]; //mycred zone per nfl pts
            var nflReq = this.getZone(nfl)[1]; //[zone, nflReqtoL^]
            var nflPerc = this.getPerc(nfl, nflReq); //console.log(nflReq + "% to next Zone");
            var pName = playerInfo !== undefined ? playerInfo.data.display_name : "new player"; /*global playerInfo*/ //player name
            var cName = playerInfo !== undefined ? playerInfo.data.user_email.slice(0, -10) : "club unknown"; //player's club name
            this.modules[this.mPlayer].add(1, { cName: cName, level: level, nfl: nfl, nflPerc: nflPerc, nflReq: nflReq, pName: pName, premo: premo, xp: xp, xpPerc: xpPerc, xpReq: xpReq, zone: zone, maxUnits: maxUnits });
        }
        initView() {
            var mView = this.mView;
            for (var v = 0; v < 25; v++) {
                this.modules[mView].add(v, 0);
            }
            this.modules[mView].add(0, 9); //input
            this.modules[mView].add(4, 3); //pageNow
            var maxUnits = this.modules[this.mPlayer].search(1).maxUnits;
            this.modules[mView].add(11, maxUnits);
            var sS = +localStorage.getItem('sortStatus'); /*global localStorage*/
            if (sS !== null) {
                this.modules[mView].add(12, sS);
                this.modules[mView].add(13, sS);
                console.log("SortStatus retrieved!");
            }
            else {
                console.log("no Sort saved here");
            }
            this.modules[mView].add(14, 20); //preView
            this.modules[mView].add(15, 20); //nowView
            this.modules[mView].add(17, 10); //preStart
            this.modules[mView].add(19, 10); //nowStart
            this.modules[mView].add(20, [0, 10]);
            if (maxUnits > 10) {
                this.modules[mView].add(21, [10, 20]);
            }
            if (maxUnits === 30) {
                this.modules[mView].add(22, [20, 30]);
            }
            /*0	input
            1	entry
            2	camera
            3	duration
            4	pageNow
            5	pagePrev
            6	cam
            7	tapID
            8	rosterCamera
            9	rosterCam
            10	status 0:roster|1:profile|2:use
            11	maxUnits
            12	preSort 0:rar|1:res
            13	nowSort 0:rar|1:res
            14	preView 20|21|22
            15	nowView 20|21|22
            16	preStart
            17	preEnd
            18	nowStart
            19	nowEnd
            20	[0, 10]
            21	[10, 20]
            22	[20, 30]
            23  uPreID
            24  uNowID
            */
        }
        getLoa(xp) {
            var loa;
            var xpReq;
            switch (true) {
                case (xpReq = 20, xp < xpReq): //xpReq === 20? etc
                    loa = 1;
                    break;
                case (xpReq = 50, xp < xpReq):
                    loa = 2;
                    break;
                case (xpReq = 100, xp < xpReq):
                    loa = 3;
                    break;
                case (xpReq = 200, xp < xpReq):
                    loa = 4;
                    break;
                case (xpReq = 500, xp < xpReq):
                    loa = 5;
                    break;
                default:
                    xpReq = 0;
                    loa = 0;
            }
            return [loa, xpReq];
        }
        getModelMakeTier(ulevel) {
            var model;
            var make;
            var tier;
            switch (true) {
                case (ulevel < 1):
                    model = 1;
                    make = 1;
                    tier = 0;
                    break;
                case (ulevel < 3):
                    model = 1;
                    make = 2;
                    tier = 0;
                    break;
                case (ulevel < 7):
                    model = 2;
                    make = 3;
                    tier = 1;
                    break;
                case (ulevel < 10):
                    model = 3;
                    make = 3;
                    tier = 2;
                    break;
                case (ulevel < 12):
                    model = 4;
                    make = 3;
                    tier = 3;
                    break;
                case (ulevel < 15):
                    model = 5;
                    make = 4;
                    tier = 1;
                    break;
                case (ulevel < 18):
                    model = 6;
                    make = 4;
                    tier = 2;
                    break;
                case (ulevel < 20):
                    model = 7;
                    make = 4;
                    tier = 3;
                    break;
                case (ulevel < 22):
                    model = 8;
                    make = 5;
                    tier = 1;
                    break;
                case (ulevel < 25):
                    model = 9;
                    make = 5;
                    tier = 2;
                    break;
                case (ulevel === 25):
                    model = 10;
                    make = 5;
                    tier = 3;
                    break;
            }
            return [model, make, tier];
        }
        getPerc(a, b) {
            if (a >= b) {
                return 100;
            }
            else {
                return Math.round(((a / b) * 100), 3);
            }
        }
        getZone(nfl) {
            var zone;
            var nflReq;
            switch (true) {
                case (nflReq = 20, nfl < nflReq):
                    zone = 1;
                    break;
                case (nflReq = 50, nfl < nflReq):
                    zone = 2;
                    break;
                case (nflReq = 100, nfl < nflReq):
                    zone = 3;
                    break;
                case (nflReq = 200, nfl < nflReq):
                    zone = 4;
                    break;
                case (nflReq = 500, nfl < nflReq):
                    zone = 5;
                    break;
                default:
                    nflReq = 0;
                    zone = 0;
            }
            return [zone, nflReq];
        }
        initRoster() {
            //var mRoster = this.mRoster;
            var mSortRarity = this.mSortRarity;
            var mSortResolve = this.mSortResolve;
            var maxUnits = this.modules[this.mPlayer].search(1).maxUnits;
            var colors = ["blu", "gry", "prp", "red", "trq"];
            var rarityArray = [];
            var resolveArray = [];
            for (var uNum = 0, cNum = 0; uNum < maxUnits; uNum++) {
                var color = colors[cNum];
                var type = uNum < 5 ? type = "corea" : uNum < 10 ? type = "coreb" : uNum < 15 ? type = "corec" : uNum < 20 ? type = "rarez" : uNum < 25 ? type = "alpha" : type = "omega";
                var rarity = uNum < 15 ? rarity = 0 : uNum < 20 ? rarity = 1 : uNum < 25 ? rarity = 2 : rarity = 3;
                var trait = color + type;
                var ulevel = agent[0]["u" + trait];
                var dups = agent[1][trait];
                var dupsReq = this.getDupsReq(ulevel + 1); //dupsReq@nextLevel
                var dupsPerc = this.getPerc(dups, dupsReq); //css.width%
                var dupbarColor = dupsPerc === 100 ? dupbarColor = "grn" : dupbarColor = "blu";
                var modelMakeTier = this.getModelMakeTier(ulevel);
                var mug = trait + modelMakeTier[1] + "-mug";
                var cost = agent[2][uNum];
                var name = agent[3][uNum];
                var uObject = { uNum: uNum, type: type, rarity: rarity, trait: trait, ulevel: ulevel, dups: dups, color: color, dupsReq: dupsReq, dupsPerc: dupsPerc, dupbarColor: dupbarColor, model: modelMakeTier[0], make: modelMakeTier[1], tier: modelMakeTier[2], mug: mug, cost: cost, name: name };
                rarityArray.push(uObject);
                resolveArray.push(uObject);
                //console.log(uObject);
                //this.modules[mRoster].add(uNum, uObject);
                cNum === 4 ? cNum = 0 : cNum++;
            }
            rarityArray.sort(function(a, b) {
                return b.rarity - a.rarity || b.ulevel - a.ulevel || b.dupsPerc - a.dupsPerc || a.name.localeCompare(b.name);
                //return a - b;
            });
            for (var rarNum = 0, rarLen = rarityArray.length; rarNum < rarLen; rarNum++) {
                this.modules[mSortRarity].add(rarNum, rarityArray[rarNum]);
            }
            resolveArray.sort(function(a, b) {
                return a.cost - b.cost || b.ulevel - a.ulevel || b.dupsPerc - a.dupsPerc || a.name.localeCompare(b.name);
                //return a - b;
            });
            for (var resNum = 0, resLen = resolveArray.length; resNum < resLen; resNum++) {
                resolveArray[resNum].uNum = resNum;
                this.modules[mSortResolve].add(resNum, resolveArray[resNum]);
            }
            console.log(rarityArray);
            //console.log(resolveArray);
        }
        getRoster() {
            // first zoneMax # push to array, then sort? etc
            var zoneHi = this.modules[this.mPlayer].search(1).zoneHi;
            var zoneMax;
            var rosterNow = [];
            zoneHi === 0 ? zoneMax = 10 : zoneHi === 1 ? zoneMax = 20 : zoneHi === 2 ? zoneMax = 25 : zoneMax = 30;
            //console.log(zoneNum);
            //console.log(agent[1].length);
            var mRoster = this.mRoster;
            for (var rData = 0; rData < 5; rData++) {
                for (var rNum = 0; rNum < zoneMax; rNum++) {
                    rosterNow.push(agent[rData][rNum]);
                    //this.modules[mRoster].add(r, agent[1][r]);
                }
                this.modules[mRoster].add(rData, rosterNow);
                rosterNow = [];
            }
            var costArray = this.modules[mRoster].search(2);
            costArray.sort(function(a, b) {
                //return a.cost - b.cost || a.name.localeCompare(b.name);
                return a - b;
            });
            console.log(costArray);
            /*
            per player zoneHi -> roster[#] -> sort via cost -> push to [], sort via tier -> push to []
                tier > 0 ? dups, level, dupsReq etc
                per type -> mug
            resolve cost
            frame & costBox (color)
            img mug
            rarity
            level # (make, model, tier, star type, star #)
            dups, dupReq @ level, dupbar (w%, color)
            
            order per rarity (omega - core, resolve cost, name a-z) // per player Arena level           
            order per resolve cost (lo ^ hi, name a-z) // per player Arena level
            place pgs ^ 3 x sorted 2 = 6 layers per each unit holder on roster page
            
            deck info:
            deck #/# per player LoA
            avg resolve cost
            player comfort zone// ex: comfort zone = + # // iow push pts added to what foe push pts needs to win 
            player influence // ex: influence = # // iow push pts deducted from foe comfort zone|from push pts player req to win etc 
            //changes per traits in deck, top quality perks|bonus, synergies, player LoA etc
            top quality bonus|perk
            player bonus % push|def per traits etc?
            
            */
            /*
            var prLen = this.proster().length;
            var pr = 0; //var rNum = 1;
            for (pr; pr < prLen; pr++) {
                this.setRoster(pr); //this.setRoster(pr, rNum);
                pr = pr + 1; //rNum++;
            }*/
        }
        setRoster(pr) {
            var mRoster = this.mRoster;
            var agentNow = this.proster()[pr];
            var dups = this.proster()[pr + 1]; //mycred aID card pts#
            var aID = agentNow.toString().substr(0, 2);
            var uNum = Math.floor(+agentNow.toString().substr(2, 2) - 10); //mycred aID pts#
            var uLevel = Math.floor(+agentNow.toString().substr(-2, 2) - 10); //mycred aID level#
            var u = agent[aID]; //mycred aID
            var mTier = [0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3];
            var uTier = mTier[uNum]; //~|star|superStar|superNova
            var mModel = [0, 0, 1, 2, 3, 1, 2, 3, 1, 2, 3];
            var uModel = mModel[uNum]; //#stars|superStars|superNovas
            var dupsReq = this.getDupsReq(uLevel + 1); //dupsReq@nextLevel
            var dupsPerc = this.getPerc(dups, dupsReq); //css.width%
            //var ulevel = Math.floor((unit % 20) - 10); 
            //console.log(aID, "bg" + u.color, u.cost, dups, dupsPerc + "%", dupsReq, u.color + u.type + "face" + uLevel, u.color + "ico", u.color + "icon", uLevel, uModel, u.name, uTier);
            this.modules[mRoster].add(aID, { aID: aID, color: u.color, cost: u.cost, dups: dups, dupsPerc: dupsPerc, dupsReq: dupsReq, face: u.color + u.type + "face" + uLevel, ico: u.color + "ico", icon: u.color + "icon", level: uLevel, model: uModel, name: u.name, tier: uTier });
        }
        getDupsReq(level) {
            var dupsReq;
            switch (true) {
                case level === 1:
                    dupsReq = 1;
                    break;
                case level === 2:
                    dupsReq = 2;
                    break;
                case level === 3:
                    dupsReq = 4;
                    break;
                case level === 4:
                    dupsReq = 5;
                    break;
                case level === 5:
                    dupsReq = 8;
                    break;
                case level === 6:
                    dupsReq = 10;
                    break;
                case level === 7:
                    dupsReq = 12;
                    break;
                case level === 8:
                    dupsReq = 15;
                    break;
                case level === 9:
                    dupsReq = 20;
                    break;
                case level === 10:
                    dupsReq = 25;
                    break;
                case level === 11:
                    dupsReq = 50;
                    break;
                case level === 12:
                    dupsReq = 80;
                    break;
                case level === 13:
                    dupsReq = 100;
                    break;
                case level === 14:
                    dupsReq = 120;
                    break;
                case level === 15:
                    dupsReq = 150;
                    break;
                case level === 16:
                    dupsReq = 200;
                    break;
                case level === 17:
                    dupsReq = 250;
                    break;
                case level === 18:
                    dupsReq = 500;
                    break;
                case level === 19:
                    dupsReq = 800;
                    break;
                case level === 20:
                    dupsReq = 1000;
                    break;
                case level === 21:
                    dupsReq = 1200;
                    break;
                case level === 22:
                    dupsReq = 1500;
                    break;
                case level === 23:
                    dupsReq = 2000;
                    break;
                case level === 24:
                    dupsReq = 2500;
                    break;
                case level === 25:
                    dupsReq = 5000;
                    break;
                default:
                    dupsReq = 0;
            }
            return dupsReq;
        }
        initDeck() {
            var mDeck = this.mDeck;
            for (var d = 11; d < 16; d++) {
                this.modules[mDeck].add(d, 0);
            }
            this.getDeck();
        }
        getDeck() {
            var dLen = this.pdeck().length;
            for (var dNum = 0, deckPos = 11; dNum < dLen; dNum++, deckPos++) {
                this.setDeck(deckPos, this.pdeck()[dNum]);
            }
            //console.log(this.modules[this.mDeck]);//console.log(this.modules[this.mDeck].search(1).name);
        }
        pdeck() {
            return pDeck;
        }
        setDeck(deckPos, aID) {
            var mDeck = this.mDeck;
            var mRoster = this.mRoster;
            var unit = this.modules[mRoster].search(aID);
            this.modules[mDeck].add(deckPos, unit);
        }
        initPins() {
            var mPins = this.mPins;
            var homeStart = [45, 19];
            var homeL = [40, 18];
            var homeC = [45, 17];
            var homeR = [50, 18];
            var pinTL = [0, 8];
            var pinCL = [30, 8];
            var pinCR = [60, 8];
            var pinTR = [90, 8];
            this.modules[mPins].add(0, homeStart); //0:homeStart [x,y]|[left,top]
            this.modules[mPins].add(1, homeL); //1:homeL
            this.modules[mPins].add(2, homeC); //2:homeC 
            this.modules[mPins].add(3, homeR); //3:homeR 
            this.modules[mPins].add(11, homeL); //1@homeL  // add trait delta && isActive!!
            this.modules[mPins].add(12, homeC); //2@homeC 
            this.modules[mPins].add(13, homeC); //3@homeC 
            this.modules[mPins].add(14, homeR); //4@homeL 
            this.modules[mPins].add(21, pinTL); //1@pickupTL
            this.modules[mPins].add(22, pinCL); //2@pickupCL
            this.modules[mPins].add(23, pinCR); //3@pickupCR
            this.modules[mPins].add(24, pinTR); //4@pickupTR
            this.modules[mPins].add(31, homeStart); //1@Now @start
            this.modules[mPins].add(32, homeStart); //1@Now @start
            this.modules[mPins].add(33, homeStart); //1@Now @start
            this.modules[mPins].add(34, homeStart); //1@Now @start
        }
        moduleID(mID) {
            for (var id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) {
                    return id;
                }
            }
        }
    }
    return Boot;
});
