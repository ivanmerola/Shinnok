/*
Biblioteca javascript para detectar locais disponíveis para colocar torres
Autor: Thiago Alves / Orlando Figueiredo / Samuel / Renato / Ivan
 */

//Indica a possibilidade de se colocar uma torre. True uma torre pode ser colocada naquela posição. False uma torre não pode ser colocada naquela posição
var placeOk = true;
var select = 0;
var date1 = 0;
var date2 = 0;
var time = 100;

//Função para carregar uma torre. Parâmetro: posição (x,y), caminho da sprite, largura e altura da imagem, quantidade de frames, frame atual.
function loadTower(x, y, img, width, height, placeWidth, placeHeight, frameqty, shooting, range, selected, bullet) {
	var tower = {};
	tower.x = x;
	tower.y = y;
	tower.image = new Image();
	tower.image.src = img;
	tower.width = width;
	tower.height = height;
	tower.placeWidth = placeWidth;
	tower.placeHeight = placeHeight;
	tower.frameqty = frameqty;
	tower.actualframe = 0;
	tower.shooting = shooting;
	tower.range = range;
	tower.selected = selected;
	tower.attack = 10;
	tower.cost = 50;
	tower.small = false;
	tower.bullet = bullet;
	return tower;
}

//Função para desenhar uma torre. Parâmetro: o canvas onde será desenhado, objeto torre que será desenhado.
function drawTower(canvas, tower) {
	//raio que verifica o range
	//drawCircle(tower.x + (tower.width/2), tower.y + tower.height + 20, tower.range, "rgba(0,0,0,0.3)");
	if(tower.selected){
		drawCircle(tower.x + (tower.width / 2), tower.y + tower.height + 40, tower.range, "rgba(0,200,0,0.5)");
	}
	canvas.drawImage(tower.image, tower.actualframe * tower.width, 0, tower.width, tower.height, tower.x, tower.y + 40, tower.width, tower.height);
}

//Função para atualizar o estado de uma torre. Parâmetro: a torre que será atualizada.
function updateTower(tower, npcs) {
	tower.shooting = false;
	for (var i = 0; i < npcs.length; i++) {
		if (!npcs[i].removed) {
			var detected = detectNpcInRange(tower.x + (tower.width / 2), tower.y + tower.height + 40, tower.range, npcs[i].posX + npcs[i].chrWidth / 2, npcs[i].posY + npcs[i].chrHeight / 2 + 40, npcs[i].chrWidth / 2);
			if (detected) {
				tower.shooting = true;
				updateBulletPosition(tower.bullet, npcs[i], tower);
				npcs[i].life -= tower.attack;
				break;
			}
		}
	}
	if (tower.shooting) {
		date2 = new Date();
		if ((tower.actualframe + 1) == tower.frameqty) {
			tower.actualframe = 0;
		}else if (date2.getMilliseconds() - date1.getMilliseconds() >= time || 
			date2.getMilliseconds() - date1.getMilliseconds() <= -time || 
			date1.getMilliseconds() - date2.getMilliseconds() >= -time || 
			date1.getMilliseconds() - date2.getMilliseconds() <= time){
			tower.actualframe++;
			date1 = new Date();
		}
	} else {
		tower.actualframe = 0;
	}
}

function updateBulletPosition(bullet, enemy, tower){

	var smallTower;
	if(tower.small){
		smallTower = 20
	}else{
		smallTower = 0
	}

	//Laser shot.
	if(bullet.width == 0){
		xB = [4, 8, 16, 24, 28, 16];
		yB = [10, 15, 16, 15, 10, 0];
		if(enemy.posY == tower.y){
			if(enemy.posX < tower.x){
				drawLine(tower.x + xB[0], tower.y + yB[0]+ tower.height, enemy.posX + (enemy.chrWidth / 4), enemy.posY + (enemy.chrHeight * 1.5), 2, "rgb(255,255,0)");
			}else if (enemy.posX > tower.x){
				drawLine(tower.x + xB[4], tower.y + yB[4]+ tower.height, enemy.posX + (enemy.chrWidth / 4), enemy.posY + (enemy.chrHeight * 1.5), 2, "rgb(255,255,0)");
			}else{
				drawLine(tower.x + xB[5], tower.y + yB[5]+ tower.height, enemy.posX + (enemy.chrWidth / 4), enemy.posY + (enemy.chrHeight * 1.5), 2, "rgb(255,255,0)");
			}
		}else{
			if(enemy.posX < tower.x){
				drawLine(tower.x + xB[1], tower.y + yB[1]+ tower.height, enemy.posX + (enemy.chrWidth / 4), enemy.posY + (enemy.chrHeight * 1.5), 2, "rgb(255,255,0)");
			}else if(enemy.posX > tower.x){
				drawLine(tower.x + xB[3], tower.y + yB[3]+ tower.height, enemy.posX + (enemy.chrWidth / 4), enemy.posY + (enemy.chrHeight * 1.5), 2, "rgb(255,255,0)");
			}else{
				drawLine(tower.x + xB[2], tower.y + yB[2]+ tower.height, enemy.posX + (enemy.chrWidth / 4), enemy.posY + (enemy.chrHeight * 1.5), 2, "rgb(255,255,0)");
			}
		}
	//Initial position
	}else if(select == 0){
		canvas.drawImage(bullet, tower.x + (tower.width / 2), tower.y + (tower.height)+smallTower, bullet.width, bullet.height);

	//Middle position
	}else if (select == 1){
		var x = ((tower.x + (tower.width / 2))+(enemy.posX + (enemy.chrWidth / 4)))/2;
		var y = ((tower.y + (tower.height)+smallTower)+(enemy.posY + enemy.chrHeight))/2;
		canvas.drawImage(bullet, x, y, bullet.width, bullet.height);

	//Hit the target
	}else if (select == 2){
		canvas.drawImage(bullet, enemy.posX + (enemy.chrWidth / 4), enemy.posY + enemy.chrHeight, bullet.width, bullet.height);
	}else{
		select = 0;
	}
	select++;
	
}

//Função que desenha a torre onde o mouse estiver.
function highlightPlaces(tower, towers, bits) {
	if (mouseInside) {
		detectNotAvailable(tower);
		if (placeOk) {
			canvas.fillStyle = "rgba(0,200,0,0.5)";
			canvas.fillRect((xTileMouseOver - (Math.floor(tower.placeWidth / 2))) * 32,
				(yTileMouseOver - (Math.floor(tower.placeHeight / 2))) * 32 + 40, tower.placeWidth * 32, tower.placeHeight * 32); //TODO : trocar 32 por vars globais de tile
			canvas.globalAlpha = 0.7;
			drawTower(canvas, tower);
			canvas.globalAlpha = 1;
			if (mouseInside && !mouseLocked && !hasTower(tower, towers) && bits.last()>0) {
				//if (tower1 && !tower1){
					var eliminate = ".png";
					tower.image.src = tower.image.src.replace(eliminate, '-pin.png');
					//tower.image.src = "images/novasTorres/torre-2-2-2-pin.png"
					tower.small = true;
				//}
				towers.push(tower);
				towerOrder(towers);
				var bits2 = bits.last() - tower.cost;
				bits.push(bits2);
				mouseLocked=true;
				actualState = statesInterface.i;
				date1 = new Date();
			}
		} else {
			canvas.fillStyle = "rgba(200,0,0,0.5)";
			canvas.fillRect((xTileMouseOver - (Math.floor(tower.placeWidth / 2))) * 32,
				(yTileMouseOver - (Math.floor(tower.placeHeight / 2))) * 32 + 40, tower.placeWidth * 32, tower.placeHeight * 32); //TODO : trocar 32 por vars globais de tile
		}
	}
}

//Função para verificar se há uma torre em determinada posição para impedir que duas torres possam ser adicionadas no mesmo lugar. Parâmetro: a torre que será verificada. Retorno: True ou False.
function hasTower(tw, tws) {
	for (var i = 0; i < tws.length; i++) {
		if (tws[i].x == tw.x && tws[i].y == tw.y) {
			return true;
		}
	}
	return false;
}

//Função para ordenar as torres pelo eixo Y, impedindo que elas se sobreponham.
function towerOrder(tws) {
	for (var i = 0; i < tws.length; i++) {
		for (var j = 0; j < i; j++) {
			if (tws[i].y < tws[j].y) {
				var aux = tws[i];
				tws[i] = tws[j];
				tws[j] = aux;
			}
		}
	}
}

//Função para detectar espaços disponíveis para as torres.
//BUG para corrigir: receber por parâmetro o arquivo de mapa, para que a função fique genérica para qualquer mapa.
function detectNotAvailable(tower) {
	var objectGroups = xmlDoc.getElementsByTagName("objectgroup");
	var notAvailable;
	for (i = 0; i < objectGroups.length; i++) {
		if (objectGroups[i].getAttribute("name") == "NotAvailable") {
			notAvailable = objectGroups[i].getElementsByTagName("object");
			break;
		}
	}
	placeOk = true;
	for (i = 0; i < notAvailable.length; i++) {
		var obj = notAvailable[i];
		var x = parseInt(obj.getAttribute("x"));
		var y = parseInt(obj.getAttribute("y"));
		var width = parseInt(obj.getAttribute("width"));
		var height = parseInt(obj.getAttribute("height"));
		if ((xTileMouseOver - (Math.floor(tower.placeWidth / 2)) + tower.placeWidth) * 32 > x &&
			(xTileMouseOver - (Math.floor(tower.placeWidth / 2))) * 32 < x + width &&
			(yTileMouseOver - (Math.floor(tower.placeHeight / 2)) + tower.placeHeight) * 32 > y &&
			(yTileMouseOver - (Math.floor(tower.placeHeight / 2))) * 32 < y + height) {
			placeOk = false;
			break;
		}
	}
}

//Função que recebe x, y e o raio de uma torre, x, y e um raio de um npc e detecta se houve colisão dos raios ou não
function detectNpcInRange(towerx, towery, towerR, npcx, npcy, npcR) {
	// towerx+=16;
	// towery+=64;
	//drawCircle(towerx, towery, towerR, "rgba(0,200,0,0.5)");
	var distance;
	distance = Math.sqrt(Math.pow((towerx - npcx), 2) + Math.pow((towery - npcy), 2));
	if (distance <= towerR + npcR) {
		return true;
	} else {
		return false;
	}
}

//Função para verificar se uma torre será adicionada
function checkAddTower() {
	if (isUp()) {
		if(mousePosX>=230 && mousePosX<=310 && mousePosY>=485 && mousePosY<=515) {				
			actualState = statesInterface.p;
			mouseLocked=true;
		}			
	}
}

//Função para verificar se há uma torre selecionada. Parâmetro: vetor de torres. Retorno: True ou False.
function detectTowerSelected(tws) {
	for (var i = 0; i < tws.length; i++) {
		if (mouseClicked) {
			if((tws[i].x<=mousePosX) && (mousePosX<=(tws[i].x + tws[i].width)) && (tws[i].y<=mousePosY) && (mousePosY<=(tws[i].y + tws[i].height))){
				tws[i].selected=true;
			}else{
				if (actualState == statesInterface.s){
					actualState = statesInterface.i;
				}
				tws[i].selected=false;
			}
		}
	}
	for (var i = 0; i < tws.length; i++) {
		if (tws[i].selected) {
			actualState = statesInterface.s;
			return tws[i];
		}
	}
	return undefined;
}