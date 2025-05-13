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

var party = [];
var mob = [];

var active;
var target;

var battleTimeout;

var q = {
	items: [],
	push: function(item){
		var contain = false;
		for(var i=0; i < this.items.length; i++){
			if(item.priority > this.items[i].priority){
				this.items.splice(i, 0, item);
				contain = true;
				break;
			}
		}
		if(!contain){
			this.items.push(item);
		}
	},
	pull: function(){
		if (this.items.length == 0){
			return null;
		}
		return this.items.shift();
	}
}

function shuffle (array) {
	for (var i = array.length - 1; i > 0; i -= 1) {
		var j = Math.floor(Math.random() * (i + 1))
		var temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}
}

function newCreature(){
	return {
		changeHP: function(amt){
			this.hp += amt;
			if(this.hp > 100) this.hp = 100;
			else if(this.hp <= 0){
				this.hp = 0;
				update(this.name + " goes down...");
				this.changeCount(-99999);
			}
			
			this.hplabel.text(this.hp + "% HP");
			this.greenbar.transition().style("width", (this.hp * 3) + "px").duration(2000);
			this.redbar.transition().style("width", ((100 - this.hp) * 3) + "px").duration(2000);
		},
		changeFocus: function(amt){
			this.focus += amt;
			if(this.focus > 100) this.focus = 100;
			else if(this.focus < 0) this.focus = 0;
			
			this.focuslabel.text(this.focus + "% Focus");
			this.purplebar.transition().style("width", (this.focus * 3) + "px").duration(2000);
			this.yellowbar.transition().style("width", ((100 - this.focus) * 3) + "px").duration(2000);
		},
		changeCount: function(amt){
			this.count += amt;
			var remainder = 0;
			if(this.count > this.delay) {
				remainder = this.count - this.delay;
				this.count = this.delay;
			}
			if(this.count < 0) this.count = 0;
			var percent = this.count/this.delay * 100;
			
			this.delaylabel.text((this.count/this.getSpd()).toFixed(1) + "/" + (this.delay/this.getSpd()).toFixed(1) + " sec");
			this.orangebar.transition().style("width", (percent * 3) + "px").duration(100);
			this.bluebar.transition().style("width", ((100 - percent) * 3) + "px").duration(100);
			
			if(this.count == this.delay){
				qitem = {
						creature: this,
						priority: remainder
				}
				q.push(qitem);
			}
		},
		reset: function(){
			this.hp = 100;
			this.focus = 100;
			this.count = 0;
			this.delay = 20;
			this.statuses = [];
			this.actions.forEach(function(a){
				a.count = 0;
			});
		},
		getPow: function(){return 10 + (this.mgt * this.weapon.pow);},
		getAcc: function(){return 10 + (this.fin * this.weapon.acc);},
		getSpd: function(){return 10 + (this.spr * this.weapon.spd);},
		getDef: function(){return 10 + (this.vit * this.armor.def);},
		getEva: function(){return 10 + (this.agi * this.armor.eva);},
		getRng: function(){return 10 + (this.int * this.armor.rng);},
		aiTargetOneEnemy: function(){
			var targets = this.good ? mob : party;
			var newTargets = [];
			targets.forEach(function(elem){
				if(elem.hp > 0) newTargets.push(elem);
			})
			var randInt = Math.floor(Math.random() * newTargets.length);
			target = newTargets[randInt];
			action.resolve();
		},
		aiTargetOneAlly: function(){
			var targets = this.good ? party : mob;
			var newTargets = [];
			targets.forEach(function(elem){
				if(elem.hp > 0) newTargets.push(elem);
			})
			var randInt = Math.floor(Math.random() * newTargets.length);
			target = newTargets[randInt];
			action.resolve();
		}
	}
}

function newAction(name){
	return {
		name: name,
		count: 0,
		cooldown: 0,
		changeCount: function(amt){
			if(this.isOnCd()) this.count += amt;
		},
		isOnCd: function(){
			return this.count < this.cooldown;
		}
	};
}

function setupCombat(){
	php.selectAll("*").remove();
	for(var i=0; i<4; i++){
		party[i].reset();
		party[i].good = true;
		party[i].ai = false;
		var newDiv = php.append("div");
		newDiv.attr("divNum", i).classed("hp", true);
		if(i==0 || i==2) newDiv.classed("left", true)
		else newDiv.classed("right", true);
		
		var newTable = newDiv.append("table").style("width","400px");
		colgroup = newTable.append("colgroup");
		colgroup.append("col").style("width","300px");
		colgroup.append("col").style("width","100px");
		nameRow = newTable.append("tr");
		nameCell = nameRow.append("td").style("width","300px");
		party[i].namelabel = nameCell.append("text").classed("left", true).style("color", "#080").style("font-weight", "bold")
				.text(party[i].name);
		nameRow.append("td").style("width","100px");
		
		hpRow = newTable.append("tr");
		hpBarCell = hpRow.append("td").style("width","300px");
		party[i].greenbar = hpBarCell.append("div").classed("greenbar", true).style("width", "300px");
		party[i].redbar = hpBarCell.append("div").classed("redbar", true).style("width", "0px");
		hpLabelCell = hpRow.append("td").style("width","100px");
		party[i].hplabel = hpLabelCell.append("text").classed("right", true).style("color", "#080").style("font-weight", "bold")
				.text(party[i].hp + "% HP");
		
		focusRow = newTable.append("tr");
		focusBarCell = focusRow.append("td").style("width","300px");
		party[i].purplebar = focusBarCell.append("div").classed("purplebar", true).style("width", "300px");
		party[i].yellowbar = focusBarCell.append("div").classed("yellowbar", true).style("width", "0px");
		focusLabelCell = focusRow.append("td").style("width","100px");
		party[i].focuslabel = focusLabelCell.append("text").classed("right", true).style("color", "#808").style("font-weight", "bold")
				.text(party[i].focus + "% Focus");
		
		delayRow = newTable.append("tr");
		delayBarCell = delayRow.append("td").style("width","300px");
		party[i].orangebar = delayBarCell.append("div").classed("orangebar", true).style("width", "0px");
		party[i].bluebar = delayBarCell.append("div").classed("bluebar", true).style("width", "300px");
		delayLabelCell = delayRow.append("td").style("width","100px");
		party[i].delaylabel = delayLabelCell.append("text").classed("right", true).style("color", "#f80").style("font-weight", "bold")
				.text((party[i].count/party[i].getSpd()).toFixed(1) + "/" + (party[i].delay/party[i].getSpd()).toFixed(1) + " sec");
		//newDiv.on("click", toggleHumanStats);
	}
	
	mhp.selectAll("*").remove();
	for(var i=0; i<mob.length; i++){
		mob[i].reset();
		mob[i].good = false;
		mob[i].ai = true;
		var newDiv = mhp.append("div");
		newDiv.attr("divNum", i).classed("hp", true);
		if(i==0 || i==2) newDiv.classed("left", true)
		else newDiv.classed("right", true);
		
		var newTable = newDiv.append("table").style("width","400px");
		colgroup = newTable.append("colgroup");
		colgroup.append("col").style("width","300px");
		colgroup.append("col").style("width","100px");
		nameRow = newTable.append("tr");
		nameCell = nameRow.append("td").style("width","300px");
		mob[i].namelabel = nameCell.append("text").classed("left", true).style("color", "#800").style("font-weight", "bold")
				.text(mob[i].name);
		nameRow.append("td").style("width","100px");
		
		hpRow = newTable.append("tr");
		hpBarCell = hpRow.append("td").style("width","300px");
		mob[i].greenbar = hpBarCell.append("div").classed("greenbar", true).style("width", "300px");
		mob[i].redbar = hpBarCell.append("div").classed("redbar", true).style("width", "0px");
		hpLabelCell = hpRow.append("td").style("width","100px");
		mob[i].hplabel = hpLabelCell.append("text").classed("right", true).style("color", "#080").style("font-weight", "bold")
				.text(mob[i].hp + "% HP");
		
		focusRow = newTable.append("tr");
		focusBarCell = focusRow.append("td").style("width","300px");
		mob[i].purplebar = focusBarCell.append("div").classed("purplebar", true).style("width", "300px");
		mob[i].yellowbar = focusBarCell.append("div").classed("yellowbar", true).style("width", "0px");
		focusLabelCell = focusRow.append("td").style("width","100px");
		mob[i].focuslabel = focusLabelCell.append("text").classed("right", true).style("color", "#808").style("font-weight", "bold")
				.text(mob[i].focus + "% Focus");
		
		delayRow = newTable.append("tr");
		delayBarCell = delayRow.append("td").style("width","300px");
		mob[i].orangebar = delayBarCell.append("div").classed("orangebar", true).style("width", "0px");
		mob[i].bluebar = delayBarCell.append("div").classed("bluebar", true).style("width", "300px");
		delayLabelCell = delayRow.append("td").style("width","100px");
		mob[i].delaylabel = delayLabelCell.append("text").classed("right", true).style("color", "#f80").style("font-weight", "bold")
			.text((mob[i].count/mob[i].getSpd()).toFixed(1) + "/" + (mob[i].delay/mob[i].getSpd()).toFixed(1) + " sec");
		//newDiv.on("click", toggleMonsterStats);
	}
}

var tick = function(){
	var creatures = party.concat(mob);
	shuffle(creatures);
	
	creatures.forEach(function(c){
		if(c.hp > 0){
			c.changeCount(c.getSpd()/10);
			c.statuses.forEach(function(s){
				s.changeCount(0.1);
			});
			c.actions.forEach(function(a){
				a.changeCount(0.1);
			});
		}
	});
	battleTimeout = setTimeout(next, 0);
}

var next = function(){
	var qitem = q.pull();
	if(qitem != null){
		active = qitem.creature;
		if(active.hp > 0){
			update("");
			update(active.name + "'s turn!");
			if(active.ai){
				var elem = active.aiAction();
				active.changeFocus(elem.focus);
				action = elem;
				action.start();
			}
			else{
				active.actions.forEach(function(elem){
					var newButton = cb.append("button").attr("id","actionButton").text(elem.name + " " + (elem.focus > 0 ? "+" : "") + elem.focus + 
							(elem.isOnCd() ? " (" + (elem.cooldown-elem.count).toFixed(1) + " sec cooldown)" : ""));
					if(active.focus >= (-1 * elem.focus) && !elem.isOnCd()){
						newButton.on("click", function(){
							cb.selectAll("#actionButton").remove();
							active.changeFocus(elem.focus);
							action = elem;
							action.start();
						});
					}else newButton.attr("disabled",true);
				})
			}
		}else{
			battleTimeout = setTimeout(next, 0);
		}
	}else{
		battleTimeout = setTimeout(tick, 100);
	}
}

function cont(){
	//checkVictory
	var partyHp = 0;
	party.forEach(function(ally){
		partyHp += ally.hp;
	})
	var mobHp = 0;
	mob.forEach(function(monster){
		mobHp += monster.hp;
	})
	
	if(partyHp <= 0){
		update("You lose...");
		win();
		quit();
	}else if(mobHp <= 0){
		update("You win!");
		win();
	}else{
		active.changeCount(-99999);
		battleTimeout = setTimeout(next, 0);
	}
}

function targetOneEnemy(){
	if(active.ai) active.aiTargetOneEnemy();
	else targetOne(true);
}

function targetOneAlly(){
	if(active.ai) active.aiTargetOneAlly();
	else targetOne(false);
}

function targetOne(enemy){
	var chooseFromMob = active.good && enemy;
	var targets = chooseFromMob ? mob : party;
	targets.forEach(function(elem){
		var newButton = cb.append("button").attr("id","targetButton").text(elem.name);
		if(elem.hp > 0){
			newButton.on("click", function(){
				cb.selectAll("#targetButton").remove();
				target = elem;
				action.resolve();
			});
		}else newButton.attr("disabled",true);
	})
}

function hit(factor=1.0){
	var hitPercentage = active.getAcc() * factor / target.getEva();
	var hits = Math.floor(hitPercentage);
	var hitRate = hitPercentage - hits;
	if(Math.random() < hitRate) hits++;
	return hits;
}

function damage(hits=1, factor=1.0){
	var outputString = "";
	if(hits == 1) outputString += "Hit!";
	else if(hits == 2) outputString += "Critical hit!!";
	else outputString += "Critical hit x" + (hits-1) + "!!";
	
	var avgDamage = 20 * active.getPow() * factor / target.getDef();
	
	var totalDamage = 0;
	for(i=0; i<hits; i++){
		var roll = (Math.random() * avgDamage) + (avgDamage/2.0);
		totalDamage += roll;
	}
	
	var dmg = Math.round(totalDamage);
	update(outputString + " " + target.name + " takes " + dmg + " damage!");
	target.changeHP(-1 * dmg);
}

function heal(factor=1.0){
	var avgHealing = 20 * factor;
	var roll = (Math.random() * avgHealing) + (avgHealing/2.0);
	
	var healing = Math.round(roll);
	update(target.name + " heals " + healing + " HP!");
	target.changeHP(healing);
}