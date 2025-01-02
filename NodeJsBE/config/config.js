
// Path

const pathConfig = __dirname;
const homedir = pathConfig+ '\..';
const pathDB = homedir+ "\db";

// Ambiante di lavoro casa/ufficio
const home_path_doc_C = "D:\\Documenti\\Visite\\Papa\\FascicoloSanitario";
const home_path_doc_U = "C:\\Project\\MyProject\\DOC";

// sistema perativo windows/linux
const sistema_W = "WINDOWS";
const sistema_L = "LINUX";


exports.config = { 
    "home_dir"      : homedir,
    "home_db"       : pathDB,
    "home_path_doc" : home_path_doc_U,
    "sistema"       : sistema_W,
    
  }; 
  