const ctrlFile = require('./controller/controllerShellFile');
const ctrlBs64 = require('./controller/controllerBase64');
const ctrlDB = require("./controller/controllerDB");


const logger = require("./Logger");
const { create, createDatabase, insertData, viewData } = require('./db/dbSqLite');
const { crea, popola } = require('./db/schemaDB');

var cfg = require('./config/config');
// logger.info("TEST cfg.home_path_doc = " +JSON.stringify(cfg));
const sqlite3 = require('sqlite3').verbose();
const RELATIVE_PATH_FILE = '\\Anno\\2022\\2022-02-08-DER-FSA-Visita dermatologica.pdf'



/*
function test01() {
  tree = ctrlFile.getListDirFile(cfg.home_path_doc_doc);
  ctrlFile.printtDirFile(tree)
}
*/

function test02() {
  patfile = cfg.home_path_doc + RELATIVE_PATH_FILE
  strbs64 = ctrlBs64.getFileBase64(patfile);
  console.log(strbs64);
}

function test03() {
  console.log(cfg.home_path_doc);
}

function test04() {
  logger.log({                  level: 'error',  message: 'Public error to share'});
  logger.log({  private: true,  level: 'error',  message: 'This is super secret - hide it.'});
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Seleziona test?  ' +
                  '\n 0) exit' +
                  '\n 1) Test 01: Test DB' +
                  '\n 2) Test 02: converte file (in questo caso pdf) in base64 ' +
                  '\n 3) Test 03: read config file  ' +
                  '\n 4) Test 04: Log  ' +                  
                  ' \n -> Selezione : ', test => {
  console.log(`\nTest selezionato ${test}!`);
  readline.close();

  switch(test) {
    case '0':
      process.exitCode = 0;
      break;
    case '1':
      const db = new sqlite3.Database('./db/dbFacicoloSanitario.db');
      try {
         //create(db);
         logger.info(" getFascicoloSanitario ");
         //popola(db,'CLDFNC42P24G082R');
         ctrlDB.getFascicoloSanitario(db,'CLDFNC42P24G082R').then( (ret) => {
              logger.log(JSON.stringify(ret))
            }    )
         logger.info(" getFascicoloSanitario fine");
         //insertData(db);
         //viewData(db);
      } catch (error) {
        logger.error('Errore durante la gestione del database:', error);

      } /*finally {
        db.close((err) => {
          if (err) {
            logger.error('Errore durante la chiusura del database:', err);
          } else {
            logger.log('Database chiuso.');
          }
        });
      }   */   
      break;

    case '2':
      test02();
      break;
    case '3':
      test03();
      break;
    case '4':
      test04();
      break;
    default:
      console.log(`Test non presente!`);
  }
});



