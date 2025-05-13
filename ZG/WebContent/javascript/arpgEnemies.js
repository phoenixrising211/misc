function newWalkerEnemy(){
	return {"type": "walker", "r": 40, "v": 1.5, "dx": 0, "dy": 0, "hp": 4, "maxHp": 4, "range": 0, "maxDelay": 0, "delay": 0}
}

function newArcherEnemy(){
	return {"type": "archer", "r": 28, "v": 2, "dx": 0, "dy": 0, "hp": 2, "maxHp": 2, "range": 720, "maxDelay": 120, "delay": 0}
}

function newMageEnemy(){
	return {"type": "mage", "r": 20, "v": 2, "dx": 0, "dy": 0, "hp": 1, "maxHp": 1, "range": 360, "maxDelay": 90, "delay": 0}
}

function newSoldierEnemy(){
	return {"type": "soldier", "r": 35, "v": 2, "dx": 0, "dy": 0, "hp": 3, "maxHp": 3, "range": 72, "maxDelay": 60, "delay": 0}
}

function spawn(dir){
	if(!gameOver){
		var enemy = {}
		switch(Math.floor(Math.random()*3)){
		case 0:
			var enemy = newArcherEnemy()
			break
		case 1:
			var enemy = newMageEnemy()
			break
		case 2:
			var enemy = newSoldierEnemy()
			break
		}
		
		var x = cornerX
		var y = cornerY
		switch(dir){
		case "N":
			x += Math.random()*bodyWidth
			y += -1 * enemy.r
			break
		case "S":
			x += Math.random()*bodyWidth
			y += bodyHeight + enemy.r
			break
		case "W":
			x += -1 * enemy.r
			y += Math.random()*bodyHeight
			break
		case "E":
			x += bodyWidth + enemy.r
			y += Math.random()*bodyHeight
			break
		}
		
		enemy.cx = x
		enemy.cy = y
		enemyIcons.push(enemy)
		updateEnemies()
		spawnSpeed += 0.025
		setTimeout(spawn, 8000 / spawnSpeed, dir)
	}
}

enemyArchery = function(e) {
	projectile1 = {"cx": e.cx, "cy": e.cy, "r": 5, "v": 6, "ttl": 120}
	
	dirX = playerIcon.cx - projectile1.cx
	dirY = playerIcon.cy - projectile1.cy
	dirH = Math.sqrt(Math.pow(dirX,2) + Math.pow(dirY,2))
	
	projectile1.dx = (dirX * projectile1.v)/dirH
	projectile1.dy = (dirY * projectile1.v)/dirH
	
	enemyProjectiles.push(projectile1)
}

enemyMagic = function(e) {
	projectile1 = {"cx": e.cx, "cy": e.cy, "r": 5, "v": 4, "ttl": 90}
	projectile2 = {"cx": e.cx, "cy": e.cy, "r": 5, "v": 4, "ttl": 90}
	projectile3 = {"cx": e.cx, "cy": e.cy, "r": 5, "v": 4, "ttl": 90}
	
	dirX1 = playerIcon.cx - projectile1.cx
	dirY1 = playerIcon.cy - projectile1.cy
	dirH = Math.sqrt(Math.pow(dirX1,2) + Math.pow(dirY1,2))
	
	projectile1.dx = (dirX1 * projectile1.v)/dirH
	projectile1.dy = (dirY1 * projectile1.v)/dirH
	
	angle = Math.PI / 16.0
	
	projectile2.dx = (projectile1.dx * Math.cos(angle)) + (projectile1.dy * Math.sin(angle))
	projectile2.dy = (-1 * projectile1.dx * Math.sin(angle)) + (projectile1.dy * Math.cos(angle))
	
	angle *= -1
	
	projectile3.dx = (projectile1.dx * Math.cos(angle)) + (projectile1.dy * Math.sin(angle))
	projectile3.dy = (-1 * projectile1.dx * Math.sin(angle)) + (projectile1.dy * Math.cos(angle))
	
	enemyProjectiles.push(projectile1)
	enemyProjectiles.push(projectile2)
	enemyProjectiles.push(projectile3)
}

enemySword = function(e) {
	projectile1 = {"cx": e.cx, "cy": e.cy, "r": 5, "v": 12, "ttl": 6}
	projectile2 = {"cx": e.cx, "cy": e.cy, "r": 5, "v": 12, "ttl": 6}
	projectile3 = {"cx": e.cx, "cy": e.cy, "r": 5, "v": 12, "ttl": 6}
	projectile4 = {"cx": e.cx, "cy": e.cy, "r": 5, "v": 12, "ttl": 6}
	projectile5 = {"cx": e.cx, "cy": e.cy, "r": 5, "v": 12, "ttl": 6}
	
	dirX1 = playerIcon.cx - projectile1.cx
	dirY1 = playerIcon.cy - projectile1.cy
	dirH = Math.sqrt(Math.pow(dirX1,2) + Math.pow(dirY1,2))
	
	projectile1.dx = (dirX1 * projectile1.v)/dirH
	projectile1.dy = (dirY1 * projectile1.v)/dirH
	
	angle = Math.PI / 16.0
	
	projectile2.dx = (projectile1.dx * Math.cos(angle)) + (projectile1.dy * Math.sin(angle))
	projectile2.dy = (-1 * projectile1.dx * Math.sin(angle)) + (projectile1.dy * Math.cos(angle))
	
	angle *= -1
	
	projectile3.dx = (projectile1.dx * Math.cos(angle)) + (projectile1.dy * Math.sin(angle))
	projectile3.dy = (-1 * projectile1.dx * Math.sin(angle)) + (projectile1.dy * Math.cos(angle))
	
	angle = Math.PI / 8.0
	
	projectile4.dx = (projectile1.dx * Math.cos(angle)) + (projectile1.dy * Math.sin(angle))
	projectile4.dy = (-1 * projectile1.dx * Math.sin(angle)) + (projectile1.dy * Math.cos(angle))
	
	angle *= -1
	
	projectile5.dx = (projectile1.dx * Math.cos(angle)) + (projectile1.dy * Math.sin(angle))
	projectile5.dy = (-1 * projectile1.dx * Math.sin(angle)) + (projectile1.dy * Math.cos(angle))
	
	enemyProjectiles.push(projectile1)
	enemyProjectiles.push(projectile2)
	enemyProjectiles.push(projectile3)
	enemyProjectiles.push(projectile4)
	enemyProjectiles.push(projectile5)
}