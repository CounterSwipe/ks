if (typeof Crafty === 'function') {
    define('Crafty', () => Crafty); /*global Crafty*/
}
if (typeof TweenMax === 'function') {
    define('TweenMax', () => TweenMax); /*global TweenMax*/
}
if (typeof modifiers === 'function') {
    define('modifiers', () => modifiers); /*global modifiers*/
}
'use strict'; /*global requirejs*/
requirejs.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    baseUrl: "/wp-content/themes/blankslate-child/js/beta/",
    paths: {
        db: "/wp-content/themes/blankslate-child/js/db",
        lib: "/wp-content/themes/blankslate-child/js/lib",
        gf: "/wp-content/themes/blankslate-child/js/beta/src/gf",
        ini: "/wp-content/themes/blankslate-child/js/beta/src/ini",
        input: "/wp-content/themes/blankslate-child/js/beta/src/input",
        logi: "/wp-content/themes/blankslate-child/js/beta/src/logi",
        loo: "/wp-content/themes/blankslate-child/js/beta/src/loo",
        scen: "/wp-content/themes/blankslate-child/js/beta/src/scen"
        //$: document.getElementById
    },
    deps: ["main"]
});
