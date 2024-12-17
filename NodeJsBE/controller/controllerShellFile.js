/*----------------------------------------------------
    Legge i file dalla directory e 
    riporta un json con le info di ogni file
  -------------------------------------------------------*/
const logger = require("../logger");
const dree = require('dree');

const options = {
    stat: false,
    normalize: true,
    followLinks: true,
    size: true,
    hash: true,
    depth: 5,
    //depth: null, // imposta depth su null per scansione ricorsiva completa
    exclude: /dir_to_exclude/
    //extensions: [ 'txt', 'pdf' ]
  };
  

  // ----------------------------------------
  // lista il contenuto di una cartella
  // ----------------------------------------
  exports.getListDirFile = ( path)  => { return dree.scan(path, options); }

  // ----------------------------------------
  // visualizza l'abero della direcotory
  // ----------------------------------------
  exports.getListDirTree = ( path)  => { return dree.parse(path, options); }
  

  // ----------------------------------------
  // lista il contenuto di una cartella
  // ----------------------------------------
  exports.printtDirFile = ( jsonString )  => { 
    const json = JSON.stringify(jsonString);
    const object = JSON.parse(json)
    console.dir(object, {depth: null, colors: true})
  }



listDir = ( req,res, type) => {
    const { filename } = req.body;
    logger.log('Body: ' + req.body )

    const headerDict = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
    
    let body = '';
    if (type =='F')
      body = getListDirFile(filename);
    else
      body = getListDirTree(filename);
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };
	res.send(body,requestOptions).then( () => {})
                               .catch(error => {  logger.info("Errore: " + error)      });
}


exports.listDirFile = ( req,res) => {
  listDir( req,res,'F')
}
  
exports.listDirTree = ( req,res) => {
  listDir( req,res,'T')
}
  
 