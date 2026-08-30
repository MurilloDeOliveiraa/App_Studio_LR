DROP TABLE IF EXISTS Clientes;

CREATE TABLE Clientes(
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Nome TEXT NOT NULL,
    Celular TEXT,
    Email TEXT
);

INSERT INTO CLIENTES (Nome, Celular, Email)
VALUES ('Murillo Lopes', '41 988469090', 'murillo.lopes.oliveiraa@gmail.com');