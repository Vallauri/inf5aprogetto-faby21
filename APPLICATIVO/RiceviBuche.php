<?php
// Imposta Connessione DB
	$con=new mysqli("localhost","fabianfilip","","my_fabianfilip");  		
	if($con->connect_errno) {
		die("Errore connessione db. ".$con->connect_errno);
	}
	
	//Query
	$sql = "select * from L_buche";
	//Esecuzione e salvataggio in Record Set
	$rs = $con->query($sql);
	
	//Controllo risultato
	if(!$rs) {
		die("Errore nella query" . $con->errno);
	}
	
	//Contollo presenza dati
	if($rs->num_rows==0){
		
		echo("Nessuna buca presente nel DB");
		
	}else{
		
		//Vettore
		$vect=[];
		//Rende Record Set vettore associativo
		
		while($record=$rs->fetch_assoc()){
			array_push($vect,$record);	
		}
		
		// Invia il JSon in Risposta
		echo(json_encode($vect));
	}
	
    // Chiude Connessione DB
	$con->close();
?>