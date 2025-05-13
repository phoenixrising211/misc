package characters;

import skills.Charge;
import skills.RageStrike;
import skills.Skill;
import skills.WeaponAttack;

public class Goblin extends Creature {
	
	public Goblin() {
		this("");
	}

	public Goblin(String name) {
		super(name + " the Goblin", new double[]{5,5,10,5,20,25});
		skills = new Skill[]{
				new WeaponAttack(getWeaponName()),
				new Charge(),
				new RageStrike()
		};
	}
	
	public String getWeaponName(){
		return "Morningstar";
	}
}
