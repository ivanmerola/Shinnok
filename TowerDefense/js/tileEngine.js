/*
Biblioteca javascript para desenhar mapas no formato XML
Autor: Fernando del Rio
 */

//Função para carregar um tileset. Parâmetro: arquivo xml do mapa. Retorno: o objeto Tileset.
function loadTileset(filename) {
	xmlDoc = loadXMLDoc(filename);
	tileWidth = parseInt(xmlDoc.getElementsByTagName("tileset")[0].getAttribute("tilewidth"));
	tileHeight = parseInt(xmlDoc.getElementsByTagName("tileset")[0].getAttribute("tileheight"));
	width = parseInt(xmlDoc.getElementsByTagName("image")[0].getAttribute("width"));
	height = parseInt(xmlDoc.getElementsByTagName("image")[0].getAttribute("height"));
	image = new Image();
	image.src = xmlDoc.getElementsByTagName("image")[0].getAttribute("source").substring(9);
	return new Tileset(tileWidth, tileHeight, width, height, image);
}

//Função para carregar um layer. Parâmetro: arquivo xml do mapa, o índice do layer a ser carregado, o tileset usado. Retorno: o objeto Layer.
function loadLayer(filename, index, tileset) {
	xmlDoc = loadXMLDoc(filename);
	w = parseInt(xmlDoc.getElementsByTagName("layer")[index].getAttribute("width"));
	h = parseInt(xmlDoc.getElementsByTagName("layer")[index].getAttribute("height"));
	iniX = 0;
	iniY = 0;
	count = w * h;
	var tiles = [];
	for (j = 0; j < count; j++) {
		gid = parseInt(xmlDoc.getElementsByTagName("data")[index].getElementsByTagName("tile")[j].getAttribute("gid"));
		y = Math.floor(parseFloat(gid / (tileset.width / tileset.tileWidth)));
		x = Math.floor(parseFloat(gid - ((tileset.width / tileset.tileWidth) * y) - 1));
		x *= tileset.tileWidth;
		y *= tileset.tileHeight;
		tile = new Tile(x, y, tileset.tileWidth, tileset.tileHeight, iniX * tileset.tileWidth, iniY * tileset.tileHeight);
		iniX++;
		if (iniX >= w) {
			iniX = 0;
			iniY++;
		}
		tiles.push(tile);
	}
	return new Layer(tileset, tiles);
}

//Função para desenhar um layer. Parâmetro: o canvas onde será desenhado, o layer que será desenhado.
function drawLayer(canvas, layer) {
	for (k = 0; k < layer.tiles.length; k++) {
		if (layer.tiles[k].tsX >= 0) {
			canvas.drawImage(layer.tileset.image, layer.tiles[k].tsX, layer.tiles[k].tsY, layer.tiles[k].tsWidth, layer.tiles[k].tsHeight, layer.tiles[k].mapX, layer.tiles[k].mapY + 40, layer.tiles[k].tsWidth, layer.tiles[k].tsHeight);
		}
	}
}

//Função para desenhar um mapa. Parâmetro: o canvas onde será desenhado, o mapa que será desenhado, lista de quais layers serão desenhados
function drawMap(canvas, map, listLayers) {
	for (i = 0; i < map.layers.length; i++) {
		if (listLayers.indexOf(i) >= 0) {
			drawLayer(canvas, map.layers[i]);
		}
	}
}

//Função para carregar um mapa. Parâmetro: arquivo xml do mapa. Retorno: o objeto Map.
function loadMap(filename) {
	tileset = loadTileset(filename);
	xmlDoc = loadXMLDoc(filename);
	var numOfLayers = xmlDoc.getElementsByTagName("layer").length;
	var layers = [];
	for (i = 0; i < numOfLayers; i++) {
		layer = loadLayer(filename, i, tileset);
		layers.push(layer);
	}
	return new Map(layers);
}

//Definição do tipo Tileset
function Tileset(tileWidth, tileHeight, width, height, image) {
	this.tileWidth = tileWidth;
	this.tileHeight = tileHeight;
	this.width = width;
	this.height = height;
	this.image = image;
}

//Definição do tipo Tile
function Tile(tsX, tsY, tsWidth, tsHeight, mapX, mapY) {
	this.tsX = tsX;
	this.tsY = tsY;
	this.tsWidth = tsWidth;
	this.tsHeight = tsHeight;
	this.mapX = mapX;
	this.mapY = mapY;
}

//Definição do tipo Layer
function Layer(tileset, tiles) {
	this.tileset = tileset;
	this.tiles = tiles;
}

//Definição do tipo Map
function Map(layers) {
	this.layers = layers;
}
