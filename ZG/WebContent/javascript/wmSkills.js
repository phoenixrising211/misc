/*
 * =============
 * Active Skills
 * =============
 */


var changeSkillCount = function(that, amt){
	that.count += amt;
	if(!isOnCd(that)){
		that.count = that.cooldown;
		that.button.attr("disabled", null);
	}else if(that.button) that.button.attr("disabled", true);
	if(that.count <= 0) that.count = 0;
}

var isOnCd = function(that){
	return that.count < that.cooldown;
}

var powerAttack = function(that){
	active = state.party[that.attr("divNum")];
	if(active.hp <= 0) return;
	target = randomizeMobTarget();
	if(target == null) return;
	params = {text: "" + active.name + active.className + " attacks " + target.name + target.className +
					" with a powerful attack!",
				pow: Math.sqrt(2)
			};
	attack(active, target, params);
	that.attr("disabled", true);
	changeSkillCount(active.skills.PowerAttack,-99999);
	cont();
}

var flameStrike = function(that){
	active = state.party[that.attr("divNum")];
	if(active.hp <= 0) return;
	target = randomizeMobTarget();
	if(target == null) return;
	params = {text: "" + active.name + active.className + " casts Flame Strike on " + target.name + target.className + "!",
				def: Math.sqrt(2) / 2.0
			};
	attack(active, target, params);
	that.attr("disabled", true);
	changeSkillCount(active.skills.FlameStrike,-99999);
	cont();
}

var lightningBolt = function(that){
	active = state.party[that.attr("divNum")];
	if(active.hp <= 0) return;
	target = randomizeMobTarget();
	if(target == null) return;
	params = {text: "" + active.name + active.className + " casts Lightning Bolt on " + target.name + target.className + "!",
				eva: Math.sqrt(2) / 2.0
			};
	attack(active, target, params);
	that.attr("disabled", true);
	changeSkillCount(active.skills.LightningBolt,-99999);
	cont();
}

var stormstrike = function(that){
	active = state.party[that.attr("divNum")];
	if(active.hp <= 0) return;
	target = randomizeMobTarget();
	if(target == null) return;
	params = {text: "" + active.name + active.className + " strikes " + target.name + target.className +
					" with a storm!",
				acc: Math.sqrt(2)
			};
	attack(active, target, params);
	that.attr("disabled", true);
	changeSkillCount(active.skills.Stormstrike,-99999);
	cont();
}

/*
 * =============
 * Upgrades
 * =============
 */

var unlockPowerAttack = function(human){
	human.skills["PowerAttack"].locked = false;
	d3.select("#" + human.id + "PowerAttack").classed("locked", false);
}

var unlockFlameStrike = function(human){
	human.skills["FlameStrike"].locked = false;
	d3.select("#" + human.id + "FlameStrike").classed("locked", false);
}

var unlockLightningBolt = function(human){
	human.skills["LightningBolt"].locked = false;
	d3.select("#" + human.id + "LightningBolt").classed("locked", false);
}

var unlockStormstrike = function(human){
	human.skills["Stormstrike"].locked = false;
	d3.select("#" + human.id + "Stormstrike").classed("locked", false);
}