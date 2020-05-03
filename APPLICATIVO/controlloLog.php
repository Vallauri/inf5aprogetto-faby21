<?php

	//GLI VA PASSATO USER E PASSWORD
	$U = $_POST['user'];
	$P = $_POST['pwd'];
	
	$con=new mysqli("localhost","fabianfilip","","my_fabianfilip");  	
	if($con->connect_errno) {
		die("Errore connessione db. ".$con->connect_errno);
	}

	$sql = "select * from L_utenti
			where user='".$U."' && pwd='".$P."'";
			

	$rs = $con->query($sql);
	

	if(!$rs) {
		die("Errore nella query" . $con->errno);
	}
	
	if($rs->num_rows==0){
		
		echo("CREDENZIALI DI ACCESSO ERRATE");
	}
	else
	{
		echo("ACCESSO ESEGUITO");
	}

?>