//CONSTANTS
var X7 = Math.sqrt(1/2);
var X8 = Math.sqrt(X7);
var X10 = 1.0;
var X14 = Math.sqrt(2);
var X12 = Math.sqrt(X14);
var Y7 = X7*10;
var Y8 = X8*10;
var Y10 = 10;
var Y14 = X14*10;
var Y12 = X12*10;
//---------

var changeHP = function(that, amt){
	that.hp += amt;
	if(that.hp > 100) that.hp = 100;
	else if(that.hp <= 0){
		that.hp = 0;
		update(that.name + that.className + " goes down...");
		changeCreatureCount(that, -99999);
		Object.keys(that.skills).forEach(function(s){
			that.skills[s].button.attr("disabled", true);
		});
	}
	
	greenBar = d3.select("#" + that.id + "greenbar");
	bloodBar = d3.select("#" + that.id + "bloodbar");
	redBar = d3.select("#" + that.id + "redbar");
	
	d3.select("#" + that.id + "hplabel").text(that.hp + "% HP");
	//bloodBar.transition().style("width", parseFloat(bloodBar.style("width")) + (amt * 2) + "px").duration(0);
	greenBar.transition().style("width", (that.hp * 2) + "px").duration(20 * tickLength);
	//bloodBar.transition().style("width", "0px").duration(20 * tickLength);
	redBar.transition().style("width", ((100 - that.hp) * 2) + "px").duration(20 * tickLength);
}
var changeCreatureCount = function(that, amt){
	that.count += amt;
	var remainder = 0;
	if(that.count > that.delay) {
		remainder = that.count - that.delay;
		that.count = that.delay;
	}
	if(that.count < 0) that.count = 0;
	var percent = that.count/that.delay * 100;
	
	d3.select("#" + that.id + "delaylabel").text((that.count*6/getSpd(that)).toFixed(1) + "/" + (that.delay*6/getSpd(that)).toFixed(1) + " sec");
	d3.select("#" + that.id + "orangebar").transition().style("width", (percent * 2) + "px").duration(tickLength);
	d3.select("#" + that.id + "bluebar").transition().style("width", ((100 - percent) * 2) + "px").duration(tickLength);
	
	if(that.count == that.delay){
		qitem = {
				creature: that,
				priority: remainder
		}
		q.push(qitem);
	}
}
var reset = function(that){
	changeHP(that, 100);
	changeCreatureCount(that, -99999);
	that.delay = Math.random() * getSpd(that);
	that.statuses = [];
	Object.keys(that.skills).forEach(function(s){
		if(!isOnCd(that.skills[s]) && that.skills[s].button != undefined) that.skills[s].button.attr("disabled", null);
	});
}
var getPow = function(that){return 0 + (that.mgt * that.weapon.pow);}
var getAcc = function(that){return 0 + (that.foc * that.weapon.acc);}
var getSpd = function(that){return 0 + (that.spr * that.weapon.spd);}
var getDef = function(that){return 0 + (that.vit * that.armor.def);}
var getEva = function(that){return 0 + (that.agi * that.armor.eva);}
var getRng = function(that){return 0 + (that.int * that.armor.rng);}

function generateThrees(){
	var threes = [];
	
	var firstMin = 1.0 / Math.pow(2, 1.0/3.0);
	var firstRange = Math.pow(4, 1.0/3.0) - firstMin;
	
	threes[0] = (Math.random() * firstRange) + firstMin;
    
    var baseline = 1.0 / threes[0];
    
    var secondMins = [];
    var secondMaxes = [];
    
    secondMins.push(Math.sqrt(baseline / 2.0));
    secondMaxes.push(Math.sqrt(baseline * 2.0));
    
    secondMins.push(threes[0] / 2.0);
    secondMaxes.push(baseline / (threes[0] / 2.0));
    
    secondMaxes.push(threes[0] * 2);
    secondMins.push(baseline / (threes[0] * 2.0));
    
    var realMin = d3.max(secondMins);
    var realRange = d3.min(secondMaxes) - realMin;
    
    threes[1] = (Math.random() * realRange) + realMin;
    threes[2] = baseline / threes[1];
    
    d3.shuffle(threes);
    return threes;
}

function determineMonsterStats(multiplier, num){
	var monster = {};
	monster.ally = false;
	monster.hp = 100;
	monster.count = 0;
	
	var totalPower = (4000000000000.0 / (num*num)) * multiplier;
	var offenseF = (Math.random() + 1) * (Math.sqrt(2) / 2);
	var defenseF = 1.0 / offenseF;
	var offense = offenseF * Math.sqrt(totalPower);
	var defense = defenseF * Math.sqrt(totalPower);
	
	var offenseArray = generateThrees();
	monster.mgt = offenseArray[0] * Math.cbrt(offense);
	monster.foc = offenseArray[1] * Math.cbrt(offense);
	monster.spr = offenseArray[2] * Math.cbrt(offense);
	
	var defenseArray = generateThrees();
	monster.vit = defenseArray[0] * Math.cbrt(defense);
	monster.agi = defenseArray[1] * Math.cbrt(defense);
	monster.int = defenseArray[2] * Math.cbrt(defense);
	
	monster.weapon = {
			pow: 1,
			acc: 1,
			spd: 1
	}
	
	monster.armor = {
			def: 1,
			eva: 1,
			rng: 1
	}
	
	return monster;
}

function determineMonsterName(monster, monsterName, num){
	var offense = getPow(monster)*getAcc(monster)*getSpd(monster);
	var defense = getDef(monster)*getEva(monster)*getRng(monster);
	var toughness = getPow(monster)*getDef(monster);
	var quickness = getAcc(monster)*getEva(monster);
	var smartness = getSpd(monster)*getRng(monster);
	var maxness = Math.max(toughness, quickness, smartness);
	
	if(offense/defense < 0.8) 			monsterName += regions[state.region].prefixes[num][0];
	else if(offense/defense < 1.25) 	monsterName += regions[state.region].prefixes[num][1];
	else 								monsterName += regions[state.region].prefixes[num][2];
	
	if(maxness == toughness)			monsterName += regions[state.region].suffixes[num][0];
	else if(maxness == quickness)		monsterName += regions[state.region].suffixes[num][1];
	else								monsterName += regions[state.region].suffixes[num][2];
	
	monster.name = monsterName;
}

function determineWeaponName(human, weaponName){
	var weapon = human.weapon;
	var maxStat = Math.max(getPow(human), getAcc(human), getSpd(human));
	var offense = getPow(human)*getAcc(human)*getSpd(human);
	var defense = getDef(human)*getEva(human)*getRng(human);
	
	if(offense/defense < 0.8){
		if(human.mgt/weapon.pow < 0.8)				weaponName += "Bastard ";
		else if(human.mgt/weapon.pow < 1.25)		weaponName += "Great ";
		else										weaponName += "Heavy ";
		
		if(maxStat == getAcc(human))				weaponName += "Scimitar of ";
		else if(maxStat == getSpd(human))			weaponName += "Longsword of ";
		else										weaponName += "Mace of ";
		
		if(human.foc/weapon.acc < 0.8)				weaponName += "Contrition";
		else if(human.foc/weapon.acc < 1.25)		weaponName += "Might";
		else										weaponName += "Retribution";
	}else if(offense/defense < 1.25){
		if(human.mgt/weapon.pow < 0.8)				weaponName += "Masterwork ";
		else if(human.mgt/weapon.pow < 1.25)		weaponName += "Battle ";
		else										weaponName += "Curved ";
		
		if(maxStat == getAcc(human))				weaponName += "Dagger of ";
		else if(maxStat == getSpd(human))			weaponName += "Shortswords of ";
		else										weaponName += "Axe of ";
		
		if(human.foc/weapon.acc < 0.8)				weaponName += "Rage";
		else if(human.foc/weapon.acc < 1.25)		weaponName += "Speed";
		else										weaponName += "Precision";
	}else{
		if(human.mgt/weapon.pow < 0.8)				weaponName += "Hooked ";
		else if(human.mgt/weapon.pow < 1.25)		weaponName += "Bladed ";
		else										weaponName += "Runed ";
		
		if(maxStat == getAcc(human))				weaponName += "Spear of ";
		else if(maxStat == getSpd(human))			weaponName += "Staff of ";
		else										weaponName += "Hammer of ";
		
		if(human.foc/weapon.acc < 0.8)				weaponName += "Fangs";
		else if(human.foc/weapon.acc < 1.25)		weaponName += "Destruction";
		else										weaponName += "Wisdom";
	}
	
	return weaponName;
}

function determineArmorName(human, armorName){
	var armor = human.armor;
	var maxStat = Math.max(getDef(human), getEva(human), getRng(human));
	var offense = getPow(human)*getAcc(human)*getSpd(human);
	var defense = getDef(human)*getEva(human)*getRng(human);
	
	if(offense/defense < 0.8){
		if(human.vit/armor.def < 0.8)				armorName += "Full ";
		else if(human.vit/armor.def < 1.25)			armorName += "Half ";
		else										armorName += "Banded ";
		
		if(maxStat == getRng(human))				armorName += "Hide Armor of ";
		else if(maxStat == getEva(human))			armorName += "Scalemail of ";
		else										armorName += "Plate of ";
		
		if(human.agi/armor.eva < 0.8)				armorName += "Discipline";
		else if(human.agi/armor.eva < 1.25)			armorName += "Balance";
		else										armorName += "Protection";
	}else if(offense/defense < 1.25){
		if(human.vit/armor.def < 0.8)				armorName += "Chain ";
		else if(human.vit/armor.def < 1.25)			armorName += "Studded ";
		else										armorName += "Padded ";
		
		if(maxStat == getRng(human))				armorName += "Leather Armor of ";
		else if(maxStat == getEva(human))			armorName += "Mail of ";
		else										armorName += "Breastplate of ";
		
		if(human.agi/armor.eva < 0.8)				armorName += "Wrath";
		else if(human.agi/armor.eva < 1.25)			armorName += "Survival";
		else										armorName += "Subtlety";
	}else{
		if(human.vit/armor.def < 0.8)				armorName += "Reinforced ";
		else if(human.vit/armor.def < 1.25)			armorName += "Mystic ";
		else										armorName += "Woven ";
		
		if(maxStat == getRng(human))				armorName += "Robe of ";
		else if(maxStat == getEva(human))			armorName += "Shirt of ";
		else										armorName += "Cloth Armor of ";
		
		if(human.agi/armor.eva < 0.8)				armorName += "Tyranny";
		else if(human.agi/armor.eva < 1.25)			armorName += "Fulmination";
		else										armorName += "Meditation";
	}
	return armorName;
}

function statUpgrade(thisDiv, stat){
	var index = thisDiv.attr("divNum");
	var human = state.party[index];
	var xpCost = Math.round(40 * Math.pow(Math.sqrt(2), human.level/2.0));
	if(human.xp >= xpCost){
		human.xp -= xpCost;
		d3.select("#" + human.id + "xplabel").text(format(human.xp) + " XP");
		human.level++;
		d3.select("#" + human.id + "lvlabel").text("Level " + human.level);
		update(human.name + human.className + " gained a level!");
		update("");
		
		switch(stat){
		case "might":
			oldStat = human.mgt;
			human.mgt *= 1.1;
			break;
		case "focus":
			oldStat = human.foc;
			human.foc *= 1.1;
			break;
		case "spirit":
			oldStat = human.spr;
			human.spr *= 1.1;
			break;
		case "vitality":
			oldStat = human.vit;
			human.vit *= 1.1;
			break;
		case "agility":
			oldStat = human.agi;
			human.agi *= 1.1;
			break;
		case "intellect":
			oldStat = human.int;
			human.int *= 1.1;
			break;
		}
		update(human.name + human.className + "'s " + stat + " improved!");
		update(stat.toUpperCase() + ": " + Math.round(oldStat) + " -> " + Math.round(oldStat*1.1));
		update("");
		
		displayHumanStats(thisDiv);
	}else{
		update("Not enough XP to level up!");
		update("");
	}
}

function guildUpgrade(stat){
	var mentorshipCost = Math.round(40 * Math.pow(Math.sqrt(2), state.guild.level/2.0));
	if(state.guild.mentorship >= mentorshipCost){
		state.guild.mentorship -= mentorshipCost;
		mi.selectAll("*").remove();
		mi.append("text").text("MENTORSHIP: " + format(state.guild.mentorship));
		state.guild.level++;
		gli.selectAll("*").remove();
		gli.append("text").text("Level " + format(state.guild.level));
		update("Your guildhall gained a level!");
		update("");
		
		switch(stat){
		case "wisdom":
			oldStat = state.guild.wisdom;
			state.guild.wisdom *= 1.2;
			newStat = state.guild.wisdom;
			wv.selectAll("*").remove();
			wv.append("text").text(format(Math.round(state.guild.wisdom * 100)) + "%");
			break;
		case "perception":
			oldStat = state.guild.perception;
			state.guild.perception *= 1.2;
			newStat = state.guild.perception;
			pv.selectAll("*").remove();
			pv.append("text").text(format(Math.round(state.guild.perception * 100)) + "%");
			break;
		case "efficiency":
			oldStat = state.guild.efficiency;
			state.guild.efficiency *= 1.1;
			questDelay = baseQuestDelay / state.guild.efficiency;
			newStat = state.guild.efficiency;
			ev.selectAll("*").remove();
			ev.append("text").text(format(Math.round(state.guild.efficiency * 100)) + "%");
			break;
		}
		update("Your guildhall's " + stat + " improved!");
		update(stat.toUpperCase() + ": " + Math.round(oldStat * 100) + "% -> " + Math.round(newStat * 100) + "%");
		update("");
		
		guc.selectAll("*").remove();
		var guildUpgradeCost = Math.round(40 * Math.pow(Math.sqrt(2), state.guild.level/2.0));
		guc.append("text").text(guildUpgradeCost);
		if(guildUpgradeCost > state.guild.mentorship) gub.attr("disabled", true);
	}else{
		update("Not enough Mentorship to level up!");
		update("");
	}
}

function kingdomUpgrade(stat){
	var authorityCost = Math.round(40 * Math.pow(Math.sqrt(2), state.kingdom.level/2.0));
	if(state.kingdom.authority >= authorityCost){
		state.kingdom.authority -= authorityCost;
		ai.selectAll("*").remove();
		ai.append("text").text("AUTHORITY: " + format(state.kingdom.authority));
		state.kingdom.level++;
		kli.selectAll("*").remove();
		kli.append("text").text("Level " + format(state.kingdom.level));
		update("Your kingdom gained a level!");
		update("");
		
		switch(stat){
		case "domain":
			oldStat = state.kingdom.domain;
			state.kingdom.domain *= 1.1;
			newStat = state.kingdom.domain;
			dv.selectAll("*").remove();
			dv.append("text").text(format(Math.round(state.kingdom.domain * 100)) + "%");
			break;
		}
		update("Your kingdom's " + stat + " improved!");
		update(stat.toUpperCase() + ": " + Math.round(oldStat * 100) + "% -> " + Math.round(newStat * 100) + "%");
		update("");
		
		kuc.selectAll("*").remove();
		var kingdomUpgradeCost = Math.round(40 * Math.pow(Math.sqrt(2), state.kingdom.level/2.0));
		kuc.append("text").text(kingdomUpgradeCost);
		if(kingdomUpgradeCost > state.kingdom.authority) kub.attr("disabled", true);
	}else{
		update("Not enough Authority to level up!");
		update("");
	}
}

function checkGearUpgrade(thisDiv){
	var index = thisDiv.attr("divNum");
	var human = state.party[index];
	var goldCost = Math.round(10 * Math.pow(Math.sqrt(2), human.level/2.0));
	if(state.gold >= goldCost){
		state.gold -= goldCost;
		gi.selectAll("*").remove();
		gi.append("text").text("GOLD: " + format(state.gold));
		var whichGear;
		var offense = getPow(human)*getAcc(human)*getSpd(human);
		var defense = getDef(human)*getEva(human)*getRng(human);
		if(offense/defense <= 0.5) whichGear = 0;
		else if(offense/defense >= 2.0) whichGear = 1;
		else whichGear = Math.random();
		var whichStat = Math.random();
		var a = 1, b = 1, c = 1;
		if(whichStat < 1.0/3.0) a = 1.1;
		else if(whichStat < 2.0/3.0) b = 1.1;
		else c = 1.1;
		if(whichGear < 0.5){
			update(human.name + human.className + " found a new weapon!");
			var oldWeapon = human.weapon;
			var oldPow = oldWeapon.pow;
			var oldAcc = oldWeapon.acc;
			var oldSpd = oldWeapon.spd;
			var newWeapon = {
					pow: oldPow * a,
					acc: oldAcc * b,
					spd: oldSpd * c
			}
			human.weapon = newWeapon;
			newWeapon.name = determineWeaponName(human, regions[state.region].material);
			var improved = "";
			if(newWeapon.name == oldWeapon.name) improved = "Improved ";
			update(human.name + human.className + "'s weapon: " + oldWeapon.name +
					" -> " + improved + newWeapon.name);
			update("   POWER: " + Math.round(oldPow) + " -> " + Math.round(newWeapon.pow));
			update("ACCURACY: " + Math.round(oldAcc) + " -> " + Math.round(newWeapon.acc));
			update("   SPEED: " + Math.round(oldSpd) + " -> " + Math.round(newWeapon.spd));
			update("");
		}else{
			update(human.name + human.className + " found new armor!");
			var oldArmor = human.armor;
			var oldDef = oldArmor.def;
			var oldEva = oldArmor.eva;
			var oldRng = oldArmor.rng;
			var newArmor = {
					def: oldDef * a,
					eva: oldEva * b,
					rng: oldRng * c
			}
			human.armor = newArmor;
			newArmor.name = determineArmorName(human, regions[state.region].material);
			var improved = "";
			if(newArmor.name == oldArmor.name) improved = "Improved ";
			update(human.name + human.className + "'s armor: " + oldArmor.name +
					" -> " + improved + newArmor.name);
			update("DEFENSE: " + Math.round(oldDef) + " -> " + Math.round(newArmor.def));
			update("EVASION: " + Math.round(oldEva) + " -> " + Math.round(newArmor.eva));
			update("  RANGE: " + Math.round(oldRng) + " -> " + Math.round(newArmor.rng));
			update("");
		}
		human.level += 1;
		d3.select("#" + human.id + "lvlabel").text("Level " + human.level);
		update(human.name + human.className + " gained a level!");
		update("");
		displayHumanStats(thisDiv);
	}else{
		update("Not enough gold to buy gear!");
	}
}

function buyUpgrade(){
	var human = state.party[selectedDiv.attr("divNum")];
	var that = d3.select(this);
	var obj = human.upgrades[that.attr("id")];
	human.xp -= obj.cost;
	d3.select("#" + human.id + "xplabel").text(format(human.xp) + " XP");
	window[obj.fn](human);
	obj.status = "purchased";
	obj.unlocks.forEach(function(n){
		human.upgrades[n].status = "available";
	});
	displayHumanStats(selectedDiv);
}

function createCleric(name) {
	var human = {};
	
	human.ally = true;
	human.hp = 100;
	human.count = 0;
	human.level = 0;
	human.xp = 0;
	human.name = name;
	human.className = "Cleric";
	
	human.mgt = 10;
	human.foc = Math.sqrt(2)*5;
	human.spr = Math.sqrt(2)*10;
	human.vit = 10;
	human.agi = Math.sqrt(2)*5;
	human.int = Math.sqrt(2)*10;
	
	human.weapon = {
		name: "Light Mace",
		pow: Math.sqrt(2)*10,
		acc: Math.sqrt(2)*5,
		spd: 10
	}
	
	human.armor = {
		name: "Full Plate Armor",
		def: Math.sqrt(2)*10,
		eva: 10,
		rng: Math.sqrt(2)*5
	}
	
	human.skills = {"FlameStrike":{name:"Flame Strike", fn:"flameStrike", locked:true, count:0, cooldown:30, icon:"FlameShock",
		desc:"A fire spell that attacks a random enemy with a cooldown of 30 seconds."}};
	human.upgrades = {"UnlockFlameStrike":{name:"Unlock Flame Strike", icon:"FlameShock", cost:10,
		fn:"unlockFlameStrike", status:"available",
		unlocks:[],
		desc:"Unlocks Flame Strike, a fire spell that attacks a random enemy with a cooldown of 30 seconds."}};
	
	reset(human);
	return human;
}

function createFighter(name) {
	var human = {};
	
	human.ally = true;
	human.hp = 100;
	human.count = 0;
	human.level = 0;
	human.xp = 0;
	human.name = name;
	human.className = "Fighter";
	
	human.mgt = Math.sqrt(2)*10;
	human.foc = 10;
	human.spr = Math.sqrt(2)*5;
	human.vit = Math.sqrt(2)*10;
	human.agi = 10;
	human.int = Math.sqrt(2)*5;
	
	human.weapon = {
		name: "Longsword",
		pow: 10,
		acc: 10,
		spd: 10
	}
	
	human.armor = {
		name: "Scale Mail Armor",
		def: 10,
		eva: Math.sqrt(2)*10,
		rng: Math.sqrt(2)*5
	}
	
	human.skills = {"PowerAttack":{name:"Power Attack", fn:"powerAttack", locked:true, count:0, cooldown:30, icon:"ClickAttack",
		desc:"A powerful slash that attacks a random enemy with a cooldown of 30 seconds."}};
	human.upgrades = {"UnlockPowerAttack":{name:"Unlock Power Attack", icon:"ClickAttack", cost:10,
		fn:"unlockPowerAttack", status:"available",
		unlocks:[],
		desc:"Unlocks Power Attack, a powerful slash that attacks a random enemy with a cooldown of 30 seconds."}};
	
	reset(human);
	return human;
}

function createMage(name) {
	var human = {};
	
	human.ally = true;
	human.hp = 100;
	human.count = 0;
	human.level = 0;
	human.xp = 0;
	human.name = name;
	human.className = "Mage";
	
	human.mgt = Math.sqrt(2)*5;
	human.foc = 10;
	human.spr = Math.sqrt(2)*10;
	human.vit = Math.sqrt(2)*5;
	human.agi = 10;
	human.int = Math.sqrt(2)*10;
	
	human.weapon = {
		name: "Wooden Staff",
		pow: 10,
		acc: Math.sqrt(2)*5,
		spd: Math.sqrt(2)*10
	}
	
	human.armor = {
		name: "Magic Robe",
		def: Math.sqrt(2)*5,
		eva: 10,
		rng: Math.sqrt(2)*10
	}
	
	human.skills = {"LightningBolt":{name:"Lightning Bolt", fn:"lightningBolt", locked:true, count:0, cooldown:30, icon:"LightningBolt",
		desc:"A lightning spell that attacks a random enemy with a cooldown of 30 seconds."}};
	human.upgrades = {"UnlockLightningBolt":{name:"Unlock Lightning Bolt", icon:"LightningBolt", cost:10,
		fn:"unlockLightningBolt", status:"available",
		unlocks:[],
		desc:"Unlocks Lightning Bolt, a lightning spell that attacks a random enemy with a cooldown of 30 seconds."}};
	
	reset(human);
	return human;
}

function createRogue(name) {
	var human = {};
	
	human.ally = true;
	human.hp = 100;
	human.count = 0;
	human.level = 0;
	human.xp = 0;
	human.name = name;
	human.className = "Rogue";
	
	human.mgt = Math.sqrt(2)*5;
	human.foc = Math.sqrt(2)*10;
	human.spr = 10;
	human.vit = Math.sqrt(2)*5;
	human.agi = Math.sqrt(2)*10;
	human.int = 10;
	
	human.weapon = {
		name: "Dagger",
		pow: Math.sqrt(2)*5,
		acc: 10,
		spd: Math.sqrt(2)*10
	}
	
	human.armor = {
		name: "Studded Leather",
		def: 10,
		eva: 10,
		rng: 10
	}
	
	human.skills = {"Stormstrike":{name:"Stormstrike", fn:"stormstrike", locked:true, count:0, cooldown:30, icon:"Stormstrike",
		desc:"A lightning attack that attacks a random enemy with a cooldown of 30 seconds."}};
	human.upgrades = {"UnlockStormstrike":{name:"Unlock Stormstrike", icon:"Stormstrike", cost:10,
		fn:"unlockStormstrike", status:"available",
		unlocks:[],
		desc:"Unlocks Stormstrike, a lightning attack that attacks a random enemy with a cooldown of 30 seconds."}};
	
	reset(human);
	return human;
}

function createMonster(multiplier, count){
	var monster = determineMonsterStats(multiplier, count);
	determineMonsterName(monster, worlds[state.world], count);
	monster.className = "";
	monster.skills = {};
	reset(monster);
	return monster;
}

function copyCreature(other){
	var creature = {};
	
	creature.ally = other.ally;
	creature.hp = other.hp;
	creature.count = other.count;
	
	creature.mgt = other.mgt;
	creature.foc = other.foc;
	creature.vit = other.vit;
	creature.agi = other.agi;
	creature.spr = other.spr;
	creature.int = other.int;
	
	creature.weapon = other.weapon;
	creature.armor = other.armor;
	
	creature.name = other.name;
	creature.className = other.className;
	creature.skills = other.skills;
	
	reset(creature);
	return creature;
}

function determineMonsters(){
	var num = 0;
	
	var howMany = Math.random();
	if(howMany < 0.25) num = 1;
	else if(howMany < 0.5) num = 2;
	else if(howMany < 0.75) num = 3;
	else num = 4;
	
	state.mob = [];
	state.mob[0] = createMonster(state.multiplier, num);
	if(num > 1){
		for(var i=1; i<num; i++){
			state.mob[i] = copyCreature(state.mob[0]);
			state.mob[i].className = " #" + (i+1);
		}
		state.mob[0].className = " #1";
	}
}