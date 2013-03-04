/*
Funções de desenho da tela de loading.
Autor: Fernando del Rio
 */

//Função para desenhar a tela.
function loadingRender() {
	drawRectangle(0, 0, 640, 560, 2, "#000", true, "#FFF");
	drawText("Carregando. . .", "25px Arial", "center", "#000", 320, 270);
}
