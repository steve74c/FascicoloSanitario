// routes.js
const express = require('express')
const router = express.Router()
const logger = require('./utils/Logger');

const ctrlShFile = require("./controller/controllerShellFile");
const ctrlPdfFile = require("./controller/controllerBase64");


const jTree = require("./utils/pathToJsonTree");
const sqlite3 = require('sqlite3').verbose();
const ctrlDB = require("./controller/controllerDB");


const cfg = require('./config');


const arr_uri = { 'HELLO'             : '/hello',
                  'LISTFILE'          : '/listfile',
                  'API-LIST_DIR_FILE' : '/api/listDirFile',
                  'API-LIST_DIR_TREE' : '/api/listDirTree',
                  'PDF-FILE_NAME_B64' : '/pdf/fileNameB64',
                  'SQL-LIST_DIR_TREE' : '/sql/listDirFile'
};

const db = new sqlite3.Database(cfg.PATH_DB);

router.get(arr_uri['HELLO'],  (request, response) => response.json({ message: "Hello from server!" }));
router.get(arr_uri['LISTFILE'], (request, response) => fnPath(request, response));

async function  get(req, res , uri, runfn) {
  //logger.log({ 'level': 'debug',  'message': uri});
  try {
      let ret =await runfn;
      return res.status(200).send(ret); 
    } catch (err) {
      //logger.log({ 'level': 'error',  'message': err.message});
      return res.status(500).send(err.message);
    } 
}

router.get(arr_uri['API-LIST_DIR_FILE'], async (req, res) => { get(req, res, arr_uri['API-LIST_DIR_FILE'], ctrlShFile.getListDirFile(cfg.HOME_PATH_DOC))});
router.get(arr_uri['API-LIST_DIR_TREE'], async (req, res) => { get(req, res, arr_uri['API-LIST_DIR_TREE'], ctrlShFile.getListDirTree(cfg.HOME_PATH_DOC))});


router.get(arr_uri['SQL-LIST_DIR_TREE'], async (req, res) => { 
    get(req, res, arr_uri['API-LIST_DIR_TREE'], ctrlDB.getFascicoloSanitario(db,'CLDFNC42P24G082R')
       .then( (ret) => {  
        //const tree = new jTree.Tree(ret,'CLDFNC42P24G082R'); 
        return JSON.stringify(new jTree.Tree(ret,'CLDFNC42P24G082R').getTree()[0]) }) 
      ) 
       }
);

router.post(arr_uri['PDF-FILE_NAME_B64'], async (req, res) => { 
  //logger.info(req.body.path);
  if (!req.body) 
      return res.status(400).send({ error: 'No body found in the request' });
  
  ctrlPdfFile.base64_encode(req, res)
             .then(base64String => {res.status(200).json({status: 'success', base64: base64String, });})
             .catch(error => {logger.error(error); });
});




module.exports = router
