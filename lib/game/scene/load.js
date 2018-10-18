/*global Crafty*/
let C = Crafty;
C.scene("Load", function () {
  C.viewport.clampToEntities = false;
  C.s("_VUE");
  C.e("SETTINGS").settings({
    tm: 4
  }); //traitMax:2|3|4|8, timer, etc
  C.s("_TRAITS");
  C.s("_IMGZ");
});