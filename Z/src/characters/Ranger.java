package characters;

import skills.Skill;
import skills.TwinStrike;
import skills.WeaponAttack;

public class Ranger extends Creature {

	public Ranger() {
		this("");
	}

	public Ranger(String name) {
		super(name + " the Ranger", new double[]{7,7,14,10,14,100});
		skills = new Skill[]{
				new WeaponAttack(getWeaponName()),
				new TwinStrike()
		};
	}
	
	public String getWeaponName(){
		return "Scimitar";
	}
}
