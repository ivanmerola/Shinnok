/*
Biblioteca javascript para funções que manipulam waves de NPCs
Autor: Fernando del Rio / Thiago Alves / Samuel / Renato
*/

var startTimeWaveGenerator;

//Função responsável por iniciar o gerador de waves
function startGenerator(){
	startTimeWaveGenerator = new Date();
}

//Função responsável por gerar uma wave. Parâmetro: arquivo XML do mapa, e vetor de NPCs. Retorno: o vetor de NPCs modificado.
function generateWave(filename, npcs){
	xmlDoc = loadXMLDoc(filename);
	var objectGroups = xmlDoc.getElementsByTagName("objectgroup");
	for (var i = 0; i < objectGroups.length; i++) {
		if (objectGroups[i].getAttribute("name") == "Waves") {
			
		}
	}
}