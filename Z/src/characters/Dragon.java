package characters;

import skills.Claws;
import skills.DragonBlaze;
import skills.FireBreath;
import skills.RagingInferno;
import skills.Skill;

public class Dragon extends Creature {

	public Dragon() {
		this("");
	}

	public Dragon(String name) {
		super(name + " the Dragon", new double[]{17,14,12,10,14,25});
		skills = new Skill[]{
				new Claws(),
				new FireBreath(),
				new DragonBlaze(),
				new RagingInferno()
		};
	}
	
}
