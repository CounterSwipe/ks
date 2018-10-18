define(function() {
  /*global Crafty*/
  Crafty.c("Hash", {
    init: function() {
      this.eids = {};
      this.size = 0;
    },
    add: function(key, value) {
      const hash = this.getHash(key);
      if (!this.eids.hasOwnProperty(hash)) {
        this.eids[hash] = {};
      }
      if (!this.eids[hash].hasOwnProperty(key)) {
        this.size++;
      }
      this.eids[hash][key] = value;
      return this;
    },
    getHash: function(key) {
      var k = key % 10;
      return k;
    },
    length: function() {
      return this.size;
    },
    remove: function(key) {
      const hash = this.getHash(key);
      if (this.eids.hasOwnProperty(hash) && this.eids[hash].hasOwnProperty(key)) {
        delete this.eids[hash][key];
        this.size--;
      }
      return this;
    },
    reveal: function() {
      let v = [];
      for (const value in this.eids) {
        for (const key in this.eids[value]) {
          v.push(this.eids[value][key]);
        }
      }
      return v;
    },
    search: function(key) {
      const hash = this.getHash(key);
      if (this.eids.hasOwnProperty(hash) && this.eids[hash].hasOwnProperty(key)) {
        return this.eids[hash][key];
      }
      else {
        return undefined;
      }
    },
    unveil: function() {
      let k = [];
      for (const value in this.eids) {
        for (const key in this.eids[value]) {
          k.push(key);
        }
      }
      return k;
    }
  });
});
