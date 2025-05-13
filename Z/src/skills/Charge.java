package skills;

import characters.Creature;
import driver.Combat;

public class Charge extends Skill {
	
	public Charge() {
		name = "Charge";
		sp = 5;
	}
	
	public void use(Creature active, Combat combat, boolean friendly, boolean random){
		active.spend(sp);
		Creature[] enemies = friendly? combat.getMob() : combat.getParty();
		Creature target = random? randomizeTarget(enemies) : chooseTarget(enemies, combat.getScan());
		System.out.println("\n" + active.getName() + " charges at " + target.getName() + "!");
		dealDamage(active, target, 10);
	}

}
