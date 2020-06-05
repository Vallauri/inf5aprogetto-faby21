var marker;
var map5;
var sBuca3="";





$( document ).on( "pageinit", "#paginaStatistiche", function( event ) {

	  

var mapOptions = {
			center: new google.maps.LatLng(45, 10),
			zoom: 6,
			mapTypeId: google.maps.MapTypeId.HYBRID
	};

	map5 = new google.maps.Map
		(document.getElementById("mapS"), mapOptions);
		
	
		
		//Carichiamo le buche sulla mappa
		caricaBucheStatistiche();
	
	
		stampaSegnalazioni();



	//Elimina Buca

	$("#btnEliminaB").on("click", function(){
		
		
		if(sBuca3!="")
		{
			
			var vet=sBuca3.split(",");

			var lat=vet[0];
			var lng = vet[1];
			
				send_request("http://fabianfilip.altervista.org/LAMB/cancellaBuca.php","POST","lat="+lat+"&lng="+lng, function(responseText){
					
					
					//alert(responseText);
						if(responseText.includes("RIMOSSA"))
						{
												
							$("#txtBucheS").text("La Buca è stata Rimossa!");
							$("#txtBucheS").css("color","#66ff66");
						
							 setTimeout(function(){ location.reload(); }, 1500);
							
						}else
						{
							
							$("#txtBucheS").text("Errore: "+responseText);
							$("#txtBucheS").css("color","#ff4d4d");
							
						}
					
					caricaBucheStatistiche();
									
				});
												
						
					
			
			
		}else{
			
			$("#txtBucheS").html("Non hai selezionato alcuna buca!");
			$("#txtBucheS").css("color","#ff4d4d");
			
			
		}
		
		
		
		
		
	});


});

//Carica Buche sulla Mappa
function caricaBucheStatistiche()
{
	
	
	
    var idUtente=window.localStorage.getItem("utente");
	//Mandiamo richiesta
	send_request("http://fabianfilip.altervista.org/LAMB/findBuche.php","POST","idUtente="+idUtente, function(response){
		
			
	var json= JSON.parse(response);		
	var n = json.length;
	var cont=0;
	var contS=0;
	
	//Aggiungiamo Marker	
	for(var i=0;i<n;i++)
	{	



		Latitude=parseFloat(json[i]["lat"]);
		Longitude=parseFloat(json[i]["lng"]);
			
		var latLong = new google.maps.LatLng(Latitude, Longitude);
		
		cont++;
	
		if(json[i]["segnalata"]==1)
		{
			 marker = new google.maps.Marker({
				 
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
					
					$("#txtBucheS").html("La buca è già stata segnalata!");
					$("#txtBucheS").css("color","#ff4d4d");
			});
			
			
			contS++;
		}
		else{
			
				 marker = new google.maps.Marker({
				 
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
					sBuca3 = latitude +", "+longitude;
					
					$("#txtBucheS").html("Hai selezionato: <strong>"+sBuca3+"</strong>");
					$("#txtBucheS").css("color","#66ff66");
			});
			
			
			
		}
		
		
			
			marker.setMap(map5);
	}
	   
	   var s=" <br/>Numero buche rilevate: "+cont+"<br/> <span style='color:#66ff66'>Numero buche segnalate: "+contS+" </span>"; 			
					    $("#txtDettagliS").html(s);	
		
	});
		
	
	

}



//Visualizza le Segnalazioni dell'utente

function stampaSegnalazioni()
{
  var idUtente= window.localStorage.getItem("utente");	
  send_request("http://fabianfilip.altervista.org/LAMB/findSegnalazioniUtente.php","POST","idUtente="+idUtente, function(responseText){
	  
	 
	  //alert(responseText);
	var json= JSON.parse(responseText);		
	var n = json.length;
	
	var li="";
	
	  
	  for(var i=0;i<n;i++)
	  {
		  
		  var lat = json[i]["lat"];
		  var lng= json[i]["lng"];
		  var tipo= json[i]["tipoA"];
		  var nome= json[i]["nomeAmministrazione"];
		  var nomeTratta= json[i]["nome"];//nomeTratta
		  
		  var id = json[i]["idBuca"];
	
		  if(lat!=null)
		  {
			  
			  var tipologia="Buca ("+lat+","+lng+")";
			  
			  
		 }else
		  {
			  
			  var tipologia="Tratta ("+nomeTratta+")";
		  }
		  
		  li+="<li><p style='width:150px; font-size:14px'>"+tipologia+"</p>&nbsp;&nbsp;&nbsp;" +nome+"</li>";
		  
	  }
	  
	  $("#lstSegnalazioni").html(li);
	  $("#lstSegnalazioni").listview("refresh");
	  
	  
  });
	
	
}

