package driver;

import java.util.Scanner;

import skills.Skill;

import characters.Creature;

public class Combat {

	private Creature[] party;
	private Creature[] mob;
	private Scanner scan;
	
	public Combat(Creature[] party, Creature[] mob, Scanner scan){
		this.party = party;
		this.mob = mob;
		this.scan = scan;
		displayStatus();
	}
	
	public boolean doBattle(){
		while(true){
			for(int i=0; i<party.length; i++){
				party[i].tick();
				if(party[i].getHp() > 0 && party[i].getCount() >= 100){
					Creature active = party[i];
					active.resetCount();
					boolean valid = true;
					int input = -1;
					Skill[] skills = active.getSkills();
					Skill skill = null;
					do{
						displayStatus();
						System.out.println(active.getName() + "'s turn. Use what?");
						for(int k=0; k<skills.length; k++){
							System.out.println((k+1) + ": " + skills[k].getName() +
									" (" + skills[k].getSp() + " SP)");
						}
						input = scan.nextInt();scan.nextLine();
						input--;
						if(input >= 0 && input < skills.length && skills[input].getSp() <= active.getSp()){
							valid = true;
							skill = skills[input];
						}else valid = false;
						if(!valid){
							System.out.println("\nInvalid skill! Choose again.");
							scan.nextLine();
						}
					}while(!valid);
					skill.use(active, this, true, false);
					scan.nextLine();
					int totalMobHp = 0;
					for(int j=0; j<mob.length; j++)	totalMobHp += mob[j].getHp();
					if(totalMobHp <= 0) return true;
				}
			}
			for(int i=0; i<mob.length; i++){
				mob[i].tick();
				if(mob[i].getHp() > 0 && mob[i].getCount() >= 100){
					Creature active = mob[i];
					active.resetCount();
					int input = -1;
					Skill[] skills = active.getSkills();
					Skill skill;
					do{
						input = (int)(Math.random() * skills.length);
						skill = skills[input];
					}while(skill.getSp() > active.getSp());
					skill.use(active, this, false, true);
					scan.nextLine();
					int totalPartyHp = 0;
					for(int j=0; j<party.length; j++) totalPartyHp += party[j].getHp();
					if(totalPartyHp <= 0) return false;
				}
			}
		}
	}
	
	private void displayStatus(){
		for(int i=0; i<party.length; i++){
			System.out.println(party[i].getName() + ": " + party[i].getHp() + "% HP / " + 
					party[i].getSp() + "% SP");
		}
		System.out.println("-----");
		for(int i=0; i<mob.length; i++){
			System.out.println(mob[i].getName() + ": " + mob[i].getHp() + "% HP / " +
					mob[i].getSp() + "% SP");
		}
		System.out.println();
	}

	public Creature[] getParty() {
		return party;
	}

	public Creature[] getMob() {
		return mob;
	}

	public Scanner getScan() {
		return scan;
	}
	
}
