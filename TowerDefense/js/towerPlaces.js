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