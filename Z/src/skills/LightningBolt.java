package skills;

import characters.Creature;
import driver.Combat;

public class LightningBolt extends Skill {
	
	public LightningBolt() {
		name = "Lightning Bolt";
		sp = 10;
	}
	
	public void use(Creature active, Combat combat, boolean friendly, boolean random){
		active.spend(sp);
		Creature[] enemies = friendly? combat.getMob() : combat.getParty();
		Creature target = random? randomizeTarget(enemies) : chooseTarget(enemies, combat.getScan());
		System.out.println("\n" + active.getName() + " attacks " + target.getName() + " with " + name + "!");
		dealDamage(active, target, 10);
	}
	
	protected void dealDamage(Creature active, Creature target, int factor){
		int multiplier = 0;
		double hitRate = (active.getAccuracy()/target.getEvasion()) * 1.5; //150% accuracy
		while(hitRate > 1){
			hitRate --;
			multiplier ++;
		}
		if(Math.random() < hitRate) multiplier++;
		if(multiplier == 0) System.out.println("Miss!");
		else{
			String feedback = "";
			if(multiplier == 1)	feedback = "Hit! ";
			else feedback = "Critical hit!! ";
			double variance = (Math.random() * 0.3) + 0.85;
			int damage = (int)((active.getOffense()/target.getDefense()) * multiplier * variance * factor);
			feedback += target.getName() + " takes " + damage + " damage!";
			System.out.println(feedback);
			target.damage(damage);
		}
	}

}
