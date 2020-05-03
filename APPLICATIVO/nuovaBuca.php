<?php

	//VA PASSATO USER E COORDINATE
	$U = $_POST['user'];
	$C = $_POST['coor'];
	
	$con=new mysqli("localhost","fabianfilip","","my_fabianfilip");  	
	if($con->connect_errno) {
		die("Errore connessione db. ".$con->connect_errno);
	}

	$sql="INSERT INTO L_buche(Coordinate,Segnalata,idUtente)
		VALUES('".$C."',0,".$U.")";
			

	$rs = $con->query($sql);
	

	if(!$rs) {
		die("Errore nella query" . $con->errno);
	}
	else
	{
		echo("BUCA CREATA (NEL DB, MICA PER STRADA, QUESTA APP SERVE A SEGNALARE LE BUCHE NON A FARLE, CE NE SONO GIA ABBASTANZA)");
	}

?>