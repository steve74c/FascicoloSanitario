const logger = require('../Logger');
const cfg = require('../config/config').config;
const sqlite3 = require('sqlite3').verbose();


const {crea }= require('./schemaDB');

TBL_FS = 'TBL_FS5'

//const db = new sqlite3.Database(cfg.home_db, (err) => {
const db = new sqlite3.Database('./dbFacicoloSanitario.db', (err) => {  
  
  if (err) {
    logger.error(err.message);
    //return console.error(err.message);
  }
  logger.info("Connected to the SQlite database.");
});





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
 

function create(db) {
    checkTable(db)
        .then( (result)=> {
                
                if (result == 0)
                  crea(db);
                else    
                    runQueriesAll(db) 
             } )
        .catch((error)=> logger.error(JSON.stringify(error)))


  };

 
module.exports = { create};
