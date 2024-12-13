const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label, printf, prettyPrint } = format;

const CATEGORY = "winston custom format";

const logger = createLogger({
  level: "debug",
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    // contenuto dell'errore in formato json
    //prettyPrint()  
    // Esprime il contenuto dell'errore su una riga
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`) 
  ),
  transports: [
    new transports.File({  filename: "logs/example.log",  }),
    new transports.File({     level: "error", filename: "logs/error.log",   }),
    new transports.Console(),
  ],
});

module.exports = logger;