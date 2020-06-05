  
/*
	CONSIDERAZIONI:
	Noi dovremmo considerare l'asse z, quando il telefono si muove verso l'alto, 
    allora l'accelerazione é positiva, quando si muove verso il basso allora l'accelerazione é negativa
   
   */
   
	var marker2;
	var i=0;
    var watchID = null;

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    
    //Ora la Api sono disponibili, quindi posso fare operazioni
    function onDeviceReady() {
		

		
    }

    // Start watching the acceleration
    //
    function startWatch() {

        // Update acceleration every 3 seconds
        var options = { frequency: 150 };

        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
		
		
	
    }
	
	
	function start(){
		
	   var options = { frequency: 150 };

        watchID = navigator.accelerometer.watchAcceleration(onSuccessA, onErrorA, options);
		
		
		
	}
	
	  function onSuccessA(acceleration) {
        var element = document.getElementById('accelerometer');
        element.innerHTML = 'Acceleration X: ' + acceleration.x         + '<br />' +
                            'Acceleration Y: ' + acceleration.y         + '<br />' +
                            'Acceleration Z: ' + acceleration.z         + '<br />' +
                            'Timestamp: '      + acceleration.timestamp + '<br />';
							
														
    }

    // Stop watching the acceleration
    //
    function stopWatch() {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    }

    // onSuccess: Get a snapshot of the current acceleration
    //
    function onSuccess(acceleration) {
        var element = document.getElementById('accelerometer');
        element.innerHTML = 'Acceleration X: ' + acceleration.x         + '<br />' +
                            'Acceleration Y: ' + acceleration.y         + '<br />' +
                            'Acceleration Z: ' + acceleration.z         + '<br />' +
                            'Timestamp: '      + acceleration.timestamp + '<br />';
							
							
			buca(acceleration.z);				
							
							
    }

    // onError: Failed to get the acceleration
    //
    function onError() {
        alert('onError!');
    }
	
	
	function onErrorA() {
        alert('onError!');
    }
	
	//**************************************
	//RILEVAMENTO BUCA - Accelerometro
	//**************************************
	function buca(g)
	{
		
		//**************************************
		//controllare se é una buca - g > 10 
		//**************************************
		

		if(g > 11)
		{
			
				rilevaCoordinate();
		}
		
		
	
	}
	
	
	//SEZIONE RILEVAMENTO COORDINATE
//*****************************************************************************************************************************************************
	
	//prendere le coordinate
	
	function rilevaCoordinate()
	{
		//alert("geolocation activated!");
		navigator.geolocation.getCurrentPosition(onSuccessG, onErrorG,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
		 
			
	}
	
	var onSuccessG = function(position) {
		
       /* alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');*/
			  
			  
		 Salva(position.coords.latitude, position.coords.longitude, position.coords.speed); 
	    
    }


   
    function onErrorG(error) {
        /*alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');*/
			  
			  alert("Errore nella geolocalizzazione, attiva la geolocalizzazione oppure prova a riavviare il dispositivo!");
		   // $("#txtInfo").text("Errore nella geolocalizzazione, attiva la geolocalizzazione!");
			//$("#txtInfo").css("color","red");
		// gpsRetry({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
    }
	
	function gpsRetry(gpsOptions) {
		
		navigator.geolocation.getCurrentPosition(onSuccessG, onErrorG,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });	
	}
	
//**************************************************************************************************************************************************************************************************	
	
	
	
	//********************************
	//SALVA BUCA
	//********************************
	
	function Salva(latitudine, longitudine, velocita)
	{
			
		//alert(parseFloat(latitudine.toFixed(2)));
		
		
		
		var lat= parseFloat(latitudine.toFixed(3));                           
		var lng= parseFloat(longitudine.toFixed(3));
		
	    var user=window.localStorage.getItem("utente");
	    //alert("Id utente: "+user );
		

		send_request("http://fabianfilip.altervista.org/LAMB/nuovaBuca.php","POST","lat="+lat+"&lng="+lng+"&user="+user, esito);
		

		
		/*if(velocita != null)
		{
			
	
			
			
			
			
		}else
		{
			
			alert("Puoi rilevare le buche solo quando sei in movimento!");
			
		}*/
	
			
	}
	
	function esito(responseText)
	{
		
		
		
		//alert(responseText);
		if(responseText.includes("SUCCESSO"))
		{
			
			$("#txtInfo").text("Nuova Buca rilevata!");
			$("#txtInfo").css("color","#66ff66");
			
				caricaBuche();
			
			setTimeout(function(){ 	$("#txtInfo").text(""); }, 2000);
			
			
		
		}else if(responseText.includes("presente"))
		{
		    //$("#txtInfo").text("La buca è giá presente");
			//$("#txtInfo").css("color","white");
		}
	   else if(responseText.includes("Errore"))
		{
		   $("#txtInfo").text("Errore"+responseText);
		   $("#txtInfo").css("color","red");
		}
		
		
	
		
	}
	
	
function caricaBuche(){
	

	//Mandiamo richiesta
	send_request("http://fabianfilip.altervista.org/LAMB/RiceviBuche.php","POST","", function(response){
		
		
		
	var json= JSON.parse(response);		
	var n = json.length;
	
	
	//Aggiungiamo Marker	
	for(var i=0;i<n;i++)
	{		
		Latitude=parseFloat(json[i]["lat"]);
		Longitude=parseFloat(json[i]["lng"]);
			
		var latLong = new google.maps.LatLng(Latitude, Longitude);
	
		 marker2 = new google.maps.Marker({
			 
			position: latLong
			
		});
		
		
		google.maps.event.addListener(marker2, "click", function (event) {
			
				
					coordinate=this.position;
					var latitude = coordinate.lat();
					var longitude = coordinate.lng();
		
					alert(latitude +" " + longitude);
						
			});
			
			marker2.setMap(map);
	    }
		
		
	});
		
	
}
		
