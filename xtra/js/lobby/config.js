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
    baseUrl: "/wp-content/themes/blankslate-child/js/lobby/",
    paths: {
        db: "/wp-content/themes/blankslate-child/js/db",
        lib: "/wp-content/themes/blankslate-child/js/lib"
    },
    deps: ["main"]
});
