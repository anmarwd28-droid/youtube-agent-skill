// ===================== scene list =====================
const SCENES = [{ s: 0, f: sceneHook }, { s: CS(1), f: sceneStreetDay }, { s: S0(4) - .2, f: sceneLight }, { s: S0(5) - .2, f: sceneAirport }, { s: WS(5, 8) - .2, f: sceneSchool }, { s: S0(6) - .2, f: sceneOrbit },
  { s: S0(7) - .2, f: sceneLightsOut, xf: .3 }, { s: WS(7, 12) - .2, f: sceneHalf }, { s: S0(8) - .2, f: sceneAway }, { s: S0(9) - .2, f: sceneNoShake }, { s: WS(9, 10) - .2, f: sceneMoon },
  { s: S0(11) - .2, f: scenePlanets }, { s: S0(12) - .2, f: sceneSat }, { s: WS(12, 8) - .2, f: sceneScatter }, { s: S0(13) - .2, f: sceneTide }, { s: S0(14) - .2, f: sceneSkyField },
  { s: CS(3), f: sceneFarm }, { s: S0(17) - .2, f: sceneBirds }, { s: S0(18) - .2, f: sceneHeat }, { s: S0(19) - .2, f: sceneWeather }, { s: S0(20) - .2, f: sceneCityLit },
  { s: CS(4), f: sceneEarthCool }, { s: S0(22) - .2, f: sceneDesert }, { s: S0(23) - .2, f: sceneCoast }, { s: S0(24) - .2, f: sceneSnowWorld }, { s: S0(25) - .2, f: sceneLake }, { s: S0(25) + 2.4, f: sceneFrozenStreet }, { s: S0(26) - .2, f: sceneGraph },
  { s: CS(5), f: scenePort }, { s: S0(28) - .2, f: sceneDeadField }, { s: S0(29) - .2, f: sceneBigTree }, { s: S0(30) - .2, f: sceneAlgae }, { s: S0(31) - .2, f: sceneSilos },
  { s: CS(6), f: sceneYear }, { s: S0(34) - .2, f: sceneOutside }, { s: S0(35) - .2, f: sceneIceLid }, { s: S0(36) - .2, f: sceneBunker }, { s: S0(37) - .2, f: sceneReactor }, { s: WS(37, 9) - .2, f: sceneSub }, { s: S0(38) - .2, f: sceneFew }, { s: S0(39) - .2, f: sceneLifeDown },
  { s: CS(7), f: sceneSurface100 }, { s: S0(41) - .2, f: sceneKids }, { s: S0(42) - .2, f: sceneTunnels }, { s: S0(43) - .2, f: sceneWater }, { s: S0(44) - .2, f: sceneSuit },
  { s: CS(8), f: sceneEarth1000 }, { s: S0(47) - .2, f: sceneAirRain }, { s: S0(48) - .2, f: sceneAirLayer }, { s: S0(49) - .2, f: sceneSilent }, { s: S0(50) - .2, f: sceneRays }, { s: S0(51) - .2, f: sceneDeepDive }, { s: S0(52) - .2, f: sceneVents }, { s: S0(53) - .2, f: sceneWorms }, { s: S0(54) - .2, f: sceneAlvin }, { s: S0(55) - .2, f: sceneVentsFar },
  { s: CS(9), f: sceneIceBall }, { s: S0(57) - .2, f: sceneFar }, { s: S0(58) - .2, f: sceneProbe }, { s: S0(59) - .2, f: sceneRogue }, { s: S0(60) - .2, f: sceneSurprise }, { s: S0(61) - .2, f: sceneRockLife }, { s: WS(61, 11) - .2, f: sceneCore },
  { s: CS(10), f: sceneSunBack }, { s: S0(64) - .2, f: sceneChoice }, { s: S0(65) - .2, f: sceneEarth }];
const XF = .5;
uiInit();
