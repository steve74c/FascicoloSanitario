//const sqlite3 = require('sqlite-wasm');
const logger = require('../Logger');


TBL_FS = 'TBL_FS'

const createTable_TBL_FS = `
        CREATE TABLE ${TBL_FS} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          cognome TEXT NOT NULL,
          eta INTEGER NOT NULL
        );
      `;


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
            



// Funzione per creare il database e la tabella (se non esiste)
function createDatabase(db) {
  

  //cnt = await queryCount(db,'sqlite_master',` WHERE type='table' AND upper(name)=upper('${TBL_FS}') `).then( (ret)=> {console.log("cnt aa = " +ret);} );
  //cnt = queryCount(db,'sqlite_master',` WHERE type='table' AND upper(name)=upper('${TBL_FS}') `).then( (ret)=> {console.log("ret aa = " +JSON.stringify(ret));} );
  /*
  cnt.then(
    (ret)=> {console.log("ret aa = " +JSON.stringify(ret))}
  )
  */
  //let stmt = sql.prepare("SELECT COUNT(*) count FROM raid WHERE raid1 > 0");
  //let row = stmt.get();
  //let usersin1 = row.count;
  
  /*
  const tableCheckQuery = ` SELECT COUNT(*) cnt FROM sqlite_master  WHERE type='table' AND upper(name)=upper('${TBL_FS}') `;
  db.all(tableCheckQuery, [], async (err, rows) => {
    if (err) {
        throw err;
    }
    console.log("query = " +tableCheckQuery);
    console.log("cnt = " +rows[0].cnt);
    /*
    rows.forEach((row) => {
        console.log("CNT = " + row.cnt);
    });

    
    if (rows[0].cnt==0) {
      console.log("La tabella " + tableName + " non esiste. Creazione in corso...");
      const createTableQuery = `
        CREATE TABLE ${tableName} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          cognome TEXT NOT NULL,
          eta INTEGER NOT NULL
        );
      `;
      console.log("query create = " +createTableQuery);
      try {
        await db.run(createTableQuery)

        db.run(createTableQuery, () => {
          db.each('SELECT count(*) AS exp FROM tbl_contact', (err, row) => {
            if (err) throw err
            console.log(`No.: ${row.exp}`)
          })
        })


        console.log("Tabella creata con successo.");
      }  catch (error) {
        console.log(error);
      } //finally {     db.close();    }
      
    } else {
      console.log("La tabella " + tableName + " esiste già.");
    }

});
*/  

}
/*
// Funzione per inserire dati nella tabella
 function insertData(db) {
  const insertDataQuery = `
    INSERT INTO '${tableName}' (nome, cognome, eta)
    VALUES 
    ('Mario', 'Rossi', 45),
    ('Luca', 'Bianchi', 34),
    ('Anna', 'Verdi', 29);
  `;
  db.exec(insertDataQuery);
  console.log('Dati inseriti con successo nella tabella.');
}
  */

// Funzione per visualizzare i dati nella tabella
async function viewData(db) {
  const selectQuery = `SELECT * FROM '${tableName}`;
  //const rows = await db.all(selectQuery);

/*
  db.all(selectQuery, null, async (err, rows) => {      
    if (err) {
      reject(err);
    } else {
      console.log(JSON.stringify(rows));
    }
});
*/
  console.log('Dati nella tabella ' + tableName + ':');
  //console.log(JSON.stringify(rows));
  /*
  rows.forEach((row) => {
    console.log(`ID: ${row.id}, Nome: ${row.nome}, Cognome: ${row.cognome}, Età: ${row.eta}`);
  });
  */
}

// Esporta le funzioni
module.exports = { createDatabase };
