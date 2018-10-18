/*global firebase, Crafty*/
function init() {
  let Crafty = window.Crafty;
  Crafty.init();
  Crafty.scene("Load");//Home
  Crafty.log(Crafty("*").get());
  //Crafty.s("SET_VUE").setVue();
}
document.addEventListener("DOMContentLoaded", function () {
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  // // The Firebase SDK is initialized and available here!
  // firebase.auth().onAuthStateChanged(user => { });
  // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
  // firebase.messaging().requestPermission().then(() => { });
  // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  try {
    let app = firebase.app();
    let features = ["auth", "database", "messaging", "storage"].filter(
      feature => typeof app[feature] === "function");

    /*if (window.Crafty && Crafty("LOADTXT").get(0)) {
      let t = Crafty("LOADTXT").get(0);
      t.text(`Firebase SDK loaded with ${features.join(", ")}`);
    }*/
    if (window.Crafty) {
      init();
    }
    Crafty.log("@fbSuccess", app, features.join(", "));
  } catch (e) {
    Crafty.error(e, "fb error");
    if (window.Crafty && Crafty("LOADTXT").get(0)) {
      Crafty.log(window.Crafty);
      let t = Crafty("LOADTXT").get(0);
      t.text("Error loading the Firebase SDK, check the console.");
    }
  }
});