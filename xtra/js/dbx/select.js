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
    $(".uclone").clone().appendTo(".uapp");
    $(".uclone2").clone().appendTo(".uapp2");
    $("#n1 .nn").html(1);
    $("#n2 .nn").html(2);
    $("#n3 .nn").html(3);
    $("#n4 .nn").html(4);
    $("#n5 .nn").html(5);
    $("#n6 .nn").html(6);
    $("#n7 .nn").html(7);
    $("#n8 .nn").html(8);
    $("#n9 .nn").html(9);
    $("#n0 .nn").html(0);
    setUnits(1, "red");
    setUnits(2, "prp");
    setUnits(3, "trq");
    setUnits(4, "blu");
    setUnits(5, "grn");
    setUnits(6, "ylo");

    function setUnits(digit, color) {
        $("#u" + digit + " .bgicon").toggleClass("bg" + color + " " + color + "icon");
        $("#u" + digit + " .ico").toggleClass(color + "ico");
        $("#u" + digit + " .hh1").toggleClass(color + "1hh1");
    }
    var elNum = { get: function(el) { return +document.getElementById(el).innerHTML; } };
    var elStr = { get: function(el) { return document.getElementById(el).innerHTML; } };
    var elSet = { set: function(el, stuff) { document.getElementById(el).innerHTML = stuff; } };
    var myUnit = {
        is: function(unit) { return document.getElementById(unit).innerHTML; },
        model: function(unit) { return +document.getElementById(myUnit.is(unit) + "model").innerHTML; },
        sta: function(unit) { return +document.getElementById(myUnit.is(unit) + "sta").innerHTML; },
        stag: function(unit) { return +document.getElementById(myUnit.is(unit) + "stag").innerHTML; },
        nfl: function(unit) { return +document.getElementById(myUnit.is(unit) + "nfl").innerHTML; },
        nflg: function(unit) { return +document.getElementById(myUnit.is(unit) + "nflg").innerHTML; }
    };
    var units = [0, 0, 0];

    function uFirst(el) {
        if (units[0] < 1) {
            units[0] = 1;
            var useq = "unit1";
            return elSet.set(useq, el), elSet.set(el, 1), ucookies(useq, el), uCheck();
        }
        else {
            return uNext(el);
        }
    }

    function uNext(el) {
        if (units[1] < 1) {
            units[1] = 1;
            var useq = "unit2";
            return elSet.set(useq, el), elSet.set(el, 2), ucookies(useq, el), uCheck();
        }
        else {
            return uLast(el);
        }
    }

    function uLast(el) {
        if (units[2] < 1) {
            units[2] = 1;
            var useq = "unit3";
            return elSet.set(useq, el), elSet.set(el, 3), ucookies(useq, el), uCheck();
        }
        else {
            return false;
        }
    }

    function ucookies(useq, el) {
        Cookies.set(useq, el, { expires: 3 });
        var ucookie = Cookies.get(useq);
        document.getElementById("ucookie").innerHTML = useq + " : " + ucookie;
        console.log("this is useq: ", useq, myUnit.sta(useq));
        Cookies.set(useq + "model", myUnit.model(useq), { expires: 3 });
        Cookies.set(useq + "sta", myUnit.sta(useq), { expires: 3 });
        Cookies.set(useq + "stag", myUnit.stag(useq), { expires: 3 });
        Cookies.set(useq + "nfl", myUnit.nfl(useq), { expires: 3 });
        Cookies.set(useq + "nflg", myUnit.nflg(useq), { expires: 3 });
        console.log("cookies saved: ", Cookies.get());
        return;
    }
    $("#gRn").swipe({
        tap: function(event) {
            if (elNum.get("pad") < 1 && elNum.get("nready") == 1) {
                var jcode = document.getElementById("jcode").innerHTML;
                var myURL = "http://counterswipe.com/xbattle/?id=" + jcode;
                document.getElementById("jgame").href = myURL;
                return console.log("http://counterswipe.com/xbattle/?id=" + jcode);
            }
        },
        threshold: 50
    });
    $("#gL").swipe({
        tap: function(event) {
            if (elNum.get("pad") == 1 && elNum.get("uready") == 1) {
                document.getElementById("jcode").innerHTML = "";
                var myURL = "http://counterswipe.com/xbattle/?id=";
                document.getElementById("jgame").href = myURL;
                console.log(myURL);
                $(".numbs, .units").toggleClass("o0 o99");
                elSet.set("pad", 0);
                elSet.set("uready", 0);
                ubtnOff();
            }
        },
        threshold: 50
    });
    $("#gnu").swipe({
        tap: function(event) {
            if (elNum.get("pad") < 1) {
                document.getElementById("jcode").innerHTML = "";
                var myURL = "http://counterswipe.com/xbattle/?id=";
                document.getElementById("jgame").href = myURL;
                console.log(myURL);
                $(".numbs, .units").toggleClass("o0 o99");
                elSet.set("pad", 1);
                elSet.set("uready", 1);
                elSet.set("nready", 0);
                nbtnOff();
                ubtnOn();
            }
        },
        threshold: 50
    });
    $("#gnn").swipe({
        tap: function(event) {
            document.getElementById("jcode").innerHTML = "";
            var myURL = "http://counterswipe.com/xbattle/?id=";
            document.getElementById("jgame").href = myURL;
            console.log(myURL);
            elSet.set("nready", 0);
            nbtnOff();
        },
        threshold: 50
    });

    function nCheck() {
        if (elNum.get("nready") < 1) {
            elSet.set("nready", 1);
            nbtnOn();
        }
    }

    function nbtnOn() {
        if (elNum.get("nready") == 1 && elNum.get("nbtn") < 1) {
            $("#gRn").toggleClass("zo0");
            $("#nR").toggleClass("o0 o99");
            elSet.set("nbtn", 1);
        }
    }

    function nbtnOff() {
        if (elNum.get("nready") < 1 && elNum.get("nbtn") == 1) {
            $("#gRn").toggleClass("zo0");
            $("#nR").toggleClass("o0 o99");
            elSet.set("nbtn", 0);
        }
    }

    function uCheck() {
        var sum = units.reduce(function(a, b) { return a + b; }, 0);
        console.log("ucheck ", units.reduce(function(a, b) { return a + b; }, 0));
        if (sum == 3) {
            elSet.set("uready", 1);
            ubtnOn();
        }
        else if (sum < 3) {
            elSet.set("uready", 0);
            ubtnOff();
        }
    }

    function ubtnOn() {
        if (elNum.get("uready") == 1 && elNum.get("ubtn") < 1) {
            $("#gRu").toggleClass("zo0");
            $("#uL, #uR").toggleClass("o0 o99");
            elSet.set("ubtn", 1);
        }
    }

    function ubtnOff() {
        if (elNum.get("uready") < 1 && elNum.get("ubtn") == 1) {
            $("#gRu").toggleClass("zo0");
            $("#uL, #uR").toggleClass("o0 o99");
            elSet.set("ubtn", 0);
        }
    }

    function padCheck(el, uel, nel) {
        if (elNum.get("pad") == 1) {
            elUnit(el, uel);
        }
        if (elNum.get("pad") < 1) {
            elNumb(nel);
            nCheck();
        }
    }

    function elNumb(nel) {
        var jcode = document.getElementById("jcode").innerHTML;
        document.getElementById("jcode").innerHTML = jcode + nel;
    }

    function elUnit(el, uel) {
        var sum = units.reduce(function(a, b) { return a + b; }, 0);
        var seq = elNum.get(el);
        var color = "bg" + el.substr(0, 3);
        if (seq < 1) {
            if (sum < 3) {
                uFirst(el);
                $("#" + uel + " .bgcolor").toggleClass(color + " o0 o99");
            }
        }
        else if (seq >= 1) {
            elSet.set(el, 0);
            $("#" + uel + " .bgcolor").toggleClass(color + " o0 o99");
            clearUnits(seq);
        }
    }

    function clearUnits(seq) {
        var unitindex = Math.floor(seq - 1);
        units[unitindex] = 0;
        if (unitindex < 1) {
            elSet.set("unit1", 0);
            Cookies.remove("unit1");
            console.log("unit1 cookie removed", Cookies.get());
            uCheck();
        }
        else if (unitindex == 1) {
            elSet.set("unit2", 0);
            Cookies.remove("unit2");
            console.log("unit2 cookie removed", Cookies.get());
            uCheck();
        }
        else if (unitindex == 2) {
            elSet.set("unit3", 0);
            Cookies.remove("unit3");
            console.log("unit3 cookie removed", Cookies.get());
            uCheck();
        }
    }
    $("#g1").swipe({
        tap: function(event) { if (elNum.get("pad") < 1) { var nel = 1;
                elNumb(nel);
                nCheck(); } },
        threshold: 50
    });
    $("#g2").swipe({
        tap: function(event) { if (elNum.get("pad") < 1) { var nel = 2;
                elNumb(nel);
                nCheck(); } },
        threshold: 50
    });
    $("#g3").swipe({
        tap: function(event) { if (elNum.get("pad") < 1) { var nel = 3;
                elNumb(nel);
                nCheck(); } },
        threshold: 50
    });
    $("#g4").swipe({
        tap: function(event) { var el = "red1"; var uel = "u1"; var nel = 4;
            padCheck(el, uel, nel); },
        threshold: 50
    });
    $("#g5").swipe({
        tap: function(event) { var el = "prp1"; var uel = "u2"; var nel = 5;
            padCheck(el, uel, nel); },
        threshold: 50
    });
    $("#g6").swipe({
        tap: function(event) { var el = "trq1"; var uel = "u3"; var nel = 6;
            padCheck(el, uel, nel); },
        threshold: 50
    });
    $("#g7").swipe({
        tap: function(event) { var el = "blu1"; var uel = "u4"; var nel = 7;
            padCheck(el, uel, nel); },
        threshold: 50
    });
    $("#g8").swipe({
        tap: function(event) { var el = "grn1"; var uel = "u5"; var nel = 8;
            padCheck(el, uel, nel); },
        threshold: 50
    });
    $("#g9").swipe({
        tap: function(event) { var el = "ylo1"; var uel = "u6"; var nel = 9;
            padCheck(el, uel, nel); },
        threshold: 50
    });
    $("#g0").swipe({
        tap: function(event) { if (elNum.get("pad") < 1) { var nel = 0;
                elNumb(nel);
                nCheck(); } },
        threshold: 50
    });
})(jQuery);
