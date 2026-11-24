// ===================== scene list =====================
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(2) - .2, f: sceneGlobe }, { s: S0(3) - .2, f: sceneOneDay }, { s: S0(4) - .2, f: sceneSecret },
  { s: CS(1), f: sceneRoof }, { s: S0(6) - .2, f: sceneHeadrest }, { s: S0(7) - .2, f: sceneHouse }, { s: S0(8) - .2, f: sceneBreakfast }, { s: S0(10) - .2, f: sceneBite }, { s: S0(12) - .2, f: sceneTeeth },
  { s: CS(2), f: sceneNileWide }, { s: S0(15) - .2, f: sceneFlood }, { s: S0(16) - .2, f: sceneSirius }, { s: S0(18) - .2, f: sceneCalendar }, { s: S0(19) - .2, f: sceneDanger },
  { s: S0(21) - .2, f: sceneCargo }, { s: S0(22) - .2, f: sceneDiary }, { s: S0(23) - .2, f: sceneMap }, { s: S0(24) - .2, f: sceneOldest }, { s: S0(25) - .2, f: sceneToward },
  { s: CS(3), f: scenePyrBig }, { s: S0(27) - .2, f: sceneHeight }, { s: S0(28) - .2, f: sceneBlocks }, { s: S0(29) - .2, f: sceneCasing }, { s: S0(30) - .2, f: sceneMyth },
  { s: S0(31) - .2, f: sceneWages }, { s: S0(32) - .2, f: sceneVillage }, { s: S0(33) - .2, f: sceneTombs }, { s: S0(34) - .2, f: sceneGangs }, { s: S0(35) - .2, f: sceneSledge }, { s: S0(37) - .2, f: sceneFriction },
  { s: S0(38) - .2, f: sceneTombArt }, { s: S0(39) - .2, f: sceneGranite }, { s: S0(40) - .2, f: sceneTools }, { s: S0(41) - .2, f: sceneNorth }, { s: S0(42) - .2, f: sceneScream },
  { s: CS(4), f: sceneInjury }, { s: S0(46) - .2, f: sceneSmith }, { s: S0(47) - .2, f: sceneSplint }, { s: S0(48) - .2, f: sceneHoney }, { s: S0(50) - .2, f: sceneHealed }, { s: S0(51) - .2, f: sceneBackWork }, { s: S0(52) - .2, f: sceneDung },
  { s: CS(5), f: sceneMarket }, { s: S0(55) - .2, f: sceneCoins }, { s: S0(56) - .2, f: sceneBarter }, { s: S0(57) - .2, f: sceneKohl }, { s: S0(58) - .2, f: sceneKohlSci }, { s: S0(59) - .2, f: sceneWig }, { s: S0(60) - .2, f: sceneScribeSee },
  { s: CS(6), f: sceneScribe }, { s: S0(62) - .2, f: sceneLiteracy }, { s: S0(63) - .2, f: sceneHiero }, { s: S0(64) - .2, f: sceneAccounts }, { s: S0(65) - .2, f: sceneRich }, { s: S0(66) - .2, f: sceneSunset },
  { s: CS(7), f: sceneEvening }, { s: S0(68) - .2, f: sceneSenet }, { s: S0(69) - .2, f: sceneNightRoof }, { s: S0(70) - .2, f: sceneSiriusNight }, { s: S0(71) - .2, f: sceneLife },
  { s: CS(8), f: sceneSecret2 }, { s: S0(74) - .2, f: sceneTallest }, { s: S0(75) - .2, f: sceneCleo }, { s: S0(76) - .2, f: sceneOldEven }, { s: S0(77) - .2, f: sceneSurvive }, { s: S0(78) - .2, f: sceneEnd }];
const XF = .5;
uiInit();
