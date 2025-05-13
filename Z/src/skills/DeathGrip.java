package skills;

import characters.Creature;
import driver.Combat;

public class DeathGrip extends Skill {
	
	public DeathGrip() {
		name = "Death Grip";
		sp = 5;
	}
	
	public void use(Creature active, Combat combat, boolean friendly, boolean random){
		active.spend(sp);
		Creature[] enemies = friendly? combat.getMob() : combat.getParty();
		Creature target = random? randomizeTarget(enemies) : chooseTarget(enemies, combat.getScan());
		System.out.println("\n" + active.getName() + " attacks " + target.getName() + " with a death grip!");
		dealDamage(active, target, 10);
	}

}
