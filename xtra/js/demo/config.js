/*global Crafty TweenMax modifiers requirejs baseUrl*/
if (typeof Crafty === 'function') {
    define('Crafty', () => Crafty);
}
if (typeof TweenMax === 'function') {
    define('TweenMax', () => TweenMax);
}
if (typeof modifiers === 'function') {
    define('modifiers', () => modifiers);
}
'use strict';
requirejs.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    baseUrl: "/wp-content/themes/blankslate-child/js/demo/",
    paths: {
        db: "/wp-content/themes/blankslate-child/js/db",
        lib: "/wp-content/themes/blankslate-child/js/lib",
        scenes: "/wp-content/themes/blankslate-child/js/demo/src/scenes",
        inputs: "/wp-content/themes/blankslate-child/js/demo/src/inputs"
    },
    deps: ["main"]
});
