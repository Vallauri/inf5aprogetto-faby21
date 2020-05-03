<?php
//Avvio sessione
	session_start();
	
	//controllo se nella sessione c'erano i valori
	if(isset($_SESSION["user"]))
	{
		echo("Session OK");
		
	}else{
		
		echo("NO Session");
	}

?>