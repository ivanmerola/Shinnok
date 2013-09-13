/*
Biblioteca javascript para funções utilitárias
Autores: Renato Carlos Rodrigues Miranda de Sá / Fernando del Rio
Fontes:
http://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
 */

//Função para embaralhar caracteres em uma string
String.prototype.shuffle = function () {
	var a = this.split(""),
	n = a.length;
	for (var i = n - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var tmp = a[i];
		a[i] = a[j];
		a[j] = tmp;
	}
	return a.join("");
}

//Função para gerar um número inteiro aleatório dentro de um intervalo. Parâmetros: início e fim do intervalo. Retorno: o número aleatório gerado.
function generateRandom(begin, end) {
	return Math.floor(Math.random() * (end - begin + 1)) + begin;
}

//Função para desenhar uma linha na tela. Parâmetros: ponto (x,y) inicial, ponto (x,y) final, espessura da linha, cor da linha.
function drawLine(x0, y0, x, y, lineWidth, color) {
	canvas.lineWidth = lineWidth;
	canvas.strokeStyle = color;
	canvas.beginPath();
	canvas.moveTo(x0, y0);
	canvas.lineTo(x, y);
	canvas.stroke();
}

function drawLineWithShadows(x0, y0, x, y, lineWidth, color){

	canvas.lineWidth = lineWidth;
	canvas.strokeStyle = color;
	canvas.beginPath();
	canvas.moveTo(x0, y0);
	canvas.lineTo(x, y);
	//canvas.shadowColor = "red";
    //canvas.shadowBlur = 40;
    //canvas.shadowOffsetX = x0;
    //canvas.shadowOffsetY = y0;
	canvas.stroke();

}

//Função para desenhar um retângulo na tela.Parâmetros: Coordenadas do retângulo (ponto (x,y), largura, altura), espessura da linha, cor da linha, valor booleano indicando se o retângulo deve ou não ser preenchido com uma cor, cor que irá preencher o retângulo.
function drawRectangle(x, y, width, height, lineWidth, lineColor, fillRectangle, color) {
	if (fillRectangle) {
		canvas.fillStyle = color;
		canvas.fillRect(x, y, width, height);
	}
	drawLine(x, y, x + width, y, lineWidth, lineColor);
	drawLine(x + width, y, x + width, y + height, lineWidth, lineColor);
	drawLine(x + width, y + height, x, y + height, lineWidth, lineColor);
	drawLine(x, y + height, x, y, lineWidth, lineColor);
}

//Função para desenhar um texto na tela. Parâmetros: o texto, a fonte, o alinhamento do texto, a cor do texto, o ponto (x,y) onde o texto será desenhado.
function drawText(text, font, textAlign, color, x, y) {
	canvas.font = font;
	canvas.textAlign = textAlign;
	canvas.fillStyle = color;
	canvas.fillText(text, x, y);
}
//Função pra desenhar circulo na tela. Parâmetros: cordenadas em x e y,raio e cor.
function drawCircle(x, y, r, color) {
	canvas.fillStyle = color;
	canvas.beginPath();
	canvas.arc(x, y, r, 0, Math.PI * 2, true);
	canvas.closePath();
	canvas.fill();
}

function drawPolygon(Xpoints, Ypoints, color){

	canvas.fillStyle = color;
	canvas.beginPath();
	canvas.moveTo(Xpoints[0], Ypoints[0]);
	for (var i = 1; i<Xpoints.length; i++){
		canvas.lineTo(Xpoints[i], Ypoints[i]);
	}
	canvas.closePath();
	canvas.fill();

}
