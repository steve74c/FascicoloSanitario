/*----------------------------------------------------
    Legge i file dalla directory e 
    riporta un json con le info di ogni file
  -------------------------------------------------------*/
const logger = require("./logger");
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



exports.listDirFile = ( req,res) => {
    const { filename } = req.body;
	res.send(getListDirFile(filename))
            .then( () => {})
            .catch(error => {  logger.      });
}


  
  
 