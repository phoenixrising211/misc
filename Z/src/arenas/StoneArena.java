package arenas;

import java.util.Scanner;

import characters.Creature;
import characters.Dragon;
import characters.Goblin;
import characters.Ogre;
import characters.Zombie;
import driver.Combat;

public class StoneArena extends Arena{
	
	private static Arena instance = null;
	
	public static Arena getInstance(){
		if(instance == null) instance = new StoneArena();
		return instance;
	}

	public Arena enter(Creature[] party, Scanner scan){
		Creature[] mob = null;
		switch(location){
		case 0:
			System.out.println("Goblin Battle!\n");
			mob = new Creature[]{
					new Goblin("Ib"),
					new Goblin("Krenko"),
					new Goblin("Squee"),
					new Goblin("Wort")
			};
			break;
		case 1:
			System.out.println("Zombie Battle!\n");
			mob = new Creature[]{
				new Zombie("Gaark"),
				new Zombie("Raef"),
				new Zombie("Thraximundar")
			};
			break;
		case 2:
			System.out.println("Ogre Battle!\n");
			mob = new Creature[]{
					new Ogre("Omaji"),
					new Ogre("Thokk")
			};
			break;
		case 3:
			System.out.println("Dragon Battle!\n");
			mob = new Creature[]{
					new Dragon("Smaug")
			};
		}
		
		boolean victory = new Combat(party, mob, scan).doBattle();
		if(victory){
			System.out.println("VICTORY!\n");
			if(location >= 3){
				System.out.println("YOU FOUND A MILLION GOLD PIECES THE END!!!");
				System.exit(0);
			}
		}else{
			System.out.println("GAME OVER :(");
			System.exit(0);
		}
		
		location++;
		return this;
	}
	
}
