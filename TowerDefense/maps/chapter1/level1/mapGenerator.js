maps = [];

function createMap(map, npcs, towers, id, npc, tower, bits, bit0, life, waveQty, actualWave){

	var map = map;
	map.npcs = npcs;
	map.towers = towers;
	map.id = id;
	map.npc = npc;
	map.tower = tower;
	map.bits = bits;
	map.bits[0] = bit0;
	map.life = life;
	map.waveQty = waveQty;
	map.actualWave = actualWave;
	
	return map;

}

function initAttributes(name, npcSprite, npcWidth, npcHeight, towerSprite, towerWidth,
towerHeight, towerPlaceWidth, towerPlaceHeight, towerQtyFrames, range){

	var map = {};
	map.name = name;
	map.npcSprite = npcSprite;
	map.npcWidth = npcWidth;
	map.npcHeight = npcHeight;
	map.towerSprite = towerSprite;
	map.towerWidth = towerWidth;
	map.towerHeight = towerHeight;
	map.towerPlaceWidth = towerPlaceWidth;
	map.towerPlaceHeight = towerPlaceHeight;
	map.towerQtyFrames = towerQtyFrames;
	map.range = range;
	maps.push(map);
	return map;

}