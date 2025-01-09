const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label, printf, prettyPrint } = format;

const path = require('path');
var cfg = require('./config');

const CATEGORY = "winston custom format";
var PROJECT_ROOT = path.join(__dirname, '..')


const options = {
    file:    {
                level: 'info',
                label :{ label: CATEGORY },
                filename: `./logs/app.log`,
                handleExceptions: true,
                json: true,
                maxsize: 5242880, // 5MB
                maxFiles: 5,
                colorize: { level:false}, 
                timestamp: true,
                format:   combine(
                  label({ label: CATEGORY }),
                  printf((info) => `[${info.timestamp}] ${info.level.padEnd(5, ' ')} - ${info.message}`) 
                 ),
              },
    console: {
                level: 'debug',
                handleExceptions: true,
                json: true,
                timestamp: true,
                format:   combine(
                  
                  //format.colorize({ message: true, level:true}), 
                  format.colorize({ level:true}), 
                  printf((info) => `[${info.timestamp}] ${info.level.padEnd(5, ' ')} - ${info.message}`) 
                 ),
              }
};




/**
 * Parses and returns info about the call stack at the given index.
 */
function getStackInfo (stackIndex) {
  // get call stack, and analyze it
  // get all file, method, and line numbers
  var stacklist = (new Error()).stack.split('\n').slice(3)

  // stack trace format:
  // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
  // do not remove the regex expresses to outside of this method (due to a BUG in node.js)
  var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi
  var stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi

  var s = stacklist[stackIndex] || stacklist[0]
  var sp = stackReg.exec(s) || stackReg2.exec(s)

  if (sp && sp.length === 5) {
    return {
      method: sp[1],
      relativePath: path.relative(PROJECT_ROOT, sp[2]),
      line: sp[3],
      pos: sp[4],
      file: path.basename(sp[2]),
      stack: stacklist.join('\n')
    }
  }
}

/**
 * Attempts to add file and line number info to the given log arguments.
 */
function formatLogArguments (args) {
  
  //console.log('formatLogArguments 1: ' + JSON.stringify(args))
  args = Array.prototype.slice.call(args)
  //console.log('formatLogArguments 2: ' + JSON.stringify(args))
  var stackInfo = getStackInfo(1)
  //console.log(JSON.stringify(stackInfo))
  if (stackInfo) {

    //console.log(JSON.stringify(stackInfo))
    // get file path relative to project root
    var calleeStr = '' + stackInfo.file + ':' + stackInfo.line + ''
    //var calleeStr = '(' + stackInfo.relativePath + ':' + stackInfo.line + ')'

    if (typeof (args[0]) === 'string') {
      args[0] = calleeStr + ' - ' + args[0]
    } else {
      args.unshift(calleeStr)
    }
  }
  //console.log('formatLogArguments 3: ' + JSON.stringify(args))
  return args
  
}

const logger = createLogger({
  level:    "debug",
  format:   combine(
                    label({ label: CATEGORY }),
                    //format.colorize({ message: true, level:true}),
                    timestamp({format: "YYYY-MM-YY HH:mm:ss", }),
                    printf((info) => `[${info.timestamp}] ${info.level.padEnd(5, ' ')} - ${info.message}`) 
                   ),
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console)    
  ],
});


module.exports.log = function () {
  logger.debug.apply(logger, formatLogArguments(arguments))
}

module.exports.debug = function () {
  logger.debug.apply(logger, formatLogArguments(arguments))
}

module.exports.info = function () {
  logger.info.apply(logger, formatLogArguments(arguments))
}

module.exports.warn = function () {
  logger.warn.apply(logger,  formatLogArguments(arguments))
}

module.exports.error = function () {
  logger.error.apply(logger, formatLogArguments(arguments))
}


