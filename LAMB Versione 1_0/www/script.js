var Latitude = undefined;
var Longitude = undefined;
var marker;
var mappa;


//onload di index.html

$( document ).on( "pageinit", "#index", function( event ) {
	
	$("#formRegister").hide();
	$("#pagAccount").hide();
	$("#modificaDiv").hide();
	

	//Gestione scritta


	var frasi=["Mediamente i morti per incidenti stradali sono circa 10 volte più numerosi dei morti per infortuni sul lavoro","Le condizioni del manto stradale incidono molto sulla sicurezza della circolazione, limitando la tenuta dell'auto e l'efficiacia della frenata.","Segnalare una buca è un piccolo passo verso un mondo più sicuro.","Le strade italiane, soprattutto in alcune zone, si trovano in una situazione davvero disastrosa e sono pericolose per chi le percorre. ","Ogni anno 3500 persone perdono la vita sulle nostre strade, ciascuno di noi puó fare la propria parte!","Ogni anno 3500 persone perdono la vita sulle nostre strade, ciascuno di noi puó fare la propria parte!"];


$("#titolo").text(frasi[Math.floor(Math.random() * 6) ]);

	
	//Nascondiamo la form di Login
	$("#btnRegister").on("click",function(){
		
		$("#formLogin").hide();
		$("#titoloA").text("Register");
		$("#formRegister").show();

	});
	
	//Nascondiamo la form di Register
	$("#btnIndietro").on("click",function(){
		
		$("#formLogin").show();
		$("#titoloA").text("Sign In");
		$("#formRegister").hide();

	});
	
		 
	
	//Iniziare rivelazione
	
	$("#inizia").on("click", function(){
		
		
		
	  navigator.geolocation.getCurrentPosition (onMapSuccess, onMapError, { enableHighAccuracy: true });
	
	});
	
	
	$("#interrompi").on("click", function(){
		
	
		/*Inizializzazione MAPPA*/
		if(mappa==null)
		{
		
			var mapOptions = {
				center: new google.maps.LatLng(45, 10),
				zoom: 5,
				mapTypeId: google.maps.MapTypeId.HYBRID
			};
			
			
			mappa = new google.maps.Map
					(document.getElementById("map"), mapOptions);
		}
			
			leggiBuche();
		
	});
	
  
});




// Success callback for get geo coordinates

var onMapSuccess = function (position) {



	if(mappa==null)
	{
		var mapOptions = {
			center: new google.maps.LatLng(45, 10),
			zoom: 5,
			mapTypeId: google.maps.MapTypeId.HYBRID
		};
		
		
		mappa = new google.maps.Map
				(document.getElementById("map"), mapOptions);
	}



	Latitude = position.coords.latitude;
	Longitude = position.coords.longitude;
	
	
	var latLong = new google.maps.LatLng(Latitude, Longitude);
	
	 marker = new google.maps.Marker({
		position: latLong,
		 icon: {
				  path: google.maps.SymbolPath.CIRCLE,
				  scale: 9,
				  fillColor: '#007bff',
				  fillOpacity: 0.7,
				   strokeWeight: 2
				 
				}
	});


	getMap(Latitude, Longitude);
	
	

}
	
// Get map by using coordinates

function getMap(latitude, longitude) {


  var latlng = new google.maps.LatLng(latitude,  longitude);
    marker.setPosition(latlng);


	marker.setMap(mappa);
	mappa.setZoom(18);
	mappa.setCenter(marker.getPosition());
	
				
	watchMapPosition();
							
  
}


// Success callback for watching your changing position

var onMapWatchSuccess = function (position) {

    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;
	

    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

        Latitude = updatedLatitude;
        Longitude = updatedLongitude;
	
        getMap(updatedLatitude, updatedLongitude);
    }
	
	
}


// Error callback

function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

// Watch your changing position

function watchMapPosition() {
	


    return navigator.geolocation.watchPosition(onMapWatchSuccess, onMapError, { enableHighAccuracy: true });

}


//******************************************************
//Chiamiamo il DB per leggere tutte le buche
//******************************************************

function leggiBuche()
{
	
	
	//Mandiamo richiesta
	send_request("http://fabianfilip.altervista.org/LAMB/RiceviBuche.php","POST","", caricaMarker);
		
	
}

function caricaMarker(response)
{
	
	
	//alert(response);
	//Ottenere dati da JSON
	var json= JSON.parse(response);		
	var n = json.length;
	
	
	//Aggiungiamo Marker	
	for(var i=0;i<n;i++)
	{		
		Latitude=parseFloat(json[i]["lat"]);
		Longitude=parseFloat(json[i]["lng"]);
		
		
		
			
	var latLong = new google.maps.LatLng(Latitude, Longitude);
	
	if(json[i]["idUtente"]==window.localStorage.getItem("utente"))
	{
		
			 marker2 = new google.maps.Marker({
			 	animation: google.maps.Animation.DROP,
			position: latLong,
			icon: {
				url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"  
				}
			
		});
		
		
	}else{
		
		
		 marker2 = new google.maps.Marker({
			position: latLong,
			animation: google.maps.Animation.DROP,
			icon: {
				url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"  
				}
			
		});
	}
		
		
		google.maps.event.addListener(marker2, "click", function (event) {
			
			
			
			
					coordinate=this.position;
					var latitude = coordinate.lat();
					var longitude = coordinate.lng();
		
					alert(latitude +" " + longitude);
						
			});
			
			marker2.setMap(mappa);
	}
		
	
	
	
	mappa.setZoom(6);
	mappa.setCenter(marker2.getPosition());
	
	
}


