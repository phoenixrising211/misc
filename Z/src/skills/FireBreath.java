package skills;

import characters.Creature;
import driver.Combat;

public class FireBreath extends Skill {
	
	public FireBreath() {
		name = "Fire Breath";
		sp = 5;
	}
	
	public void use(Creature active, Combat combat, boolean friendly, boolean random){
		active.spend(sp);
		Creature[] enemies = friendly? combat.getMob() : combat.getParty();
		System.out.println("\n" + active.getName() + " breathes fire!");
		for(Creature target : enemies){
			if(target.getHp() > 0){
				dealDamage(active, target, 5);
			}
		}
	}

}
