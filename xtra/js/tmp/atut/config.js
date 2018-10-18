/*global requirejs*/
"use strict";
//if (typeof Crafty === "function") {
//define("Crafty", () => Crafty);
//}
requirejs.config({
  urlArgs: "bust=" + (new Date()).getTime(),
  baseUrl: "..\\atut",
  paths: {
    crafty: "https://cdnjs.cloudflare.com/ajax/libs/crafty/0.9.0/crafty-min",
    db: "..\\db\\js",
    flow: "src\\flow",
    ini: "src\\ini",
    lib: "..\\lib",
    locale: "src\\locale",
    plugin: "src\\plugin",
    script: "src\\script",
    template: "src\\template",
    util: "src\\util"
  },
  //deps: ["main"]
});
requirejs(["main"]);
