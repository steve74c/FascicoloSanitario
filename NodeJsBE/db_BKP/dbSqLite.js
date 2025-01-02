const logger = require('../Logger');
const cfg = require('../config/config').config;
const sqlite3 = require('sqlite3').verbose();

const {create_schema }= require('./schemaDB');


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
    let sql = ` SELECT COUNT(*) cnt FROM sqlite_master WHERE type='table' AND upper(name)=upper('${TBL_FS}'); `
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


function runQueriesAll(db,script) {
    logger.info('--> runQueriesAll');

    db.all(script, [], (err, rows) => {
        rows.forEach(row => {
            logger.info(JSON.stringify(row));
        });
    });

}

function runQueriesElement(db) {
    db.all(`select * from  ${TBL_FS}  where file = ?`, "file1.pdf", (err, rows) => {
        rows.forEach(row => {
            logger.info(JSON.stringify(row));

        });
    });
}

function creaDB(db) {
/*
  //logger.info('--> creaDB bb' + create_schema.get("TBL_FS"));
  create_schema.forEach (function(alias_table_name, script_table) {
      logger.info('--> scrip: ' + script_table.get("TBL_FS"));
    })
    */
    let text = "";
    create_schema.forEach (function(value, key) {
      logger.info('--> Eseguo: ' + key);
      runQueriesAll(db,value);
      
    })    
    
 }    

function create(db) {
    checkTable(db)
        .then( (result)=> {
                
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
     WHERE type='table' AND upper(name)=upper('${TBL_FS}' `);

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
