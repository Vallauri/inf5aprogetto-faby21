<?php
	
	//VANNO PASATI DATI DELL'AMMINISTRAZIONE
	$nome = $_POST['nome'];
	$email = $_POST['email'];
	$citta = $_POST['citta'];
	$cap = $_POST['cap'];
	
	$con=new mysqli("localhost","fabianfilip","","my_fabianfilip");  	
	if($con->connect_errno) {
		die("Errore connessione db. ".$con->connect_errno);
	}

	$sql="INSERT INTO L_ammini(nome,email,citta,cap)
		VALUES('".$nome."','".$email."','".$citta."',".$cap.")";

	$rs = $con->query($sql);
	

	if(!$rs) {
		die("Errore nella query" . $con->errno);
	}
	else
	{
		echo("AMMINISTRAZIONE INSERITA");
	}

?>