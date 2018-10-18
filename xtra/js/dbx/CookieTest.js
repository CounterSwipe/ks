define(function(require) {
    class CookieTest {
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
            this.testCookies();
        }
        testCookies() {
            /*global Cookies*/
            /*global localStorage*/
            if (this.lsTest()) {
                //window.sessionStorage.setItem(name, 1);
                //window.localStorage.setItem(name, "sheabear");
                //window.localStorage.removeItem(name);
                //console.log("looks like localStorage used here buddy!");
                //console.log(window.localStorage);
                //console.log(window.sessionStorage);
                //console.log(document.cookie);
            }
            else {
                document.cookie = "name=1; expires=Mon, 28 Mar 2016 12:00:00 UTC";
                console.log("they be eatin cookies here buddy!"); // log
            }
            console.log("cookies saved here buddy: ", Cookies.get());
            if (('localStorage' in window) && window.localStorage !== null) {
                //localStorage.setItem('name', 'value');
                //localStorage.removeItem('name');
                //localStorage.clear();
                console.log(localStorage);
            }
            else {
                Cookies.set('name', 'value', { expires: 3 });
                var uCookie = Cookies.get('name');
                console.log(uCookie);
                console.log(Cookies.get());
            }
        }
        lsTest() {
            var test = "test";
            try {
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            }
            catch (e) {
                return false;
            }
        }
        moduleID(mID) {
            for (var id = 0, modules = this.modules.length; id < modules; id++) {
                if (this.modules[id].name === mID) {
                    return id;
                }
            }
        }
    }
    return CookieTest;
});
