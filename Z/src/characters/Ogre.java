package characters;

import skills.AwesomeBlow;
import skills.Skill;
import skills.WeaponAttack;

public class Ogre extends Creature {

	public Ogre() {
		this("");
	}

	public Ogre(String name) {
		super(name + " the Ogre", new double[]{14,14,7,10,7,25});
		skills = new Skill[]{
				new WeaponAttack(getWeaponName()),
				new AwesomeBlow()
		};
	}
	
	public String getWeaponName(){
		return "Maul";
	}
}
