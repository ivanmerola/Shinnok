/*
	Biblioteca javascript para desenhar e animar sprites
	Autor: Fernando del Rio
*/

//Representação das direções do personagem / teclas do teclado
var chrDir = {
	UP:38,W:87,
	LEFT:37,A:65,
	DOWN:40,S:83,
	RIGHT:39,D:68
}

//Função para carregar um personagem. Parâmetro: posição (x,y) do personagem na tela, largura e altura do personagem, caminho do sprite do personagem, e direção que o personagem está olhando
function loadCharacter(x, y, width, height, img, direction){
	var imm=new Image();
	imm.src=img;
	return new Character(x,y,imm,width,height,1,direction,false);
}

//Função para desenhar um personagem. Parâmetro: o canvas onde será desenhado, e o personagem que será desenhado
function drawCharacter(canvas, character){
	if(character.direction==chrDir.DOWN){
		canvas.drawImage(character.image,character.imgPosition*character.chrWidth,0,character.chrWidth,character.chrHeight,character.posX,character.posY,character.chrWidth,character.chrHeight);
	} else if(character.direction==chrDir.LEFT){
		canvas.drawImage(character.image,character.imgPosition*character.chrWidth,character.chrHeight,character.chrWidth,character.chrHeight,character.posX,character.posY,character.chrWidth,character.chrHeight);
	} else if(character.direction==chrDir.RIGHT){
		canvas.drawImage(character.image,character.imgPosition*character.chrWidth,2*character.chrHeight,character.chrWidth,character.chrHeight,character.posX,character.posY,character.chrWidth,character.chrHeight);
	} else if(character.direction==chrDir.UP){
		canvas.drawImage(character.image,character.imgPosition*character.chrWidth,3*character.chrHeight,character.chrWidth,character.chrHeight,character.posX,character.posY,character.chrWidth,character.chrHeight);
	}
}

//Função para atualizar o personagem na tela. Parâmetro: o personagem que será atualizado, o status das teclas de movimentação do personagem
function updateCharacter(character, keyDownPressed, keyLeftPressed, keyRightPressed, keyUpPressed){
	if(!keyDownPressed && !keyLeftPressed && !keyRightPressed && !keyUpPressed){
		character.walking=false;
		character.imgPosition=1;
	} else {
		character.imgPosition++;
		if(character.imgPosition>2){
			character.imgPosition=0;
		}
		if(keyDownPressed){
			if(!detectCharacterColision(character.posX,character.posY+5,character.chrWidth,character.chrHeight)){
				character.posY+=5;
			}
			character.direction=chrDir.DOWN;
		} else if(keyLeftPressed){
			if(!detectCharacterColision(character.posX-5,character.posY,character.chrWidth,character.chrHeight)){
				character.posX-=5;
			}
			character.direction=chrDir.LEFT;
		} else if(keyRightPressed){
			if(!detectCharacterColision(character.posX+5,character.posY,character.chrWidth,character.chrHeight)){
				character.posX+=5;
			}
			character.direction=chrDir.RIGHT;
		} else if(keyUpPressed){
			if(!detectCharacterColision(character.posX,character.posY-5,character.chrWidth,character.chrHeight)){
				character.posY-=5;
			}
			character.direction=chrDir.UP;
		}
	}
}

//Função para detectar uma colisão de um personagem no mapa. Parâmetro: a posição (x,y) do personagem, a largura e altura do personagem. Retorno: true ou false
function detectCharacterColision(posX, posY, chrWidth, chrHeight){
	var objectGroups = xmlDoc.getElementsByTagName("objectgroup");
	var colision;
	for(i=0;i<objectGroups.length;i++){
		if(objectGroups[i].getAttribute("name")=="Colisao"){
			colision=objectGroups[i].getElementsByTagName("object");
			break;
		}
	}
	var hasColision=false;
	for(i=0;i<colision.length;i++){
		var obj=colision[i];
		var x=parseInt(obj.getAttribute("x"));
		var y=parseInt(obj.getAttribute("y"));
		var width=parseInt(obj.getAttribute("width"));
		var height=parseInt(obj.getAttribute("height"));
		if(posX+chrWidth>=x && posX<=x+width && posY+chrHeight>=y && posY<=y+height){
			hasColision=true;
			break;
		}
	}
	return hasColision;
}

function updateNPC(character){
	var remove=false;
	if(!character.walking){
		character.walking=true;
	}
	character.imgPosition++;
	if(character.imgPosition>2){
		character.imgPosition=0;
	}
	var objectGroups = xmlDoc.getElementsByTagName("objectgroup");
	var path;
	var end;
	for(i=0;i<objectGroups.length;i++){
		if(objectGroups[i].getAttribute("name")=="Caminho"){
			path=objectGroups[i].getElementsByTagName("object");
		} else if(objectGroups[i].getAttribute("name")=="Fim"){
			end=objectGroups[i].getElementsByTagName("object");
		}
	}
	var inside=false;
	var obj;
	for(i=0;i<end.length;i++){
		obj=end[i];
		var x=parseInt(obj.getAttribute("x"));
		var y=parseInt(obj.getAttribute("y"));
		var width=parseInt(obj.getAttribute("width"));
		var height=parseInt(obj.getAttribute("height"));
		if(character.posX>=x && character.posX+character.chrWidth<=x+width && character.posY>=y && character.posY+character.chrHeight<=y+height){
			inside=true;
			break;
		}
	}
	if(inside){
		remove=true;
		return remove;
	}
	inside=false;
	for(i=0;i<path.length;i++){
		obj=path[i];
		var x=parseInt(obj.getAttribute("x"));
		var y=parseInt(obj.getAttribute("y"));
		var width=parseInt(obj.getAttribute("width"));
		var height=parseInt(obj.getAttribute("height"));
		if(character.posX>=x && character.posX+character.chrWidth<=x+width && character.posY>=y && character.posY+character.chrHeight<=y+height){
			inside=true;
			break;
		}
	}
	if(inside){
		var D = obj.getElementsByTagName("properties")[0].getElementsByTagName("property")[0].getAttribute("value").shuffle();
		var L = obj.getElementsByTagName("properties")[0].getElementsByTagName("property")[1].getAttribute("value").shuffle();
		var R = obj.getElementsByTagName("properties")[0].getElementsByTagName("property")[2].getAttribute("value").shuffle();
		var U = obj.getElementsByTagName("properties")[0].getElementsByTagName("property")[3].getAttribute("value").shuffle();
		var nextDirection;
		if(character.direction==chrDir.DOWN){
			nextDirection=D[0];
		} else if(character.direction==chrDir.LEFT){
			nextDirection=L[0];
		} else if(character.direction==chrDir.RIGHT){
			nextDirection=R[0];
		} else if(character.direction==chrDir.UP){
			nextDirection=U[0];
		}
		if(nextDirection=="D"){
			character.direction=chrDir.DOWN;
		} else if(nextDirection=="L"){
			character.direction=chrDir.LEFT;
		} else if(nextDirection=="R"){
			character.direction=chrDir.RIGHT;
		} else if(nextDirection=="U"){
			character.direction=chrDir.UP;
		}
	}
	if(character.direction==chrDir.DOWN){
		if(!detectCharacterColision(character.posX,character.posY+8,character.chrWidth,character.chrHeight)){
			character.posY+=8;
		}
	} else if(character.direction==chrDir.LEFT){
		if(!detectCharacterColision(character.posX-8,character.posY,character.chrWidth,character.chrHeight)){
			character.posX-=8;
		}
	} else if(character.direction==chrDir.RIGHT){
		if(!detectCharacterColision(character.posX+8,character.posY,character.chrWidth,character.chrHeight)){
			character.posX+=8;
		}
	} else if(character.direction==chrDir.UP){
		if(!detectCharacterColision(character.posX,character.posY-8,character.chrWidth,character.chrHeight)){
			character.posY-=8;
		}
	}
	return remove;
}

//Definição do tipo Character
function Character(posX, posY, image, chrWidth, chrHeight, imgPosition, direction, walking){
	this.posX=posX;
	this.posY=posY;
	this.image=image;
	this.chrWidth=chrWidth;
	this.chrHeight=chrHeight;
	this.imgPosition=imgPosition;
	this.direction=direction;
	this.walking=walking;
}