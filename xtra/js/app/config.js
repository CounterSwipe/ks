requirejs.config({ /*global requirejs*/
    urlArgs: "bust=" + (new Date()).getTime(),
    //urlArgs: "bust=v2" for production = increment+ the hard-coded version num after rolling out updated required script
    baseUrl: "/wp-content/themes/blankslate-child/js/app",
    paths: {
        cs: "/wp-content/themes/blankslate-child/js/lib",
        db: "/wp-content/themes/blankslate-child/js/db",
    },
    deps: ["Main"]
});
