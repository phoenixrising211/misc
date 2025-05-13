package characters;

import skills.Bite;
import skills.CurseOfRot;
import skills.DeathGrip;
import skills.Skill;

public class Zombie extends Creature {

	public Zombie() {
		this("");
	}

	public Zombie(String name) {
		super(name + " the Zombie", new double[]{12,11,6,11,5,25});
		skills = new Skill[]{
				new Bite(),
				new DeathGrip(),
				new CurseOfRot()
		};
	}
	
}
