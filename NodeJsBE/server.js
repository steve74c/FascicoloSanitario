const express = require('express')
const routes = require('./routes');

// Costanti
const PORT = process.env.PORT || 5000

//  Gestione CORS
var cors = require('cors')
const corsOptions = {
  origin: '*'
};

// app express
const app = express()
app.use(cors(corsOptions));
app.use(routes)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

