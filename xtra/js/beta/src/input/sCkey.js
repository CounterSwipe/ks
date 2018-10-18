define(function() {
  /*global Crafty*/
  Crafty.c("MSG", {
    msg: function(msg) {
      if (msg) {
        this._msg = msg;
        return this;
      }
      else { return this._msg; }
    }
  });
  Crafty.s("GET_CKEY", {
    getCkey: function(cKey) {
      let cK;
      switch (cKey) {
        case 715:
        case 815:
        case 915:
          cK = cKey - 591; //124
          break;
        case 716:
        case 816:
        case 916:
          cK = cKey - 593; //123
          break;
        case 717:
        case 817:
        case 917:
          cK = cKey - 595; //122
          break;
        case 718:
        case 818:
        case 918:
          cK = cKey - 597; //121
          break;
        case 719:
        case 819:
        case 919:
          cK = cKey - 599; //120
          break;
        case 720:
        case 820:
        case 920:
          cK = cKey - 601; //119
          break;
        case 721:
        case 821:
        case 921:
          cK = cKey - 603; //118
          break;
        case 722:
        case 822:
        case 922:
          cK = cKey - 605; //117
          break;
        case 723:
        case 823:
        case 923:
          cK = cKey - 607; //116
          break;
        case 724:
        case 824:
        case 924:
          cK = cKey - 609; //115
          break;
        case 725:
        case 825:
        case 925:
          cK = cKey - 611; //114
          break;
        case 422:
        case 522:
        case 622:
          cK = cKey - 5;
          break;
        case 423:
        case 523:
        case 623:
          cK = cKey - 7;
          break;
        case 424:
        case 524:
        case 624:
          cK = cKey - 9;
          break;
        case 425:
        case 525:
        case 625:
          cK = cKey - 11;
          break;
      }
      return cK;
    },
  }, true);
});
