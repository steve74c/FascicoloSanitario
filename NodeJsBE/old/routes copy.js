// routes.js
const express = require('express')
const router = express.Router()
const logger = require("./logger");
const dirTree = require("directory-tree");
const fs = require('fs');
const path = require('path');
const nodeBase64 = require("nodejs-base64-converter");
//const  ws = require('windows-shortcuts');
const getWindowsShortcutProperties = require('get-windows-shortcut-properties');



router.get("/api",  (request, response) => fnApi(request, response));
router.get('/path', (request, response) => fnPath(request, response));







function fnApi(request, response) { 
	response.json({ message: "Hello from server!" });  
}

function fnPath(request, response) { 
 const tree = dirTree("/Documenti/Visite/Stefano");	
 response.send(tree)
}




router.post('/base64pdf', (req, response) => {

    req.on('data', buffer  => {
        var path = buffer.toString();
        var fileExt = path.split('.').pop();
		console.log("fileExt = "+ fileExt);
		console.log("path = "+ path )
        if (fileExt=='lnk') {
            const lnkInfo = getWindowsShortcutProperties.sync(path);
            console.log(lnkInfo)
            console.log(lnkInfo[0].TargetPath)
            var fileFromLnk = lnkInfo[0].TargetPath.split(':').pop();
            path=fileFromLnk;
        }
            
	
        console.log("path = "+ path )
        let buff = fs.readFileSync(path);
        let base64data = buff.toString('base64');
        
        const json = JSON.stringify({data: base64data});
    
        response.send(json)
    

    });

});
  
router.post('/pdf', (req, res) => {
	
    const filePath = path.join("d:/shared/Vaccino/Template_Modulo_Consenso.pdf");

           res.writeHead(200, {
                "Access-Control-Allow-Origin":"*", 
                "Content-Type": "application/octet-stream",
                "Content-Disposition": "attachment; filename=" + "prova.pdf"
            });
    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="file.pdf"'
      });
    
      res.sendFile(filePath);  
  });


router.post('/document', function (request, response) {
    const filePath = "d:/shared/Vaccino/Template_Modulo_Consenso.pdf"; // or any file format

    //fs.readFile(__dirname + filePath , function (err,data){
    fs.readFile(filePath , function (err,data){    
        response.set( {
            "Access-Control-Allow-Origin":"*", 
            "Content-Type": "application/octet-stream",
            "Content-Disposition": "attachment; filename=" + "prova.pdf"
        });         
        response.send(data);
        
    });
});

/*
router.post('/reactPDF', async function (request, response) {
    const pdfStream = await ReactPDF.renderToStream("<MyDocument />");
    response.setHeader('Content-Type', 'application/pdf');
    pdfStream.pipe(response);
    pdfStream.on('end', () => console.log('Done streaming, response sent.'));

})
*/

router.get('/getfile', (request, response) => {
    const filePath = "d:/shared/Vaccino/Template_Modulo_Consenso.pdf"; // or any file format

    // Check if file specified by the filePath exists
    fs.exists(filePath, function (exists) {
        if (exists) {
            // Content-type is very interesting part that guarantee that
            // Web browser will handle response in an appropriate manner.
            response.writeHead(200, {
                "Access-Control-Allow-Origin":"*", 
                "Content-Type": "application/octet-stream",
                "Content-Disposition": "attachment; filename=" + "prova.pdf"
            });
            fs.createReadStream(filePath).pipe(response);
            return;
        }
        response.writeHead(400, { "Content-Type": "text/plain" });
        response.end("ERROR File does not exist");
    });

});



module.exports = router
