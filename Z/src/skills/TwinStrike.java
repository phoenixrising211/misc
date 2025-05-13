package skills;

import characters.Creature;
import driver.Combat;

public class TwinStrike extends Skill {
	
	public TwinStrike() {
		name = "Twin Strike";
		sp = 5;
	}
	
	public void use(Creature active, Combat combat, boolean friendly, boolean random){
		active.spend(sp);
		Creature[] enemies = friendly? combat.getMob() : combat.getParty();
		System.out.println("\n" + active.getName() + " uses " + name + "!");
		for(int i=0; i<2; i++){
			Creature target = random? randomizeTarget(enemies) : chooseTarget(enemies, combat.getScan());
			System.out.println("\n" + active.getName() + " attacks " + target.getName() + "!");
			dealDamage(active, target, 5);
		}
	}

}
