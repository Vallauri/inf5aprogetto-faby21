<?php
	
	//VANNO PASSATI DATI DELL'UTENTE
	$N = $_POST['nome'];
	$C = $_POST['cognome'];
	$U = $_POST['user'];
	//Password non criptata ma vabbè, se uno si mette ad hackerare un sito così è una persona davvero triste
	$P = $_POST['pwd'];
	
	$con=new mysqli("localhost","fabianfilip","","my_fabianfilip");  	
	if($con->connect_errno) {
		die("Errore connessione db. ".$con->connect_errno);
	}
	
	//Controllo presenza utente
	
	$sql = "select * from L_utenti WHERE User='".$U."';";
	$rs = $con->query($sql);
	if(!$rs) {
		die("Errore nella query" . $con->errno);
	}
	
	if($rs->num_rows==0){
		
		$sql="INSERT INTO L_utenti(Nome,Cognome,User,Pwd)
		VALUES('".$N."','".$C."','".$U."','".$P."')";

		$rs = $con->query($sql);

		if(!$rs) {
			die("Errore nella query" . $con->errno);
		}
		else
		{
			echo("UTENTE INSERITO");
		}

	}else{	
		echo("utente già presente nel DB");
	}

?>