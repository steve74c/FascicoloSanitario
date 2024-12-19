
const fs = require('fs');


// function to encode file data to base64 encoded string
exports.base64_encode = (pathfile) => {
        const contents = fs.readFileSync(pathfile)
        const base64data = Buffer.from(contents.toString(), 'base64')
        const json = JSON.stringify({base64: base64data});
        return json;
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
        var bitmap = Buffer.from(base64str, 'base64').toString('hex');
        fs.writeFileSync(file, bitmap);
    }

    
exports.getFileBase64 = ( pathfile)  => { 

        console.log("path = "+ pathfile )
        let buff = fs.readFileSync(pathfile);
        let base64data = buff.toString('base64');
        
        const json = JSON.stringify({data: base64data});
    
        return json;
};
  

