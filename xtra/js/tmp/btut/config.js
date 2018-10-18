/*jshint esversion: 6*/ /*global requirejs Crafty*/
if (typeof Crafty === 'function') {
    define('Crafty', () => Crafty);
}
requirejs.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    baseUrl: "..\\atut",
    paths: {
        db: "..\\db\\js",
        lib: "..\\lib",
        gf: "src\\gf",
        ini: "src\\ini",
        input: "src\\input",
        logi: "src\\logi",
        loo: "src\\loo",
        scen: "src\\scen"        
        //$: document.getElementById
    },
    deps: ["main"]
});