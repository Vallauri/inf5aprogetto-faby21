





CREATE TABLE IF NOT EXISTS Utente (


    id INT NOT NULL AUTO_INCREMENT,
	cognome NVARCHAR(50) NOT NULL,
	nome NVARCHAR(50) NOT NULL,
	username NVARCHAR(50) NOT NULL,
	pwd NVARCHAR(50) NOT NULL,
	email NVARCHAR(50) NOT NULL,
	numeroCarta NVARCHAR(50) NOT NULL,
	PRIMARY KEY(id)
	
   
);


CREATE TABLE IF NOT EXISTS Buca (


    id INT NOT NULL AUTO_INCREMENT,
	lat DECIMAL NOT NULL,
	lng DECIMAL NOT NULL,
	segnalata INT NOT NULL,
    idUtente INT NOT NULL,
	idTratta INT,
	PRIMARY KEY(id),
	FOREIGN KEY(idUtente) REFERENCES Utente(id)
	
   
);


CREATE TABLE IF NOT EXISTS Tratta (


    id INT NOT NULL AUTO_INCREMENT,
	nome NVARCHAR(50) NOT NULL,
	tipo NVARCHAR(50) NOT NULL,
	latP DECIMAL NOT NULL,
	latA DECIMAL NOT NULL,
	lngP DECIMAL NOT NULL,
	lngA DECIMAL NOT NULL,
	segnalata INT NOT NULL,
    idUtente INT NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(idUtente) REFERENCES Utente(id)
	
   
);


CREATE TABLE IF NOT EXISTS Segnalazione (


    id INT NOT NULL AUTO_INCREMENT,
	tipo NVARCHAR(50) NOT NULL,
	nomeAmministrazione NVARCHAR(50) NOT NULL,
	emailAmministrazione NVARCHAR(50) NOT NULL,
	idBuca INT,
	idTratta INT,
    idUtente INT NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(idUtente) REFERENCES Utente(id)
	
   
);


