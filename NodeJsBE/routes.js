// routes.js
const express = require('express')
const router = express.Router()
const logger = require("./logger");

router.get("/hello",  (request, response) => response.json({ message: "Hello from server!" }));

router.get('/listfile', (request, response) => fnPath(request, response));



function fnPath(request, response) { 
 const tree = dirTree("/Documenti/Visite/Stefano");	
 response.send(tree)
}


module.exports = router
