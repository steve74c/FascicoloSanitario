const logger = require("../Logger");
const cfg = require('../config/config').config;
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(cfg.home_db, (err) => {
  if (err) 
    logger.error(err.message);
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
exports.create = (db) => {
    checkTable(db).then( (res)=> (res==0) ? crea(db) : logger.info("Sono prendeti tebelle il db non puo essere creato!"))
                  .catch((err)=> logger.error(JSON.stringify(err)))
};

exports.getFascicoloSanitario = (db,fiscal_code='CLDFNC42P24G082R') =>{
  let sql = ` select * from TBL_FS where cod_fiscale = upper('${fiscal_code}'); `
  logger.info(sql);
  const that = db;
  return new Promise(function (resolve, reject) {
    let params=[];
    that.all(sql, params, function (error, result) {
      if (error) {
        logger.info(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}



