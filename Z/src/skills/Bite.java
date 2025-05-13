package skills;

import characters.Creature;
import driver.Combat;

public class Bite extends Skill {
	
	public Bite() {
		name = "Bite";
		sp = 0;
	}
	
	public void use(Creature active, Combat combat, boolean friendly, boolean random){
		active.spend(sp);
		Creature[] enemies = friendly? combat.getMob() : combat.getParty();
		Creature target = random? randomizeTarget(enemies) : chooseTarget(enemies, combat.getScan());
		System.out.println("\n" + active.getName() + " bites " + target.getName() + "!");
		dealDamage(active, target, 5);
	}

}
