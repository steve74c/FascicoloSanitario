var cfg = require('../config');
const fs = require('fs');

const logger = require('../utils/Logger');



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

        system_path = cfg.HOME_PATH_DOC;
        if (cfg.OPERATING_SYSTEM="WINDOWS") {
                system_path =  system_path + '\\' + req.body.path.replace(new RegExp('/','g'),"\\");
        }   
         return convertFileToBase64(system_path);
    }  catch (error) {
          logger.error(error);
    }      
}






