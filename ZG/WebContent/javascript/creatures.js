var materials = ["Wooden ", "Stone ", "Darkwood ", "Copper ", "Bronze ", "Iron ", "Steel ", "Silver ",
			"Ethereal ", "Crystal ", "Star ", "Orcsteel ", "Obsidian ", "Mithril ", "Golden ", "Electrum ",
			"Platinum ", "Titanium ", "Diamond ", "Adamantine ", "Godforged ", "Diem's "];
var templates = ["", "", "Dire ", "Poisonous ", "Aquatic ", "Blazing ", "Coal ", "Fey ", "Spectral ",
			"Frost ", "Fallen ", "Mountain ", "Volcanic ", "Armored ", "Ancient ", "Sand ", "Blood ",
			"Titanic ", "Corrupted ", "Chaos ", "Divine "];

function determineHumanStats(){
	var human = {};
	
	var offenseF = 2.0 + Math.random();
	var defenseF = 5.0 - offenseF;
	var offense = (offenseF/defenseF) * 10000;
	var defense = (defenseF/offenseF) * 10000;
	var damageF = 2.0 + Math.random();
	var accuracyF = 5.0 - damageF;
	var damage = (damageF/accuracyF) * Math.sqrt(offense);
	var accuracy = (accuracyF/damageF) * Math.sqrt(offense);
	var healthF = 2.0 + Math.random();
	var evasionF = 5.0 - healthF;
	var health = (healthF/evasionF) * Math.sqrt(defense);
	var evasion = (evasionF/healthF) * Math.sqrt(defense);

	var strongF = 2.0 + Math.random();
	var weaponF = 5.0 - strongF;
	human.str = (strongF/weaponF) * Math.sqrt(damage);
	human.pow = (weaponF/strongF) * Math.sqrt(damage);
	var dextrousF = 2.0 + Math.random();
	var unerringF = 5.0 - dextrousF;
	human.dex = (dextrousF/unerringF) * Math.sqrt(accuracy);
	human.acc = (unerringF/dextrousF) * Math.sqrt(accuracy);
	var vitalF = 2.0 + Math.random();
	var armorF = 5.0 - vitalF;
	human.vit = (vitalF/armorF) * Math.sqrt(health);
	human.def = (armorF/vitalF) * Math.sqrt(health);
	var agileF = 2.0 + Math.random();
	var dodgeF = 5.0 - agileF;
	human.agi = (agileF/dodgeF) * Math.sqrt(evasion);
	human.evd = (dodgeF/agileF) * Math.sqrt(evasion);
	human.spd = 10;
	
	human.skills = ["Strike"];
	
	return human;
}

function determineMonsterStats(multiplier, num){
	var monster = {};
	
	var totalPower = (400000000.0 / (num*num)) * multiplier;
	var offenseF = 2.0 + Math.random();
	var defenseF = 5.0 - offenseF;
	var offense = (offenseF/defenseF) * Math.sqrt(totalPower);
	var defense = (defenseF/offenseF) * Math.sqrt(totalPower);
	var damageF = 2.0 + Math.random();
	var accuracyF = 5.0 - damageF;
	monster.str = (damageF/accuracyF) * Math.sqrt(offense);
	monster.dex = (accuracyF/damageF) * Math.sqrt(offense);
	var healthF = 2.0 + Math.random();
	var evasionF = 5.0 - healthF;
	monster.vit = (healthF/evasionF) * Math.sqrt(defense);
	monster.agi = (evasionF/healthF) * Math.sqrt(defense);
	
	monster.pow = 1;
	monster.acc = 1;
	monster.def = 1;
	monster.evd = 1;
	monster.spd = 10;
	
	return monster;
}

function determineClassName(human){
	var className = "";
	var damage = human.str*human.pow;
	var accuracy = human.dex*human.acc;
	var health = human.vit*human.def;
	var evasion = human.agi*human.evd;
	var offense = damage*accuracy;
	var defense = health*evasion;
	
	if(offense/defense < 0.8){
		if(damage/accuracy < 0.8)		className = "Wild ";
		else if(damage/accuracy < 1.25) className = "War ";
		else							className = "Holy ";
		
		if(health/evasion < 0.8)		className += "Druid";
		else if(health/evasion < 1.25)	className += "Knight";
		else							className += "Cleric";
	}else if(offense/defense < 1.25){
		if(damage/accuracy < 0.8)		className = "Shadow ";
		else if(damage/accuracy < 1.25)	className = "Primal ";
		else							className = "Fury ";
		
		if(health/evasion < 0.8)		className += "Rogue";
		else if(health/evasion < 1.25)	className += "Ranger";
		else							className += "Barbarian";
	}else{
		if(health/evasion < 0.8)		className = "Arcane ";
		else if(health/evasion < 1.25)	className = "Elemental ";
		else							className = "Draconic ";
		
		if(damage/accuracy < 0.8)		className += "Wizard";
		else if(damage/accuracy < 1.25)	className += "Shaman";
		else							className += "Sorcerer";
	}
	return className;
}

function determineMonsterName(monster, monsterName, num){
	var offense = monster.str*monster.dex;
	var defense = monster.vit*monster.agi;
	
	if(num == 1){
		if(offense/defense < 0.8) 						monsterName += "Demon ";
		else if(offense/defense < 1.25) 				monsterName += "Dragon ";
		else 											monsterName += "Phoenix ";
		
		if(monster.vit/monster.agi < 0.8)				monsterName += "Mage";
		else if(monster.vit/monster.agi < 1.25)			monsterName += "Lord";
		else											monsterName += "Slayer";
	}else if(num == 2){
		if(offense/defense < 0.8) 						monsterName += "Troll ";
		else if(offense/defense < 1.25) 				monsterName += "Ogre ";
		else 											monsterName += "Ettin ";
		
		if(monster.vit/monster.agi < 0.8)				monsterName += "Guardian";
		else if(monster.vit/monster.agi < 1.25)			monsterName += "Brute";
		else											monsterName += "Berserker";
	}else if(num == 3){
		if(offense/defense < 0.8) 						monsterName += "Ghost ";
		else if(offense/defense < 1.25) 				monsterName += "Zombie ";
		else 											monsterName += "Skeleton ";
		
		if(monster.vit/monster.agi < 0.8)				monsterName += "Runner";
		else if(monster.vit/monster.agi < 1.25)			monsterName += "Minion";
		else											monsterName += "Avenger";
	}else if(num == 4){
		if(offense/defense < 0.8) 						monsterName += "Orc ";
		else if(offense/defense < 1.25) 				monsterName += "Goblin ";
		else 											monsterName += "Kobold ";
		
		if(monster.vit/monster.agi < 0.8)				monsterName += "Assassin";
		else if(monster.vit/monster.agi < 1.25)			monsterName += "Scout";
		else											monsterName += "Soldier";
	}
	monster.name = monsterName;
}

function determineWeaponName(human, weaponName){
	var damage = human.str*human.pow;
	var accuracy = human.dex*human.acc;
	var offense = damage*accuracy;
	var defense = human.vit*human.def*human.agi*human.evd;
	
	if(offense/defense < 0.8){
		if(human.str/human.pow < 0.8)				weaponName += "Bastard ";
		else if(human.str/human.pow < 1.25)			weaponName += "Great ";
		else										weaponName += "Heavy ";
		
		if(damage/accuracy < 0.8)					weaponName += "Scimitar of ";
		else if(damage/accuracy < 1.25)				weaponName += "Longsword of ";
		else										weaponName += "Mace of ";
		
		if(human.dex/human.acc < 0.8)				weaponName += "Contrition";
		else if(human.dex/human.acc < 1.25)			weaponName += "Might";
		else										weaponName += "Retribution";
	}else if(offense/defense < 1.25){
		if(human.str/human.pow < 0.8)				weaponName += "Masterwork ";
		else if(human.str/human.pow < 1.25)			weaponName += "Battle ";
		else										weaponName += "Curved ";
		
		if(damage/accuracy < 0.8)					weaponName += "Dagger of ";
		else if(damage/accuracy < 1.25)				weaponName += "Shortswords of ";
		else										weaponName += "Axe of ";
		
		if(human.dex/human.acc < 0.8)				weaponName += "Rage";
		else if(human.dex/human.acc < 1.25)			weaponName += "Speed";
		else										weaponName += "Precision";
	}else{
		if(human.str/human.pow < 0.8)				weaponName += "Hooked ";
		else if(human.str/human.pow < 1.25)			weaponName += "Bladed ";
		else										weaponName += "Runed ";
		
		if(damage/accuracy < 0.8)					weaponName += "Staff of ";
		else if(damage/accuracy < 1.25)				weaponName += "Hammer of ";
		else										weaponName += "Spear of ";
		
		if(human.dex/human.acc < 0.8)				weaponName += "Fangs";
		else if(human.dex/human.acc < 1.25)			weaponName += "Destruction";
		else										weaponName += "Wisdom";
	}
	
	return weaponName;
}

function determineArmorName(human, armorName){
	var health = human.vit*human.def;
	var evasion = human.agi*human.evd;
	var offense = human.str*human.pow*human.dex*human.acc;
	var defense = health*evasion;
	
	if(offense/defense < 0.8){
		if(human.vit/human.def < 0.8)				armorName += "Full ";
		else if(human.vit/human.def < 1.25)			armorName += "Half ";
		else										armorName += "Banded ";
		
		if(health/evasion < 0.8)					armorName += "Hide Armor of ";
		else if(health/evasion < 1.25)				armorName += "Scalemail of ";
		else										armorName += "Plate of ";
		
		if(human.dex/human.acc < 0.8)				armorName += "Discipline";
		else if(human.dex/human.acc < 1.25)			armorName += "Balance";
		else										armorName += "Protection";
	}else if(offense/defense < 1.25){
		if(human.vit/human.def < 0.8)				armorName += "Chain ";
		else if(human.vit/human.def < 1.25)			armorName += "Studded ";
		else										armorName += "Padded ";
		
		if(health/evasion < 0.8)					armorName += "Leather Armor of ";
		else if(health/evasion < 1.25)				armorName += "Mail of ";
		else										armorName += "Breastplate of ";
		
		if(human.dex/human.acc < 0.8)				armorName += "Wrath";
		else if(human.dex/human.acc < 1.25)			armorName += "Survival";
		else										armorName += "Subtlety";
	}else{
		if(human.vit/human.def < 0.8)				armorName += "Reinforced ";
		else if(human.vit/human.def < 1.25)			armorName += "Mystic ";
		else										armorName += "Woven ";
		
		if(health/evasion < 0.8)					armorName += "Robe of ";
		else if(health/evasion < 1.25)				armorName += "Shirt of ";
		else										armorName += "Cloth Armor of ";
		
		if(human.dex/human.acc < 0.8)				armorName += "Tyranny";
		else if(human.dex/human.acc < 1.25)			armorName += "Fulmination";
		else										armorName += "Meditation";
	}
	return armorName;
}

function checkStatUpgrade(){
	var human = party[upgrader];
	if(Math.random() < 0.25){
		var whichStat = Math.random();
		var offense = human.str*human.dex*human.pow*human.acc;
		var defense = human.vit*human.agi*human.def*human.evd;
		if(offense/defense <= 4.0/9.0)
			whichStat /= 2.0;
		else if(offense/defense >= 9.0/4.0)
			whichStat = (whichStat / 2.0) + 0.5;
		if(whichStat < 0.25){
			update(human.name + human.className + "'s strength improved!");
			update("STRENGTH: " + Math.round(human.str) + " -> " + Math.round(human.str*1.1));
			update("");
			human.str *= 1.1;
		}else if(whichStat < 0.5){
			update(human.name + human.className + "'s dexterity improved!");
			update("DEXTERITY: " + Math.round(human.dex) + " -> " + Math.round(human.dex*1.1));
			update("");
			human.dex *= 1.1;
		}else if(whichStat < 0.75){
			update(human.name + human.className + "'s vitality improved!");
			update("VITALITY: " + Math.round(human.vit) + " -> " + Math.round(human.vit*1.1));
			update("");
			human.vit *= 1.1;
		}else{
			update(human.name + human.className + "'s agility improved!");
			update("AGILITY: " + Math.round(human.agi) + " -> " + Math.round(human.agi*1.1));
			update("");
			human.agi *= 1.1;
		}
		setTimeout(checkClassUpgrade, speed);
	}else setTimeout(checkClassUpgrade, 0);
}

function checkClassUpgrade(){
	var human = party[upgrader];
	var newClass = determineClassName(human);
	if(newClass != human.className){
		update(human.name + human.className + " changed class!");
		update(human.className + " -> " + newClass);
		update("");
		human.className = newClass;
		human.namelabel.text(human.name + human.className);
		setTimeout(checkGearUpgrade, speed);
	}else setTimeout(checkGearUpgrade, 0);
}

function checkGearUpgrade(){
	var human = party[upgrader];
	if(Math.random() < 0.125){
		var whichGear;
		var offense = human.str*human.dex*human.pow*human.acc;
		var defense = human.vit*human.agi*human.def*human.evd;
		if(offense/defense <= 4.0/9.0) whichGear = 0;
		else if(offense/defense >= 9.0/4.0) whichGear = 1;
		else whichGear = Math.random();
		if(whichGear < 0.5){
			update(human.name + human.className + " found a new weapon!");
			var oldPow = human.pow;
			var oldAcc = human.acc;
			human.pow *= 1.1;
			human.acc *= 1.1;
			var newWeapon = determineWeaponName(human, materials[arena]);
			var improved = "";
			if(newWeapon == human.weaponName) improved = "Improved ";
			update(human.name + human.className + "'s weapon: " + human.weaponName +
					" -> " + improved + newWeapon);
			human.weaponName = newWeapon;
			update("   POWER: " + Math.round(oldPow) + " -> " + Math.round(human.pow));
			update("ACCURACY: " + Math.round(oldAcc) + " -> " + Math.round(human.acc));
			update("");
		}else{
			update(human.name + human.className + " found new armor!");
			var oldDef = human.def;
			var oldEvd = human.evd;
			human.def *= 1.1;
			human.evd *= 1.1;
			var newArmor = determineArmorName(human, materials[arena]);
			var improved = "";
			if(newArmor == human.armorName) improved = "Improved ";
			update(human.name + human.className + "'s armor: " + human.armorName +
					" -> " + improved + newArmor);
			human.armorName = newArmor;
			update("DEFENSE: " + Math.round(oldDef) + " -> " + Math.round(human.def));
			update("EVASION: " + Math.round(oldEvd) + " -> " + Math.round(human.evd));
			update("");
		}
		if(upgrader == 3){
			if(diem) setTimeout(setupDiemBattle, speed);
			else setTimeout(checkArenaRollover, speed);
		}else{
			upgrader++;
			setTimeout(checkStatUpgrade, speed);
		}
	}else{
		if(upgrader == 3){
			if(diem) setTimeout(setupDiemBattle, 0);
			else setTimeout(checkArenaRollover, 0);
		}else{
			upgrader++;
			setTimeout(checkStatUpgrade, 0);
		}
	}
}

function createHuman(name, arenaNum) {
	var human = determineHumanStats();
	human.hp = 100;
	human.level = 0;
	human.xp = 0;
	human.className = determineClassName(human);
	human.name = name;
	human.weaponName = determineWeaponName(human, materials[arenaNum]);
	human.armorName = determineArmorName(human, materials[arenaNum]);
	return human;
}

function createMonster(multiplier, arenaNum, count){
	var monster = determineMonsterStats(multiplier, count);
	monster.hp = 100;
	determineMonsterName(monster, templates[arenaNum], count);
	monster.className = "";
	return monster;
}

function copyCreature(other){
	var creature = {};
	creature.hp = 100;
	creature.str = other.str;
	creature.dex = other.dex;
	creature.vit = other.vit;
	creature.agi = other.agi;
	creature.pow = other.pow;
	creature.acc = other.acc;
	creature.def = other.def;
	creature.evd = other.evd;
	creature.spd = other.spd;
	creature.name = other.name;
	creature.className = other.className;
	creature.weaponName = other.weaponName;
	creature.armorName = other.armorName;
	return creature;
}

function determineMonsters(){
	var num = 0;
	
	var howMany = Math.random();
	if(howMany < 0.25) num = 1;
	else if(howMany < 0.5) num = 2;
	else if(howMany < 0.75) num = 3;
	else num = 4;
	
	mob = [];
	mob[0] = createMonster(multiplier, arena, num);
	if(num > 1){
		for(var i=1; i<num; i++){
			mob[i] = copyCreature(mob[0]);
			mob[i].className = " #" + (i+1);
		}
		mob[0].className = " #1";
	}
}