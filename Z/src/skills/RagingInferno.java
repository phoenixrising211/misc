package skills;

import characters.Creature;
import driver.Combat;

public class RagingInferno extends Skill {
	
	public RagingInferno() {
		name = "Raging Inferno";
		sp = 15;
	}
	
	public void use(Creature active, Combat combat, boolean friendly, boolean random){
		active.spend(sp);
		Creature[] enemies = friendly? combat.getMob() : combat.getParty();
		System.out.println("\n" + active.getName() + " casts " + name + "!");
		for(Creature target : enemies){
			if(target.getHp() > 0){
				dealDamage(active, target, 10);
			}
		}
	}

}
