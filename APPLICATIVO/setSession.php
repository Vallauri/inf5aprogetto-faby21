<?php

	$U = $_POST['user'];
	
	session_start();
	
	$_SESSION["user"]=$U;

?>