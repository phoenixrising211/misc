package skills;

import characters.Creature;
import driver.Combat;

public class AwesomeBlow extends Skill {
	
	public AwesomeBlow() {
		name = "Awesome Blow";
		sp = 25;
	}
	
	public void use(Creature active, Combat combat, boolean friendly, boolean random){
		active.spend(sp);
		Creature[] enemies = friendly? combat.getMob() : combat.getParty();
		Creature target = random? randomizeTarget(enemies) : chooseTarget(enemies, combat.getScan());
		System.out.println("\n" + active.getName() + " attacks " + target.getName() + " with an awesome blow!");
		dealDamage(active, target, 30);
	}

}
