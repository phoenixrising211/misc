package characters;

import skills.Cure;
import skills.HealingAura;
import skills.Skill;
import skills.WeaponAttack;

public class Cleric extends Creature {

	public Cleric() {
		this("");
	}

	public Cleric(String name) {
		super(name + " the Cleric", new double[]{10,10,10,10,10,100});
		skills = new Skill[]{
				new WeaponAttack(getWeaponName()),
				new Cure(),
				new HealingAura()
		};
	}
	
	public String getWeaponName(){
		return "Light Mace";
	}
}
