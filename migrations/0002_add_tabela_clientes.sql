-- Migration number: 0002 	 2026-08-30T23:19:10.266Z
-- Migration number: 0001 	 2026-08-30T23:03:01.036Z
DROP TABLE IF EXISTS Clientes;

CREATE TABLE Clientes(
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Nome TEXT NOT NULL,
    Celular TEXT,
    Email TEXT
);

INSERT INTO CLIENTES (Nome, Celular, Email)
VALUES ('Murillo Lopes', '41 988469090', 'murillo.lopes.oliveiraa@gmail.com');