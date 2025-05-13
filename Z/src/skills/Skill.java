package skills;

import java.util.Scanner;

import characters.Creature;
import driver.Combat;

public class Skill {

	protected String name;
	protected int sp;
	
	public Skill(){
		name = "Splash";
		sp = 0;
	}
	
	public void use(Creature active, Combat combat, boolean friendly, boolean random){
		active.spend(sp);
		System.out.println("\n" + active.getName() + " uses " + name + "!");
	}
	
	protected void dealDamage(Creature active, Creature target, int factor){
		int multiplier = 0;
		double hitRate = active.getAccuracy()/target.getEvasion();
		while(hitRate > 1){
			hitRate --;
			multiplier ++;
		}
		if(Math.random() < hitRate) multiplier++;
		if(multiplier == 0) System.out.println("Miss!");
		else{
			String feedback = "";
			if(multiplier == 1)	feedback = "Hit! ";
			else feedback = "Critical hit!! ";
			double variance = (Math.random() * 0.3) + 0.85;
			int damage = (int)((active.getOffense()/target.getDefense()) * multiplier * variance * factor);
			feedback += target.getName() + " takes " + damage + " damage!";
			System.out.println(feedback);
			target.damage(damage);
		}
	}
	
	protected void heal(Creature target, int factor){
		double variance = (Math.random() * 0.3) + 0.85;
		int healing = (int)(variance * factor);
		System.out.println(target.getName() + " recovers " + healing + " HP!");
		target.heal(healing);
	}
	
	protected void selfDamage(Creature active, int factor){
		double variance = (Math.random() * 0.3) + 0.85;
		int damage = (int)(variance * factor);
		System.out.println(active.getName() + " takes " + damage + " damage!");
		active.damage(damage);
	}
	
	protected Creature chooseTarget(Creature[] group, Scanner scan){
		int input = -1;
		boolean valid = true;
		do{
			System.out.println("Target whom?");
			for(int j=0; j<group.length; j++){
				System.out.println((j+1) + ": " + group[j].getName());
			}
			input = scan.nextInt();scan.nextLine();
			input--;
			if(input < 0 || input >= group.length || group[input].getHp() == 0){
				valid = false;
			}else valid = true;
			if(!valid){
				System.out.println("\nInvalid target! Choose again.");
				scan.nextLine();
			}
		}while(!valid);
		return group[input];
	}
	
	protected Creature randomizeTarget(Creature[] group){
		int input = -1;
		boolean valid = true;
		do{
			input = (int)(Math.random() * group.length);
			if(group[input].getHp() > 0) valid = true;
			else valid = false;
		}while(!valid);
		return group[input];
	}

	public String getName() {
		return name;
	}

	public int getSp() {
		return sp;
	}
}
