//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function recupererPremierEnfantDeTypeNode(n) {
    var x = n.firstChild;
    while (x.nodeType != 1) { // Test if x is an element node (and not a text node or other)
        x = x.nextSibling;
    }
    return x;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//change le contenu de l'�lement avec l'id "nom" avec la chaine de caract�res en param�tre	  
function setNom(nom) {
    var elementHtmlARemplir = window.document.getElementById("id_nom_a_remplacer");
    elementHtmlARemplir.innerHTML = nom;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//change la couleur du background en bleu et la couleur du texte du boutton en blanc 
function Bouton1_setBG() {
    window.document.body.style.backgroundColor = 'blue';
	window.document.getElementById('myButton1').style.color = 'white' ;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//charge le fichier XML se trouvant � l'URL relative donn� dans le param�treet le retourne
function chargerHttpXML(xmlDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    //chargement du fichier XML � l'aide de XMLHttpRequest synchrone (le 3� param�tre est d�fini � false)
    httpAjax.open('GET', xmlDocumentUrl, false);
    httpAjax.send();

    return httpAjax.responseXML;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
// Charge le fichier JSON se trouvant � l'URL donn�e en param�tre et le retourne
function chargerHttpJSON(jsonDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    // chargement du fichier JSON � l'aide de XMLHttpRequest synchrone (le 3� param�tre est d�fini � false)
    httpAjax.open('GET', jsonDocumentUrl, false);
    httpAjax.send();

    var responseData = eval("(" + httpAjax.responseText + ")");

    return responseData;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton2_ajaxBibliographie(xmlDocumentUrl, xslDocumentUrl, newElementName) {

    var xsltProcessor = new XSLTProcessor();

    // Chargement du fichier XSL � l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML(xslDocumentUrl);

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);

    // Chargement du fichier XML � l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    // Cr�ation du document XML transform� par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_element_a_remplacer");
    // Premier �l�ment fils du parent
    var elementHtmlARemplacer = recupererPremierEnfantDeTypeNode(elementHtmlParent);
    // Premier �l�ment "elementName" du nouveau document (par exemple, "ul", "table"...)
    var elementAInserer = newXmlDocument.getElementsByTagName(newElementName)[0];

    // Remplacement de l'�l�ment
    elementHtmlParent.replaceChild(elementAInserer, elementHtmlARemplacer);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton3_nomOffCap(xmlDocumentUrl, xslDocumentUrl) {

    var xsltProcessor = new XSLTProcessor();

    // Chargement du fichier XSL � l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML(xslDocumentUrl);

    // Importation du .xsl
	var param = document.getElementById('myText1').value ; 
	console.log(param); 
	xsltProcessor.setParameter(null,"pays",param); 
	xsltProcessor.importStylesheet(xslDocument);
	
    // Chargement du fichier XML � l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);
    // Cr�ation du document XML transform� par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    var elementHtmlParent = document.getElementById("cap");
    var elementAInserer = newXmlDocument.getElementsByTagName('p');
	elementHtmlParent.innerText = elementAInserer[0].innerText; 
   
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton4_svg(xmlDocumentUrl , param) {
	
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);
	var elementHtml = document.getElementById(param);
	var elementAInserer= xmlDocument.querySelector('svg'); 
	var oSerializer = new XMLSerializer();
	elementHtml.innerHTML = oSerializer.serializeToString(elementAInserer);

}

function clickable (param1 , param2 , param3){

	var exemple = document.querySelector(param1); 
	
	for (var i = 0 ; i < exemple.children.length ; i++) {
		var child = exemple.children[i]; 
		child.addEventListener('click', function(evt){	
			var elementARemplacer = document.getElementById(param2);
			elementARemplacer.innerText = evt.target.getAttribute(param3);
			});
	}
	}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton8_stylish() {
	var carte = document.querySelector('#world svg g'); 
	for (var i = 0 ; i < carte.children.length ; i++) {
		var country = carte.children[i]; 
		country.addEventListener('mouseover' , colorier); 
		country.addEventListener('mouseleave' , function(event){
			event.target.style.fill = ""; 	
			document.getElementById('tab').innerHTML = "";
		});
	}
}

function colorier(event){
	event.target.style.fill = "lightblue"; 
	var xsltProcessor = new XSLTProcessor();
	// Chargement du fichier XSL � l'aide de XMLHttpRequest synchrone 
	var xslDocument = chargerHttpXML('cherchePays2.xsl');
	var param = event.target.getAttribute('countryname');
	xsltProcessor.setParameter(null,"pays",param); 
	xsltProcessor.importStylesheet(xslDocument);
	 // Chargement du fichier XML � l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML('countriesTP.xml');
    // Cr�ation du document XML transform� par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);
	var eltHtml = document.getElementById('tab'); 
	var eltXml = newXmlDocument.getElementsByTagName('table')[0]; 
	console.log(eltXml);
	eltHtml.innerHTML =eltXml; 
}

