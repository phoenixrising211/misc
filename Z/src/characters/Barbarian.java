package characters;

import skills.RageStrike;
import skills.Skill;
import skills.ViciousEdge;
import skills.WeaponAttack;

public class Barbarian extends Creature {

	public Barbarian() {
		this("");
	}

	public Barbarian(String name) {
		super(name + " the Barbarian", new double[]{20,14,7,5,10,100});
		skills = new Skill[]{
				new WeaponAttack(getWeaponName()),
				new RageStrike(),
				new ViciousEdge()
		};
	}
	
	public String getWeaponName(){
		return "Greataxe";
	}
}
