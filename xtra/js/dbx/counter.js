;
(function($) {
    "use strict";
    var lastTouchY = 0;
    var preventPullToRefresh = false;
    $('html, body').on('touchstart', function(e) {
        if (e.originalEvent.touches.length != 1) { return; }
        lastTouchY = e.originalEvent.touches[0].clientY;
        preventPullToRefresh = window.pageYOffset === 0;
    });
    $('html, body').on('touchmove', function(e) {
        var touchY = e.originalEvent.touches[0].clientY;
        var touchYDelta = touchY - lastTouchY;
        lastTouchY = touchY;
        if (preventPullToRefresh) {
            preventPullToRefresh = false;
            if (touchYDelta > 0) {
                e.preventDefault();
                return;
            }
        }
    });
    $(document).bind('touchmove', function(e) {
        e.preventDefault();
    });
    console.log("cookies saved: ", Cookies.get());
    var elNum = { get: function(el) { return +document.getElementById(el).innerHTML; } },
        elStr = { get: function(el) { return document.getElementById(el).innerHTML; } },
        elSet = { set: function(el, stuff) { document.getElementById(el).innerHTML = stuff; } },
        elRem = { get: function(el, stuff) { return document.getElementById(el).classList.remove(stuff); } },
        elAdd = { get: function(el, stuff) { return document.getElementById(el).classList.add(stuff); } },
        elOn = { get: function(el) { return document.getElementById(el).classList.remove("o0"), document.getElementById(el).classList.add("o99"); } },
        elOff = { get: function(el) { return document.getElementById(el).classList.remove("o99"), document.getElementById(el).classList.add("o0"); } },
        gameid = '',
        rand = (Math.random() * 99999).toFixed(0);
    gameid = (getGameId()) ? getGameId() : rand;
    var mychannel = gameid;
    var uuid = PubNub.generateUUID();
    var pubnub = new PubNub({
        subscribeKey: "sub-c-4d557e6a-c0a3-11e6-b38f-02ee2ddab7fe",
        publishKey: "pub-c-9e04b0e5-e150-4c73-8d9e-d2766d5ab796",
        uuid: uuid,
        restore: true
    });
    elSet.set("thischan", mychannel);
    console.log(mychannel);
    $(".uclone").clone().appendTo(".uapp");
    $(".uclone1").clone().appendTo(".uapp1");
    $(".uclone2").clone().appendTo(".uapp2");
    $(".uclone3").clone().appendTo(".uapp3");
    $(".uclone4").clone().appendTo(".uapp4");
    $(".uclone5").clone().appendTo(".uapp5");
    $("#gpad").swipe({
        swipeLeft: function(event) { return sL(); },
        swipeRight: function(event) { return sR(); },
        swipeUp: function(event) { return sU(); },
        swipeDown: function(event) { return sD(); },
        threshold: 50
    });

    function sU() {
        var here = elNum.get("here"),
            upad = elNum.get("upad"),
            player = elNum.get("player"),
            unit = elNum.get("lhud"),
            move = elNum.get("rhud"),
            pos = elNum.get("dhud");
        if (here >= 2 && upad < 1) { return elSet.set("upad", 1), movetrait(player, unit, move, pos); }
    }

    function movetrait(player, unit, move, pos) {
        var newMsg = { player: player, unit: unit, move: move, pos: pos },
            publishPlease = { channel: mychannel, message: newMsg };
        pubnub.publish(publishPlease, function(m) { console.log("player: " + player + " sU"); });
    }

    function setUpad(m) {
        var playerNow = m.message.player,
            unitNow = m.message.unit,
            moveNow = m.message.move,
            posNow = m.message.pos;
        if (elNum.get("player") == playerNow) {
            elOn.get("uC" + unitNow);
        }
        else if (elNum.get("player") != playerNow) {
            elOn.get("dC" + unitNow);
            $(".ef" + unitNow + ", .et" + unitNow + ", .eh" + unitNow).toggleClass("o0 o99");
        }
        return console.log("at checkgamestatus: ", playerNow, unitNow, moveNow, posNow);
    }

    function checkGameStatus(m) {
        var playerNow = m.message.player,
            unitNow = m.message.unit,
            moveNow = m.message.move,
            posNow = m.message.pos;
        //if (iplayer == "A"){
        //  document.getElementById("traitnow").innerHTML = iplayer + itrait + ":" + imove;
        //document.getElementById("soloplus").innerHTML = imove;                       
        //console.log("player " + iplayer + " move: " + imove + " at checkgamestatus");
        //} else if (iplayer == "B"){
        //  document.getElementById("traitnow").innerHTML = iplayer + itrait + ":" + imove;
        //    document.getElementById("solominus").innerHTML = imove;                     
        //  console.log("player " + iplayer + " move: " + imove + " at checkgamestatus");
        //} else {
        //  console.log("idk at checkgamestatus");
        //}
        console.log("at checkgamestatus: ", playerNow, unitNow, moveNow, posNow);
        return; // updategameboard();
    }

    function updategameboard() {
        var soloadd = +document.getElementById("soloplus").innerHTML;
        var solosub = +document.getElementById("solominus").innerHTML;
        var socialnow = +document.getElementById("social").innerHTML;
        var socialnew = Math.ceil(socialnow + soloadd - solosub);
        document.getElementById("social").innerHTML = socialnew;
        document.getElementById("soloplus").innerHTML = 0;
        document.getElementById("solominus").innerHTML = 0;
        if (socialnew <= (-500) || socialnew >= 500) {
            var ime = document.getElementById("me").innerHTML;
            $(".winner").html("Player: " + ime);
            $(".winbtn").toggleClass("o0 o99");
            document.getElementById("playersnow").innerHTML = 0;
        }
        console.log("gameboard updated!");
        return;
    }

    function sL() {
        if (elNum.get("lpad") == 1) {
            elSet.set("lpad", 0);
            elOff.get("u1");
            elOff.get("uR1");
            elOn.get("u2");
            elOn.get("uR2");
            elSet.set("lhud", 2);
            elSet.set("lpad", 2);
        }
        else if (elNum.get("lpad") == 2) {
            elSet.set("lpad", 0);
            elOff.get("u2");
            elOff.get("uR2");
            elOn.get("u3");
            elOn.get("uR3");
            elSet.set("lhud", 3);
            elSet.set("lpad", 3);
        }
        else if (elNum.get("lpad") == 3) {
            elSet.set("lpad", 0);
            elOff.get("u3");
            elOff.get("uR3");
            elOn.get("u1");
            elOn.get("uR1");
            elSet.set("lhud", 1);
            elSet.set("lpad", 1);
        }
    }

    function sR() {
        if (elNum.get("rpad") == 1) {
            elSet.set("rpad", 0);
            elOff.get("rbar1");
            elOn.get("rbar2");
            $("#uR1 .hud1, #uR2 .hud1, #uR3 .hud1, #uR1 .hud2, #uR2 .hud2, #uR3 .hud2").toggleClass("o0 o99");
            //$("#uact1, #uact2, .uh1, .uh2").toggleClass("o0 o99");
            elSet.set("rhud", 2);
            elSet.set("rpad", 2);
        }
        else if (elNum.get("rpad") == 2) {
            elSet.set("rpad", 0);
            elOff.get("rbar2");
            elOn.get("rbar3");
            $("#uR1 .hud2, #uR2 .hud2, #uR3 .hud2, #uR1 .hud3, #uR2 .hud3, #uR3 .hud3").toggleClass("o0 o99");
            //$("#uact1, #uact2, .uh2, .uh3").toggleClass("o0 o99");
            elSet.set("rhud", 3);
            elSet.set("rpad", 3);
        }
        else if (elNum.get("rpad") == 3) {
            elSet.set("rpad", 0);
            elOff.get("rbar3");
            elOn.get("rbar1");
            $("#uR1 .hud3, #uR2 .hud3, #uR3 .hud3, #uR1 .hud1, #uR2 .hud1, #uR3 .hud1").toggleClass("o0 o99");
            //$("#uact3, #uact1, .uh3, .uh1").toggleClass("o0 o99");
            elSet.set("rhud", 1);
            elSet.set("rpad", 1);
        }
    }

    function sD() {
        if (elNum.get("dpad") == 1) {
            elSet.set("dpad", 0);
            elRem.get("ebg", "sLRx");
            elAdd.get("ebg", "sRLx");
            elRem.get("efg", "sLR");
            elAdd.get("efg", "sRL");
            elOff.get("uL");
            elOn.get("uR");
            elSet.set("dhud", 2);
            elSet.set("dpad", 2);
            //ebg efg efx efa efb
        }
        else if (elNum.get("dpad") == 2) {
            elSet.set("dpad", 0);
            elRem.get("ebg", "sRLx");
            elAdd.get("ebg", "sLRx");
            elRem.get("efg", "sRL");
            elAdd.get("efg", "sLR");
            elOff.get("uR");
            elOn.get("uL");
            elSet.set("dhud", 1);
            elSet.set("dpad", 1);
        }
    }
    pubnub.addListener({
        status: function(status) {},
        message: function(m) {
            if (elNum.get("here") >= 2) {
                setUpad(m);
                //checkGameStatus(m);
            }
        },
        presence: function(m) {
            if (m.action === "join" && m.occupancy < 2) {
                document.getElementById("me").innerHTML = "a";
                setAunits(1);
                setAunits(2);
                setAunits(3);
            }
            else if (m.action === "join" && m.occupancy == 2) {
                var iam = document.getElementById("me").innerHTML;
                if (iam == "a") {
                    var bunit1 = document.getElementById("aunit1").innerHTML,
                        bunit1model = document.getElementById("aunit1model").innerHTML,
                        bunit1sta = document.getElementById("aunit1sta").innerHTML,
                        bunit1stag = document.getElementById("aunit1stag").innerHTML,
                        bunit1nfl = document.getElementById("aunit1nfl").innerHTML,
                        bunit1nflg = document.getElementById("aunit1nflg").innerHTML,
                        bunit2 = document.getElementById("aunit2").innerHTML,
                        bunit2model = document.getElementById("aunit2model").innerHTML,
                        bunit2sta = document.getElementById("aunit2sta").innerHTML,
                        bunit2stag = document.getElementById("aunit2stag").innerHTML,
                        bunit2nfl = document.getElementById("aunit2nfl").innerHTML,
                        bunit2nflg = document.getElementById("aunit2nflg").innerHTML,
                        bunit3 = document.getElementById("aunit3").innerHTML,
                        bunit3model = document.getElementById("aunit3model").innerHTML,
                        bunit3sta = document.getElementById("aunit3sta").innerHTML,
                        bunit3stag = document.getElementById("aunit3stag").innerHTML,
                        bunit3nfl = document.getElementById("aunit3nfl").innerHTML,
                        bunit3nflg = document.getElementById("aunit3nflg").innerHTML;
                    var newState = {
                        bunit1: bunit1,
                        bunit1model: bunit1model,
                        bunit1sta: bunit1sta,
                        bunit1stag: bunit1stag,
                        bunit1nfl: bunit1nfl,
                        bunit1nflg: bunit1nflg,
                        bunit2: bunit2,
                        bunit2model: bunit2model,
                        bunit2sta: bunit2sta,
                        bunit2stag: bunit2stag,
                        bunit2nfl: bunit2nfl,
                        bunit2nflg: bunit2nflg,
                        bunit3: bunit3,
                        bunit3model: bunit3model,
                        bunit3sta: bunit3sta,
                        bunit3stag: bunit3stag,
                        bunit3nfl: bunit3nfl,
                        bunit3nflg: bunit3nflg
                    };
                    pubnub.setState({
                        state: newState,
                        channels: [mychannel],
                    }, function(m, response) {
                        console.log("player: ", iam, newState);
                        console.log("player: ", iam, newState.at1, newState.at2, newState.at3);
                        console.log("m: ", iam, m);
                    });
                    pubnub.getState({
                        channels: [mychannel]
                    }, function(status, response) {
                        console.log("player: ", iam, newState);
                    });
                    pubnub.hereNow({
                        channels: [mychannel],
                        includeState: true
                    }, function(status, response) {
                        console.log("player: ", iam, newState);
                    });
                }
                else if (iam != "a") {
                    document.getElementById("me").innerHTML = "b";
                    iam = document.getElementById("me").innerHTML;
                    pubnub.hereNow({
                        channels: [mychannel],
                        includeState: true
                    }, function(status, response) {
                        console.log("player: ", iam, newState);
                        console.log(m);
                        console.log(m.state);
                    });
                    setAunits(1);
                    setAunits(2);
                    setAunits(3);
                    return;
                }
            }
            else if (m.action === "state-change" && m.occupancy == 2) {
                var iamnow = document.getElementById("me").innerHTML;
                if (iamnow == "a") {
                    var scA = +document.getElementById("scA").innerHTML;
                    if (scA == "0") {
                        var scAnow = Math.floor(scA + 1);
                        document.getElementById("scA").innerHTML = scAnow;
                        console.log(m);
                    }
                    else if (scA == "1") {
                        var scAnow = Math.floor(scA + 1);
                        document.getElementById("scA").innerHTML = scAnow;
                        console.log(m);
                        console.log("testes state: ", m.state);
                        setBunits(m);
                        elSet.set("player", 1);
                        return startNewGame();
                    }
                    else {
                        var scAnow = Math.floor(scA + 1);
                        document.getElementById("scA").innerHTML = scAnow;
                        console.log(m);
                    }
                }
                else if (iamnow != "a") {
                    var scB = +document.getElementById("scB").innerHTML;
                    if (scB == "0") {
                        var scBnow = Math.floor(scB + 1);
                        document.getElementById("scB").innerHTML = scBnow;
                        console.log(m);
                        console.log(m.state);
                        setBunits(m);
                        var bunit1 = document.getElementById("aunit1").innerHTML,
                            bunit1model = document.getElementById("aunit1model").innerHTML,
                            bunit1sta = document.getElementById("aunit1sta").innerHTML,
                            bunit1stag = document.getElementById("aunit1stag").innerHTML,
                            bunit1nfl = document.getElementById("aunit1nfl").innerHTML,
                            bunit1nflg = document.getElementById("aunit1nflg").innerHTML,
                            bunit2 = document.getElementById("aunit2").innerHTML,
                            bunit2model = document.getElementById("aunit2model").innerHTML,
                            bunit2sta = document.getElementById("aunit2sta").innerHTML,
                            bunit2stag = document.getElementById("aunit2stag").innerHTML,
                            bunit2nfl = document.getElementById("aunit2nfl").innerHTML,
                            bunit2nflg = document.getElementById("aunit2nflg").innerHTML,
                            bunit3 = document.getElementById("aunit3").innerHTML,
                            bunit3model = document.getElementById("aunit3model").innerHTML,
                            bunit3sta = document.getElementById("aunit3sta").innerHTML,
                            bunit3stag = document.getElementById("aunit3stag").innerHTML,
                            bunit3nfl = document.getElementById("aunit3nfl").innerHTML,
                            bunit3nflg = document.getElementById("aunit3nflg").innerHTML;
                        var nowState = {
                            bunit1: bunit1,
                            bunit1model: bunit1model,
                            bunit1sta: bunit1sta,
                            bunit1stag: bunit1stag,
                            bunit1nfl: bunit1nfl,
                            bunit1nflg: bunit1nflg,
                            bunit2: bunit2,
                            bunit2model: bunit2model,
                            bunit2sta: bunit2sta,
                            bunit2stag: bunit2stag,
                            bunit2nfl: bunit2nfl,
                            bunit2nflg: bunit2nflg,
                            bunit3: bunit3,
                            bunit3model: bunit3model,
                            bunit3sta: bunit3sta,
                            bunit3stag: bunit3stag,
                            bunit3nfl: bunit3nfl,
                            bunit3nflg: bunit3nflg
                        };
                        pubnub.setState({
                            state: nowState,
                            channels: [mychannel],
                        }, function(m, response) {
                            console.log(nowState);
                            console.log("player: ", iam, nowState);
                        });
                    }
                    else if (scB == "1") {
                        var scBnow = Math.floor(scB + 1);
                        document.getElementById("scB").innerHTML = scBnow;
                        console.log(m);
                        pubnub.getState({
                            channels: [mychannel]
                        }, function(status, response) {
                            console.log("player: ", iam, nowState);
                        });
                        pubnub.hereNow({
                            channels: [mychannel],
                            includeState: true
                        }, function(status, response) {
                            console.log("player: ", iam, nowState);
                        });
                        elSet.set("player", 2);
                        return startNewGame();
                    }
                    else {
                        var scBnow = Math.floor(scB + 1);
                        document.getElementById("scB").innerHTML = scBnow;
                        console.log(m);
                    }
                }
            }
        }
    });
    console.log("subscribing");
    pubnub.subscribe({
        channels: [mychannel],
        withPresence: true
    });

    function getGameId() {
        if (window.location.search.substring(1).split('?')[0].split('=')[0] !== 'id') {
            return null;
        }
        else {
            return window.location.search.substring(1).split('?')[0].split('=')[1];
        }
    }

    function setBunits(m) {
        document.getElementById("bunit1").innerHTML = m.state.bunit1;
        document.getElementById("bunit1model").innerHTML = m.state.bunit1model;
        document.getElementById("bunit1sta").innerHTML = m.state.bunit1sta;
        document.getElementById("bunit1stag").innerHTML = m.state.bunit1stag;
        document.getElementById("bunit1nfl").innerHTML = m.state.bunit1nfl;
        document.getElementById("bunit1nflg").innerHTML = m.state.bunit1nflg;
        document.getElementById("bunit2").innerHTML = m.state.bunit2;
        document.getElementById("bunit2model").innerHTML = m.state.bunit2model;
        document.getElementById("bunit2sta").innerHTML = m.state.bunit2sta;
        document.getElementById("bunit2stag").innerHTML = m.state.bunit2stag;
        document.getElementById("bunit2nfl").innerHTML = m.state.bunit2nfl;
        document.getElementById("bunit2nflg").innerHTML = m.state.bunit2nflg;
        document.getElementById("bunit3").innerHTML = m.state.bunit3;
        document.getElementById("bunit3model").innerHTML = m.state.bunit3model;
        document.getElementById("bunit3sta").innerHTML = m.state.bunit3sta;
        document.getElementById("bunit3stag").innerHTML = m.state.bunit3stag;
        document.getElementById("bunit3nfl").innerHTML = m.state.bunit3nfl;
        document.getElementById("bunit3nflg").innerHTML = m.state.bunit3nflg;
    }

    function setAunits(digit) {
        document.getElementById("aunit" + digit).innerHTML = Cookies.get("unit" + digit);
        document.getElementById("aunit" + digit + "model").innerHTML = Cookies.get("unit" + digit + "model");
        document.getElementById("aunit" + digit + "sta").innerHTML = Cookies.get("unit" + digit + "sta");
        document.getElementById("aunit" + digit + "stag").innerHTML = Cookies.get("unit" + digit + "stag");
        document.getElementById("aunit" + digit + "nfl").innerHTML = Cookies.get("unit" + digit + "nfl");
        document.getElementById("aunit" + digit + "nflg").innerHTML = Cookies.get("unit" + digit + "nflg");
    }

    function startNewGame() {
        var a1 = elStr.get("aunit1"),
            a2 = elStr.get("aunit2"),
            a3 = elStr.get("aunit3"),
            acolor1 = a1.substr(0, 3),
            acolor2 = a2.substr(0, 3),
            acolor3 = a3.substr(0, 3),
            b1 = elStr.get("bunit1"),
            b2 = elStr.get("bunit2"),
            b3 = elStr.get("bunit3"),
            bcolor1 = b1.substr(0, 3),
            bcolor2 = b2.substr(0, 3),
            bcolor3 = b3.substr(0, 3);
        $("#u1 .umodel").html(elNum.get("aunit1model"));
        $("#u1 .bgicon, #uC1 .bgicon, #uL1 .bgicon, #uR1 .bgicon").toggleClass("bg" + acolor1 + " " + acolor1 + "icon");
        $("#u1 .ico, #uC1 .ico, #uL1 .ico, #uR1 .ico").toggleClass(acolor1 + "ico");
        $("#u1 .hh1").toggleClass(a1 + "hh1");
        $("#u2 .umodel").html(elNum.get("aunit2model"));
        $("#u2 .bgicon, #uC2 .bgicon, #uL2 .bgicon, #uR2 .bgicon").toggleClass("bg" + acolor2 + " " + acolor2 + "icon");
        $("#u2 .ico, #uC2 .ico, #uL2 .ico, #uR2 .ico").toggleClass(acolor2 + "ico");
        $("#u2 .hh1").toggleClass(a2 + "hh1");
        $("#u3 .umodel").html(elNum.get("aunit3model"));
        $("#u3 .bgicon, #uC3 .bgicon, #uL3 .bgicon, #uR3 .bgicon").toggleClass("bg" + acolor3 + " " + acolor3 + "icon");
        $("#u3 .ico, #uC3 .ico, #uL3 .ico, #uR3 .ico").toggleClass(acolor3 + "ico");
        $("#u3 .hh1").toggleClass(a3 + "hh1");
        $("#dC1 .bgicon, #dL1 .bgicon, #dR1 .bgicon").toggleClass("bg" + bcolor1 + " " + bcolor1 + "icon");
        $("#dC1 .ico, #dL1 .ico, #dR1 .ico").toggleClass(bcolor1 + "ico");
        $("#dC2 .bgicon, #dL2 .bgicon, #dR2 .bgicon").toggleClass("bg" + bcolor2 + " " + bcolor2 + "icon");
        $("#dC2 .ico, #dL2 .ico, #dR2 .ico").toggleClass(bcolor2 + "ico");
        $("#dC3 .bgicon, #dL3 .bgicon, #dR3 .bgicon").toggleClass("bg" + bcolor3 + " " + bcolor3 + "icon");
        $("#dC3 .ico, #dL3 .ico, #dR3 .ico").toggleClass(bcolor3 + "ico");
        $(".ef1").toggleClass(b1 + "ef" + elNum.get("bunit1model"));
        $(".et1").toggleClass(b1 + "et" + elNum.get("bunit1model"));
        $(".eh1").toggleClass(b1 + "eh" + elNum.get("bunit1model"));
        $(".ef2").toggleClass(b2 + "ef" + elNum.get("bunit2model"));
        $(".et2").toggleClass(b2 + "et" + elNum.get("bunit2model"));
        $(".eh2").toggleClass(b2 + "eh" + elNum.get("bunit2model"));
        $(".ef3").toggleClass(b3 + "ef" + elNum.get("bunit3model"));
        $(".et3").toggleClass(b3 + "et" + elNum.get("bunit3model"));
        $(".eh3").toggleClass(b3 + "eh" + elNum.get("bunit3model"));
        elSet.set("here", 2);
        return console.log("player: " + elNum.get("player") + " Ready!"); //timerfun();
    }
    //Unit.prototype.sta = function(unit){ return getHp(unit); };
    //Unit.prototype.stagro = function(unit){ return getBasedmg(unit); };
    //Unit.prototype.nfl = function(unit){ return getHp(unit); };
    //Unit.prototype.nflgro = function(unit){ return getBasedmg(unit); };
    //Unit.prototype.model = function(unit){ return elNum.get(unit.now()+"model"); };
    //function Unit(unit){ this.unit = unit; }
    //Unit.prototype.now = function(){ return this.unit; };
    //Unit.prototype.is = function(unit){ return document.getElementById(unit.now()).innerHTML; };
    //Unit.prototype.sta = function(unit){ return +document.getElementById(unit.now()+"sta").innerHTML; };
    //Unit.prototype.stagro = function(unit){ return +document.getElementById(unit.is(unit)+"stagro").innerHTML; };
    //Unit.prototype.nfl = function(unit){ return +document.getElementById(unit.is(unit)+"nfl").innerHTML; };
    //Unit.prototype.nflgro = function(unit){ return +document.getElementById(unit.is(unit)+"nflgro").innerHTML; };
    //var unit1 = new Unit("unit1");
    //var unit2 = new Unit("unit2");
    //var unit3 = new Unit("unit3");
    //console.log(unit2.now()); = unit1 etc
    //console.log(unit3.is(unit3)); = prp1 etc
    // console.log(unit1.now(), unit1.is(unit1), unit1.sta(unit1))
    //var myUnit1 = {
    //  make: function(unit){ return document.getElementById(unit.now()).innerHTML; }
    //};
    //var MyGlobe = function () {
    //  this.variable1 = null;
    //}
    //MyGlobe.prototype.setup = function() {
    //  this.variable1 = 33;
    //};
    //console.log(unit1.setup(unit1));
})(jQuery);
