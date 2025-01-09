const ctrlFile = require('./controller/controllerShellFile');
const ctrlBs64 = require('./controller/controllerBase64');
const ctrlDB = require("./controller/controllerDB");
const jTree = require("./utils/pathToJsonTree");


const logger = require("./Logger");
const { create, createDatabase, insertData, viewData } = require('./db/dbSqLite');
const { crea, popola } = require('./db/schemaDB');

var cfg = require('./config');
// logger.info("TEST cfg.HOME_PATH_DOC = " +JSON.stringify(cfg));
const sqlite3 = require('sqlite3').verbose();
const RELATIVE_PATH_FILE = '\\Anno\\2022\\2022-02-08-DER-FSA-Visita dermatologica.pdf'



/*
function test01() {
  tree = ctrlFile.getListDirFile(cfg.HOME_PATH_DOC);
  ctrlFile.printtDirFile(tree)
}
*/

function test02() {
  patfile = cfg.HOME_PATH_DOC + RELATIVE_PATH_FILE
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


const menu = [
  {'id':'0', 'descr' : 'exit'},
  {'id':'1', 'descr' : 'Crea DB'},
  {'id':'2', 'descr' : 'Popola DB'},
  {'id':'3', 'descr' : 'Path to Tree'},
  {'id':'4', 'descr' : 'Test 02: converte file (in questo caso pdf) in base64'},
  {'id':'5', 'descr' : 'Test 03: read config file'},
  {'id':'6', 'descr' : 'Test 04: Log'},
]
  

readline.question('Seleziona test?  ' +
                  '\n ' + menu[0].id + ') ' +  menu[0].descr +
                  '\n ' + menu[1].id + ') ' +  menu[1].descr +
                  '\n ' + menu[2].id + ') ' +  menu[2].descr +
                  '\n ' + menu[3].id + ') ' +  menu[3].descr +
                  '\n ' + menu[4].id + ') ' +  menu[4].descr +
                  '\n ' + menu[5].id + ') ' +  menu[5].descr +
                  '\n ' + menu[6].id + ') ' +  menu[6].descr +
                  ' \n -> Selezione : ', test => {
  console.log(`\nTest selezionato ${test}!`);
  readline.close();

  const db = new sqlite3.Database('./db/dbFacicoloSanitario.db');
  switch(test) {
    case  menu[0].id:  // 'exit'
      process.exitCode = 0;
      break;
    case  menu[1].id: // 'Crea DB'
      try { create(db); } catch (error) { logger.error('Errore durante la gestione del database:', error); } 
      break;
   case  menu[2].id: // 'Popola DB'
      try { popola(db,'CLDFNC42P24G082R'); } catch (error) {logger.error('Errore durante la gestione del database:', error); } 
      break;
   case  menu[6].id: 
      str = "C:\\Project\\MyProject\\DOC\CLDFNC42P24G082R\\anno\\2024\\2024-06-test";      
      str = str.replace(new RegExp('/\\/\\','g'),"\\");
      logger.log(str)
   case  menu[3].id: 
      try {
         ctrlDB.getFascicoloSanitario(db,'CLDFNC42P24G082R').then( (ret) => {
              logger.log(JSON.stringify(ret))
              tree = new jTree.Tree (ret,'CLDFNC42P24G082R');
            }    )
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

    case  menu[4].id:
      test02();
      break;
    case  menu[5].id:
      test03();
      break;
    case  menu[6].id:
      test04();
      break;
    default:
      console.log(`Test non presente!`);
  }
});



