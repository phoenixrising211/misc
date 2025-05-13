package skills;

import characters.Creature;
import driver.Combat;

public class HealingAura extends Skill {
	
	public HealingAura() {
		name = "Healing Aura";
		sp = 50;
	}
	
	public void use(Creature active, Combat combat, boolean friendly, boolean random){
		active.spend(sp);
		Creature[] allies = friendly? combat.getParty() : combat.getMob();
		System.out.println("\n" + active.getName() + " uses " + name + "!");
		for(Creature target : allies){
			if(target.getHp() > 0){
				heal(target, 11);
			}
		}
	}

}
