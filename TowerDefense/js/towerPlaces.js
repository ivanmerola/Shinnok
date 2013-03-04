/*
Biblioteca javascript para detectar locais disponíveis para colocar torres
Autor: Thiago Alves/Orlando Figueiredo
 */

//Tile sobre o qual paira o mouse.
var xTileMouseOver = 0, yTileMouseOver = 0, mouseInside = false,
towerWidth = 1, towerHeight = 1, placeOk = true;

//Função para carregar uma torre. Parâmetro: posição (x,y), caminho da sprite, largura e altura da imagem, quantidade de frames, frame atual.
function loadTower(x, y, img, width, height, frameqty, actualframe, shooting) {
	var tower = {};
	tower.x = x;
	tower.y = y;
	tower.image = new Image();
	tower.image.src = img;
	tower.width = width;
	tower.height = height;
	tower.frameqty = frameqty;
	tower.actualframe = actualframe;
	tower.shooting = shooting;
	return tower;
}

//Função para desenhar uma torre. Parâmetro: o canvas onde será desenhado, objeto torre que será desenhado.
function drawTower(canvas, tower) {
	canvas.drawImage(tower.image, tower.actualframe * tower.width, 0, tower.width, tower.height, tower.x, tower.y + 8, tower.width, tower.height);
}

//Função para atualizar o estado de uma torre. Parâmetro: a torre que será atualizada.
function updateTower(tower) {
	if (tower.shooting) {
		if ((tower.actualframe + 1) == tower.frameqty) {
			tower.actualframe = 0;
		} else {
			tower.actualframe++;
		}
	}
}

//Função que desenha a torre onde o mouse estiver.
function highlightPlaces() {
	if (mouseInside) {
		var tower;
		tower = loadTower(xTileMouseOver * 32, yTileMouseOver * 32 - 32, "images/towers/torre-2-3.png", 32, 63, 7, 0, true);
		detectNotAvailable();
		if (placeOk) {
			canvas.fillStyle = "rgba(0,200,0,0.5)";
			canvas.fillRect((xTileMouseOver - (Math.floor(towerWidth / 2))) * 32,
				(yTileMouseOver - (Math.floor(towerHeight / 2))) * 32 + 8, towerWidth * 32, towerHeight * 32); //TODO : trocar 32 por vars globais de tile
			canvas.globalAlpha = 0.7;
			drawTower(canvas, tower);
			canvas.globalAlpha = 1;
			if (mouseClicked && !hasTower(tower)) {
				towers.push(tower);
				towerOrder();
			}
		} else {
			canvas.fillStyle = "rgba(200,0,0,0.5)";
			canvas.fillRect((xTileMouseOver - (Math.floor(towerWidth / 2))) * 32,
				(yTileMouseOver - (Math.floor(towerHeight / 2))) * 32 + 8, towerWidth * 32, towerHeight * 32); //TODO : trocar 32 por vars globais de tile
		}
	}
}

//Função para verificar se há uma torre em determinada posição para impedir que duas torres possam ser adicionadas no mesmo lugar. Parâmetro: a torre que será verificada. Retorno: True ou False.
function hasTower(tw) {
	for (var i = 0; i < towers.length; i++) {
		if (towers[i].x == tw.x && towers[i].y == tw.y) {
			return true;
		}
	}
	return false;
}

//Função para ordenar as torres pelo eixo Y, impedindo que elas se sobreponham.
function towerOrder() {
	for (var i = 0; i < towers.length; i++) {
		for (var j = 0; j < i; j++) {
			if (towers[i].y < towers[j].y) {
				var aux = towers[i];
				towers[i] = towers[j];
				towers[j] = aux;
			}
		}
	}
}

//Função para detectar espaços disponíveis para as torres.
function detectNotAvailable() {
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
		var y = parseInt(obj.getAttribute("y")) + 40;
		var width = parseInt(obj.getAttribute("width"));
		var height = parseInt(obj.getAttribute("height"));
		if ((xTileMouseOver - (Math.floor(towerWidth / 2)) + towerWidth) * 32 > x &&
			(xTileMouseOver - (Math.floor(towerWidth / 2))) * 32 < x + width &&
			(yTileMouseOver - (Math.floor(towerHeight / 2)) + towerHeight) * 32 + 8 > y &&
			(yTileMouseOver - (Math.floor(towerHeight / 2))) * 32 + 8 < y + height) {
			placeOk = false;
			break;
		}
	}
}
