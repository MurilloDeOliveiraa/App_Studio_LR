DROP TABLE IF EXISTS Categorias;
CREATE TABLE Categorias(
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Nome TEXT NOT NULL
);

INSERT INTO Categorias (Nome)
VALUES 
('Estética'),
('Nail Design'),
('Lash Design'),
('Sobrancelhas');