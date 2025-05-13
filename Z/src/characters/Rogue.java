package characters;

import skills.Assassinate;
import skills.Skill;
import skills.SneakAttack;
import skills.WeaponAttack;

public class Rogue extends Creature {

	public Rogue() {
		this("");
	}

	public Rogue(String name) {
		super(name + " the Rogue", new double[]{7,7,14,10,14,100});
		skills = new Skill[]{
				new WeaponAttack(getWeaponName()),
				new SneakAttack(),
				new Assassinate()
		};
	}
	
	public String getWeaponName(){
		return "Dagger";
	}
}
