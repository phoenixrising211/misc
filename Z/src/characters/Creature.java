package characters;

import skills.Skill;

public class Creature {
	
	protected String name;
	protected int hp;
	protected int sp;
	protected final int maxHp;
	protected final int maxSp;
	protected double count;
	protected double offense;
	protected double defense;
	protected double evasion;
	protected double accuracy;
	protected double speed;
	protected Skill[] skills;
	
	public Creature(){
		name = "MissingNo.";
		hp = sp = maxHp = maxSp = 100;
		count = 0;
		offense = defense = accuracy = evasion = speed = 10;
		skills = new Skill[]{new Skill()};
	}
	
	public Creature(Creature other){
		name = other.name;
		hp = other.hp;
		sp = other.sp;
		maxHp = other.maxHp;
		maxSp = other.maxSp;
		count = other.count;
		offense = other.offense;
		defense = other.defense;
		accuracy = other.accuracy;
		evasion = other.evasion;
		skills = other.skills;
	}
	
	public Creature(String name, double[] stats){
		this.name = name;
		hp = maxHp = 100;
		count = 0;
		offense = stats[0];
		defense = stats[1];
		evasion = stats[2];
		accuracy = stats[3];
		speed = stats[4];
		sp = maxSp = (int)stats[5];
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getHp() {
		return hp;
	}
	public void setHp(int hp) {
		this.hp = hp;
	}
	public int getSp() {
		return sp;
	}
	public void setSp(int sp) {
		this.sp = sp;
	}
	public int getMaxHp() {
		return maxHp;
	}
	public int getMaxSp() {
		return maxSp;
	}
	public double getOffense() {
		return offense;
	}
	public void setOffense(double offense) {
		this.offense = offense;
	}
	public double getDefense() {
		return defense;
	}
	public void setDefense(double defense) {
		this.defense = defense;
	}
	public double getEvasion() {
		return evasion;
	}
	public void setEvasion(double evasion) {
		this.evasion = evasion;
	}
	public double getAccuracy() {
		return accuracy;
	}
	public void setAccuracy(double accuracy) {
		this.accuracy = accuracy;
	}
	public Skill[] getSkills() {
		return skills;
	}
	public void setSkills(Skill[] skills) {
		this.skills = skills;
	}
	public double getSpeed() {
		return speed;
	}
	public void setSpeed(double speed) {
		this.speed = speed;
	}
	public double getCount() {
		return count;
	}
	public void setCount(double count) {
		this.count = count;
	}
	
	public String getWeaponName(){
		return "";
	}
	
	public void tick(){
		this.count += speed;
	}
	
	public void resetCount(){
		this.count -= 100;
	}

	public void damage(int dmg){
		hp -= dmg;
		if(hp <= 0){
			hp = 0;
			System.out.println(name + " is dead!");
		}
	}
	
	public void heal(int healing){
		hp += healing;
		if(hp > maxHp) hp = maxHp;
	}
	
	public void spend(int cost){
		sp -= cost;
	}
	
	public void recover(int recovery){
		sp += recovery;
		if(sp > maxSp) sp = maxSp;
	}
}
