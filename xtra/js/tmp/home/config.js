/*global requirejs, Crafty*/
"use strict";
if (typeof Crafty === "function") {
  define("Crafty", () => Crafty);
}
requirejs.config({
  urlArgs: "bust=" + (new Date()).getTime(),
  baseUrl: "..\\atut",
  paths: {
    db: "..\\db\\js",
    flow: "src\\flow",
    ini: "src\\ini",
    lib: "..\\lib",
    locale: "src\\locale",
    plugin: "src\\plugin",
    script: "src\\script",
    template: "src\\template",
    //Crafty: Crafty
    //$: document.getElementById
  },
  deps: ["main"]
});