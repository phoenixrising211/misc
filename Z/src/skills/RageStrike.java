package skills;

import characters.Creature;
import driver.Combat;

public class RageStrike extends Skill {
	
	public RageStrike() {
		name = "Rage Strike";
		sp = 10;
	}
	
	public void use(Creature active, Combat combat, boolean friendly, boolean random){
		active.spend(sp);
		System.out.println("\n" + active.getName() + " uses " + name + "!");
		Creature[] enemies = friendly? combat.getMob() : combat.getParty();
		Creature target = random? chooseTarget(enemies, combat.getScan()) : randomizeTarget(enemies);
		dealDamage(active, target, 20);
	}

}
