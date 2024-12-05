
const fs = require('fs');


exports.getFileBase64 = ( pathfile)  => { 

        console.log("path = "+ pathfile )
        let buff = fs.readFileSync(pathfile);
        let base64data = buff.toString('base64');
        
        const json = JSON.stringify({data: base64data});
    
        return json;
};
  

