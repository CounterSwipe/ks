export default {
  0: {
    name: "Player Too",
    loa: 0,
    //req2: 10, //meta.fn(character1^4.trait2.req)//trait0=special,trait1=start
    //req3: 10, //meta.fn(character1^4.trait3.req)//""
    //bg etc
  },
  1: {
    //name: cName,
    c: 1, //character#
    w: 100, //wardrobe# = (#*10 + tint#) + #, wardrobeTint = wardrobe.toString.substr(-1) (0^7=^8colors)
    r: 3, //rarity# //[0:gry|std,1:grn|core,2:trq|rare,3:prp|alpha,4:ylo|omega]
    v: 0, //via# = (#*10) + #, viaTint = via.toString.subStr(-1)
    //TODO: @center xL -> dirL|dirR -> on a per character basis in meta!
    //TODO: perhaps base stats in own {}?
    //TODO: mobility = edge portal behavior & seq etc
    0: {
      //[seq, req, cost, kind|mobility, spd, hp, rng, agi, dmg, orb], comps[comp]->@cue:applyComp
      vals: [0, 0, 0, 1, 20, 100, 3, 60, 40, 1], //special
      comps: [0, 1, 2],
    },
    1: {
      //(1|7)|(2|8)|(3|9)|(4|10)?abcd:(5|11)|(6|12)?ef:13+move#
      trait: 1,
      //0:special,1|2|3:pri,4|5|6:alt,7^12:ult,13+aoe|dance
      // url/db/c#.js[trait#] OR meta.fn(trait[#].vals|comps)
      //map: [1, 0], //ss.map[x,y]->x|y=trait<4?trait|0:x|y=trait<8?trait-4|1:x|y=trait<12?trait-8|2:trait-12|3
      //ss: 0,
      //TODO: mobility #
      vals: [1, 0, 2.1, 1, 25, 100, 3, 60, 40, 1], //spd:hi:25|lo:75
      comps: [0, 1, 2],
    },
    2: {
      trait: 4, //map: [1, 1],
      vals: [4, 1, 2.4, 2, 25, 100, 3, 60, 40, 2],
      comps: [0, 1, 2],
    },
    3: {
      trait: 8, //map: [2, 2],
      vals: [11, 1, 3, 3, 25, 100, 3, 60, 40, 3],
      comps: [0, 1, 2],
    },
    4: {
      trait: 13,
      //adjDance# = (#*10) + #, danceTint = via.toString.substr(-1)
      vals: [0, 0, 0, 1, 20, 100, 3, 60, 40, 1], //adjAtk
      comps: [0, 1, 2],
    },
  },
  2: {
    c: 2,
    w: 100,
    r: 2,
    v: 1,
    0: {
      vals: [0, 0, 0, 1, 7, 100, 3, 60, 40, 0],
      comps: [0, 1, 2],
    },
    1: {
      trait: 1,
      vals: [1, 0, 2.1, 4, 38, 100, 3, 60, 40, 1],
      comps: [0, 1, 2],
    },
    2: {
      trait: 4,
      vals: [4, 1, 2.4, 5, 38, 100, 3, 60, 40, 3],
      comps: [0, 1, 2],
    },
    3: {
      trait: 7,
      vals: [11, 1, 3, 6, 38, 100, 3, 60, 40, 2],
      comps: [0, 1, 2],
    },
    4: {
      trait: 13,
      vals: [0, 0, 0, 1, 7, 100, 3, 60, 40, 1],
      comps: [0, 1, 2],
    },
  },
  3: {
    c: 3,
    w: 100,
    r: 1,
    v: 2,
    0: {
      vals: [0, 0, 0, 1, 7, 100, 3, 60, 40, 1],
      comps: [0, 1, 2],
    },
    1: {
      trait: 1,
      vals: [1, 0, 2.1, 1, 50, 100, 3, 60, 40, 1],
      comps: [0, 1, 2],
    },
    2: {
      trait: 4,
      vals: [4, 1, 2.4, 1, 50, 100, 3, 60, 40, 3],
      comps: [0, 1, 2],
    },
    3: {
      trait: 7,
      vals: [11, 1, 3, 1, 50, 100, 3, 60, 40, 2],
      comps: [0, 1, 2],
    },
    4: {
      trait: 13,
      vals: [0, 0, 0, 1, 7, 100, 3, 60, 40, 1],
      comps: [0, 1, 2],
    },
  },
  4: {
    c: 8,
    w: 100,
    r: 4,
    v: 3,
    0: {
      vals: [0, 0, 0, 1, 7, 100, 3, 60, 40, 1],
      comps: [0, 1, 2],
    },
    1: {
      trait: 1,
      vals: [1, 0, 2.1, 1, 75, 100, 3, 60, 40, 1],
      comps: [0, 1, 2],
    },
    2: {
      trait: 4,
      vals: [4, 1, 2.4, 1, 75, 100, 3, 60, 40, 3],
      comps: [0, 1, 2],
    },
    3: {
      trait: 7,
      vals: [11, 1, 3, 1, 75, 100, 3, 60, 40, 2],
      comps: [0, 1, 2],
    },
    4: {
      trait: 13,
      vals: [0, 0, 0, 1, 7, 100, 3, 60, 40, 1],
      comps: [0, 1, 2],
    },
  },
};