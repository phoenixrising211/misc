package characters;

import skills.AwesomeBlow;
import skills.Charge;
import skills.Skill;
import skills.WeaponAttack;

public class Knight extends Creature {

	public Knight() {
		this("");
	}

	public Knight(String name) {
		super(name + " the Knight", new double[]{7,20,10,10,7,100});
		skills = new Skill[]{
				new WeaponAttack(getWeaponName()),
				new Charge(),
				new AwesomeBlow()
		};
	}

	public String getWeaponName(){
		return "Longsword";
	}
}
