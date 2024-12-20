var cfg = require('../config/config.json');
const fs = require('fs');


// function to encode file data to base64 encoded string


exports.convertPdfToBase64 = (filePath ) => {        
     
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

exports.base64_encode = (pathfile ) => {
        system_path = pathfile;
        if (cfg.sistema="WINDOWS") {
                system_path =  pathfile.replace(new RegExp('/','g'),"\\");
        }   
        convertPdfToBase64(system_path)
        .then(base64String => {
            const json = JSON.stringify({base64: base64String});
            return json;
        })
        .catch(error => {
            console.error('Errore:', error);
        });
}
    

/*    
exports.base64_encode1 = (pathfile) => {
        system_path = pathfile;
        if (cfg.sistema="WINDOWS") {
                system_path =  pathfile.replace(new RegExp('/','g'),"\\");
        }
        const contents = fs.readFileSync(system_path)
        const base64data = Buffer.from(contents.toString('base64'), 'base64')
        console.log("base64data = "+ base64data )
        const json = JSON.stringify({base64: base64data});
        return json;
}
*/
// function to create file from base64 encoded string
function base64_decode(base64str, file) {
        var bitmap = Buffer.from(base64str, 'base64').toString('hex');
        fs.writeFileSync(file, bitmap);
    }

    
exports.getFileBase64 = ( pathfile)  => { 

        system_path = pathfile;
        if (cfg.sistema="WINDOWS") {
                system_path =  pathfile.replace(new RegExp('/','g'),"\\");
        }
        console.log("path = "+ system_path )
        let buff = fs.readFileSync(system_path);
        let base64data = buff.toString('base64');
        
        const json = JSON.stringify({data: base64data});
    
        return json;
};
  

