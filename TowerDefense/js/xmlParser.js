/*
	Biblioteca javascript para carregar um arquivo XML
	Fonte: http://www.steveborn.com/codenotes/LoadingXML.htm
*/

var xmlDoc;
var xmlloaded = false;
//Função para carregar um arquivo XML. Parâmetro: o caminho onde o arquivo se encontra.
function loadXMLDoc(xmlfile) {
	try {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", xmlfile, false);
	} catch (Exception) {
		var ie = (typeof window.ActiveXObject != 'undefined');
		if (ie) {
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = false;
			while(xmlDoc.readyState != 4) {};
			xmlDoc.load(xmlfile);
			xmlloaded = true;
		} else { 
			xmlDoc = document.implementation.createDocument("", "", null);
			xmlDoc.load(xmlfile);
			xmlloaded = true;
		}
	}
	if (!xmlloaded) {
		xmlhttp.setRequestHeader('Content-Type', 'text/xml');
		xmlhttp.send();
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(xmlhttp.responseText, "application/xml");
		xmlloaded = true;
	}
	return xmlDoc;
}