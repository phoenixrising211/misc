package skills;

import characters.Creature;
import driver.Combat;

public class Claws extends Skill {
	
	public Claws() {
		name = "Claws";
		sp = 0;
	}
	
	public void use(Creature active, Combat combat, boolean friendly, boolean random){
		active.spend(sp);
		Creature[] enemies = friendly? combat.getMob() : combat.getParty();
		Creature target = random? randomizeTarget(enemies) : chooseTarget(enemies, combat.getScan());
		System.out.println("\n" + active.getName() + " attacks " + target.getName() + " with its claws!");
		dealDamage(active, target, 5);
	}

}
