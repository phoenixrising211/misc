package skills;

import characters.Creature;
import driver.Combat;

public class DragonBlaze extends Skill {
	
	public DragonBlaze() {
		name = "Dragon Blaze";
		sp = 10;
	}
	
	public void use(Creature active, Combat combat, boolean friendly, boolean random){
		active.spend(sp);
		Creature[] enemies = friendly? combat.getMob() : combat.getParty();
		Creature target = random? randomizeTarget(enemies) : chooseTarget(enemies, combat.getScan());
		System.out.println("\n" + active.getName() + " attacks " + target.getName() + " with " + name + "!");
		dealDamage(active, target, 15);
	}

}
