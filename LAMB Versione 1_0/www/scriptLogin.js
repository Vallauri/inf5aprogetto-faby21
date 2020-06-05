$( document ).on( "pageinit", "#index", function( event ) {
	
	
	
	$("#AccountZone").hide();
	//if (app.isOnline()) {
	console.log("internet disponibile");
	$("#btnIndietro4").hide();
	$("#btnLogin").on("click",controlloLog);
	$("#btnSalva").on("click",RegistrazioneUser);
	$("#btnLogout").on("click",logout);
	$("#btnSalvaM").on("click",modifica);
	$("#btnAccount").on("click",function(){
		$( "#mypanel" ).panel( "open" );
	});
	$("#btnModifica").on("click",function(){
		$("#btnIndietro4").show();
		$("#modificaDiv").show();
		$("#btnLogout").hide();
		$("#btnModifica").hide();
			$("#titoloA").text("Modifica Credenziali");
					$("#btnStatistiche").hide();
		
		send_request("http://fabianfilip.altervista.org/LAMB/getDatiUser.php","POST","ID="+ window.localStorage.getItem("utente"),caricaFModifica);
		
				$("#btnIndietro4").on("click", function(){
			
						
				$("#modificaDiv").hide();
				$("#btnIndietro4").hide();
				$("#btnLogout").show();
				$("#btnModifica").show();
				$("#titoloA").text("Area Account");
						$("#btnStatistiche").show();
			
			
		});
	});
	
	
	
	controllaSessione();
	
	//}
	/*else {
		navigator.notification.alert("Connessione Internet non disponibile!", function(){},"Informazione");
	}*/
	
});


//SET SESSIONE
function settaSessione(responseText)
{
	//Non è proprio una sessione ma più un local storage
	var jsonSq= JSON.parse(responseText);
	
    window.localStorage.setItem("utente", jsonSq[0]["id"]);
	//sessionStorage.setItem("utente",jsonSq[0]["id"]);
	controllaSessione();
	
}

//Controllo SESSIONE
function controllaSessione()
{
	if(!window.localStorage.getItem("utente")) {
		console.log("sessione non stabilita");
		$("#menu").hide();
		$("#infoREG").text("Accedi per iniziare a rilevare le tue buche");
	}else{
		console.log("sessione stabilita");
		$("#menu").show();
		$("#AccountZone").show();
		$("#infoREG").text("");
		areaAccount();
		
	}
}


//LOGIN
function controlloLog()
{
	var usr=$("#txtUser").val();
	var pss=$("#txtPwd").val();

	send_request("http://fabianfilip.altervista.org/LAMB/controlloLog.php","POST","user="+usr+"&pwd="+pss,responsoL);	
}


//REGISTRAZIONE
function RegistrazioneUser()
{
	var cogn=$("#txtCogR").val();
	var nome=$("#txtNomeR").val();
	var mail=$("#txtEmailR").val();
	var ci=$("#txtCIR").val();
	var usr=$("#txtUserR").val();
	var pss=$("#txtPwdR").val();
	
	if(cogn!="" && nome!=""&& mail!="" && ci!=""&& usr!=""&& pss!="")
	{
		send_request("http://fabianfilip.altervista.org/LAMB/registrazioneUser.php","POST","user="+usr+"&pwd="+pss+"&nome="+nome+"&cognome="+cogn+"&email="+mail+"&codiceC="+ci,responsoR);	
	}
	else
	{
		$("#txtErroreR").text("Compila tutti i dati per la registrazione");
	}

}

//LOGOUT
function logout()
{
	window.localStorage.clear();
	//sessionStorage.clear();
	window.location="index.html";
	controllaSessione();
	$("#pagAccount").hide();

}

//CREA E VISUALIZZA AREA ACCOUNT
function areaAccount()
{
	$("#pagAccount").show();
	$("#titoloA").text("Area Account");
	$("#formLogin").hide();
	$("#formRegister").hide();
}

//MODIFICA ACCOUNT
function modifica()
{
	var mail=$("#txtEmailM").val();
	var id = window.localStorage.getItem("utente");
	var pss=$("#txtPwdM").val();
	
	if(mail!="" && pss!="")
	{
		send_request("http://fabianfilip.altervista.org/LAMB/modificaDatiUser.php","POST","id="+id+"&pass="+pss+"&email="+mail);	
		$("#MPD").text("Modifica credenziali di accesso");
		$("#modificaDiv").hide();
		$("#btnLogout").show();
		$("#btnModifica").show();


		
		$("#txtEmailR").val('');
		$("#txtPwdR").val('');
		
		
	}
	else
	{
		$("#MPD").text("I dati non possono essere lasciati vuoti!");
	}

}

function caricaFModifica(responseText){
	var jsonSq= JSON.parse(responseText);
	$("#txtEmailM").val(jsonSq[0]["email"]);
	$("#txtPwdM").val(jsonSq[0]["pwd"]);
	
	
}
	
//=============================================================================================================

function responsoL(responseText)
{
	if(responseText=="ACCESSO ESEGUITO")
	{
		var usr=$("#txtUser").val();
		send_request("http://fabianfilip.altervista.org/LAMB/getID.php","POST","user="+usr,settaSessione);
		$("#txtErrore").text(responseText);
		
		$("#txtUser").val('');
	    $("#txtPwd").val('');
		$( "#mypanel" ).panel( "toggle" );
		
		areaAccount();
		
	}else
	{
		$("#txtErrore").text(responseText);
	}
}
	
function responsoR(responseText)
{
	if(responseText=="ACCESSO ESEGUITO")
	{
		var usr=$("#txtUserR").val();
		send_request("http://fabianfilip.altervista.org/LAMB/getID.php","POST","user="+usr,settaSessione);
		$("#txtErroreR").text(responseText);
		$("#txtCogR").val('');
		$("#txtNomeR").val('');
		$("#txtEmailR").val('');
		$("#txtCIR").val('');
		$("#txtUserR").val('');
		$("#txtPwdR").val('');
		
		$( "#mypanel" ).panel( "toggle" );
		areaAccount();

	}else
	{
		$("#txtErroreR").text(responseText);
	}
}
		