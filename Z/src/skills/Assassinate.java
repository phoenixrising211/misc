package skills;

import characters.Creature;
import driver.Combat;

public class Assassinate extends Skill {
	
	public Assassinate() {
		name = "Assassinate";
		sp = 20;
	}
	
	public void use(Creature active, Combat combat, boolean friendly, boolean random){
		active.spend(sp);
		Creature[] enemies = friendly? combat.getMob() : combat.getParty();
		Creature target = random? randomizeTarget(enemies) : chooseTarget(enemies, combat.getScan());
		System.out.println("\n" + active.getName() + " assassinates " + target.getName() + "!");
		dealDamage(active, target, 50);
	}
	
	protected void dealDamage(Creature active, Creature target, int factor){
		int multiplier = 0;
		double hitRate = active.getAccuracy()/target.getEvasion() * 0.5; //50% accuracy
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
