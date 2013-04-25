/*
Biblioteca javascript para detectar locais disponíveis para colocar torres
Autor: Thiago Alves / Orlando Figueiredo / Samuel / Renato
 */

//Indica a possibilidade de se colocar uma torre. True uma torre pode ser colocada naquela posição. False uma torre não pode ser colocada naquela posição
var placeOk = true;

//Função para carregar uma torre. Parâmetro: posição (x,y), caminho da sprite, largura e altura da imagem, quantidade de frames, frame atual.
function loadTower(x, y, img, width, height, placeWidth, placeHeight, frameqty, shooting, range, selected) {
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
	return tower;
}

//Função para desenhar uma torre. Parâmetro: o canvas onde será desenhado, objeto torre que será desenhado.
function drawTower(canvas, tower) {
	//raio que verifica o range
	//drawCircle(tower.x + (tower.width/2), tower.y + tower.height + 20, tower.range, "rgba(0,0,0,0.3)");
	canvas.drawImage(tower.image, tower.actualframe * tower.width, 0, tower.width, tower.height, tower.x, tower.y + 40, tower.width, tower.height);
}

//Função para atualizar o estado de uma torre. Parâmetro: a torre que será atualizada.
function updateTower(tower, npcs) {
	tower.shooting = false;
	for (var i = 0; i < npcs.length; i++) {
		if (!npcs[i].removed) {
			var detected = detectNpcInRange(tower.x + (tower.width / 2), tower.y + tower.height + 20, tower.range, npcs[i].posX + npcs[i].chrWidth / 2, npcs[i].posY + npcs[i].chrHeight / 2 + 40, npcs[i].chrWidth / 2);
			if (detected) {
				tower.shooting = true;
				break;
			}
		}
	}
	if (tower.shooting) {
		if ((tower.actualframe + 1) == tower.frameqty) {
			tower.actualframe = 0;
		} else {
			tower.actualframe++;
		}
	} else {
		tower.actualframe = 0;
	}
}

//Função que desenha a torre onde o mouse estiver.
function highlightPlaces(tower, towers) {
	if (mouseInside) {
		detectNotAvailable(tower);
		if (placeOk) {
			canvas.fillStyle = "rgba(0,200,0,0.5)";
			canvas.fillRect((xTileMouseOver - (Math.floor(tower.placeWidth / 2))) * 32,
				(yTileMouseOver - (Math.floor(tower.placeHeight / 2))) * 32 + 40, tower.placeWidth * 32, tower.placeHeight * 32); //TODO : trocar 32 por vars globais de tile
			canvas.globalAlpha = 0.7;
			drawTower(canvas, tower);
			canvas.globalAlpha = 1;
			if (mouseClicked && !hasTower(tower, towers)) {
				towers.push(tower);
				towerOrder(towers);
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
	var distance;
	distance = Math.sqrt(Math.pow((towerx - npcx), 2) + Math.pow((towery - npcy), 2));
	if (distance <= towerR + npcR) {
		return true;
	} else {
		return false;
	}
}

//Função para verificar se há uma torre slecionada. Parâmetro: vetor de torres. Retorno: True ou False.
function detectTowerSelected(tws) {
	for (var i = 0; i < tws.length; i++) {
		if (tws[i].selected) {
			return true;
		}
	}
	return false;
}
