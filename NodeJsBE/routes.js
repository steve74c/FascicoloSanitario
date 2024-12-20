// routes.js
const express = require('express')
const router = express.Router()
const logger = require("./logger");
const ctrlShFile = require("./controller/controllerShellFile");
const ctrlPdfFile = require("./controller/controllerBase64");
var cfg = require('./config/config.json');


const arr_uri = { 'HELLO'             : '/hello',
                  'LISTFILE'          : '/listfile',
                  'API-LIST_DIR_FILE' : '/api/listDirFile',
                  'API-LIST_DIR_TREE' : '/api/listDirTree',
                  'PDF-FILE_NAME_B64' : '/pdf/fileNameB64'
};

router.get(arr_uri['HELLO'],  (request, response) => response.json({ message: "Hello from server!" }));
router.get(arr_uri['LISTFILE'], (request, response) => fnPath(request, response));

async function  get(req, res , uri, runfn) {
  logger.log({ 'level': 'debug',  'message': uri});
  try {
      let ret =runfn;
      return res.status(200).send(ret); 
    } catch (err) {
      logger.log({ 'level': 'error',  'message': err.message});
      return res.status(500).send(err.message);
    } 
}

router.get(arr_uri['API-LIST_DIR_FILE'], async (req, res) => { get(req, res, arr_uri['API-LIST_DIR_FILE'], ctrlShFile.getListDirFile(cfg.home_path))});
router.get(arr_uri['API-LIST_DIR_TREE'], async (req, res) => { get(req, res, arr_uri['API-LIST_DIR_TREE'], ctrlShFile.getListDirTree(cfg.home_path))});

//router.get(arr_uri['PDF-FILE_NAME_B64'], async (req, res) => { get(req, res, arr_uri['PDF-FILE_NAME_B64'], ctrlPdfFile.base64_encode)});

router.post('/pdf/fileNameB64', async (req, res) => { 
  if (!req.body) {
    return res.status(400).send({ error: 'No body found in the request' });
  }


  system_path = req.body.path;
  if (cfg.sistema="WINDOWS") {
          system_path =  req.body.path.replace(new RegExp('/','g'),"\\");
  }   
  ctrlPdfFile.convertPdfToBase64(system_path).then(base64String => {
      const json = JSON.stringify({base64: base64String});
      return res.status(200).send(json); 
  })
  .catch(error => {
      console.error('Errore:', error);
  });


  });



module.exports = router
