requirejs.config({ /*global requirejs*/
    urlArgs: "bust=" + (new Date()).getTime(),
    //urlArgs: "bust=v2" for production = increment+ the hard-coded version num after rolling out updated required script
    baseUrl: "/wp-content/themes/blankslate-child/js/libsrcA",
    paths: {
        cs: "/wp-content/themes/blankslate-child/js/libsrcB",
        db: "/wp-content/themes/blankslate-child/js/db",
        adb: "/wp-content/themes/blankslate-child/js/adb",
    },
    deps: ["Main"]
});
