const express = require('express')
const routes = require('./routes');

// Costanti
const PORT = process.env.PORT || 5000

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

app.use(cors(corsOptions));
app.use(routes)

app.listen(PORT, () => {
  
  console.log(`Server listening at http://localhost:${PORT}`)
})

