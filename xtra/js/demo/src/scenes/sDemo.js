define(function() {
  /*global Crafty localStorage*/
  Crafty.scene("Demo", function() {
    Crafty.viewport.clampToEntities = false;
    Crafty.s("SET_MUGS");
    Crafty.s("SET_SELECT");
    Crafty.e("Touches").
    setT(() => Crafty.s("SET_SELECT").update()).
    setU(() => localStorage.clear()).
    setL(goLogin);

    function goLogin() {
      return window.location.href = "/wp-login.php/";
    }
    //Crafty.trigger("GameStart");
    console.log("demo");
  });
});
