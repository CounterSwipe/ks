/*global Crafty*/
let C = Crafty;
C.scene("Game", function () {
  C.viewport.clampToEntities = false;
  C.s("_STAGE");
  //C.s("_Checkers");
  C.s("_UI");
  C.s("_GUI");
  C.s("_INPUTS");
  C.s("_MSGS");
  C.s("_VUE").setVue();
  C.s("Ticked").start();
});