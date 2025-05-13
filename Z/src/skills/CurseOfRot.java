package skills;

import characters.Creature;
import driver.Combat;

public class CurseOfRot extends Skill {
	
	public CurseOfRot() {
		name = "Curse of Rot";
		sp = 15;
	}
	
	public void use(Creature active, Combat combat, boolean friendly, boolean random){
		active.spend(sp);
		Creature[] enemies = friendly? combat.getMob() : combat.getParty();
		System.out.println("\n" + active.getName() + " uses " + name + "!");
		for(Creature target : enemies){
			if(target.getHp() > 0){
				dealDamage(active, target, 10);
			}
		}
	}

}
