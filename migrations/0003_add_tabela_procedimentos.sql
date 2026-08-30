DROP TABLE IF EXISTS Procedimentos;
CREATE TABLE Procedimentos(
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Nome TEXT NOT NULL,
    CategoriaId INTEGER,
    DescricaoCurta TEXT,
    DuracaoEmMinutos INTEGER,
    FOREIGN KEY (CategoriaId) REFERENCES Categorias(Id)
);