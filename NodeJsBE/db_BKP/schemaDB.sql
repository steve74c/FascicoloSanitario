CREATE TABLE ${TBL_FS} (
    cod_fiscale   TEXT NOT NULL,
    file          TEXT NOT NULL,
    relative_path TEXT NOT NULL,
    up_path       TEXT NOT NULL,
    date          DATE,   
    disciplina    TEXT NOT NULL,
    luogo         TEXT NOT NULL
);

insert into ${TBL_FS} (cod_fiscale, file, relative_path, up_path,date,disciplina,luogo)
values ('CLDFNC42P24G082R','file1.pdf', '/anno/2024/', '2024',  DATE('now'),'Cardiologia','Ospedate Fratebenefratelli'),
        ('CLDFNC42P24G082R','file2.pdf', '/anno/2024/', '2024',  DATE('now'),'Cardiologia','Ospedate Fratebenefratelli'),
        ('CLDFNC42P24G082R','file3.pdf', '/anno/2024/', '2024',  DATE('now'),'Cardiologia','Ospedate Fratebenefratelli');



  