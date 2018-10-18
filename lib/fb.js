/*global firebase*/
function init() {
  //  
}
let c = console;
let log = c.log;

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
    //if (window.Crafty) {
    //init();
    //}
    log("@fbSuccess", app, features.join(", "));
    //Crafty.log("@fbSuccess", app, features.join(", "));
  } catch (e) {
    log(e, "fb error");
    //Crafty.error(e, "fb error");
    //if (window.Crafty && Crafty("LOADTXT").get(0)) {
    //Crafty.log(window.Crafty);
    //let t = Crafty("LOADTXT").get(0);
    //t.text("Error loading the Firebase SDK, check the console.");
    //}
  }
});