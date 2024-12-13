// routes.js
const express = require('express')
const router = express.Router()
const logger = require("./logger");
const ctrlShFile = require("./controller/controllerShellFile");
var cfg = require('./config/config.json');




router.get("/hello",  (request, response) => response.json({ message: "Hello from server!" }));

router.get('/listfile', (request, response) => fnPath(request, response));

/*
router.post('/listDirFile', async (req, res) => {
    
    logger.log({ 'level': 'debug',  'message': 'listDirFile'});
    try {
        let bodyReceive = '';

        // Accumula i dati ricevuti
        req.on('data', chunk => {
            bodyReceive += bodyReceive.toString(); // Converti il buffer in stringa
        });

        let bodySend = ctrlShFile.getListDirFile(cfg.home_path);
        bodySend = JSON.stringify(bodySend);

         // Una volta ricevuti tutti i dati
        req.on('end', () => {
            // Rispondi con il body ricevuto
            res.writeHead(200, { 'Content-Type': 'text/plain' });
    // Imposta le intestazioni CORS
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Permetti richieste solo da localhost:4200
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS'); // Permetti metodi POST, GET e OPTIONS
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Permetti header specifici
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Permetti invio di cookie e credenziali

            res.end(`Received: ${bodySend}`);
        });

        //return res.status(200).json(listDir); // if not invalid  return user
      } catch (err) {
        logger.log({ 'level': 'error',  'message': err.message});
        return res.status(500).send(err.message);
      }


});
*/

        //bodySend = JSON.stringify(listDir);

        // Rispondi con il body ricevuto
        //res.writeHead(200, { 'Content-Type': 'text/plain' });
        //res.send(`Received: ${bodySend}`);

router.get('/api/listDirFile', async (req, res) => {
    logger.log({ 'level': 'debug',  'message': '/api/listDirFile'});
    try {
        let listDir =ctrlShFile.getListDirFile(cfg.home_path);
        return res.status(200).send(listDir); 
      } catch (err) {
        logger.log({ 'level': 'error',  'message': err.message});
        return res.status(500).send(err.message);
      }

});
module.exports = router
