/*----------------------------------------------------
    Legge i file dalla directory e 
    riporta un json con le info di ogni file
  -------------------------------------------------------*/
const logger = require("../Logger");
const dree = require('dree');

const headerDict = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
}
const requestOptions = {                                                                                                                                                                                 
  headers: new Headers(headerDict), 
};

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

  // -------------------------------------------------------
  // Invia il risultato delle lista dei file ricavato
  // -------------------------------------------------------
  listDir = ( req,res, runFn) => {
    //logger.debugreq.body);
    try {

      const { filename } = req.body;
      const body = runFn(filename);
      res.send(body,requestOptions).then( () => {})
                                  .catch(error => {  logger.info("Errore: " + error)      });

    } catch (err) {
      logger.log({ 'level': 'error',  'message': err.message});
      return res.status(500).send(err.message);
    } 
  }





  // -----------------------------------------------------------------------
  // risponde al server il contenuto della directory in formato json
  // -----------------------------------------------------------------------
  exports.listDirFile = ( req,res) => {
    listDir( req,res,getListDirFile)
  }
  
  // -----------------------------------------------------------------------
  // risponde al server il contenuto della directory in formato albero String
  // -----------------------------------------------------------------------
  exports.listDirTree = ( req,res) => {
    listDir( req,res,getListDirTree)
  }
  