const config =  require('./config.js');
const express = require('express')
const routes = require('./routes');
const logger = require('./utils/Logger');


logger.info(__dirname + '\\environments')

logger.info(config.NODE_ENV);
logger.info(config.HOST);
logger.info(config.PORT);


// Costanti
const PORT = config.PORT || 5000

//  Gestione CORS
var cors = require('cors')
const corsOptions = {
  origin: '*',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false
};

// app express
const app = express()

// queste 2 righe sono importanti per leggere il body
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

// per le politiche di cors
app.use(cors(corsOptions));

// gestione delle rotte
app.use(routes)


app.listen(PORT, () => {
  logger.info(`Server listening at http://localhost:${PORT}`)
})

