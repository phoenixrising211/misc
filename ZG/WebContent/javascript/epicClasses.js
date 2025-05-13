//------
//CLERIC
//------
function newHealingStrike(){
	var healingStrike = newAction("Healing Strike");
	healingStrike.focus = +25;
	healingStrike.start = function(){
		targetOneEnemy();
	}
	healingStrike.resolve = function(){
		update(active.name + " attacks " + target.name + " with a healing strike!");
		hits = hit();
		if(hits) damage(hits, 0.5);
		else update("Miss.");
		active.delay = target.getRng();
		target = active;
		heal(0.25);
		battleTimeout = setTimeout(cont, 2000);
	}
	return healingStrike;
}

function newCure(){
	var cure = newAction("Cure");
	cure.focus = -50;
	cure.start = function(){
		targetOneAlly();
	}
	cure.resolve = function(){
		update(active.name + " casts Cure on " + target.name + "!");
		heal(1.5);
		active.delay = 20;
		battleTimeout = setTimeout(cont, 2000);
	}
	return cure;
}

function newHealingCircle(){
	var healingCircle = newAction("Healing Circle");
	healingCircle.focus = -100;
	healingCircle.cooldown = 1;
	healingCircle.start = function(){
		this.resolve();
	}
	healingCircle.resolve = function(){
		update(active.name + " casts Healing Circle!");
		var targets = active.good ? party : mob;
		targets.forEach(function(t){
			target = t;
			heal(0.5);
		});
		active.delay = 20;
		this.count = 0;
		battleTimeout = setTimeout(cont, 2000);
	}
	return healingCircle;
}

function newCleric(name){
	cleric = newCreature();
	cleric.name = name + " the Cleric";
	cleric.mgt = Y12;
	cleric.fin = Y8;
	cleric.spr = Y10;
	cleric.vit = Y10;
	cleric.agi = Y10;
	cleric.int = Y10;
	
	//skills
	cleric.healingStrike = newHealingStrike();
	cleric.cure = newCure();
	cleric.healingCircle = newHealingCircle();
	cleric.actions = [
		cleric.healingStrike,
		cleric.cure,
		cleric.healingCircle
	];
	
	//equipment
	cleric.weapon = mace;
	cleric.armor = cloak;
	
	//ai hints
	cleric.aiAction = function(){
		var pain = false;
		var targets = this.good ? party : mob;
		targets.forEach(function(elem){
			if(elem.hp > 0 && elem.hp <= 55) pain = true;
		})
		
		if(pain && this.focus >= 100 && !this.healingCircle.isOnCd()) return this.healingCircle;
		else if(pain && this.focus >= 50) return this.cure;
		else return this.healingStrike;
	},
	cleric.aiTargetOneAlly = function(callback){
		var targets = this.good ? party : mob;
		var newTargets = [];
		targets.forEach(function(elem){
			if(elem.hp > 0 && elem.hp <= 55) newTargets.push(elem);
		})
		var randInt = Math.floor(Math.random() * newTargets.length);
		target = newTargets[randInt];
		action.resolve();
	}
	
	return cleric;
}

//-------
//FIGHTER
//-------
function newSecondWind(){
	var secondWind = newAction("Second Wind");
	secondWind.focus = +50;
	secondWind.start = function(){
		this.resolve();
	}
	secondWind.resolve = function(){
		update(active.name + " gets a second wind!");
		target = active;
		heal(0.5);
		active.delay = 20;
		battleTimeout = setTimeout(cont, 2000);
	}
	return secondWind;
}

function newPowerAttack(){
	var powerAttack = newAction("Power Attack");
	powerAttack.focus = -20;
	powerAttack.start = function(){
		targetOneEnemy();
	}
	powerAttack.resolve = function(){
		update(active.name + " power attacks " + target.name + "!");
		hits = hit(0.8);
		if(hits) damage(hits, 1.5);
		else update("Miss.");
		active.delay = target.getRng();
		battleTimeout = setTimeout(cont, 2000);
	}
	return powerAttack;
}

function newCharge(){
	var charge = newAction("Charge");
	charge.focus = -30;
	charge.cooldown = 1;
	charge.start = function(){
		targetOneEnemy();
	}
	charge.resolve = function(){
		update(active.name + " charges " + target.name + "!");
		hits = hit();
		if(hits) damage(hits);
		else update("Miss.");
		active.delay = target.getRng() * 0.7;
		this.count = 0;
		battleTimeout = setTimeout(cont, 2000);
	}
	return charge;
}

function newFighter(name){
	fighter = newCreature();
	fighter.name = name + " the Fighter";
	fighter.mgt = Y10;
	fighter.fin = Y12;
	fighter.spr = Y8;
	fighter.vit = Y12;
	fighter.agi = Y10;
	fighter.int = Y8;
	
	//actions
	fighter.secondWind = newSecondWind();
	fighter.powerAttack = newPowerAttack();
	fighter.charge = newCharge();
	fighter.actions = [
		fighter.secondWind,
		fighter.powerAttack,
		fighter.charge
	];
	
	//equipment
	fighter.weapon = axe;
	fighter.armor = plate;
	
	//ai hints
	fighter.aiAction = function(){
		if(this.focus < 20 || (this.focus <= 50 && this.hp <= 85)) return this.secondWind;
		else if(this.focus >= 30 && !this.charge.isOnCd()) return this.charge;
		else return this.powerAttack;
	}
	
	return fighter;
}

//-----
//ROGUE
//-----
function newLeadingStrike(){
	var leadingStrike = newAction("Leading Strike");
	leadingStrike.focus = +20;
	leadingStrike.start = function(){
		targetOneEnemy();
	};
	leadingStrike.resolve = function(){
		update(active.name + " attacks " + target.name + " with a leading strike!");
		hits = hit();
		if(hits) damage(hits, 0.8);
		else update("Miss.");
		active.delay = target.getRng();
		battleTimeout = setTimeout(cont, 2000);
	}
	return leadingStrike;
}

function newSneakAttack(){
	var sneakAttack = newAction("Sneak Attack");
	sneakAttack.focus = -100;
	sneakAttack.start = function(){
		targetOneEnemy();
	};
	sneakAttack.resolve = function(){
		update(active.name + " sneak attacks " + target.name + "!");
		hits = hit(3.0);
		if(hits) damage(hits, 2.0/3.0);
		else update("Miss.");
		active.delay = target.getRng();
		battleTimeout = setTimeout(cont, 2000);
	}
	return sneakAttack;
}

function newOpportunityAttack(){
	var opportunityAttack = newAction("Opportunity Attack");
	opportunityAttack.focus = -40;
	opportunityAttack.cooldown = 1;
	opportunityAttack.start = function(){
		targetOneEnemy();
	};
	opportunityAttack.resolve = function(){
		update(active.name + " takes the opportunity to attack " + target.name + "!");
		hits = hit();
		if(hits) damage(hits, 0.4);
		else update("Miss.");
		active.delay = 0;
		this.count = 0;
		battleTimeout = setTimeout(cont, 2000);
	}
	return opportunityAttack;
}

function newRogue(name){
	rogue = newCreature();
	rogue.name = name + " the Rogue";
	rogue.mgt = Y10;
	rogue.fin = Y10;
	rogue.spr = Y10;
	rogue.vit = Y10;
	rogue.agi = Y10;
	rogue.int = Y10;
	
	//actions
	rogue.leadingStrike = newLeadingStrike();
	rogue.sneakAttack = newSneakAttack();
	rogue.opportunityAttack = newOpportunityAttack();
	rogue.actions = [
		rogue.leadingStrike,
		rogue.sneakAttack,
		rogue.opportunityAttack
	];
	
	//equipment
	rogue.weapon = dagger;
	rogue.armor = shirt;
	
	//ai hints
	rogue.aiAction = function(){
		if(this.focus >= 40 && !this.opportunityAttack.isOnCd()) return this.opportunityAttack;
		if(this.focus < 100) return this.leadingStrike;
		else return this.sneakAttack;
	}
	
	return rogue;
}

//------
//WIZARD
//------
function newRecover(){
	var recover = newAction("Recover");
	recover.focus = +80;
	recover.start = function(){
		this.resolve();
	}
	recover.resolve = function(){
		update(active.name + " recovers!");
		this.delay = 16;
		battleTimeout = setTimeout(cont, 2000);
	}
	return recover;
}

function newMagicMissile(){
	var magicMissile = newAction("Magic Missile");
	magicMissile.focus = -25;
	magicMissile.start = function(){
		targetOneEnemy();
	}
	magicMissile.resolve = function(){
		update(active.name + " casts Magic Missile on " + target.name + "!");
		if(target.hp > 0) damage(1, 0.3);
		if(target.hp > 0) damage(1, 0.3);
		if(target.hp > 0) damage(1, 0.3);
		active.delay = target.getRng();
		battleTimeout = setTimeout(cont, 2000);
	}
	return magicMissile;
}

function newFireball(){
	var fireball = newAction("Fireball");
	fireball.focus = -55;
	fireball.cooldown = 1;
	fireball.start = function(){
		this.resolve();
	}
	fireball.resolve = function(){
		update(active.name + " casts Fireball!");
		var targets = active.good ? mob : party;
		var upTargets = [];
		targets.forEach(function(t){
			if(t.hp > 0) upTargets.push(t);
		})
		var dmgFactor = 1.55/upTargets.length;
		upTargets.forEach(function(t){
			target = t;
			hits = hit();
			if(hits) damage(hits, dmgFactor);
			else update("Miss.");
		})
		active.delay = 20;
		this.count = 0;
		battleTimeout = setTimeout(cont, 2000);
	}
	return fireball;
}

function newWizard(name){
	wizard = newCreature();
	wizard.name = name + " the Wizard";
	wizard.mgt = Y8;
	wizard.fin = Y10;
	wizard.spr = Y12;
	wizard.vit = Y8;
	wizard.agi = Y10;
	wizard.int = Y12;
	
	//actions
	wizard.recover = newRecover();
	wizard.magicMissile = newMagicMissile();
	wizard.fireball = newFireball();
	wizard.actions = [
		wizard.recover,
		wizard.magicMissile,
		wizard.fireball
	];
	
	//equipment
	wizard.weapon = staff;
	wizard.armor = robe;
	
	//ai hints
	wizard.aiAction = function(){
		if(this.focus >= 55 && !this.fireball.isOnCd()) return this.fireball;
		if(this.focus < 25) return this.recover;
		else return this.magicMissile;
	}
	
	return wizard;
}