var Latitude = undefined;
var Longitude = undefined;
var marker;
var map4;
var sBuca2="";


//onload di index.html
$( document ).on( "pageinit", "#paginaSegnalazioni", function( event ) {
	
	
	var coordinate;
	
	$("#comune").hide();
	$("#regione").hide();
	$("#provincia").hide();
	$("#fine").hide();
	
	
	
	
	

	var mapOptions = {
			center: new google.maps.LatLng(45, 10),
			zoom: 6,
			mapTypeId: google.maps.MapTypeId.HYBRID
	};

	map4 = new google.maps.Map
		(document.getElementById("map3"), mapOptions);
		
		
		//Carichiamo le buche sulla mappa
		caricaBucheSegnalazioni();
	
	
	
	
	
	
	
	
	
	//Segnalazioni BUCHE
	$("#btnSeleziona2").on("click", function(){
		
		$("#Invia").show();
		
		var opzione =$("#cmbTipoTratta2 option:selected").html();
		
		if(opzione !="" && sBuca2!="")
		{
		$("#formSelezionaBuca").hide();
		$("#fine").show();
		console.log(opzione);
		
		if(opzione=="Comunale")
		{
			$("#lblSegnalazione").html("<strong>Inserisci il Comune:</strong>");
			

		}
		
		else if(opzione=="Provinciale")
		{
			$("#lblSegnalazione").html("<strong>Inserisci la Provincia:</strong>");
			
		}
		
		else if(opzione=="Regionale")
		{
			$("#lblSegnalazione").html("<strong>Inserisci la Regione:</strong>");
			
		}	
		else if(opzione=="Statale")
		{
			$("#lblSegnalazione").html("<strong>Destinatario:</strong>");
			$("#txtEnte").val("Anas Spa");
		}
	    else if(opzione=="Autostrada")
		{
			
			$("#lblSegnalazione").html("<strong>Destinatario:</strong>");
			$("#txtEnte").val("Autostrade per l'Italia Spa");
			
		}
		}else{
			
			
			alert("Non hai selezionato tutto!");
		}
		
		
		
		
		
		//SEGNALAZIONE BUCA
		$("#Invia").on("click", function(){
			
			var vet=sBuca2.split(",");

			var lat=vet[0];
			var lng = vet[1];
			//opzione
			var ente = $("#txtEnte").val();
			var email = $("#txtEmail").val();
			var idUtente= window.localStorage.getItem("utente");			
			
			
			
			if(ente!="" && email !="")
			{
				
					send_request("http://fabianfilip.altervista.org/LAMB/SegnalazioneBUCA.php","POST","idUtente="+idUtente+"&idTratta=''"+"&nome="+ente+"&mail="+email+"&tipo="+opzione+"&lat="+lat+"&lng="+lng, function(responseText){
												
							
						if(responseText.includes("Inserita"))
						{
												
							$("#lblSegnalazioniB").text("La Buca è stata segnalata!");
							$("#lblSegnalazioniB").css("color","#66ff66");
							$("#Invia").hide();
						
						}else
						{
							
							$("#lblSegnalazioniB").text("Errore: "+responseText);
							$("#lblSegnalazioniB").css("color","#ff4d4d");
							
						}
							
				
					});
				
				
			}else{
				
				$("#lblSegnalazioniB").text("Non hai compilato tutti i campi!");
				$("#lblSegnalazioniB").css("color","#ff4d4d");
						
			}
			
			
			
			
			
		})
		
		
		
		
	});
	
	
	

});




function caricaBucheSegnalazioni()
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
			
			google.maps.event.addListener(marker, "click", function (event) {
			
				
					coordinate=this.position;
					var latitude = coordinate.lat();
					var longitude = coordinate.lng();
		
					//alert(latitude +" " + longitude);
					//sBuca2 = latitude +", "+longitude;
					
					$("#testoBucaB").html("La buca è già stata segnalata!");
					$("#testoBucaB").css("color","#ff4d4d");
			});
			
			
			
		}
		else{
			
				var marker = new google.maps.Marker({
				 
				position: latLong,
				icon: {
					url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"  
					}
				
			});
			
			google.maps.event.addListener(marker, "click", function (event) {
			
				
					coordinate=this.position;
					var latitude = coordinate.lat();
					var longitude = coordinate.lng();
		
					//alert(latitude +" " + longitude);
					sBuca2 = latitude +", "+longitude;
					
					$("#testoBucaB").html("Hai selezionato: <strong>"+sBuca2+"</strong>");
					$("#testoBucaB").css("color","#66ff66");
			});
			
			
			
		}
		
		
	
			
			marker.setMap(map4);
	}
		
		
	});
		
	
	
	
	
}


