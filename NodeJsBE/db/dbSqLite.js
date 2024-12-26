const logger = require('../Logger');
const cfg = require('../config/config');
const sqlite3 = require('sqlite3').verbose();

tableName_TBL_FS = 'TBL_FS3'
const create_DB_TBL_FS = `
    CREATE TABLE ${tableName_TBL_FS} (
        cod_fiscale   TEXT NOT NULL,
        file          TEXT NOT NULL,
        relative_path TEXT NOT NULL,
        up_path       TEXT NOT NULL,
        date          DATE,   
        disciplina    TEXT NOT NULL,
        luogo         TEXT NOT NULL
    );

    insert into ${tableName_TBL_FS} (cod_fiscale, file, relative_path, up_path,date,disciplina,luogo)
    values ('CLDFNC42P24G082R','file1.pdf', '/anno/2024/', '2024',  DATE('now'),'Cardiologia','Ospedate Fratebenefratelli'),
           ('CLDFNC42P24G082R','file2.pdf', '/anno/2024/', '2024',  DATE('now'),'Cardiologia','Ospedate Fratebenefratelli'),
           ('CLDFNC42P24G082R','file3.pdf', '/anno/2024/', '2024',  DATE('now'),'Cardiologia','Ospedate Fratebenefratelli')
  `;


const create_DB_Table = [];
create_DB_Table[tableName_TBL_FS] = tableName_TBL_FS;





//const db = new sqlite3.Database(cfg.home_db, (err) => {
const db = new sqlite3.Database('./dbFacicoloSanitario.db', (err) => {  
  
  if (err) {
    logger.error(err.message);
    //return console.error(err.message);
  }
  logger.info("Connected to the SQlite database.");
});



db.query = function (sql, params = []) {
  const that = this;
  return new Promise(function (resolve, reject) {
    that.all(sql, params, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};


function checkTable(db) {
    let sql = ` SELECT COUNT(*) cnt FROM sqlite_master WHERE type='table' AND upper(name)=upper('${tableName_TBL_FS}'); `
    logger.info(sql);
    const that = db;
    return new Promise(function (resolve, reject) {
      let params=[];
      that.all(sql, params, function (error, result) {
        if (error) {
            logger.info(error);
          reject(error);
        } else {
          resolve(result[0].cnt);
        }
      });
    });
}


function runQueriesAll(db,tbl) {
    logger.info('--> runQueriesAll');

    db.all(`select * from  ${tbl} `, [], (err, rows) => {
        rows.forEach(row => {
            logger.info(JSON.stringify(row));
        });
    });

}

function runQueriesElement(db) {
    db.all(`select * from  ${tableName_TBL_FS}  where file = ?`, "file1.pdf", (err, rows) => {
        rows.forEach(row => {
            logger.info(JSON.stringify(row));

        });
    });
}

function creaDB(db) {
    logger.info('--> creaDB');
    const allTable = create_DB_Table.keys();
    logger.info('--> creaDB' + JSON.stringify(create_DB_Table));
    logger.info('--> creaDB' + JSON.stringify(allTable));
    allTable.forEach(tbl => {    
        logger.info('--> tabella : ' + tbl);    
        db.exec(create_DB_Table[tbl], (err,tbl)  => { logger.info(JSON.stringify(err)); runQueriesAll(db,tbl)   });
    })
 }    

function create(db) {
    checkTable(db)
        .then( (result)=> {logger.info(JSON.stringify(result) );  
                logger.info(JSON.stringify(result));
                logger.info(JSON.stringify(result));
                if (result == 0)
                    creaDB(db);
                else    
                    runQueriesAll(db) 
             } )
        .catch((error)=> logger.error(JSON.stringify(error)))


  };

  /*
// Funzione per creare il database e la tabella (se non esiste)
function createDatabase() {
    
  let stmt = db.prepare( `
     SELECT COUNT(*) cnt
     FROM sqlite_master 
     WHERE type='table' AND upper(name)=upper('${tableName_TBL_FS}' `);

     logger.info(stmt);
  stmt.run((err, rows) => {
    if (err) {
        logger.info("row.count :" +JSON.stringify(err));
        throw err;
    }

    if (!rows) {
        logger.info("row.count rows1");
        res.json([])
    }

    if (rows) {
        logger.info("row.count rows2");
        res.json(rows)
    }
})
  //logger.info("row.count :" +row.cnt);

}
*/
/*
async function queryCount(db,table, where) {
    const tableCheckQuery = ` SELECT COUNT(*) cnt FROM ${table}  ${where} `;
    console.log("query = " +tableCheckQuery);
      await db.all(tableCheckQuery, [], async (err, rows) => {
  
        if (err) {
          reject(err);
        } else {
          console.log("cnt = " +rows[0].cnt);
          resolve(rows[0].cnt);
        }
      })
  }
    


async function getIdByName(table, name) {
  // assemble sql statement
  const sql = `
      SELECT id
      FROM ?
      WHERE name = ?;
    `;



  return await db.query(sql, [table, name]);
}
  
// need async to call
(async () => {
  const result = await getIdByName('books', 'my_name');
  console.log(result);
})();

*/

//module.exports = { createDatabase ,create};
module.exports = { create};
