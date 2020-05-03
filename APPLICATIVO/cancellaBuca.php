<?php

	//VA PASSATO USER E ID BUCA
	$U = $_POST['user'];
	$B = $_POST['idB'];
	
	$con=new mysqli("localhost","fabianfilip","","my_fabianfilip");  	
	if($con->connect_errno) {
		die("Errore connessione db. ".$con->connect_errno);
	}

	$sql="DELETE FROM L_buche WHERE idBuca=".$B." && idUtente=".$U.";"
			

	$rs = $con->query($sql);
	

	if(!$rs) {
		die("Errore nella query" . $con->errno);
	}
	else
	{
		echo("BUCA RIMOSSA (DAL DB)");
	}

?>