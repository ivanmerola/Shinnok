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

//Definição do tipo Torre
//function tower(posX, posY, image, chrWidth, chrHeight, imgPosition){
//	this.posX=posX;
//	this.posY=posY;
//	this.image=image;
//	this.chrWidth=chrWidth;
//	this.chrHeight=chrHeight;
//	this.imgPosition=imgPosition;
//}

//Função para carregar uma torre 
//Parâmetro: posição (x,y) da torre na tela, largura e altura da torre, caminho do sprite da torre
//function loadTower(x, y, width, height, img){
//	var imm=new Image();
//	imm.src=img;
//	return new Character(x,y,imm,width,height,1,direction,false);
//}

function highlightPlaces() {
	if (mouseInside) {
		detect();
		if (placeOk) {
			
			canvas.fillStyle = "rgba(0,200,0,0.5)";
			
			
		} else {
			canvas.fillStyle = "rgba(200,0,0,0.5)";
		}
		canvas.fillRect((xTileMouseOver-(Math.floor(towerWidth/2)))*32, 
						(yTileMouseOver-(Math.floor(towerHeight/2)))*32, towerWidth*32, towerHeight*32); //TODO : trocar 32 por vars globais de tile
		var towerBeingPlaced = loadCharacter(xTileMouseOver*32, (yTileMouseOver*32)-32, 32, 64, "images/characteres/android_sprite_torre.png", 40);
		drawCharacter(canvas, towerBeingPlaced);
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