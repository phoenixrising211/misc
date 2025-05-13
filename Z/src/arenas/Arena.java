package arenas;

import java.util.Scanner;

import characters.Creature;

public abstract class Arena {

	protected int location;
	
	public void setLocation(int location){
		this.location = location;
	}
	
	public int getLocation(){
		return location;
	}
	
	public abstract Arena enter(Creature[] party, Scanner scan);
	
}
