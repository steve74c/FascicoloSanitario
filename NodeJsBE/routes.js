// routes.js
const express = require('express')
const router = express.Router()
const logger = require("./logger");
const ctrlShFile = require("./controller/controllerShellFile");
var cfg = require('./config/config.json');


const arr_uri = { 'HELLO'             : '/hello',
                  'LISTFILE'          : '/listfile',
                  'API-LIST_DIR_FILE' : '/api/listDirFile',
                  'API-LIST_DIR_TREE' : '/api/listDirTree'
};

router.get(arr_uri['HELLO'],  (request, response) => response.json({ message: "Hello from server!" }));
router.get(arr_uri['LISTFILE'], (request, response) => fnPath(request, response));

async function  get(req, res , uri, runfn) {
  logger.log({ 'level': 'debug',  'message': uri});
  try {
      let listDir =runfn(cfg.home_path);
      return res.status(200).send(listDir); 
    } catch (err) {
      logger.log({ 'level': 'error',  'message': err.message});
      return res.status(500).send(err.message);
    } 
}

router.get(arr_uri['API-LIST_DIR_FILE'], async (req, res) => { get(req, res, arr_uri['API-LIST_DIR_FILE'], ctrlShFile.getListDirFile)});
router.get(arr_uri['API-LIST_DIR_TREE'], async (req, res) => { get(req, res, arr_uri['API-LIST_DIR_TREE'], ctrlShFile.getListDirTree)});


/*
router.get(arr_uri['API-LIST_DIR_FILE'], async (req, res) => {
    logger.log({ 'level': 'debug',  'message': arr_uri['API-LIST_DIR_FILE']});
    try {
        let listDir =ctrlShFile.getListDirFile(cfg.home_path);
        return res.status(200).send(listDir); 
      } catch (err) {
        logger.log({ 'level': 'error',  'message': err.message});
        return res.status(500).send(err.message);
      }

});

router.get(arr_uri['API-LIST_DIR_TREE'], async (req, res) => {
  logger.log({ 'level': 'debug',  'message': arr_uri['API-LIST_DIR_TREE']});
  try {
      let listDir =ctrlShFile.getListDirTree(cfg.home_path);
      return res.status(200).send(listDir); 
    } catch (err) {
      logger.log({ 'level': 'error',  'message': err.message});
      return res.status(500).send(err.message);
    }

});
*/

module.exports = router
