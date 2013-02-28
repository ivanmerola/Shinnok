/*
	Biblioteca javascript para detectar locais disponíveis para colocar torres
	Autor: Thiago Alves/Orlando Figueiredo
*/

//Tile sobre o qual paira o mouse
var xTileMouseOver = 0, yTileMouseOver = 0, mouseInside = false, 
	towerWidth = 1, towerHeight = 1, placeOk = true;

function mouseMoved(e){
	//Filtra eventos fora do canvas
	var rect = c.getBoundingClientRect();
	if (e.clientX<rect.left || e.clientX>rect.right) {
		mouseInside = false;
		return 
	};
	if (e.clientY<rect.top || e.clientY>rect.bottom) {
		mouseInside = false;
		return
	};

	mouseInside = true;
	xTileMouseOver = Math.floor((e.clientX - rect.left)/32); //TODO : trocar 32 por uma var global de largura de tile
	yTileMouseOver = Math.floor((e.clientY - rect.top)/32);	//TODO : trocar 32 por uma var global de altura de tile
}

//Função para carregar uma torre. Parâmetro: posição (x,y), caminho da sprite, largura e altura da imagem, quantidade de frames, frame atual
function loadTower(x, y, img, width, height, frameqty, actualframe, shooting){
	var tower={};
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

//Função para desenhar uma torre. Parâmetro: o canvas onde será desenhado, objeto torre que será desenhado
function drawTower(canvas, tower){
	canvas.drawImage(tower.image, tower.actualframe*tower.width, 0 , tower.width, tower.height, tower.x, tower.y, tower.width, tower.height);
}

function updateTower(tower){
	if(tower.shooting){
		if ((tower.actualframe + 1) == tower.frameqty) {
			tower.actualframe = 0;
		} else {
			tower.actualframe++;
		}
	} 
}

function highlightPlaces() {
	if (mouseInside) {
		var tower = loadTower(xTileMouseOver*32, (yTileMouseOver*32)-32, "images/towers/torre-2-3.png", 32, 63, 7, 0, true);
		detect();
		if (placeOk) {			
			canvas.fillStyle = "rgba(0,200,0,0.5)";
			canvas.fillRect((xTileMouseOver-(Math.floor(towerWidth/2)))*32, 
						(yTileMouseOver-(Math.floor(towerHeight/2)))*32, towerWidth*32, towerHeight*32); //TODO : trocar 32 por vars globais de tile
			canvas.globalAlpha = 0.8;
			drawTower(canvas, tower);
			canvas.globalAlpha = 1;
			if (mouseClicked && !hasTower(tower)) {
				towers.push(tower);
				towerOrder();
			}
		} else {
			canvas.fillStyle = "rgba(200,0,0,0.5)";
			canvas.fillRect((xTileMouseOver-(Math.floor(towerWidth/2)))*32, 
						(yTileMouseOver-(Math.floor(towerHeight/2)))*32, towerWidth*32, towerHeight*32); //TODO : trocar 32 por vars globais de tile
		}	
	}
}

function hasTower(tw){
	for (var i = 0; i < towers.length; i++) {
		if (towers[i].x == tw.x && towers[i].y == tw.y) {
			return true;
		}
	}
	return false;
}

function towerOrder(){
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

function detect(){
	var objectGroups = xmlDoc.getElementsByTagName("objectgroup");
	var notAvailable;
	for(i=0;i<objectGroups.length;i++){
		if(objectGroups[i].getAttribute("name")=="NotAvailable"){
			notAvailable=objectGroups[i].getElementsByTagName("object");
			break;
		}
	}
	placeOk=true;
	for(i=0;i<notAvailable.length;i++){
		var obj=notAvailable[i];
		var x=parseInt(obj.getAttribute("x"));
		var y=parseInt(obj.getAttribute("y"));
		var width=parseInt(obj.getAttribute("width"));
		var height=parseInt(obj.getAttribute("height"));
		if ( (xTileMouseOver-(Math.floor(towerWidth/2))+towerWidth)*32 > x &&
		     (xTileMouseOver-(Math.floor(towerWidth/2)))*32 < x+width && 
		     (yTileMouseOver-(Math.floor(towerHeight/2)) + towerHeight)*32 > y && 
		     (yTileMouseOver-(Math.floor(towerHeight/2)))*32 < y+height)
		{
			placeOk=false;
			break;
		}
	}
}