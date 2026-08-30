-- Migration number: 0001 	 2026-08-30T23:03:01.036Z
DROP TABLE IF EXISTS Procedimentos;
CREATE TABLE Procedimentos(
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Nome TEXT NOT NULL,
    DescricaoCurta TEXT,
    DuracaoEmMinutos INTEGER
);