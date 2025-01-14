const logger = require('./utils/Logger');
const dotenv = require('dotenv');
const path = require('path');



dotenv.config({
    path: path.resolve(__dirname + '\\environments', `${process.env.NODE_ENV}.env`)
});

const homedir = __dirname;

module.exports = {
    NODE_ENV         : process.env.NODE_ENV         || 'development',
    HOST             : process.env.HOST             || 'localhost',      
    PORT             : process.env.PORT             || '5000',      
    OPERATING_SYSTEM : process.env.OPERATING_SYSTEM || 'WINDOWS',      
    HOME_PATH_DOC    : process.env.HOME_PATH_DOC,     
    //HOME_PATH_DOC    : process.env.HOME_PATH_DOC    || 'C:\\Project\\MyProject\\DOC',     
    PATH_CONFIG      : __dirname,  
    PATH_DB          : "./db/dbFacicoloSanitario.db",  

}