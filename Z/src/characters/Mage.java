package characters;

import skills.MagicMissile;
import skills.RagingInferno;
import skills.Skill;
import skills.LightningBolt;
import skills.WeaponAttack;

public class Mage extends Creature {

	public Mage() {
		this("");
	}

	public Mage(String name) {
		super(name + " the Mage", new double[]{14,5,10,14,10,100});
		skills = new Skill[]{
				new WeaponAttack(getWeaponName()),
				new MagicMissile(),
				new LightningBolt(),
				new RagingInferno()				
		};
	}
	
	public String getWeaponName(){
		return "Quarterstaff";
	}
}
