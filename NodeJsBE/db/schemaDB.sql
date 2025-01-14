CREATE TABLE TBL_FS (
    cod_fiscale   TEXT NOT NULL,
    file          TEXT NOT NULL,
    relative_path TEXT NOT NULL,
    up_path       TEXT NOT NULL,
    date          DATE,   
    disciplina    TEXT NOT NULL,
    luogo         TEXT NOT NULL
    id_DOTT       NUMBER
);


-------------------------------------------------------
-- https://portale.fnomceo.it/cerca-prof/index.php
-------------------------------------------------------

CREATE TABLE TBL_DOTT (
    ID              NUMBER NOT NULL,
    COGNOME         TEXT NOT NULL,
    NOME            TEXT NOT NULL,
    DATA_E_LUOGO    TEXT NOT NULL,
    ORDINE          TEXT NOT NULL,
    TELEFONO_1      TEXT NOT NULL
    TELEFONO_2      TEXT NOT NULL
);

