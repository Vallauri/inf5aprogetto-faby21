<?php

	//VA PASSATO ID BUCA
	$ID = $_POST['idB'];

	
	$con=new mysqli("localhost","fabianfilip","","my_fabianfilip");  	
	if($con->connect_errno) {
		die("Errore connessione db. ".$con->connect_errno);
	}

	$sql = "UPDATE L.buche
			SET Segnalata = 1
			WHERE IdBuca = ".$ID.";";
			

	$rs = $con->query($sql);
	

	if(!$rs) {
		die("Errore nella query" . $con->errno);
	}
	else
	{
		echo("BUCA SEGNALATA");
	}

?>