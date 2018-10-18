define(function() {
    class Module {
        constructor(area) {
            this.area = area || 5;
            this.eids = {};
            this.size = 0;
        }
        add(key, value) {
            const hash = this.getHash(key);
            if (!this.eids.hasOwnProperty(hash)) {
                this.eids[hash] = {};
            }
            if (!this.eids[hash].hasOwnProperty(key)) {
                this.size++;
            }
            this.eids[hash][key] = value;
        }
        getHash(key) {
            var j, k = key % 10;
            switch (k) {
                case 0:
                case 5:
                    j = 0 % this.area;
                    break;
                case 1:
                case 6:
                    j = 1 % this.area;
                    break;
                case 2:
                case 7:
                    j = 2 % this.area;
                    break;
                case 3:
                case 8:
                    j = 3 % this.area;
                    break;
                default:
                    j = 4 % this.area;
            }
            return j;
        }
        length() {
            return this.size;
        }
        remove(key) {
            const hash = this.getHash(key);
            if (this.eids.hasOwnProperty(hash) && this.eids[hash].hasOwnProperty(key)) {
                delete this.eids[hash][key];
                this.size--;
            }
        }
        reveal() {
            let v = [];
            for (const value in this.eids) {
                for (const key in this.eids[value]) {
                    v.push(this.eids[value][key]);
                }
            }
            return v;
        }
        search(key) {
            const hash = this.getHash(key);
            if (this.eids.hasOwnProperty(hash) && this.eids[hash].hasOwnProperty(key)) {
                return this.eids[hash][key];
            }
            else {
                return undefined;
            }
        }
        unveil() {
            let k = [];
            for (const value in this.eids) {
                for (const key in this.eids[value]) {
                    k.push(key);
                }
            }
            return k;
        }
    }
    return Module;
});
