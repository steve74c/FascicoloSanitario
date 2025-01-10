// Require or import the dependencies
const fs = require('fs');
const logger = require('../Logger');
const ctrlShFile = require("../controller/controllerShellFile");
const cfg = require('../config');

const {Nodes, buildTree} = require('../utils/pathToJsonTree');


function readList(db,list,user_cf,relativePath,lastPath) {
  const data = [];

  if (list)
    list.forEach( 
        (element) => {
          if (element.type ==  "directory") {
            readList(db,element.children,user_cf,relativePath+ '/' +element.name,element.name);
          }
          else {
            if (element.type =  "file") {

              const disciplina = element.name.substring(11,14);
              const luogo =  element.name.substring(15,18);
              const sqlStmnt = "insert into TBL_FS  values ('" + user_cf + "','" + element.name + "', '" + relativePath + "', '" + lastPath + "',   DATE('now'),'" + disciplina + "','" +luogo+ "')"
              logger.info(sqlStmnt);
              db.run(sqlStmnt, [], function (error, result) {
                if (error) {
                  logger.error(" esito:" +error + " \n query =" + sqlStmnt);
                } else {
                  logger.info(" esito :" +'OK');
                }
              });
            }
            else {
              logger.warning('Type non considerato  '+element.type + " per nome " +element.name);
            }  
          }
        }
    );
}

function popola(db,user_cf) {
  db.run('BEGIN TRANSACTION;');
  const sqlStmnt = "delete from TBL_FS where cod_fiscale = ? ;"
  db.run(sqlStmnt, [user_cf], function (error, result) {
    if (error) {
      db.run('ROLLBACK;');
      logger.error(" esito:" +error + " \n query =" + sqlStmnt);
    } else {
      list  = ctrlShFile.getListDirFile(cfg.HOME_PATH_DOC+ '/' + user_cf)
      if (list) {
        readList (db,list.children,user_cf,user_cf,user_cf);
        db.run('COMMIT;');
      }
      else 
        logger.info(" Nessun file trovato \n   -> path:" +cfg.HOME_PATH_DOC+ '/' + user_cf +"\n   -> list:" +JSON.stringify(list) );
    }
  });
  

}

function crea(db) {
  const dataSql = fs.readFileSync('./db/schemaDB.sql');
  const dataArr = dataSql.toString().split(';');
  
  // db.serialize ensures that your queries are one after the other depending on which one came first in your `dataArr`
  db.serialize(() => {
    // db.run runs your SQL query against the DB
    db.run('PRAGMA foreign_keys=OFF;');
    dataArr.forEach((query) => {
       query= query.trim()+ ';';
       if(query!=";") {
        params=[];
        db.run(query, params, function (error, result) {
          if (error) {
            logger.error(" esito:" +error + " \n query =" + query);
          } else {
            logger.info(" esito :" +'OK');
          }
        });
      }
    });
    db.run('COMMIT;');
  });
}

module.exports = { crea,popola };

