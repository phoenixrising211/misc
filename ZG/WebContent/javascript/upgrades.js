//Click Attack Upgrades
var doubleClick = function(){
	var obj = powers["ClickAttack"];
	obj.damage*=2;
	var div = d3.select("#ClickAttack div .descText");
	div.text("A basic attack that deals " + format(obj.damage) + " damage. You can only click this attack once " +
					"every " + (obj.cooldown == 1 ? "second." : format(obj.cooldown) + " seconds."));
}

var improvedClick = function(){
	var obj = powers["ClickAttack"];
	obj.cooldown/=2;
	var div = d3.select("#ClickAttack div .descText")
	div.text("A basic attack that deals " + format(obj.damage) + " damage. You can only click this attack once " +
					"every " + (obj.cooldown == 1 ? "second." : format(obj.cooldown) + " seconds."));
}

//Autoattack Upgrades
var unlockAutoattack = function(){
	d3.select("#Autoattack").classed("locked", false);
	setTimeout(function(){ auto(autos["Autoattack"]); }, autos["Autoattack"].cooldown*1000);
}

var autoattackLv2 = function(){
	var obj = autos["Autoattack"];
	obj.damage*=2;
	var div = d3.select("#Autoattack div .descText");
	div.text("Attacks automatically for you " +
					"every " + (obj.cooldown == 1 ? "second" : format(obj.cooldown) + " seconds") + ", " +
					"dealing " + format(obj.damage) + " damage.");
}

var improvedAutoattack = function(){
	var obj = autos["Autoattack"];
	obj.cooldown/=2;
	div = d3.select("#Autoattack div .descText");
	div.text("Attacks automatically for you " +
					"every " + (obj.cooldown == 1 ? "second" : format(obj.cooldown) + " seconds") + ", " +
					"dealing " + format(obj.damage) + " damage.");
}

//Flame Shock Upgrades
var unlockFlameShock = function(){
	d3.select("#FlameShock").classed("locked", false);
}

var flameShockLv2 = function(){
	var obj = powers["FlameShock"];
	obj.damage*=2;
	var div = d3.select("#FlameShock div .descText");
	var coolText = format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "1 second.";
	else if(obj.cooldown == 60) coolText = "1 minute.";
	else if(obj.cooldown%60 == 0) coolText = format(obj.cooldown/60) + " minutes.";
	div.text("A fire spell that deals " + format(obj.damage) + " damage with a cooldown of " + coolText);
}

var improvedFlameShock = function(){
	var obj = powers["FlameShock"];
	obj.cooldown/=2;
	var div = d3.select("#FlameShock div .descText")
	var coolText = format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "1 second.";
	else if(obj.cooldown == 60) coolText = "1 minute.";
	else if(obj.cooldown%60 == 0) coolText = format(obj.cooldown/60) + " minutes.";
	div.text("A fire spell that deals " + format(obj.damage) + " damage with a cooldown of " + coolText);
}

//Searing Totem Upgrades
var unlockSearingTotem = function(){
	d3.select("#SearingTotem").classed("locked", false);
	setTimeout(function(){ auto(autos["SearingTotem"]); }, autos["SearingTotem"].cooldown*1000);
}

var searingTotemLv2 = function(){
	var obj = autos["SearingTotem"];
	obj.damage*=2;
	var div = d3.select("#SearingTotem div .descText");
	var coolText = "every " + format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "every second.";
	else if(obj.cooldown == 60) coolText = "once every minute.";
	else if(obj.cooldown%60 == 0) coolText = "once every " + format(obj.cooldown/60) + " minutes.";
	div.text("Your autoattack deals an additional " + format(obj.damage) + " fire damage " + coolText);
}

var improvedSearingTotem = function(){
	var obj = autos["SearingTotem"];
	obj.cooldown/=2;
	div = d3.select("#SearingTotem div .descText");
	var coolText = "every " + format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "every second.";
	else if(obj.cooldown == 60) coolText = "once every minute.";
	else if(obj.cooldown%60 == 0) coolText = "once every " + format(obj.cooldown/60) + " minutes.";
	div.text("Your autoattack deals an additional " + format(obj.damage) + " fire damage " + coolText);
}

//Lightning Bolt Upgrades
var unlockLightningBolt = function(){
	d3.select("#LightningBolt").classed("locked", false);
}

var lightningBoltLv2 = function(){
	var obj = powers["LightningBolt"];
	obj.damage*=2;
	var div = d3.select("#LightningBolt div .descText");
	var coolText = format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "1 second.";
	else if(obj.cooldown == 60) coolText = "1 minute.";
	else if(obj.cooldown%60 == 0) coolText = format(obj.cooldown/60) + " minutes.";
	div.text("A lightning spell that deals " + format(obj.damage) + " damage with a cooldown of " + coolText);
}

var improvedLightningBolt = function(){
	var obj = powers["LightningBolt"];
	obj.cooldown/=2;
	var div = d3.select("#LightningBolt div .descText")
	var coolText = format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "1 second.";
	else if(obj.cooldown == 60) coolText = "1 minute.";
	else if(obj.cooldown%60 == 0) coolText = format(obj.cooldown/60) + " minutes.";
	div.text("A lightning spell that deals " + format(obj.damage) + " damage with a cooldown of " + coolText);
}

//Maelstrom Upgrades
var unlockMaelstrom = function(){
	d3.select("#Maelstrom").classed("locked", false);
	setTimeout(function(){ auto(autos["Maelstrom"]); }, autos["Maelstrom"].cooldown*1000);
}

var maelstromLv2 = function(){
	var obj = autos["Maelstrom"];
	obj.damage*=2;
	var div = d3.select("#Maelstrom div .descText");
	var coolText = "every " + format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "every second.";
	else if(obj.cooldown == 60) coolText = "once every minute.";
	else if(obj.cooldown%60 == 0) coolText = "once every " + format(obj.cooldown/60) + " minutes.";
	div.text("Your autoattack deals an additional " + format(obj.damage) + " lightning damage " + coolText);
}

var improvedMaelstrom = function(){
	var obj = autos["Maelstrom"];
	obj.cooldown/=2;
	div = d3.select("#Maelstrom div .descText");
	var coolText = "every " + format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "every second.";
	else if(obj.cooldown == 60) coolText = "once every minute.";
	else if(obj.cooldown%60 == 0) coolText = "once every " + format(obj.cooldown/60) + " minutes.";
	div.text("Your autoattack deals an additional " + format(obj.damage) + " lightning damage " + coolText);
}

//Flametongue Upgrades
var unlockFlametongue = function(){
	d3.select("#Flametongue").classed("locked", false);
}

var flametongueLv2 = function(){
	var obj = powers["Flametongue"];
	obj.damage*=2;
	var div = d3.select("#Flametongue div .descText");
	var coolText = format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "1 second.";
	else if(obj.cooldown == 60) coolText = "1 minute.";
	else if(obj.cooldown%60 == 0) coolText = format(obj.cooldown/60) + " minutes.";
	div.text("A burst of flame that deals " + format(obj.damage) + " damage with a cooldown of " + coolText);
}

var improvedFlametongue = function(){
	var obj = powers["Flametongue"];
	obj.cooldown/=2;
	var div = d3.select("#Flametongue div .descText")
	var coolText = format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "1 second.";
	else if(obj.cooldown == 60) coolText = "1 minute.";
	else if(obj.cooldown%60 == 0) coolText = format(obj.cooldown/60) + " minutes.";
	div.text("A burst of flame that deals " + format(obj.damage) + " damage with a cooldown of " + coolText);
}

//Magma Totem Upgrades
var unlockMagmaTotem = function(){
	d3.select("#MagmaTotem").classed("locked", false);
	setTimeout(function(){ auto(autos["MagmaTotem"]); }, autos["MagmaTotem"].cooldown*1000);
}

var magmaTotemLv2 = function(){
	var obj = autos["MagmaTotem"];
	obj.damage*=2;
	var div = d3.select("#MagmaTotem div .descText");
	var coolText = "every " + format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "every second.";
	else if(obj.cooldown == 60) coolText = "once every minute.";
	else if(obj.cooldown%60 == 0) coolText = "once every " + format(obj.cooldown/60) + " minutes.";
	div.text("Your autoattack deals an additional " + format(obj.damage) + " magma damage " + coolText);
}

var improvedMagmaTotem = function(){
	var obj = autos["MagmaTotem"];
	obj.cooldown/=2;
	div = d3.select("#MagmaTotem div .descText");
	var coolText = "every " + format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "every second.";
	else if(obj.cooldown == 60) coolText = "once every minute.";
	else if(obj.cooldown%60 == 0) coolText = "once every " + format(obj.cooldown/60) + " minutes.";
	div.text("Your autoattack deals an additional " + format(obj.damage) + " magma damage " + coolText);
}

//Stormstrike Upgrades
var unlockStormstrike = function(){
	d3.select("#Stormstrike").classed("locked", false);
}

var stormstrikeLv2 = function(){
	var obj = powers["Stormstrike"];
	obj.damage*=2;
	var div = d3.select("#Stormstrike div .descText");
	var coolText = format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "1 second.";
	else if(obj.cooldown == 60) coolText = "1 minute.";
	else if(obj.cooldown%60 == 0) coolText = format(obj.cooldown/60) + " minutes.";
	div.text("A powerful lightning attack that deals " + format(obj.damage) + " damage with a cooldown of " + coolText);
}

var improvedStormstrike = function(){
	var obj = powers["Stormstrike"];
	obj.cooldown/=2;
	var div = d3.select("#Stormstrike div .descText")
	var coolText = format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "1 second.";
	else if(obj.cooldown == 60) coolText = "1 minute.";
	else if(obj.cooldown%60 == 0) coolText = format(obj.cooldown/60) + " minutes.";
	div.text("A powerful lightning attack that deals " + format(obj.damage) + " damage with a cooldown of " + coolText);
}

//Windfury Upgrades
var unlockWindfury = function(){
	d3.select("#Windfury").classed("locked", false);
	setTimeout(function(){ auto(autos["Windfury"]); }, autos["Windfury"].cooldown*1000);
}

var windfuryLv2 = function(){
	var obj = autos["Windfury"];
	obj.damage*=2;
	var div = d3.select("#Windfury div .descText");
	var coolText = "every " + format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "every second.";
	else if(obj.cooldown == 60) coolText = "once every minute.";
	else if(obj.cooldown%60 == 0) coolText = "once every " + format(obj.cooldown/60) + " minutes.";
	div.text("Your autoattack strikes with the fury of the wind, dealing an additional " + format(obj.damage) + " damage " + coolText);
}

var improvedWindfury = function(){
	var obj = autos["Windfury"];
	obj.cooldown/=2;
	div = d3.select("#Windfury div .descText");
	var coolText = "every " + format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "every second.";
	else if(obj.cooldown == 60) coolText = "once every minute.";
	else if(obj.cooldown%60 == 0) coolText = "once every " + format(obj.cooldown/60) + " minutes.";
	div.text("Your autoattack strikes with the fury of the wind, dealing an additional " + format(obj.damage) + " damage " + coolText);
}

//Lava Lash Upgrades
var unlockLavaLash = function(){
	d3.select("#LavaLash").classed("locked", false);
}

var lavaLashLv2 = function(){
	var obj = powers["LavaLash"];
	obj.damage*=2;
	var div = d3.select("#LavaLash div .descText");
	var coolText = format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "1 second.";
	else if(obj.cooldown == 60) coolText = "1 minute.";
	else if(obj.cooldown%60 == 0) coolText = format(obj.cooldown/60) + " minutes.";
	div.text("A lava strike that deals " + format(obj.damage) + " damage with a cooldown of " + coolText);
}

var improvedLavaLash = function(){
	var obj = powers["LavaLash"];
	obj.cooldown/=2;
	var div = d3.select("#LavaLash div .descText")
	var coolText = format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "1 second.";
	else if(obj.cooldown == 60) coolText = "1 minute.";
	else if(obj.cooldown%60 == 0) coolText = format(obj.cooldown/60) + " minutes.";
	div.text("A lava strike that deals " + format(obj.damage) + " damage with a cooldown of " + coolText);
}

//Fire Elemental Upgrades
var unlockFireElemental = function(){
	d3.select("#FireElemental").classed("locked", false);
	setTimeout(function(){ auto(autos["FireElemental"]); }, autos["FireElemental"].cooldown*1000);
}

var fireElementalLv2 = function(){
	var obj = autos["FireElemental"];
	obj.damage*=2;
	var div = d3.select("#FireElemental div .descText");
	var coolText = "every " + format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "every second.";
	else if(obj.cooldown == 60) coolText = "once every minute.";
	else if(obj.cooldown%60 == 0) coolText = "once every " + format(obj.cooldown/60) + " minutes.";
	div.text("Summon an elemental of fire to attack alongside you, dealing " + format(obj.damage) + " damage " + coolText);
}

var improvedFireElemental = function(){
	var obj = autos["FireElemental"];
	obj.cooldown/=2;
	div = d3.select("#FireElemental div .descText");
	var coolText = "every " + format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "every second.";
	else if(obj.cooldown == 60) coolText = "once every minute.";
	else if(obj.cooldown%60 == 0) coolText = "once every " + format(obj.cooldown/60) + " minutes.";
	div.text("Summon an elemental of fire to attack alongside you, dealing " + format(obj.damage) + " damage " + coolText);
}

//Fire Nova Upgrades
var unlockFireNova = function(){
	d3.select("#FireNova").classed("locked", false);
}

var fireNovaLv2 = function(){
	var obj = powers["FireNova"];
	obj.damage*=2;
	var div = d3.select("#FireNova div .descText");
	var coolText = format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "1 second.";
	else if(obj.cooldown == 60) coolText = "1 minute.";
	else if(obj.cooldown%60 == 0) coolText = format(obj.cooldown/60) + " minutes.";
	div.text("A fiery explosion that deals " + format(obj.damage) + " damage with a cooldown of " + coolText);
}

var improvedFireNova = function(){
	var obj = powers["FireNova"];
	obj.cooldown/=2;
	var div = d3.select("#FireNova div .descText")
	var coolText = format(obj.cooldown) + " seconds.";
	if(obj.cooldown == 1) coolText = "1 second.";
	else if(obj.cooldown == 60) coolText = "1 minute.";
	else if(obj.cooldown%60 == 0) coolText = format(obj.cooldown/60) + " minutes.";
	div.text("A fiery explosion that deals " + format(obj.damage) + " damage with a cooldown of " + coolText);
}

var upgrades = {"UnlockAutoattack":{name:"Unlock Autoattack", icon:"Autoattack", cost:6, fn:unlockAutoattack,
					unlocks:["AutoattackLv2","UnlockFlameShock"],
					desc:"Unlocks Autoattack. Attacks automatically for you every 32 seconds, dealing 2 damage."},
				"AutoattackLv2":{name:"Autoattack Lv.2", icon:"Autoattack", cost:7, fn:autoattackLv2,
					unlocks:["AutoattackLv3"],
					desc:"Your Autoattack deals 4 damage."},
				"DoubleClick":{name:"Double Click", icon:"ClickAttack", cost:17, fn:doubleClick,
					unlocks:["QuadrupleClick"],
					desc:"Your Click Attack deals 2 damage."},
				"AutoattackLv3":{name:"Autoattack Lv.3", icon:"Autoattack", cost:17, fn:autoattackLv2,
					unlocks:["AutoattackLv4"],
					desc:"Your Autoattack deals 8 damage."},
				"QuadrupleClick":{name:"Quadruple Click", icon:"ClickAttack", cost:43, fn:doubleClick,
					unlocks:["OctupleClick"],
					desc:"Your Click Attack deals 4 damage."},
				"AutoattackLv4":{name:"Autoattack Lv.4", icon:"Autoattack", cost:52, fn:autoattackLv2,
					unlocks:["AutoattackLv5","ImprovedAutoattack"],
					desc:"Your Autoattack deals 16 damage."},
				"ImprovedAutoattack":{name:"Improved Autoattack", icon:"Autoattack", cost:60, fn:improvedAutoattack,
					unlocks:["GreaterAutoattack"],
					desc:"Your Autoattack hits every 16 seconds."},
				"UnlockFlameShock":{name:"Unlock Flame Shock", icon:"FlameShock", cost:60, fn:unlockFlameShock,
					unlocks:["FlameShockLv2","UnlockSearingTotem"],
					desc:"Unlocks Flame Shock. A fire spell that deals 20 damage with a cooldown of 30 seconds."},
				"FlameShockLv2":{name:"Flame Shock Lv.2", icon:"FlameShock", cost:69, fn:flameShockLv2,
					unlocks:["FlameShockLv3"],
					desc:"Your Flame Shock deals 40 damage."},
				"OctupleClick":{name:"Octuple Click", icon:"ClickAttack", cost:131, fn:doubleClick,
					unlocks:["SedecupleClick","ImprovedClick"],
					desc:"Your Click Attack deals 8 damage."},
				"ImprovedClick":{name:"Improved Click", icon:"ClickAttack", cost:150, fn:improvedClick,
					unlocks:["GreaterClick"],
					desc:"Reduces the cooldown of your Click Attack to 0.8 seconds."},
				"FlameShockLv3":{name:"Flame Shock Lv.3", icon:"FlameShock", cost:170, fn:flameShockLv2,
					unlocks:["FlameShockLv4"],
					desc:"Your Flame Shock deals 80 damage."},
				"AutoattackLv5":{name:"Autoattack Lv.5", icon:"Autoattack", cost:252, fn:autoattackLv2,
					unlocks:["AutoattackLv6"],
					desc:"Your Autoattack deals 32 damage."},
				"GreaterAutoattack":{name:"Greater Autoattack", icon:"Autoattack", cost:300, fn:improvedAutoattack,
					unlocks:["SuperiorAutoattack"],
					desc:"Your Autoattack hits every 8 seconds."},
				"FlameShockLv4":{name:"Flame Shock Lv.4", icon:"FlameShock", cost:525, fn:flameShockLv2,
					unlocks:["FlameShockLv5","ImprovedFlameShock"],
					desc:"Your Flame Shock deals 160 damage."},
				"ImprovedFlameShock":{name:"Improved Flame Shock", icon:"FlameShock", cost:600, fn:improvedFlameShock,
					unlocks:["GreaterFlameShock"],
					desc:"Reduces the cooldown of your Flame Shock to 15 seconds."},
				"SedecupleClick":{name:"Sedecuple Click", icon:"ClickAttack", cost:634, fn:doubleClick,
					unlocks:["DuotrigintupleClick"],
					desc:"Your Click Attack deals 16 damage."},
				"UnlockSearingTotem":{name:"Unlock Searing Totem", icon:"SearingTotem", cost:720, fn:unlockSearingTotem,
					unlocks:["SearingTotemLv2","UnlockLightningBolt"],
					desc:"Unlocks Searing Totem. Your autoattack deals an additional 110 fire damage once every minute."},
				"GreaterClick":{name:"Greater Click", icon:"ClickAttack", cost:750, fn:improvedClick,
					unlocks:["SuperiorClick"],
					desc:"Reduces the cooldown of your Click Attack to 0.4 seconds."},
				"SearingTotemLv2":{name:"Searing Totem Lv.2", icon:"SearingTotem", cost:828, fn:searingTotemLv2,
					unlocks:["SearingTotemLv3"],
					desc:"Your Searing Totem deals 220 fire damage."},
				"SearingTotemLv3":{name:"Searing Totem Lv.3", icon:"SearingTotem", cost:2047, fn:searingTotemLv2,
					unlocks:["SearingTotemLv4"],
					desc:"Your Searing Totem deals 440 fire damage."},
				"FlameShockLv5":{name:"Flame Shock Lv.5", icon:"FlameShock", cost:2533, fn:flameShockLv2,
					unlocks:["FlameShockLv6"],
					desc:"Your Flame Shock deals 320 damage."},
				"SuperiorAutoattack":{name:"Superior Autoattack", icon:"Autoattack", cost:3000, fn:improvedAutoattack,
					unlocks:["EpicAutoattack"],
					desc:"Your Autoattack hits every 4 seconds."},
				"GreaterFlameShock":{name:"Greater Flame Shock", icon:"FlameShock", cost:3000, fn:improvedFlameShock,
					unlocks:["SuperiorFlameShock"],
					desc:"Reduces the cooldown of your Flame Shock to 7.5 seconds."},
				"AutoattackLv6":{name:"Autoattack Lv.6", icon:"Autoattack", cost:3141, fn:autoattackLv2,
					unlocks:["AutoattackLv7"],
					desc:"Your Autoattack deals 64 damage."},
				"SearingTotemLv4":{name:"Searing Totem Lv.4", icon:"SearingTotem", cost:6287, fn:searingTotemLv2,
					unlocks:["SearingTotemLv5","ImprovedSearingTotem"],
					desc:"Your Searing Totem deals 880 fire damage."},
				"ImprovedSearingTotem":{name:"Improved Searing Totem", icon:"SearingTotem", cost:7200, fn:improvedSearingTotem,
					unlocks:["GreaterSearingTotem"],
					desc:"Your Searing Totem deals fire damage every 30 seconds."},
				"SuperiorClick":{name:"Superior Click", icon:"ClickAttack", cost:7500, fn:improvedClick,
					unlocks:["EpicClick"],
					desc:"Reduces the cooldown of your Click Attack to 0.2 seconds."},
				"DuotrigintupleClick":{name:"Duotrigintuple Click", icon:"ClickAttack", cost:7835, fn:doubleClick,
					unlocks:["QuadsexagintupleClick"],
					desc:"Your Click Attack deals 32 damage."},
				"UnlockLightningBolt":{name:"Unlock Lightning Bolt", icon:"LightningBolt", cost:10000, fn:unlockLightningBolt,
					unlocks:["LightningBoltLv2","UnlockMaelstrom"],
					desc:"Unlocks Lightning Bolt. A lightning spell that deals 1,600 damage with a cooldown of 1 minute."},
				"LightningBoltLv2":{name:"Lightning Bolt Lv.2", icon:"LightningBolt", cost:11500, fn:lightningBoltLv2,
					unlocks:["LightningBoltLv3"],
					desc:"Your Lightning Bolt deals 3,200 damage."},
				"LightningBoltLv3":{name:"Lightning Bolt Lv.3", icon:"LightningBolt", cost:28434, fn:lightningBoltLv2,
					unlocks:["LightningBoltLv4"],
					desc:"Your Lightning Bolt deals 6,400 damage."},
				"SuperiorFlameShock":{name:"Superior Flame Shock", icon:"FlameShock", cost:30000, fn:improvedFlameShock,
					unlocks:["EpicFlameShock"],
					desc:"Reduces the cooldown of your Flame Shock to 3.75 seconds."},
				"SearingTotemLv5":{name:"Searing Totem Lv.5", icon:"SearingTotem", cost:30225, fn:searingTotemLv2,
					unlocks:["SearingTotemLv6"],
					desc:"Your Searing Totem deals 1,760 fire damage."},
				"FlameShockLv6":{name:"Flame Shock Lv.6", icon:"FlameShock", cost:31516, fn:flameShockLv2,
					unlocks:["FlameShockLv7"],
					desc:"Your Flame Shock deals 640 damage."},
				"GreaterSearingTotem":{name:"Greater Searing Totem", icon:"SearingTotem", cost:36000, fn:improvedSearingTotem,
					unlocks:["SuperiorSearingTotem"],
					desc:"Your Searing Totem deals fire damage every 15 seconds."},
				"LightningBoltLv4":{name:"Lightning Bolt Lv.4", icon:"LightningBolt", cost:87336, fn:lightningBoltLv2,
					unlocks:["LightningBoltLv5","ImprovedLightningBolt"],
					desc:"Your Lightning Bolt deals 12,800 damage."},
				"ImprovedLightningBolt":{name:"Improved Lightning Bolt", icon:"LightningBolt", cost:100000, fn:improvedLightningBolt,
					unlocks:["GreaterLightningBolt"],
					desc:"Reduces the cooldown of your Lightning Bolt to 30 seconds."},
				"UnlockMaelstrom":{name:"Unlock Maelstrom", icon:"Maelstrom", cost:160000, fn:unlockMaelstrom,
					unlocks:["MaelstromLv2","UnlockFlametongue"],
					desc:"Unlocks Maelstrom. Your autoattack deals an additional 6,250 lightning damage once every minute."},
				"MaelstromLv2":{name:"Maelstrom Lv.2", icon:"Maelstrom", cost:184000, fn:maelstromLv2,
					unlocks:["MaelstromLv3"],
					desc:"Your Maelstrom deals 12,500 lightning damage."},
				"EpicAutoattack":{name:"Epic Autoattack", icon:"Autoattack", cost:300000, fn:improvedAutoattack,
					unlocks:["PerfectAutoattack"],
					desc:"Your Autoattack hits every 2 seconds."},
				"AutoattackLv7":{name:"Autoattack Lv.7", icon:"Autoattack", cost:304341, fn:autoattackLv2,
					unlocks:["AutoattackLv8"],
					desc:"Your Autoattack deals 128 damage."},
				"SuperiorSearingTotem":{name:"Superior Searing Totem", icon:"SearingTotem", cost:360000, fn:improvedSearingTotem,
					unlocks:["EpicSearingTotem"],
					desc:"Your Searing Totem deals fire damage every 7.5 seconds."},
				"SearingTotemLv6":{name:"Searing Totem Lv.6", icon:"SearingTotem", cost:375306, fn:searingTotemLv2,
					unlocks:["SearingTotemLv7"],
					desc:"Your Searing Totem deals 3,520 fire damage."},
				"LightningBoltLv5":{name:"Lightning Bolt Lv.5", icon:"LightningBolt", cost:419926, fn:lightningBoltLv2,
					unlocks:["LightningBoltLv6"],
					desc:"Your Lightning Bolt deals 25,600 damage."},
				"MaelstromLv3":{name:"Maelstrom Lv.3", icon:"Maelstrom", cost:454940, fn:maelstromLv2,
					unlocks:["MaelstromLv4"],
					desc:"Your Maelstrom deals 25,000 lightning damage."},
				"GreaterLightningBolt":{name:"Greater Lightning Bolt", icon:"LightningBolt", cost:500000, fn:improvedLightningBolt,
					unlocks:["SuperiorLightningBolt"],
					desc:"Reduces the cooldown of your Lightning Bolt to 15 seconds."},
				"EpicClick":{name:"Epic Click", icon:"ClickAttack", cost:750000, fn:improvedClick,
					unlocks:["PerfectClick"],
					desc:"Reduces the cooldown of your Click Attack to 0.1 seconds."},
				"QuadsexagintupleClick":{name:"Quadsexagintuple Click", icon:"ClickAttack", cost:759208, fn:doubleClick,
					unlocks:["OctoviginticentupleClick"],
					desc:"Your Click Attack deals 64 damage."},
				"MaelstromLv4":{name:"Maelstrom Lv.4", icon:"Maelstrom", cost:1397352, fn:maelstromLv2,
					unlocks:["MaelstromLv5","ImprovedMaelstrom"],
					desc:"Your Maelstrom deals 50,000 lightning damage."},
				"ImprovedMaelstrom":{name:"Improved Maelstrom", icon:"Maelstrom", cost:1600000, fn:improvedMaelstrom,
					unlocks:["GreaterMaelstrom"],
					desc:"Your Maelstrom deals lightning damage every 30 seconds."},
				"EpicFlameShock":{name:"Epic Flame Shock", icon:"FlameShock", cost:3000000, fn:improvedFlameShock,
					unlocks:["PerfectFlameShock"],
					desc:"Reduces the cooldown of your Flame Shock to 1.875 seconds."},
				"UnlockFlametongue":{name:"Unlock Flametongue", icon:"Flametongue", cost:3000000, fn:unlockFlametongue,
					unlocks:["FlametongueLv2","UnlockMagmaTotem"],
					desc:"Unlocks Flametongue. A burst of flame that deals 240,000 damage with a cooldown of 2 minutes."},
				"FlameShockLv7":{name:"Flame Shock Lv.7", icon:"FlameShock", cost:3054776, fn:flameShockLv2,
					unlocks:["FlameShockLv8"],
					desc:"Your Flame Shock deals 1,280 damage."},
				"FlametongueLv2":{name:"Flametongue Lv.2", icon:"Flametongue", cost:3450000, fn:flametongueLv2,
					unlocks:["FlametongueLv3"],
					desc:"Your Flametongue deals 480,000 damage."},
				"SuperiorLightningBolt":{name:"Superior Lightning Bolt", icon:"LightningBolt", cost:5000000, fn:improvedLightningBolt,
					unlocks:["EpicLightningBolt"],
					desc:"Reduces the cooldown of your Lightning Bolt to 7.5 seconds."},
				"LightningBoltLv6":{name:"Lightning Bolt Lv.6", icon:"LightningBolt", cost:5214102, fn:lightningBoltLv2,
					unlocks:["LightningBoltLv7"],
					desc:"Your Lightning Bolt deals 51,200 damage."},
				"MaelstromLv5":{name:"Maelstrom Lv.5", icon:"Maelstrom", cost:6718524, fn:maelstromLv2,
					unlocks:["MaelstromLv6"],
					desc:"Your Maelstrom deals 100,000 lightning damage."},
				"GreaterMaelstrom":{name:"Greater Maelstrom", icon:"Maelstrom", cost:8000000, fn:improvedMaelstrom,
					unlocks:["SuperiorMaelstrom"],
					desc:"Your Maelstrom deals lightning damage every 15 seconds."},
				"FlametongueLv3":{name:"Flametongue Lv.3", icon:"Flametongue", cost:8530125, fn:flametongueLv2,
					unlocks:["FlametongueLv4"],
					desc:"Your Flametongue deals 960,000 damage."},
				"FlametongueLv4":{name:"Flametongue Lv.4", icon:"Flametongue", cost:26200334, fn:flametongueLv2,
					unlocks:["FlametongueLv5","ImprovedFlametongue"],
					desc:"Your Flametongue deals 1.92 million damage."},
				"ImprovedFlametongue":{name:"Improved Flametongue", icon:"Flametongue", cost:30000000, fn:improvedFlametongue,
					unlocks:["GreaterFlametongue"],
					desc:"Reduces the cooldown of your Flametongue to 1 minute."},
				"PerfectAutoattack":{name:"Perfect Autoattack", icon:"Autoattack", cost:30000000, fn:improvedAutoattack,
					unlocks:[],
					desc:"Your Autoattack hits every second."},
				"EpicSearingTotem":{name:"Epic Searing Totem", icon:"SearingTotem", cost:36000000, fn:improvedSearingTotem,
					unlocks:["PerfectSearingTotem"],
					desc:"Your Searing Totem deals fire damage every 3.75 seconds."},
				"SearingTotemLv7":{name:"Searing Totem Lv.7", icon:"SearingTotem", cost:36376202, fn:searingTotemLv2,
					unlocks:["SearingTotemLv8"],
					desc:"Your Searing Totem deals 7,040 fire damage."},
				"UnlockMagmaTotem":{name:"Unlock Magma Totem", icon:"MagmaTotem", cost:60000000, fn:unlockMagmaTotem,
					unlocks:["MagmaTotemLv2","UnlockStormstrike"],
					desc:"Unlocks Magma Totem. Your autoattack deals an additional 1.2 million magma damage once every 2 minutes."},
				"MagmaTotemLv2":{name:"Magma Totem Lv.2", icon:"MagmaTotem", cost:69000000, fn:magmaTotemLv2,
					unlocks:["MagmaTotemLv3"],
					desc:"Your Magma Totem deals 2.4 million magma damage."},
				"PerfectClick":{name:"Perfect Click", icon:"ClickAttack", cost:75000000, fn:improvedClick,
					unlocks:[],
					desc:"Reduces the cooldown of your Click Attack to 0.05 seconds. (Warning: You probably can't click this fast.)"},
				"SuperiorMaelstrom":{name:"Superior Maelstrom", icon:"Maelstrom", cost:80000000, fn:improvedMaelstrom,
					unlocks:["EpicMaelstrom"],
					desc:"Your Maelstrom deals lightning damage every 7.5 seconds."},
				"MaelstromLv6":{name:"Maelstrom Lv.6", icon:"Maelstrom", cost:83421477, fn:maelstromLv2,
					unlocks:["MaelstromLv7"],
					desc:"Your Maelstrom deals 200,000 lightning damage."},
				"FlametongueLv5":{name:"Flametongue Lv.5", icon:"Flametongue", cost:125971960, fn:flametongueLv2,
					unlocks:["FlametongueLv6"],
					desc:"Your Flametongue deals 3.84 million damage."},
				"GreaterFlametongue":{name:"Greater Flametongue", icon:"Flametongue", cost:150000000, fn:improvedFlametongue,
					unlocks:["SuperiorFlametongue"],
					desc:"Reduces the cooldown of your Flametongue to 30 seconds."},
				"MagmaTotemLv3":{name:"Magma Totem Lv.3", icon:"MagmaTotem", cost:170602500, fn:magmaTotemLv2,
					unlocks:["MagmaTotemLv4"],
					desc:"Your Magma Totem deals 4.8 million magma damage."},
				"PerfectFlameShock":{name:"Perfect Flame Shock", icon:"FlameShock", cost:300000000, fn:improvedFlameShock,
					unlocks:[],
					desc:"Reduces the cooldown of your Flame Shock to 0.938 seconds."},
				"EpicLightningBolt":{name:"Epic Lightning Bolt", icon:"LightningBolt", cost:500000000, fn:improvedLightningBolt,
					unlocks:[],
					desc:"Reduces the cooldown of your Lightning Bolt to 3.75 seconds."},
				"LightningBoltLv7":{name:"Lightning Bolt Lv.7", icon:"LightningBolt", cost:505364800, fn:lightningBoltLv2,
					unlocks:[],
					desc:"Your Lightning Bolt deals 102,400 damage."},
				"MagmaTotemLv4":{name:"Magma Totem Lv.4", icon:"MagmaTotem", cost:524006645, fn:magmaTotemLv2,
					unlocks:["MagmaTotemLv5","ImprovedMagmaTotem"],
					desc:"Your Magma Totem deals 9.6 million magma damage."},
				"ImprovedMagmaTotem":{name:"Improved Magma Totem", icon:"MagmaTotem", cost:600000000, fn:improvedMagmaTotem,
					unlocks:["GreaterMagmaTotem"],
					desc:"Your Magma Totem deals magma damage once every minute."},
				"UnlockStormstrike":{name:"Unlock Stormstrike", icon:"Stormstrike", cost:1250000000, fn:unlockStormstrike,
					unlocks:["StormstrikeLv2","UnlockWindfury"],
					desc:"Unlocks Stormstrike. A powerful lightning attack that deals 60 million damage with a cooldown of 5 minutes."},
				"StormstrikeLv2":{name:"Stormstrike Lv.2", icon:"Stormstrike", cost:1437500000, fn:stormstrikeLv2,
					unlocks:["StormstrikeLv3"],
					desc:"Your Stormstrike deals 120 million damage."},
				"SuperiorFlametongue":{name:"Superior Flametongue", icon:"Flametongue", cost:1500000000, fn:improvedFlametongue,
					unlocks:["EpicFlametongue"],
					desc:"Reduces the cooldown of your Flametongue to 15 seconds."},
				"FlametongueLv6":{name:"Flametongue Lv.6", icon:"Flametongue", cost:1564148958, fn:flametongueLv2,
					unlocks:["FlametongueLv7"],
					desc:"Your Flametongue deals 7.68 million damage."},
				"AutoattackLv8":{name:"Autoattack Lv.8", icon:"Autoattack", cost:2360229788, fn:autoattackLv2,
					unlocks:[],
					desc:"Your Autoattack deals 256 damage."},
				"MagmaTotemLv5":{name:"Magma Totem Lv.5", icon:"MagmaTotem", cost:2519439215, fn:magmaTotemLv2,
					unlocks:["MagmaTotemLv6"],
					desc:"Your Magma Totem deals 19.2 million magma damage."},
				"GreaterMagmaTotem":{name:"Greater Magma Totem", icon:"MagmaTotem", cost:3000000000, fn:improvedMagmaTotem,
					unlocks:["SuperiorMagmaTotem"],
					desc:"Your Magma Totem deals magma damage every 30 seconds."},
				"StormstrikeLv3":{name:"Stormstrike Lv.3", icon:"Stormstrike", cost:3554218750, fn:stormstrikeLv2,
					unlocks:["StormstrikeLv4"],
					desc:"Your Stormstrike deals 240 million damage."},
				"PerfectSearingTotem":{name:"Perfect Searing Totem", icon:"SearingTotem", cost:3600000000, fn:improvedSearingTotem,
					unlocks:[],
					desc:"Your Searing Totem deals fire damage every 1.875 seconds."},
				"OctoviginticentupleClick":{name:"Octoviginticentuple Click", icon:"ClickAttack", cost:5887906080, fn:doubleClick,
					unlocks:[],
					desc:"Your Click Attack deals 128 damage."},
				"EpicMaelstrom":{name:"Epic Maelstrom", icon:"Maelstrom", cost:8000000000, fn:improvedMaelstrom,
					unlocks:[],
					desc:"Your Maelstrom deals lightning damage every 3.75 seconds."},
				"MaelstromLv7":{name:"Maelstrom Lv.7", icon:"Maelstrom", cost:8085433594, fn:maelstromLv2,
					unlocks:[],
					desc:"Your Maelstrom deals 400,000 lightning damage."},
				"StormstrikeLv4":{name:"Stormstrike Lv.4", icon:"Stormstrike", cost:10916805108, fn:stormstrikeLv2,
					unlocks:["StormstrikeLv5","ImprovedStormstrike"],
					desc:"Your Stormstrike deals 480 million damage."},
				"ImprovedStormstrike":{name:"Improved Stormstrike", icon:"Stormstrike", cost:12500000000, fn:improvedStormstrike,
					unlocks:["GreaterStormstrike"],
					desc:"Reduces the cooldown of your Stormstrike to 150 seconds."},
				"FlameShockLv8":{name:"Flame Shock Lv.8", icon:"FlameShock", cost:23690459293, fn:flameShockLv2,
					unlocks:[],
					desc:"Your Flame Shock deals 2,560 damage."},
				"SuperiorMagmaTotem":{name:"Superior Magma Totem", icon:"MagmaTotem", cost:30000000000, fn:improvedMagmaTotem,
					unlocks:["EpicMagmaTotem"],
					desc:"Your Magma Totem deals magma damage every 15 seconds."},
				"UnlockWindfury":{name:"Unlock Windfury", icon:"Windfury", cost:30000000000, fn:unlockWindfury,
					unlocks:["WindfuryLv2","UnlockLavaLash"],
					desc:"Unlocks Windfury. Your autoattack strikes with the fury of the wind, dealing an additional 150 million damage once every 2 minutes."},
				"MagmaTotemLv6":{name:"Magma Totem Lv.6", icon:"MagmaTotem", cost:31282979138, fn:magmaTotemLv2,
					unlocks:["MagmaTotemLv7"],
					desc:"Your Magma Totem deals 38.4 million magma damage."},
				"WindfuryLv2":{name:"Windfury Lv.2", icon:"Windfury", cost:34500000000, fn:windfuryLv2,
					unlocks:["WindfuryLv3"],
					desc:"Your Windfury deals 300 million damage."},
				"StormstrikeLv5":{name:"Stormstrike Lv.5", icon:"Stormstrike", cost:52488316784, fn:stormstrikeLv2,
					unlocks:["StormstrikeLv6"],
					desc:"Your Stormstrike deals 960 million damage."},
				"GreaterStormstrike":{name:"Greater Stormstrike", icon:"Stormstrike", cost:62500000000, fn:improvedStormstrike,
					unlocks:["SuperiorStormstrike"],
					desc:"Reduces the cooldown of your Stormstrike to 75 seconds."},
				"WindfuryLv3":{name:"Windfury Lv.3", icon:"Windfury", cost:85301250000, fn:windfuryLv2,
					unlocks:["WindfuryLv4"],
					desc:"Your Windfury deals 600 million damage."},
				"EpicFlametongue":{name:"Epic Flametongue", icon:"Flametongue", cost:150000000000, fn:improvedFlametongue,
					unlocks:[],
					desc:"Reduces the cooldown of your Flametongue to 7.5 seconds."},
				"FlametongueLv7":{name:"Flametongue Lv.7", icon:"Flametongue", cost:151601523931, fn:flametongueLv2,
					unlocks:[],
					desc:"Your Flametongue deals 15.36 million damage."},
				"WindfuryLv4":{name:"Windfury Lv.4", icon:"Windfury", cost:262003322508, fn:windfuryLv2,
					unlocks:["WindfuryLv5","ImprovedWindfury"],
					desc:"Your Windfury deals 1.2 billion damage."},
				"SearingTotemLv8":{name:"Searing Totem Lv.8", icon:"SearingTotem", cost:282104895898, fn:searingTotemLv2,
					unlocks:[],
					desc:"Your Searing Totem deals 14,080 fire damage."},
				"ImprovedWindfury":{name:"Improved Windfury", icon:"Windfury", cost:300000000000, fn:improvedWindfury,
					unlocks:["GreaterWindfury"],
					desc:"Your Windfury deals damage once every minute."},
				"SuperiorStormstrike":{name:"Superior Stormstrike", icon:"Stormstrike", cost:625000000000, fn:improvedStormstrike,
					unlocks:["EpicStormstrike"],
					desc:"Reduces the cooldown of your Stormstrike to 37.5 seconds."},
				"StormstrikeLv6":{name:"Stormstrike Lv.6", icon:"Stormstrike", cost:651728729829, fn:stormstrikeLv2,
					unlocks:["StormstrikeLv7"],
					desc:"Your Stormstrike deals 1.92 billion damage."},
				"UnlockLavaLash":{name:"Unlock Lava Lash", icon:"LavaLash", cost:800000000000, fn:unlockLavaLash,
					unlocks:["LavaLashLv2","UnlockFireElemental"],
					desc:"Unlocks Lava Lash. A lava strike that deals 19.5 billion damage with a cooldown of 10 minutes."},
				"LavaLashLv2":{name:"Lava Lash Lv.2", icon:"LavaLash", cost:920000000000, fn:lavaLashLv2,
					unlocks:["LavaLashLv3"],
					desc:"Your Lava Lash deals 39 billion damage."},
				"WindfuryLv5":{name:"Windfury Lv.5", icon:"Windfury", cost:1259719602199, fn:windfuryLv2,
					unlocks:["WindfuryLv6"],
					desc:"Your Windfury deals 2.4 billion damage."},
				"GreaterWindfury":{name:"Greater Windfury", icon:"Windfury", cost:1500000000000, fn:improvedWindfury,
					unlocks:["SuperiorWindfury"],
					desc:"Your Windfury deals damage every 30 seconds."},
				"LavaLashLv3":{name:"Lava Lash Lv.3", icon:"LavaLash", cost:2274700000000, fn:lavaLashLv2,
					unlocks:["LavaLashLv4"],
					desc:"Your Lava Lash deals 78 billion damage."},
				"EpicMagmaTotem":{name:"Epic Magma Totem", icon:"MagmaTotem", cost:3000000000000, fn:improvedMagmaTotem,
					unlocks:[],
					desc:"Your Magma Totem deals magma damage every 7.5 seconds."},
				"MagmaTotemLv7":{name:"Magma Totem Lv.7", icon:"MagmaTotem", cost:3032030467467, fn:magmaTotemLv2,
					unlocks:[],
					desc:"Your Magma Totem deals 76.8 million magma damage."},
				"LavaLashLv4":{name:"Lava Lash Lv.4", icon:"LavaLash", cost:6986755266875, fn:lavaLashLv2,
					unlocks:["LavaLashLv5","ImprovedLavaLash"],
					desc:"Your Lava Lash deals 156 billion damage."},
				"ImprovedLavaLash":{name:"Improved Lava Lash", icon:"LavaLash", cost:8000000000000, fn:improvedLavaLash,
					unlocks:["GreaterLavaLash"],
					desc:"Reduces the cooldown of your Lava Lash to 5 minutes."},
				"SuperiorWindfury":{name:"Superior Windfury", icon:"Windfury", cost:15000000000000, fn:improvedWindfury,
					unlocks:[],
					desc:"Your Windfury deals damage every 15 seconds."},
				"WindfuryLv6":{name:"Windfury Lv.6", icon:"Windfury", cost:15641489507885, fn:windfuryLv2,
					unlocks:[],
					desc:"Your Windfury deals 4.8 billion damage."},
				"UnlockFireElemental":{name:"Unlock Fire Elemental", icon:"FireElemental", cost:22500000000000, fn:unlockFireElemental,
					unlocks:["FireElementalLv2","UnlockFireNova"],
					desc:"Unlocks Fire Elemental. Summon an elemental of fire to attack alongside you, dealing 27.5 billion damage once every 2 minutes."},
				"FireElementalLv2":{name:"Fire Elemental Lv.2", icon:"FireElemental", cost:25875000000000, fn:fireElementalLv2,
					unlocks:["FireElementalLv3"],
					desc:"Your Fire Elemental deals 55 billion damage."},
				"LavaLashLv5":{name:"Lava Lash Lv.5", icon:"LavaLash", cost:33592522725320, fn:lavaLashLv2,
					unlocks:["LavaLashLv6"],
					desc:"Your Lava Lash deals 312 billion damage."},
				"GreaterLavaLash":{name:"Greater Lava Lash", icon:"LavaLash", cost:40000000000000, fn:improvedLavaLash,
					unlocks:["SuperiorLavaLash"],
					desc:"Reduces the cooldown of your Lava Lash to 150 seconds."},
				"EpicStormstrike":{name:"Epic Stormstrike", icon:"Stormstrike", cost:62500000000000, fn:improvedStormstrike,
					unlocks:[],
					desc:"Reduces the cooldown of your Stormstrike to 18.75 seconds."},
				"StormstrikeLv7":{name:"Stormstrike Lv.7", icon:"Stormstrike", cost:63167301179487, fn:stormstrikeLv2,
					unlocks:[],
					desc:"Your Stormstrike deals 3.84 billion damage."},
				"FireElementalLv3":{name:"Fire Elemental Lv.3", icon:"FireElemental", cost:63975937500000, fn:fireElementalLv2,
					unlocks:["FireElementalLv4"],
					desc:"Your Fire Elemental deals 110 billion damage."},
				"FireElementalLv4":{name:"Fire Elemental Lv.4", icon:"FireElemental", cost:196502491880860, fn:fireElementalLv2,
					unlocks:["FireElementalLv5","ImprovedFireElemental"],
					desc:"Your Fire Elemental deals 220 billion damage."},
				"ImprovedFireElemental":{name:"Improved Fire Elemental", icon:"FireElemental", cost:225000000000000, fn:improvedFireElemental,
					unlocks:["GreaterFireElemental"],
					desc:"Your Fire Elemental deals damage once every minute."},
				"SuperiorLavaLash":{name:"Superior Lava Lash", icon:"LavaLash", cost:400000000000000, fn:improvedLavaLash,
					unlocks:[],
					desc:"Reduces the cooldown of your Lava Lash to 75 seconds."},
				"LavaLashLv6":{name:"Lava Lash Lv.6", icon:"LavaLash", cost:417106386876383, fn:lavaLashLv2,
					unlocks:[],
					desc:"Your Lava Lash deals 624 billion damage."},
				"UnlockFireNova":{name:"Unlock Fire Nova", icon:"FireNova", cost:650000000000000, fn:unlockFireNova,
					unlocks:["FireNovaLv2"],
					desc:"Unlocks Fire Nova. A fiery explosion that deals 6 trillion damage with a cooldown of 15 minutes."},
				"FireNovaLv2":{name:"Fire Nova Lv2", icon:"FireNova", cost:747500000000000, fn:fireNovaLv2,
					unlocks:["FireNovaLv3"],
					desc:"Your Fire Nova deals 12 trillion damage."},
				"FireElementalLv5":{name:"Fire Elemental Lv.5", icon:"FireElemental", cost:944789701649641, fn:fireElementalLv2,
					unlocks:[],
					desc:"Your Fire Elemental deals 440 billion damage."},
				"GreaterFireElemental":{name:"Greater Fire Elemental", icon:"FireElemental", cost:1125000000000000, fn:improvedFireElemental,
					unlocks:[],
					desc:"Your Fire Elemental deals damage every 30 seconds."},
				"FireNovaLv3":{name:"Fire Nova Lv3", icon:"FireNova", cost:1848193750000000, fn:fireNovaLv2,
					unlocks:["FireNovaLv4"],
					desc:"Your Fire Nova deals 24 trillion damage."},
				"FireNovaLv4":{name:"Fire Nova Lv4", icon:"FireNova", cost:5676738654335940, fn:fireNovaLv2,
					unlocks:["ImprovedFireNova"],
					desc:"Your Fire Nova deals 48 trillion damage."},
				"ImprovedFireNova":{name:"Improved Fire Nova", icon:"FireNova", cost:6500000000000000, fn:improvedFireNova,
					unlocks:["GreaterFireNova"],
					desc:"Reduces the cooldown of your Fire Nova to 450 seconds."},
				"GreaterFireNova":{name:"Greater Fire Nova", icon:"FireNova", cost:32500000000000000, fn:improvedFireNova,
					unlocks:[],
					desc:"Reduces the cooldown of your Fire Nova to 225 seconds."}};