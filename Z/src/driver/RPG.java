package driver;

import java.util.Scanner;

import arenas.Arena;
import arenas.StoneArena;

import characters.*;

public class RPG {
	
	private Creature[] party;
	private Arena arena;
	private Scanner scan;
	
	private void play(){
		scan = new Scanner(System.in);
		party = new Creature[]{
			//new Knight("Alice"),
			new Barbarian("Bob"),
			new Mage("Claire"),
			//new Rogue("Dave"),
			new Cleric("Elaine"),
			new Ranger("Frank")
		};
		
		arena = StoneArena.getInstance();
		arena.setLocation(0);
		while(true){
			arena = arena.enter(party, scan);
		}
	}
	
	public static void main(String[] args){
		new RPG().play();
	}
	
}
