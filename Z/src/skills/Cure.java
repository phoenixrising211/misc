package skills;

import characters.Creature;
import driver.Combat;

public class Cure extends Skill {
	
	public Cure() {
		name = "Cure";
		sp = 5;
	}
	
	public void use(Creature active, Combat combat, boolean friendly, boolean random){
		active.spend(sp);
		Creature[] allies = friendly? combat.getParty() : combat.getMob();
		Creature target = random? randomizeTarget(allies) : chooseTarget(allies, combat.getScan());
		System.out.println("\n" + active.getName() + " casts " + name + " on " + target.getName() + "!");
		heal(target, 5);
	}

}
