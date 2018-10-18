define(function() {
    var e = 300;
    class Eid {
        constructor() {
            this.id = e;
            e++;
        }
    }
    return Eid;
});
