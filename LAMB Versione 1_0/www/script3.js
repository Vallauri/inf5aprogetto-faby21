var Latitude = undefined;
var Longitude = undefined;
var marker;
var marker2;
var map;
var map2;
var lunghezza;
var sBuca="";
var dest;
var orig;




//onload di index.html
$( document ).on( "pageinit", "#paginaTratte", function( event ) {
	
	stampaTratte();
	
	
	
	

	$("#formAggiungi").hide();
	$("#formSeleziona").hide();
	
	
	
	
	
	//Bottone Seleziona
	$("#btnSeleziona").on("click", function(){
		
		
		
		var idTratta =$("#cmbTratta").val();
		var tratta=$("#cmbTratta option:selected").html();
	
		//controlliamo se la tratta è stata segnalata
		segnalata(idTratta);
		
		if(idTratta!=0){
			
			$("#form1").hide();
			$("#formSeleziona").show();
			$("#titolo2").text(tratta);
			
			var mapOptions = {
			center: new google.maps.LatLng(45, 10),
			zoom: 5,
			mapTypeId: google.maps.MapTypeId.HYBRID
			};
		
			
			map = new google.maps.Map
					(document.getElementById("map2"), mapOptions);
					
				
			caricaBucheTratte();	
			
			
			//Caricare la tratta geocoder
			
			
			
			send_request("http://fabianfilip.altervista.org/LAMB/findTratta.php","POST","", function(responseText){
				
				
				
				var json= JSON.parse(responseText);		
				var n = json.length;
				
				for(var i=0;i<n;i++)
				{
					id= json[i]["id"];
					nome= json[i]["nome"];
					tipo= json[i]["tipo"];
					cp= json[i]["CP"];
					ca= json[i]["CA"];
								
					//Carichiamo la tratta
					if(id==idTratta)
					{
								
						Oslo(cp, ca);
						caricaBucheTratte();
  
  
					}
					
					
				
				}
				
						
				
			});
			

		}else
		{
			alert("Non hai selezionato nessuna tratta!");
		}
			



			
		//BOTTONE AGGIUNGI BUCHE		
		$("#btnAggiungiBuche").on("click", function(){
			
			
		
			//Prendiamo la lat e lng selezionate
			
			if(sBuca!="")
			{
				var vet=sBuca.split(",");
				
				var lat=vet[0];
				var lng = vet[1];
				
				//mandiamo richiesta
				send_request("http://fabianfilip.altervista.org/LAMB/bucaTratta.php","POST","lat="+lat+"&lng="+lng+"&idTratta="+idTratta, function(responseText){
					
					
					
					if(responseText.includes("assegnata"))
					{
						
						$("#testoBucaT").text("La buca è stata assegnata alla tratta con successo!");
						$("#testoBucaT").css("color","#66ff66");
						
					}else if(responseText.includes("esiste"))
					{
						$("#testoBucaT").text("La buca selezionata è già assegnata a una tratta!");
						$("#testoBucaT").css("color","red");
					}
					
					
					
				});
						
	
				
				
				
				
			}else{
				
				alert("Non hai selezionato alcuna buca!");
				
			}
			
			
			
			
			
			
		});
		
		
		
		//DETTAGLI TRATTA
		
		$("#btnDettagliT").on("click", function(){
			
			
			//alert("lunghezza tratta: "+lunghezza+" \n Numero buche sulla tratta: 10\n Numero buche segnalate: 5 \n La tratta è stata segnalata?: NO \n stato tratta: SCHIFO");
			send_request("http://fabianfilip.altervista.org/LAMB/NbucheTratte.php","POST","idTratta="+idTratta,function(responseText){
				
				
					var jsonSq= JSON.parse(responseText);
					
					  var nBuche=jsonSq[0]["nBuche"]; 	
					  
					  
					send_request("http://fabianfilip.altervista.org/LAMB/NBucheTratteS.php","POST","idTratta="+idTratta,function(responseText2){
				
				
						var json= JSON.parse(responseText2);
						
					    var nBucheS=json[0]["nBuche"]; 	
						 	 							  
					    var s=" Lunghezza Tratta: "+lunghezza+"<br/> Numero buche: "+nBuche+"<br/> <span style='color:#66ff66'>Numero buche segnalate: "+nBucheS+" </span>"; 			
					    $("#txtDettagliT").html(s);
					
					});
					  
				
				
			});


			
		
			
		});
		
		
		
		//SEGNALA Tratta
		$("#btnSegnala").on("click", function(){
			
			
			
			send_request("http://fabianfilip.altervista.org/LAMB/findTratta.php","POST","",function(responseText){
				
				
				//console.log(responseText);
					var json= JSON.parse(responseText);		
					var n = json.length;
			
					for(var i=0;i<n;i++)
					{
						id= json[i]["id"];
						tipo= json[i]["tipo"];
						
							if(id==idTratta)
							{
								
								if(tipo=="Comunale")
								{
									$("#lblSegnalazione2").html("<strong>Inserisci il Comune:</strong>");
									

								}
								
								else if(tipo=="Provinciale")
								{
									$("#lblSegnalazione2").html("<strong>Inserisci la Provincia:</strong>");
									
								}
								
								else if(tipo=="Regionale")
								{
									$("#lblSegnalazione2").html("<strong>Inserisci la Regione:</strong>");
									
								}	
								else if(tipo=="Statale")
								{
									$("#lblSegnalazione2").html("<strong>Destinatario:</strong>");
									$("#txtEnte2").val("Anas Spa");
								}
								else if(tipo=="Autostrada")
								{
									
									$("#lblSegnalazione2").html("<strong>Destinatario:</strong>");
									$("#txtEnte2").val("Autostrade per l'Italia Spa");
									
								}
								
								
								$("#Invia2").on("click", function(){
									
									
									var ente = $("#txtEnte2").val();
									var email = $("#txtEmail2").val();
									var idUtente= window.localStorage.getItem("utente");
									
									//utente
									//idTratta
									//inserire la segnalazione
									//modificare la tratta e aggiungere segnalato a 1
									
									
									if(ente!="" && email!="")
									{
										

											send_request("http://fabianfilip.altervista.org/LAMB/segnalazioneTratta.php","POST","idUtente="+idUtente+"&idTratta="+idTratta+"&ente="+ente+"&email="+email+"&tipo="+tipo,function(responseText){
												
												
												
												if(responseText.includes("Inserita"))
												{
													
													
													$("#lblSegnalazioniT").text("La Tratta è stata segnalata!");
													$("#lblSegnalazioniT").css("color","#66ff66");
													
													segnalata(idTratta);
												}else
												{
													
													$("#lblSegnalazioniT").text("Errore: "+responseText);
													$("#lblSegnalazioniT").css("color","#ff4d4d");
													
												}
												
												
												
											});
											
									}else
									{
										
										$("#lblSegnalazioniT").text("Non hai compilato tutti i campi!");
										$("#lblSegnalazioniT").css("color","#ff4d4d");
																			
									}
									
									
								});
								
								
								
							}
						
							
							
						
						
						
					}
					
				
				
			});
			
			
			
		});

		
		
	});
	
	
	//Bottone Aggiungi
	
	$("#btnAggiungi").on("click", function(){
		
		
		$("#form1").hide();
		$("#formAggiungi").show();
		$("#titolo2").text("Inserimento Tratta");
		var cont=0;
		var k=0;
		
		//Gestione Mappa
			var mapOptions = {
			center: new google.maps.LatLng(45, 10),
			zoom: 5,
			mapTypeId: google.maps.MapTypeId.HYBRID
			};
			
			map2 = new google.maps.Map
			(document.getElementById("map4"), mapOptions);
			
		
		
			
			
			//Onclick sulla mappa, prende le coordinate
			google.maps.event.addListener(map2, 'click', function(event) {
				
				//alert("Latitude: " + event.latLng.lat() + " " + ", longitude: " + event.latLng.lng());
			
				//Al primo Click
				if(cont==0)
				{
					//Pulizia marker
					if(k>1)
					{
						
						marker.setMap(null);		
						marker2.setMap(null);	
					}
					
					$("#txtCP").val(event.latLng);
					cont++;
					
				 var infowindow = new google.maps.InfoWindow({
					content: event.latLng.toString()
				  });

				  marker = new google.maps.Marker({
					position: event.latLng,
					map: map2,
					title: 'Inizio Tratta'
				  });
				  marker.addListener('click', function() {
					infowindow.open(map, marker);
				  });
					
					
				}
				else if(cont==1)
				{
					$("#txtCA").val(event.latLng);
					cont=0;
							
					
				var infowindow = new google.maps.InfoWindow({
					content: event.latLng.toString()
				  });

				   marker2 = new google.maps.Marker({
					position: event.latLng,
					map: map2,
					title: 'Termine Tratta',
						icon: {
							url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"  
							}
						
				  });
				  marker2.addListener('click', function() {
					infowindow.open(map, marker2);
				  });
				}
				
				k++;
			
			});
			
			
			//INSERIMENTO TRATTA
			$("#btnSalvaT").on("click", function(){
				
				
				var CP = $("#txtCP").val();
				var CA = $("#txtCA").val();
				var nome= $("#txtNomeT").val();
				var tipo =$("#cmbTipoTratta option:selected").text();
				var user=window.localStorage.getItem("utente");
				
				if(CP!="" && CA !="" && nome!="" && tipo !="")
				{
							
					send_request("http://fabianfilip.altervista.org/LAMB/insertTratta.php","POST","CP="+CP+"&CA="+CA+"&nome="+nome+"&tipo="+tipo+"&idUtente="+user,esitoT)
						
	
						
				
		
		
				}else{
						
					$("#txtErroreAT").text("Non hai compilato tutti i campi!");
					$("#txtErroreAT").css("color","#ff4d4d");
				}
				
				
			});
			
			
		
	});
	


	$("#btnIndietro2").on("click", function(){
		
		
		$("#form1").show();
		$("#formAggiungi").hide();
	    $("#formSeleziona").hide();
		$("#titolo2").text("Gestione Tratte");
	
		
	});
	
	$("#btnIndietro3").on("click", function(){
		
		
		$("#form1").show();
		$("#formAggiungi").hide();
	    $("#formSeleziona").hide();
		$("#titolo2").text("Gestione Tratte");
	
	});
  
});


//********************************
//Esito inserimento tratta
//********************************
function esitoT(response){
	
	
alert(response);
	
if(response.includes("INSERITA"))
	
		{
			
			$("#txtErroreAT").text("Tratta inserita con successo!");
			$("#txtErroreAT").css("color","#66ff66");
			stampaTratte();
			
		}else if(response.includes("Errore"))
		{
			$("#txtErroreAT").text("Errore: "+response);
			$("#txtErroreAT").css("color","#ff4d4d");
			
			
		}
	
}

//********************************
//Stampa tratte
//********************************
function stampaTratte(){
	
	
	send_request("http://fabianfilip.altervista.org/LAMB/findTratta.php","POST","",function(responseText){
		
		
		//console.log(responseText);
			var json= JSON.parse(responseText);		
			var n = json.length;
			
			var combo=$("#cmbTratta");
				combo.empty();
			combo.append(new Option(" ",0));
			for(var i=0;i<n;i++)
			{
				id= json[i]["id"];
				nome= json[i]["nome"];
				
					
				
					
					
					combo.append(new Option(nome ,id));
				
				
			}
			
		
		
	});
						
	
	
	
}

//********************************
//Segnalata?
//********************************
function segnalata(idTratta){
	
	
	send_request("http://fabianfilip.altervista.org/LAMB/findTratta.php","POST","",function(responseText){
		
		
		//console.log(responseText);
			var json= JSON.parse(responseText);		
			var n = json.length;
			
		
			for(var i=0;i<n;i++)
			{
				
				id=json[i]["id"];
					
				if(id==idTratta)
				{
					if(json[i]["segnalata"]==1)
					{
						
						$("#btnSegnala").hide();
						console.log("Marco");
					}
					else
					{
						
						$("#btnSegnala").show();
					}
				}
					
					
				
				
				
			}
			
		
		
	});
						
	
	
	
}



function caricaBucheTratte()
{
	
	
	
    var idUtente=window.localStorage.getItem("utente");
	//Mandiamo richiesta
	send_request("http://fabianfilip.altervista.org/LAMB/findBuche.php","POST","idUtente="+idUtente, function(response){
		
			
	var json= JSON.parse(response);		
	var n = json.length;
	
	
	//Aggiungiamo Marker	
	for(var i=0;i<n;i++)
	{		
		Latitude=parseFloat(json[i]["lat"]);
		Longitude=parseFloat(json[i]["lng"]);
			
		var latLong = new google.maps.LatLng(Latitude, Longitude);
	
	
		if(json[i]["segnalata"]==1)
		{
			var marker = new google.maps.Marker({
				 
				position: latLong,
				icon: {
					url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"  
					}
				
			});
		}
		else{
			
				var marker = new google.maps.Marker({
				 
				position: latLong,
				icon: {
					url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"  
					}
				
			});
			
		}
		
		
		google.maps.event.addListener(marker, "click", function (event) {
			
				
					coordinate=this.position;
					var latitude = coordinate.lat();
					var longitude = coordinate.lng();
		
					//alert(latitude +" " + longitude);
					sBuca = latitude +", "+longitude;
					
					$("#testoBucaT").html("Hai selezionato: <strong>"+sBuca+"</strong>");
					$("#testoBucaT").css("color","white");
			});
			
			marker.setMap(map);
	    }
		
		
	});
		
	
	
	
	
}



//********************************
//Visualizzare percorso tratta
//********************************

function Oslo(partenza,arrivo)
{
	



	var coordsP = partenza.match(/\((-?[0-9\.]+), (-?[0-9\.]+)\)/);

	var lat = parseFloat(coordsP[1]);
	var long = parseFloat(coordsP[2]);

	var coordsA = arrivo.match(/\((-?[0-9\.]+), (-?[0-9\.]+)\)/);

	var lat = parseFloat(coordsA[1]);
	var long = parseFloat(coordsA[2]);





 




	
//Percorso
 var directionsRender = new google.maps.DirectionsRenderer();
	var directionsService = new google.maps.DirectionsService();
	directionsRender.setMap(map);
	

	
	//Coordinate di partenza e arrivo
	var Oslo = new google.maps.LatLng(coordsP[1], coordsP[2]);
    var Roma = new google.maps.LatLng(coordsA[1], coordsA[2]);
	
	
	 
	//Opzioni: Partenza,Arrivo,Tipo di Viaggio	 
	var tragitto = {
	origin: Oslo,
	destination: Roma,
	travelMode: google.maps.TravelMode.DRIVING
	};
	
	//Se i dati inseriti sono corretti visualizza il percorso sulla mappa e inserisce nel log le informazioni richieste
	directionsService.route(tragitto, function(directionsResult,status) { 
	  if (status == google.maps.DirectionsStatus.OK) {
		directionsRender.setMap(map);
		directionsRender.setDirections(directionsResult); 
		console.log(directionsResult.routes[0].legs[0]);
		console.log(directionsResult.routes[0].legs[0].duration.text);
		//salviamo per dialog
		lunghezza=directionsResult.routes[0].legs[0].distance.text;

		
		
		
	
	  } else{
		console.log("ERRORE"+status);
	  }
	});
	
	
	
  }  
  


  