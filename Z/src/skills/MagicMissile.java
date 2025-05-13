package skills;

import characters.Creature;
import driver.Combat;

public class MagicMissile extends Skill {
	
	public MagicMissile() {
		name = "Magic Missile";
		sp = 5;
	}
	
	public void use(Creature active, Combat combat, boolean friendly, boolean random){
		active.spend(sp);
		Creature[] enemies = friendly? combat.getMob() : combat.getParty();
		Creature target = random? randomizeTarget(enemies) : chooseTarget(enemies, combat.getScan());
		System.out.println("\n" + active.getName() + " attacks " + target.getName() + " with " + name + "!");
		dealDamage(active, target, 10);
	}
	
	protected void dealDamage(Creature active, Creature target, int factor){
		//automatic hit; can't miss, can't crit
		double variance = (Math.random() * 0.3) + 0.85;
		int damage = (int)((active.getOffense()/target.getDefense()) * variance * factor);
		System.out.println("Hit! " + target.getName() + " takes " + damage + " damage!");
		target.damage(damage);
	}

}
