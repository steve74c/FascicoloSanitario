var cfg = require('../config/config');
const fs = require('fs');

const logger = require('../Logger');



// -----------------------------------------------------------------------
// Converte file in base64
// -----------------------------------------------------------------------
convertFileToBase64 = (filePath ) => {        
     
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const base64 = data.toString('base64');
                    resolve(base64);
                }
            });
        });
    }

// -----------------------------------------------------------------------
// Verifica il path se sono in windows o linux in base al config
// e ritorna un json con il file base4 
// -----------------------------------------------------------------------

exports.base64_encode = (req, res) => {

    try {

        system_path = req.body.path;
        if (cfg.sistema="WINDOWS") {
                system_path =  req.body.path.replace(new RegExp('/','g'),"\\");
        }   
        convertFileToBase64(system_path).then(base64String => {
            const json = JSON.stringify({base64: base64String});
            return res.status(200).send(json); 
        }).catch(error => {
            logger.error(error);
        });
    }  catch (error) {
          logger.error(error);
    }      
}



